-- Candidate-selected product direction; PROPOSED implementation for approval.
-- Requires ops.student_week_eligibility and ops.meaningful_learning_events.
-- Parameters: :week_start is a DATE (local Monday). Use a snapshotted, versioned
-- eligibility rule; the roster includes eligible students with zero events.
-- week_start is calculated from occurred_at in the agreed school time zone.
WITH date_boundaries AS (
  SELECT :week_start::date AS week_start,
         (:week_start::date - INTERVAL '7 days')::date AS previous_start
),
week_eligibility AS (
  SELECT e.student_id, e.week_start
  FROM ops.student_week_eligibility e, date_boundaries d
  WHERE e.week_start IN (d.week_start, d.previous_start) AND e.eligible = TRUE
),
accepted_actions AS (
  SELECT DISTINCT ev.student_id,
      date_trunc('week', ev.occurred_at AT TIME ZONE 'Asia/Kolkata')::date AS week_start,
      ev.source_event_id
  FROM ops.meaningful_learning_events ev, date_boundaries d
  WHERE ev.is_accepted AND ev.evidence_present
    AND ev.reviewer_status = 'validated'
    AND ev.occurred_at >= ((d.previous_start::timestamp) AT TIME ZONE 'Asia/Kolkata')
    AND ev.occurred_at < (((d.week_start + 7)::timestamp) AT TIME ZONE 'Asia/Kolkata')
),
per_student AS (
  SELECT e.student_id, e.week_start, COUNT(a.source_event_id) AS action_count
  FROM week_eligibility e
  LEFT JOIN accepted_actions a
    ON a.student_id=e.student_id AND a.week_start=e.week_start
  GROUP BY e.student_id, e.week_start
),
current_week AS (
  SELECT p.student_id, p.action_count FROM per_student p, date_boundaries d
  WHERE p.week_start=d.week_start
),
last_week AS (
  SELECT p.student_id, p.action_count FROM per_student p, date_boundaries d
  WHERE p.week_start=d.previous_start
),
rollup AS (
 SELECT COUNT(*) AS eligible_students,
        COUNT(*) FILTER (WHERE c.action_count > 0) AS meaningful_students,
        SUM(c.action_count) AS total_accepted_actions,
        COUNT(*) FILTER (WHERE p.action_count > 0) AS prior_meaningful_still_eligible,
        COUNT(*) FILTER (WHERE p.action_count > 0 AND c.action_count > 0) AS returned_meaningful
 FROM current_week c LEFT JOIN last_week p ON p.student_id=c.student_id
)
SELECT eligible_students, meaningful_students, total_accepted_actions,
       meaningful_students::numeric / NULLIF(eligible_students,0) AS meaningful_coverage,
       prior_meaningful_still_eligible, returned_meaningful,
       returned_meaningful::numeric / NULLIF(prior_meaningful_still_eligible,0) AS week_to_week_meaningful_return
FROM rollup;

-- NOTICE: acceptance after advisor review may delay the latest weekly metric;
-- display completeness / lag instead of backdating silently. Pilot policy may
-- allow rules-based verification for quizzes and attempts, human review for tasks.