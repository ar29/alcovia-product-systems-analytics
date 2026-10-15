-- Parameters :start_at inclusive and :end_at exclusive, timestamps in UTC.
-- Convert user-local date boundaries to UTC in the service before running.

-- (1) COHORT FUNNEL: based on CREATED leads, prevents mixing multiple populations.
-- Some recent leads have not had time to convert: see maturity caveat below.
SELECT COUNT(*) AS new_leads,
       COUNT(*) FILTER (WHERE qualified_at IS NOT NULL) AS qualified,
       COUNT(*) FILTER (WHERE discovery_booked_at IS NOT NULL) AS discovery_booked,
       COUNT(*) FILTER (WHERE discovery_attended_at IS NOT NULL) AS discovery_attended,
       COUNT(*) FILTER (WHERE ambition_completed_at IS NOT NULL) AS ambition_completed,
       COUNT(*) FILTER (WHERE architect_completed_at IS NOT NULL) AS architect_completed,
       COUNT(*) FILTER (WHERE EXISTS (
         SELECT 1 FROM ops.invoices i WHERE i.lead_id=l.lead_id AND i.status='paid')) AS paid_leads,
       ROUND(COUNT(*) FILTER (WHERE discovery_attended_at IS NOT NULL)::NUMERIC /
         NULLIF(COUNT(*) FILTER (WHERE discovery_booked_at IS NOT NULL),0),3) AS discovery_show_rate
FROM ops.leads l
WHERE l.created_at >= :start_at AND l.created_at < :end_at;

-- (2) PAYMENT-DATE REVENUE: only verified captured invoices.
-- Before production: handle part payments and refunds with a signed payment ledger
-- instead of only invoice.status; this minimal model is for prototyping.
SELECT product,
       COUNT(*) AS paid_invoices,
       SUM(amount_paise)/100.0 AS paid_revenue_inr
FROM ops.invoices
WHERE status='paid' AND paid_at >= :start_at AND paid_at < :end_at
GROUP BY product ORDER BY paid_revenue_inr DESC;

-- (3) Accounts receivable: total unpaid invoices, never count as collected revenue.
SELECT COUNT(*) AS unpaid_invoices,
       SUM(amount_paise)/100.0 AS unpaid_inr
FROM ops.invoices
WHERE status IN ('issued','part_paid') AND issued_at < :end_at;

-- (4) Qualified lead cost by campaign, attribution based on UTM/source.
-- Ad source and spend should cover same dates; campaign-level attribution can be
-- incomplete if UTM tags are missing or leads convert after attribution window.
WITH spend AS (
 SELECT campaign_id,SUM(spend_paise)/100.0 AS spend_inr
 FROM ops.ad_daily WHERE day >= :start_day AND day < :end_day
 GROUP BY campaign_id
), leads AS (
 SELECT campaign_id,COUNT(*) FILTER (WHERE qualified_at IS NOT NULL) AS ql
 FROM ops.leads WHERE created_at >= :start_at AND created_at < :end_at
 GROUP BY campaign_id
)
SELECT spend.campaign_id,spend.spend_inr,COALESCE(leads.ql,0) AS qualified_leads,
       ROUND(spend.spend_inr/NULLIF(leads.ql,0),2) AS cpql_inr
FROM spend LEFT JOIN leads USING (campaign_id);

-- (5) Weekly student progress. In real operation, apply permissions: advisors only
-- see assigned students, leadership sees aggregated, suppressed small cohorts.
SELECT week_start,
       COUNT(DISTINCT student_id) AS tracked_students,
       SUM(tasks_completed)::NUMERIC/NULLIF(SUM(tasks_assigned),0) AS task_completion,
       SUM(chapters_ready)::NUMERIC/NULLIF(SUM(chapters_target),0) AS chapter_readiness,
       SUM(quizzes_taken)::NUMERIC/NULLIF(SUM(quizzes_offered),0) AS quiz_participation,
       AVG(focus_minutes) AS avg_focus_minutes
FROM ops.student_progress
WHERE week_start >= :start_day AND week_start < :end_day
GROUP BY week_start ORDER BY week_start;

-- (6) Quantity / quality / performance explicitly separated.
SELECT activity_type,
 COUNT(*) AS scheduled,
 COUNT(*) FILTER (WHERE delivered_at IS NOT NULL) AS delivered,
 ROUND(AVG(rating) FILTER (WHERE rating IS NOT NULL),2) AS avg_feedback,
 COUNT(rating) AS feedback_n,
 COUNT(*) FILTER (WHERE outcome_recorded_at IS NOT NULL) AS outcome_records
FROM ops.activity_sessions
WHERE scheduled_at >= :start_at AND scheduled_at < :end_at
GROUP BY activity_type;

-- (7) Detect overdue sync runs; a dashboard must expose stale data.
SELECT source,MAX(finished_at) AS last_successful_sync
FROM ops.sync_runs WHERE status='success'
GROUP BY source;