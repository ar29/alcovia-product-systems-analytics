# Product priority measurement contract — for candidate review

**Candidate-selected direction, 15 Oct 2026:** meaningful weekly learning actions and returning students. The candidate also mentioned Alcovia's 30-minute aspiration. The following implementation details are **proposals**, not statements supplied by the candidate or verified in the app.

## The problem with the initial rationale

The initial explanation restated the selected goal and the 30-minute aspiration. It did not explain the causal chain. A clearer, testable *hypothesis* is: if Alcovia helps a learner finish one purposeful study activity and makes the next step obvious, the learner is more likely to return voluntarily for academic work. This might be false; validate by observing the app and asking learners.

## Two complementary measures, not one magic number

1. **Weekly meaningful learning coverage (primary candidate *direction* operationalisation)** = number of distinct eligible enrolled learners with ≥1 qualifying action during the local Monday–Sunday week / number of eligible enrolled learners during the same week. Numerator and denominator must be visible. Include eligible learners with **zero activity**. The exact eligibility policy (joined mid-week, paused, withdrawn) is signed off by Product + Student Success, snapshotted each week, and versioned. No implicit removal of inactive children.
2. **Week-on-week meaningful return (supporting behaviour outcome)** = eligible learners with qualifying actions in *both* last week and this week / learners who had a qualifying action last week **and remain eligible this week**. Report sample sizes. If no prior-week learners, show N/A. Do not quietly present this as seven-day app retention.
3. **Counter-metrics / context:** submitted-practice accuracy, independently checked chapter readiness, student opt-in usefulness and stress feedback, advisor manual time per student, event-logging completeness and dropout/missing observations. Display average app minutes per active day as a diagnostic, not as a goal.

## Event quality requirements (proposed)

| Proposed qualifying action | Valid proof | What does not qualify |
|---|---|---|
| Quiz submitted | Server records submission ID and question-attempt count | Opening a quiz without submitting |
| Practice attempted | Practice record includes attempted answers and score | Clicking a practice card |
| Planned study task evidenced | A pre-existing task completed with a dated artefact, assessment or review | Toggling an empty checkbox repeatedly |
| Chapter-progress evidence | Captured practice/timed assessment or human-reviewed evidence | Clicking 'finished reading' |

Use idempotent source-event identifiers, server timestamps, one canonical action per underlying activity, time-zone-specific week buckets (IST for the pilot unless the business confirms otherwise), and role-checked access. Avoid sending individual student IDs outside authorised advisor views. **These events measure demonstrated participation and evidence, not proof of comprehension.**

## Selected direction and first experiment

**My chosen direction:** Improve weekly meaningful learning actions and voluntary return, not the minutes counter alone. My chosen first experiment is a **Resume My Study Plan** action on the existing student journey and a reward **only after evidence-backed practice is accepted**. This is a hypothesis from the brief, not a first-hand app observation.

**Discovery before build:** Observe five consenting students moving from Home / Realm / Focus to their existing agreed study task. Check whether the real obstacle is discoverability, an impractical plan, lack of practice prompts or something else. If discoverability is not a problem, change the experiment rather than ship a feature for its own sake.

**Pilot funnel:** eligible students → saw CTA → resumed an existing planned task → attempted practice → valid event accepted → meaningful learning again in the next eligible week. Publish numerator/denominator and sample sizes; check time to locate the task, completion evidence, student opt-in feedback and advisor workload. The cohort is too small to claim statistical significance.

**Reward boundary:** A production server would verify the authenticated learner, a real planned task, recorded practice evidence and a unique immutable event ID; a replay must never result in another grant. Practice accuracy contributes to learning feedback but should not be the sole determinant of effort recognition. Establish rate limits, reward caps and a safeguarding review with Alcovia. The demo's three-question checkpoint issues **10 fictional coins in the browser only**; it does not authenticate, verify evidence against Alcovia systems or issue real rewards.

**Proposed keep/change/stop check:** Keep if student progress becomes easier to resume and evidenced work increases without increased stress or advisor burden. Change if starts rise but accepted practice does not. Stop or disable rewards if repeated trivial attempts or wellbeing complaints rise. Treat app minutes as diagnostic context only.

## Operational clarifications to settle with Alcovia

- Agree the authoritative eligible-roster definition (new joiners, approved leave, withdrawal) and track denominator changes.
- Decide what constitutes sufficient evidence for each task type; an accepted quiz submission is participation, not demonstrated mastery.
- Review which data may be viewed by advisors, parents and students, and the approval / consent process for student data.
- Confirm reasonable reward caps and whether an incentive is appropriate for each age group.
- Only after observing real app journeys confirm whether the proposed first experiment addresses the primary friction.

**Demo caveat:** All student aggregates in the prototype are synthetic. They are not Alcovia analytics, and no uplift is claimed.