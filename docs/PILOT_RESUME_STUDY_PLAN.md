# Resume My Study Plan — first experiment

## Candidate-selected ideas (15 October 2026)

1. A visible **Resume My Study Plan** action, preferably where students already go (Home and, if useful, Realm after exit).
2. A **reward connected to verified practice**, not app opens, time spent, timer starts, or pure game activity.

Everything after these two choices is an implementation hypothesis for candidate and Alcovia approval. The app wasn't personally reviewed in this repository, and no user interviews have been conducted.

## Proposed journey

1. Student opens Home / Realm. The app offers one clear Resume action, showing the *existing* advisor-approved next task.
2. Student opens the planned task. No reward. They can review previous notes, set their own pace, or start Focus if helpful. No forced timer.
3. Student answers the assigned practice questions and submits an attempt. Store validated answers, attempt ID, task ID, submission time and minimum evidence according to Alcovia's privacy policy.
4. A trusted server verifies authentication, task association, integrity and idempotency. Award coins only once per approved attempt within the programme's age-appropriate policy. Low accuracy still yields useful feedback and doesn't automatically disqualify genuine effort; repeated trivial submissions and attempts beyond cap are reviewed.
5. Surface the next sensible learning step without auto-creating additional screen-time goals. Provide an accessible "Not now" option.

## Small pilot and evaluation

- Week 1: observe 5 consenting student flows and 2 advisor reviews. Verify that next-task discoverability is truly a blocker. Capture qualitative baseline and event instrumentation completeness.
- Weeks 2–3: release a reversible, opt-in CTA to a small group if discovery supports it. Use within-learner progression, not an underpowered significance claim.
- Weeks 4–6: consider rewards only after verifying task/event contracts and student safeguarding. Separate CTA effects from reward effects in rollout and interpretation; don't attribute changes to coins without evidence.
- Primary: weekly meaningful coverage and week-on-week return among eligible learners, with counts.
- Supporting: next-task resume rate, valid practice attempt completion rate, repeated task attempts, optional usefulness rating, practice accuracy trends and independently validated chapter readiness.
- Guardrails: students feeling pressured, unexpected screen-time rise without study progress, accidental repeated rewards, invalid/duplicate events, advisor time, accessibility regressions and data loss.
- Keep/iterate/stop: retain only if qualitative response and meaningful action trends are encouraging without worse guardrails; disable rewards if they incentivise meaningless repetition or anxiety.

## Delivery responsibilities

| Owner | First deliverable | Validation |
|---|---|---|
| Product / Analytics Lead | Interview protocol, approved KPI definitions, consent and stop criteria | 5 observed journeys; weekly decision record |
| Full-stack Engineer | Instrument CTA/task/attempt events; implement server reward checks, unique event ledger, feature flag | Unit/integration tests, idempotency, rollback tested |
| Process / Systems Designer | Clean next-task ownership in ClickUp, advisor process, exception/runbook | 2 advisor shadow sessions, reduced manual steps |

## Technical honesty

The dashboard's interactive sample is browser-only: the lesson, questions, answers and 10 coins are fabricated. Clicking through does **not** produce a genuine verification record, and the static UI can be modified by any visitor. The SQL model illustrates the server-side verification/reward boundary but has not been executed against an Alcovia database. The KPI cards are a **separate fixed synthetic dataset** and deliberately do not change when the local demo is used.