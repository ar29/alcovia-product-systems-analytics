# Alcovia student app — APK inspection and recorded UX evidence

**Date:** 15 October 2026  
**Sources:** Android APK and a separate **168.9-second student-app screen recording** supplied on 15 October 2026.  
**APK method:** Offline, static inspection of package contents and manifest. **No app was executed in an emulator here.** The separate video was visually reviewed and gives partial user-journey evidence; see [timestamped walkthrough](RECORDED_APP_WALKTHROUGH.md).

## Confirmed package details

| Property | Observed value |
| --- | --- |
| Android package | `com.alcovia.mobile` |
| App name | Alcovia |
| App version | 1.0.0 |
| Android versionCode | 30 |
| Expo SDK (bundled config) | 54.0.0 |
| Application framework | React Native / Expo, Hermes JavaScript engine |
| File size | approximately 121.3 MiB |
| SHA-256 | `efc25ace0696fa64ebd4a59f30b98892d4f804312f7e91746f4abf8f434d625d` |

The APK includes 3D model assets (`.glb`) and React Native/Expo libraries. Static text references in bundled code include `FocusTimerScreen`, `StudyPlannerScreen`, `useStudentTodos`, `useTaskCompletion`, `useSyllabusHistory`, `useFocusScoreHistory`, `useMyMonthlyProgress`, `useRoadmapCompletion`, `useStudentAdherenceBreakdown`, and `useFocusDnd`. These show code references, **not proof that the features are visible, connected, usable, or correctly implemented at runtime.**

The Android manifest declares, among other permissions, `PACKAGE_USAGE_STATS`, `QUERY_ALL_PACKAGES`, `SYSTEM_ALERT_WINDOW`, `ACCESS_NOTIFICATION_POLICY`, calendar, activity-recognition, and notification permissions. These may be relevant to Alcovia's proposed Focus Mode and phone restrictions. **They do not establish that other apps are actually blocked, that permission requests are granted, or that equivalent controls exist on iOS.** Certain entries may be inherited from libraries.

## What the static APK inspection alone can and cannot prove

| UX question | What static inspection establishes | What still needs an actual device run |
| --- | --- | --- |
| Can the student immediately identify their next planned task from Home? | The app bundle references todo/planner modules. | Home screen content and number of taps to the next advisor-approved task. |
| Does Realm link clearly back to a study activity? | The APK contains 3D assets and focus/game code. | Whether the Realm experience offers a clear next-step deep link back to learning. |
| How many steps to begin and complete practice? | Study, syllabus, task, and revision related code references are present. | Actual tap count, elapsed time, errors, and completion evidence along an entire journey. |
| Does Focus Timer record more than elapsed time? | Code includes a focus-score-history reference and a Focus Timer screen name. | Saved session result, task linkage, question/learning outcome and end-of-session UX. |
| Is verified practice different from marking a task complete? | Code references task completion. | Whether the app/backend validates evidence independently of the user's tap, and how it handles duplicate attempts. |
| Can a student understand academic progress without an advisor? | Code references syllabus history, monthly progress, roadmap completion and adherence. | Discoverability, clarity of score/readiness metrics, and ability to interpret progress without guidance. |

**Update following video review:** The static APK cannot establish runtime UX, but the subsequently supplied recording **partially answers** the six questions. It shows Home task/planning summaries without a specific next task in the visible area, Realm entry error/retry, a Study → Biology → chapter → worksheet path, Focus linked to a worksheet, distinct worksheet status and score fields, and discoverable academic metrics. **It does not** show a successful new practice submission, backend reward verification, a full completed Focus session, or actual student comprehension. The selected **Resume My Study Plan + evidence-backed practice reward** remains a product experiment, not an observed outcome. See [RECORDED_APP_WALKTHROUGH.md](RECORDED_APP_WALKTHROUGH.md).

## iOS TestFlight

The public invitation is https://testflight.apple.com/join/1CyZ3fdT . It resolves to the Alcovia beta invitation, but iOS TestFlight requires a compatible Apple device (or supported Apple testing environment). The Android APK cannot be used to test the iOS build, and no iOS runtime test has been carried out.

## Separately verified candidate dashboard

Public URL: https://alcovia-product-systems-analytics-a.vercel.app/

The production deployment is live. A separate browser-based check passed workspace switching, 7/30/90-day revenue filtering, advisor filtering, student drill-down and the simulated Resume → practice checkpoint → single demo reward flow. The figures are **synthetic**, and the browser-side practice validation is **not** a trusted production backend. These results are **not** evidence about the current Alcovia mobile app.

## Recommended next validation for questions not resolved by the recording

On a test Android phone or emulator, sign in using the credentials provided privately by Alcovia. Record the app version, date, initial Home screen, screen recording of the six journeys, tap count to begin and finish a study task, a completed focus session, and how task completion differs from practice submission. Avoid recording private student data; don't publish login credentials or test-account screenshots to GitHub. For iOS, repeat separately in TestFlight if a compatible Apple device is available.

The APK portion is static artefact analysis; the recording portion is direct visual observation of one captured session. Neither is a security certification, penetration test, representative UX study or proof of student adoption.