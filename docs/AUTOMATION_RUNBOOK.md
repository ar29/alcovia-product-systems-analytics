# n8n workflow runbook (templates only; not connected)

- `n8n/invoice_alerts.json`: each morning, poll invoice due dates from a read/write ops PostgreSQL credential; send a ClickUp task for each invoice needing finance follow-up.
- `n8n/advisor_flags.json`: each morning, poll open advisor flags and send a ClickUp task referencing an opaque flag ID (no child names or personal records in the task title).

## Required setup

1. Configure Postgres credential and HTTP header credential for ClickUp API token inside authorised Alcovia n8n. **Do not copy credentials into exported JSON.**
2. Configure `CLICKUP_FINANCE_LIST_ID` and `CLICKUP_ADVISOR_LIST_ID` environment variables (or replace placeholders with actual list IDs in your private n8n environment).
3. Install `sql/01_schema.sql` and `sql/03_alert_outbox.sql` before activating these workflows.
4. Implement robust delivery by adding an **outbox dispatcher** with a lease key, bounded retry/backoff and an explicit `sent_at` update only *after* ClickUp confirms task creation. Reconcile retries using a durable mapping from `alert_key` to ClickUp task ID; ClickUp may not provide native idempotency.
5. Add alerting on failed node executions and source lag; protect logs from personal data.

These sample workflows intentionally perform **detect-and-queue** only with Postgres SQL; they do not claim full end-to-end execution without configured credentials and a production-grade dispatcher. This is safer than a fake ‘fully integrated’ export.

## Production sources

- Meta Marketing API: campaigns, adsets, impressions, spend, clicks, frequencies; daily ingest and source reconciliation.
- ClickUp: leads, stages, owner and appointment changes; periodic reconciliation plus webhooks if events are reliable.
- Razorpay: payment authorised/captured/refunded events must verify webhook signatures, validate invoice mapping and deduplicate events. Never count `payment.authorized` as collected revenue.
- App events: session start/completion, study action, task changes; use a backend ingestion API and server-side authentication.

## Failure modes and checks

- Duplicate webhook: same `provider_event_id` yields a no-op.
- Missing lead UTM: mark attribution unknown, don't incorrectly credit a campaign.
- Late payment/refund: update ledger and recompute reporting; surface as-of timestamp.
- Clock boundaries: align reporting days to chosen local time zone, store UTC timestamps.
- Stale sync: show a banner and prevent decisions based on a silent old extract.
- Student privacy: notifications refer to opaque IDs, not private progress or health content.