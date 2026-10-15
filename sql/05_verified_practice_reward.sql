-- Example production reward boundary for the candidate-selected pilot.
-- Execute via a trusted server transaction AFTER server-side authorisation,
-- attempt/event ingestion, evidence checks and verification. Not used by demo UI.
-- Coin amount is illustrative; product owner must approve incentive policy.
CREATE TABLE IF NOT EXISTS ops.practice_reward_grants (
  reward_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  source_event_id TEXT NOT NULL UNIQUE
    REFERENCES ops.meaningful_learning_events(source_event_id),
  student_id UUID NOT NULL,
  reward_code TEXT NOT NULL DEFAULT 'verified_practice',
  coins_awarded INTEGER NOT NULL DEFAULT 10 CHECK (coins_awarded > 0),
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- :student_id and :source_event_id must come from an authenticated,
-- verified request, not client-supplied identity or a guessed ID.
-- One grant per event even under concurrent requests / webhook retries.
INSERT INTO ops.practice_reward_grants (source_event_id, student_id)
SELECT ev.source_event_id, ev.student_id
FROM ops.meaningful_learning_events ev
WHERE ev.student_id = :student_id::uuid
  AND ev.source_event_id = :source_event_id
  AND ev.activity_type = 'practice_attempt_completed'
  AND ev.is_accepted = TRUE
  AND ev.evidence_present = TRUE
  AND ev.reviewer_status = 'validated'
ON CONFLICT (source_event_id) DO NOTHING
RETURNING reward_id, source_event_id, coins_awarded;

-- Important: demonstrate a unique evidence-backed grant, not security of
-- the browser-only mock. In production, sign off on repetition caps, server-
-- evaluated attempt evidence, appeal paths, age-appropriate nudges and audits.