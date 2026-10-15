# Alcovia Product, Systems & Analytics Lead — take-home prototype

> **Synthetic data only.** Not affiliated with Alcovia's production engineering team. This is a local assessment prototype; no real payment, CRM or student systems are connected.

## Start

No application dependencies. Python 3 or any static HTTP server:

```bash
npm run dev
# open http://localhost:4173
npm test
```

Or deploy the `app/` directory to Vercel as a static site (Output Directory `app`). Do not add authentication secrets to static files.

## What is included

- `app/`: interactive GTM/revenue, campaign, student tracking and delivery operating system views. Student Outcomes is the default view to reflect the candidate-selected priority. The GTM view retains 7/30/90-day filters, campaign type filter, advisor filter and student drill-down.
- `app/metrics.js`: pure metrics and defensible denominators.
- `app/demo-data.js`: deterministic fake fixture generator seeded for reproducibility.
- `sql/01_schema.sql`: Postgres reference entity model; privacy-preserving pseudonymous student fields and idempotency keys.
- `sql/02_metrics.sql`: SQL for lead-cohort funnel, revenue, unpaid invoices, CPQL, weekly progress, sessions and sync freshness.
- `n8n/`: **unconnected** importable workflow templates for revenue reconciliation and overdue advisor flagging. API access and credentials must be configured by authorised Alcovia operators.
- `docs/72_HOUR_PLAN.md`: assignment timebox.
- `docs/EXECUTIVE_WRITEUP.md`: concise assessment with confirmed candidate choices and explicit evidence limits; no invented app walkthrough.
- `docs/PRODUCT_DELIVERY_PLAYBOOK.md`: detailed team process, thresholds, incident handling and gates.
- `docs/STUDENT_KPI_DICTIONARY.md`: daily, weekly, monthly, quarterly quantity/quality/performance measurement and collection plan.
- `docs/DECISION_LOG.md`: decisions labelled as candidate-selected or implementation proposals; no invented app walkthrough.
- `docs/PRODUCT_PRIORITY_METRICS.md`: measurement contract, return-rate denominator, action event definitions, interpretation risks, and acceptance checklist.
- `sql/04_weekly_learning.sql`: reference query for evidence-backed actions, cohort coverage and week-to-week return, grounded in eligibility history. Not applied to a live database.
- `sql/05_verified_practice_reward.sql`: illustrative idempotent, backend-side reward grant for verified practice only; not connected to the browser.
- Student Outcomes includes an **interactive Resume My Study Plan → 3-question practice checkpoint → demo coin reward** illustrating the candidate-selected flow. Scores are feedback, not a reward prerequisite. The front-end verification is only a simulation.
- `tests/`: metric unit tests.
- `alcovia-standalone-preview.html`: all-in-one HTML version for quickly opening locally or hosting as one static asset.

## Metric/source matrix

| KPI | Source | Date basis | Owner | Caveat |
|---|---|---|---|---|
| Captured programme/workshop revenue | Razorpay + invoices | Payment date | Finance | Net refunds/part-payments need ledger |
| Campaign CPQL | Meta daily spend + ClickUp qualification | Spend date, lead creation date | Growth | UTMs must reconcile |
| Discovery show rate | ClickUp appointment stages | Created-lead cohort | Admissions | Cohort not mature for recent leads |
| Weekly meaningful coverage + return | Evidence-backed app events + eligible roster | Student local week, prior eligible cohort | Student success + engineering | Demo aggregates fabricated; action contract requires validation |
| Weekly study progress | App events + advisor review | Student local week | Student success | Advisor must validate missing data |
| Session delivery and feedback | Calendar/session + optional student form | Scheduled date | Student success | No response != negative quality |
| Failure/sync freshness | n8n and DB sync logs | Last successful sync | Engineering | Fail closed on stale data |

## Important caveats

- The only real student observations in the brief are aggregate counts; the student drill-down is invented demonstration data.
- Workshop seat price ₹3,999 was supplied by the brief; demo trial and programme prices are illustrative.
- The candidate selected meaningful weekly learning actions and return, **Resume My Study Plan**, and rewards for verified practice. Exact event definitions, coin policy, and anti-gaming/reviewer mechanisms are **proposals to validate**, not production requirements.
- Student Outcomes demo shows a fictitious 9–15 October 2026 week and preceding week; don't claim those records represent Alcovia's actual 20 students.
- Demo reporting dates anchor to 2026-10-15 to make screenshots reproducible. Production uses the actual local time/zone.
- Spend/impressions are synthetic and prorated by window for visual demonstration, not a source of true daily campaign facts.
- This code is a **read-only front-end prototype**, not a production integration or real student tracker.
- An actual sync should use server-held credentials, verified payment webhooks and audit trails. Never send private child records to a public static app.
- End-user and stakeholder interviews, an independent mobile app walkthrough and a validated dashboard definition would be required before live rollout; none has been falsely claimed here.

## Deploy

1. Import/push this folder to a GitHub repository.
2. Create a Vercel **Other**/static project connected to that repository.
3. Set **Output Directory** `app`, with no build command (or use static hosting that serves `app/index.html`).
4. Verify all three tabs, 7/30/90 filters, campaign filters, student drill-down, mobile layout, and metric definitions dialog.
5. Verify URL in an incognito browser before putting it in the submission form.

## Evaluation points intentionally surfaced

1. Challenge the brief's **30-minute screen time** proxy before trying to inflate it.
2. With only 20 observed app users, do not overstate significance or run fake A/B analyses.
3. Differentiate lead cohort conversion from stage-specific activity counts.
4. Distinguish session delivery quantity, feedback quality and actual progress.
5. Design for three owners, incident recovery and privacy rather than a rewrite of existing systems.

**Authorship and evidence note:** This is an AI-assisted prototype. The candidate explicitly selected the weekly learning priority and the Resume My Study Plan plus verified-practice recognition idea. Other architectures, thresholds and examples are proposals. No firsthand app observations, production integrations or student outcomes are claimed.