# Alcovia student app — recording-based UX walkthrough

**Reviewed:** User-supplied `abc.webm` on 15 October 2026 (168.9 seconds, portrait 1080 × 2400). The test account is already signed in. **This is a review of a screen recording, not an app session controlled by the reviewer.** The exact device/build used for this recording was not independently confirmed. Screenshots and credentials are intentionally excluded.

## Six requested UX checks

| Question | Observed in recording | Conclusion / limit |
| --- | --- | --- |
| Next planned study task immediately identifiable from Home? | ~55–85s: Home includes **4 tasks to go**, Daily Velocity and a Study Planner summary (59h estimated, 0h completed, 260h available), but the inspected portion does not name a specific next assignment. | **Partially observed:** no obvious direct **Resume My Study Plan** action was visible on the inspected Home view; not a full audit of every Home element. |
| Does Realm provide a clear route to studying? | ~0–15s: Realm map and buttons for Sanctuary, Quests and Power Rankings. ~15–22s: **“Couldn't enter the Realm. Please try again.”** Retry shows **“Entering the Realm...”** until the user leaves around ~55s. A back arrow is visible. | **Reliability issue reproduced once.** No direct study CTA was visible in this state, but the post-game transition is unknown because entry didn't complete. |
| Steps to start and complete practice? | ~85–110s: Home → Study tab → Biology → chapter (“Organisation of the organism”) → worksheet area → Start Focus Timer. Worksheet includes **Add Attempt** and status controls. | **Partial path recorded**, with several navigations and scrolling. The video never submits a new practice answer, so full end-to-end completion and tap count remain untested. |
| Does Focus Timer record more than elapsed time? | ~110–143s: Focus Mode is labelled **“Worksheets #1”**; 25-minute timer, egg animation, Do Not Disturb prompt, session-active warning and **Give Up (-50 coins)** confirmation appear. Choosing Give Up leads to **Session Failed**. | **Worksheet linkage visible**, but no assessed learning outcome from this session. The failure followed a deliberate Give Up action; **do not call it an app crash**. Review punitive exit UX for teens and legitimate interruptions. |
| Is verified practice different from marking Done? | ~102–148s: worksheet status choices (Not Yet / Have Started / In Progress / Almost Done / Done) are separate from a **Scores** panel showing an existing **50/50** worksheet score. | **Separate UI concepts observed**; recording does not establish how scores were submitted, how Done is validated, or whether duplicates are rejected. |
| Can a student see academic progress without an advisor? | ~85–105s, 149–159s: Academics shows subject percentages, Biology **5/22 chapters completed, 28% progress**, and chapter-level progress. Home shows Attendance and Syllabus summaries. | **Progress metrics are discoverable** without an advisor appearing. Whether students understand those metrics and can act on them remains untested. |

## Product implications, with evidence limits

1. Prioritise diagnosing Realm entry/retry reliability before adding more game-driven engagement. One recorded error does not establish a widespread failure rate.
2. Test a direct **Resume My Study Plan** entry point linking an advisor-approved next task to a real practice action. The video supports a *discoverability hypothesis*, not a proven retention effect.
3. Verify completed practice server-side before rewards. Existing worksheet statuses and a stored score are visible, but backend verification was not tested.
4. Review Focus Mode's **50-coin Give Up penalty** as a possible wellbeing/accessibility problem for teenagers. This is a design risk to research, not a finding that real students are harmed.
5. Test whether subject percentages actually help students choose their next action, instead of only displaying progress.

## Next validation

On an authorised test device: reproduce Realm failure with network/build context; submit a real worksheet attempt, then try marking it Done without evidence; finish an uninterrupted Focus session and inspect resulting records; ask consenting students whether they can identify and understand their next task. Record tap counts, timestamps and relevant outcomes before claiming improvements.

**Evidence boundaries:** This recording does not validate an A/B test, a production outage, backend reward verification, a full practice completion journey or student comprehension. The publicly deployed dashboard at https://alcovia-product-systems-analytics-a.vercel.app/ is an independent **synthetic** demonstration and is not the current Alcovia mobile app. The Android APK static inspection is also separate.
