-- Durable outbox to avoid repeated n8n reminders after each scheduled run.
CREATE TABLE IF NOT EXISTS ops.alert_outbox (
 alert_key TEXT PRIMARY KEY,
 event_type TEXT NOT NULL,
 object_key TEXT NOT NULL,
 title TEXT NOT NULL,
 due_at TIMESTAMPTZ,
 created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 sent_at TIMESTAMPTZ,
 external_task_id TEXT,
 last_error TEXT,
 retry_count INTEGER NOT NULL DEFAULT 0
);

-- Insert payment reminders once per invoice per due date. No contact PII.
INSERT INTO ops.alert_outbox(alert_key,event_type,object_key,title,due_at)
SELECT 'invoice-due:'||invoice_id||':'||due_at::DATE,
       'invoice-due', invoice_id,
       'Check outstanding invoice '||invoice_id, due_at
FROM ops.invoices
WHERE status IN ('issued','part_paid') AND due_at <= now()
ON CONFLICT (alert_key) DO NOTHING;

-- Insert advisor-review reminders once per student+week+flag.
INSERT INTO ops.alert_outbox(alert_key,event_type,object_key,title,due_at)
SELECT 'advisor:'||flag_id::TEXT, 'advisor-review', flag_id::TEXT,
       'Review open student progress flag '||flag_id::TEXT, now()
FROM ops.advisor_flags
WHERE status='open'
ON CONFLICT (alert_key) DO NOTHING;

-- A separate dispatch worker chooses due pending events.
SELECT alert_key,event_type,object_key,title
FROM ops.alert_outbox
WHERE sent_at IS NULL AND (due_at IS NULL OR due_at<=now())
ORDER BY created_at LIMIT 20 FOR UPDATE SKIP LOCKED;
-- Lock/transaction semantics need care: n8n alone does not hold this lock
-- during HTTP calls. For production, use transactional row leasing and retries.