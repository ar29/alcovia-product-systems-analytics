import test from 'node:test';import assert from 'node:assert/strict';
import {safeRate,median,cohortFunnel,revenueSummary,cohortUsage,scoreChapter,weeklyLearningPulse,evaluatePracticeAttempt} from '../app/metrics.js';
test('zero denominator returns missing not 0%',()=>assert.equal(safeRate(5,0),null));
test('median stable',()=>{assert.equal(median([3,1,4,2]),2.5);assert.equal(median([]),null)});
test('funnel uses correct stage denominator',()=>{
 const f=cohortFunnel([{createdOn:'2026-10-01',qualified:true,discoveryBooked:true,discoveryShowed:false,ambitionCompleted:false,architectCompleted:false,paid:false},{createdOn:'2026-10-02',qualified:true,discoveryBooked:true,discoveryShowed:true,ambitionCompleted:true,architectCompleted:true,paid:true,paidOn:'2026-10-05'}]);
 assert.equal(f.bookedShowRate,.5);assert.equal(f.qualifiedToPaid,.5);assert.equal(f.converted,1);
});
test('invoices and refunds not included in paid revenue',()=>{const x=revenueSummary([{product:'trial',amount:100,status:'captured'},{product:'full',amount:1000,status:'invoiced'},{product:'workshop',amount:20,status:'refunded'}],500);assert.equal(x.achieved,100);assert.equal(x.unpaid,1000);assert.equal(x.refunds,20)});
test('student rates ignore false precision',()=>{const x=cohortUsage([{sessions:1,focusSessions:0,focusMinutes:0,tasksDone:3,tasksAssigned:4,chaptersReady:1,chaptersTarget:2,quizTaken:2,quizOffered:4,eventsDelivered:0,eventsPlanned:0,ratingTotal:0,ratingCount:0,overdueTasks:1}]);assert.equal(x.taskCompletion,.75);assert.equal(x.learnerRating,null)});
test('chapter rubric enforces practice 70 and mock 80',()=>{assert.equal(scoreChapter({read:true,notes:true,practiceAccuracy:.7,mockAccuracy:.8,timedPaper:true}),5);assert.equal(scoreChapter({read:true,notes:true,practiceAccuracy:.69,mockAccuracy:.99,timedPaper:true}),2)});

test('weekly coverage uses ALL eligible students, including silent learners',()=>{
  const x=weeklyLearningPulse([
    {eligible:true,weeklyActions:2,previousWeekActions:1,activeDays:1,weeklyAppMinutes:11},
    {eligible:true,weeklyActions:0,previousWeekActions:1,activeDays:0,weeklyAppMinutes:0},
    {eligible:true,weeklyActions:0,previousWeekActions:0,activeDays:0,weeklyAppMinutes:0},
    {eligible:false,weeklyActions:5,previousWeekActions:5,activeDays:2,weeklyAppMinutes:88}
  ]);
  assert.equal(x.eligible,3);assert.equal(x.meaningfulLearners,1);
  assert.equal(x.meaningfulCoverage,1/3);assert.equal(x.weekToWeekReturn,.5);
  assert.equal(x.totalMeaningfulActions,2);assert.equal(x.averageAppMinutesPerActiveDay,11);
});
test('weekly return with no eligible prior learner is unknown, not zero',()=>{
 const x=weeklyLearningPulse([{eligible:true,weeklyActions:1,previousWeekActions:0}]);
 assert.equal(x.weekToWeekReturn,null);assert.equal(x.meaningfulCoverage,1);
});
test('weekly return can not exceed its eligible previous-week denominator',()=>{
 const x=weeklyLearningPulse([
  {eligible:true,weeklyActions:5,previousWeekActions:0},
  {eligible:true,weeklyActions:1,previousWeekActions:1},
  {eligible:false,weeklyActions:3,previousWeekActions:2}
 ]);
 assert.equal(x.returningMeaningfulLearners,1);
 assert.equal(x.priorMeaningfulLearners,1);
 assert.equal(x.weekToWeekReturn,1);
});

test('resume without submitted practice is not accepted or rewarded',()=>{
  const result=evaluatePracticeAttempt({taskId:'demo-linear-equations',sourceEventId:'demo-only',answers:{} });
  assert.equal(result.accepted,false);assert.equal(result.coins,0);
});
test('an evidenced completed attempt grants a demo reward even when answers are incorrect',()=>{
 const r=evaluatePracticeAttempt({taskId:'demo-linear-equations',sourceEventId:'demo-first',answers:{'linear-1':'2','linear-2':'2','linear-3':'7'}});
 assert.equal(r.accepted,true);assert.equal(r.correct,0);assert.equal(r.coins,10);
});
test('same accepted attempt cannot earn a second reward',()=>{
 const attempt={taskId:'demo-linear-equations',sourceEventId:'demo-first',answers:{'linear-1':'4','linear-2':'3','linear-3':'3'}};
 const set=new Set();const first=evaluatePracticeAttempt(attempt,set);
 assert.equal(first.coins,10);set.add(attempt.sourceEventId);
 const replay=evaluatePracticeAttempt(attempt,set);
 assert.equal(replay.coins,0);assert.equal(replay.accepted,true);
});
test('other task IDs or invalid source IDs do not earn rewards',()=>{
 const a={'linear-1':'4','linear-2':'3','linear-3':'3'};
 assert.equal(evaluatePracticeAttempt({taskId:'realm',sourceEventId:'demo-other',answers:a}).accepted,false);
 assert.equal(evaluatePracticeAttempt({taskId:'demo-linear-equations',sourceEventId:'forged-event',answers:a}).accepted,false);
});

test('submitted answer must belong to the respective question choices',()=>{
 const r=evaluatePracticeAttempt({taskId:'demo-linear-equations',sourceEventId:'demo-other',answers:{'linear-1':'5','linear-2':'3','linear-3':'3'}});
 assert.equal(r.accepted,false);assert.equal(r.coins,0);
});