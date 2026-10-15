-- Postgres 15+ reference data model. Not applied to a production database.
-- No secrets, names, emails, phone numbers or real student records included.
CREATE SCHEMA IF NOT EXISTS ops;

CREATE TABLE IF NOT EXISTS ops.leads (
  lead_id UUID PRIMARY KEY,
  clickup_task_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('paid','organic','referral','other')),
  utm_source TEXT, utm_campaign TEXT, campaign_id TEXT,
  qualified_at TIMESTAMPTZ,
  discovery_booked_at TIMESTAMPTZ,
  discovery_attended_at TIMESTAMPTZ,
  ambition_completed_at TIMESTAMPTZ,
  architect_completed_at TIMESTAMPTZ,
  owner_id TEXT NOT NULL,
  lost_at TIMESTAMPTZ,
  lost_reason TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_leads_created ON ops.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_campaign ON ops.leads(campaign_id);

CREATE TABLE IF NOT EXISTS ops.invoices (
  invoice_id TEXT PRIMARY KEY,
  lead_id UUID REFERENCES ops.leads(lead_id),
  product TEXT NOT NULL CHECK (product IN ('trial','full','workshop')),
  amount_paise BIGINT NOT NULL CHECK (amount_paise >= 0),
  issued_at TIMESTAMPTZ NOT NULL,
  due_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  payment_id TEXT UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('issued','part_paid','paid','void','refunded')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_invoices_issued ON ops.invoices(issued_at);
CREATE INDEX IF NOT EXISTS idx_invoices_paid ON ops.invoices(paid_at);

CREATE TABLE IF NOT EXISTS ops.payment_events (
  provider_event_id TEXT PRIMARY KEY,
  provider TEXT NOT NULL DEFAULT 'razorpay',
  payment_id TEXT, invoice_id TEXT REFERENCES ops.invoices(invoice_id),
  event_type TEXT NOT NULL,
  amount_paise BIGINT NOT NULL,
  event_at TIMESTAMPTZ NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_payment_events_at ON ops.payment_events(event_at);

CREATE TABLE IF NOT EXISTS ops.ad_daily (
  ad_account_id TEXT NOT NULL,
  campaign_id TEXT NOT NULL,
  adset_id TEXT NOT NULL,
  day DATE NOT NULL,
  impressions BIGINT NOT NULL DEFAULT 0,
  clicks BIGINT NOT NULL DEFAULT 0,
  spend_paise BIGINT NOT NULL DEFAULT 0,
  frequency NUMERIC(8,3),
  landing_views BIGINT,
  landing_conversions BIGINT,
  PRIMARY KEY (ad_account_id, campaign_id, adset_id, day)
);

-- Use opaque pseudonymous IDs; keep identifiable student info in a separately
-- protected application service. Do not store raw health / wearable data here.
CREATE TABLE IF NOT EXISTS ops.student_progress (
  student_id UUID NOT NULL,
  week_start DATE NOT NULL,
  advisor_id TEXT NOT NULL,
  active_days SMALLINT NOT NULL DEFAULT 0,
  focus_minutes INTEGER NOT NULL DEFAULT 0,
  tasks_assigned INTEGER NOT NULL DEFAULT 0,
  tasks_completed INTEGER NOT NULL DEFAULT 0,
  quizzes_offered INTEGER NOT NULL DEFAULT 0,
  quizzes_taken INTEGER NOT NULL DEFAULT 0,
  chapters_target INTEGER NOT NULL DEFAULT 0,
  chapters_ready INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (student_id, week_start),
  CHECK (active_days BETWEEN 0 AND 7),
  CHECK (tasks_completed <= tasks_assigned),
  CHECK (quizzes_taken <= quizzes_offered),
  CHECK (chapters_ready <= chapters_target)
);

CREATE TABLE IF NOT EXISTS ops.activity_sessions (
  session_id UUID PRIMARY KEY,
  student_id UUID NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('workshop','pod','mentor','peer','academic','quiz')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  delivered_at TIMESTAMPTZ,
  rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
  feedback_at TIMESTAMPTZ,
  outcome_recorded_at TIMESTAMPTZ,
  advisor_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ops.advisor_flags (
  flag_id UUID PRIMARY KEY,
  student_id UUID NOT NULL,
  week_start DATE NOT NULL,
  flag_type TEXT NOT NULL,
  evidence TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','acknowledged','resolved')),
  resolved_at TIMESTAMPTZ,
  UNIQUE(student_id, week_start, flag_type)
);

CREATE TABLE IF NOT EXISTS ops.sync_runs (
  run_id UUID PRIMARY KEY,
  source TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ,
  rows_read INTEGER NOT NULL DEFAULT 0,
  rows_written INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'running',
  error_code TEXT
);
-- Production implementation: per-role authorisation at application boundary,
-- plus Postgres RLS for student rows; encryption and audit trail are mandatory.

-- Candidate-selected priority reference extension. Event contract requires sign-off.
-- One eligibility snapshot per student per local reporting week; include zero-use
-- students in the denominator, with documented reasons for ineligibility.
CREATE TABLE IF NOT EXISTS ops.student_week_eligibility (
  student_id UUID NOT NULL,
  week_start DATE NOT NULL,
  eligible BOOLEAN NOT NULL,
  policy_version TEXT NOT NULL DEFAULT 'draft-v1',
  eligibility_reason TEXT,
  advisor_id TEXT NOT NULL,
  snapshotted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (student_id, week_start)
);
CREATE TABLE IF NOT EXISTS ops.meaningful_learning_events (
  source_event_id TEXT PRIMARY KEY, -- idempotency across retries and resync
  student_id UUID NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN (
    'quiz_submitted','practice_attempt_completed',
    'planned_task_evidenced','chapter_evidence_recorded')),
  occurred_at TIMESTAMPTZ NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  evidence_present BOOLEAN NOT NULL DEFAULT FALSE,
  is_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  reviewer_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (reviewer_status IN ('pending','validated','rejected')),
  CONSTRAINT accepted_requires_evidence CHECK (NOT is_accepted OR evidence_present)
);
CREATE INDEX IF NOT EXISTS idx_learning_events_student_time
  ON ops.meaningful_learning_events(student_id, occurred_at);