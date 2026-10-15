// Pure metric definitions. All events are fictitious demonstration records.
export const inPeriod = (date, start, end) => date >= start && date <= end;
export const safeRate = (part, whole) => whole > 0 ? part / whole : null;
export const sum = (items, key) => items.reduce((t, item) => t + Number(typeof key === 'function' ? key(item) : item[key] || 0), 0);
export const money = n => '₹' + Math.round(n || 0).toLocaleString('en-IN');
export const percent = v => v === null || v === undefined ? '—' : (v * 100).toFixed(1) + '%';
export const median = values => {
  if(!values.length) return null;
  const xs = [...values].sort((a,b)=>a-b), i=Math.floor(xs.length/2);
  return xs.length % 2 ? xs[i] : (xs[i-1]+xs[i])/2;
};
export function cohortFunnel(leads) {
  const total = leads.length;
  const qualified = leads.filter(l=>l.qualified).length;
  const booked = leads.filter(l=>l.discoveryBooked).length;
  const showed = leads.filter(l=>l.discoveryShowed).length;
  const ambition = leads.filter(l=>l.ambitionCompleted).length;
  const architect = leads.filter(l=>l.architectCompleted).length;
  const converted = leads.filter(l=>l.paid).length;
  return {
    total, qualified, booked, showed, ambition, architect, converted,
    bookedShowRate:safeRate(showed,booked),
    qualifiedToPaid:safeRate(converted,qualified),
    leadToPaid:safeRate(converted,total),
    timeToPaid:median(leads.filter(l=>l.paid && l.paidOn).map(l=>(new Date(l.paidOn)-new Date(l.createdOn))/86400000))
  };
}
export function campaignsSummary(campaigns) {
  return campaigns.map(c=>({
    ...c, ctr:safeRate(c.clicks,c.impressions), cpl:safeRate(c.spend,c.leads),
    cpql:safeRate(c.spend,c.qualified), roas:safeRate(c.attributedRevenue,c.spend),
    // diagnostic flag, not an automatic spend decision
    action: c.frequency>=3.0 ? 'Review creative fatigue' : c.qualified===0 && c.spend>2000 ? 'Audit lead quality' : 'Monitor'
  }));
}
export function revenueSummary(payments, targets) {
  const paid = payments.filter(p=>p.status==='captured');
  const breakdown = {trial:0,full:0,workshop:0};
  paid.forEach(p=>{if(breakdown[p.product]!==undefined) breakdown[p.product]+=p.amount;});
  const achieved=Object.values(breakdown).reduce((a,b)=>a+b,0);
  const unpaid = sum(payments.filter(p=>p.status==='invoiced'), 'amount');
  const refunds = sum(payments.filter(p=>p.status==='refunded'), 'amount');
  return {achieved,target:targets,attainment:safeRate(achieved,targets),breakdown,unpaid,refunds};
}
export function cohortUsage(students) {
  const active = students.filter(s=>s.sessions>0);
  const focus = students.filter(s=>s.focusSessions>0);
  return {
    enrolled:students.length, active:active.length, activeRate:safeRate(active.length,students.length),
    focusAdoption:safeRate(focus.length, students.length),
    averageFocusMinutes:active.length ? sum(active,'focusMinutes')/active.length : null,
    syllabusReadiness:safeRate(sum(students, 'chaptersReady'),sum(students,'chaptersTarget')),
    taskCompletion:safeRate(sum(students,'tasksDone'),sum(students,'tasksAssigned')),
    weeklyQuizParticipation:safeRate(sum(students,'quizTaken'),sum(students,'quizOffered')),
    deliveryRate:safeRate(sum(students,'eventsDelivered'),sum(students,'eventsPlanned')),
    learnerRating:safeRate(sum(students,s=>s.ratingTotal),sum(students,'ratingCount')),
    lateStudents:students.filter(s=>s.overdueTasks>0).length
  };
}
export const scoreChapter = c => {
  // Demonstrative rubric, not a clinical or educational validation.
  if(c.mockAccuracy>=.80 && c.timedPaper && c.practiceAccuracy>=.70 && c.notes && c.read) return 5;
  if(c.practiceAccuracy>=.70 && c.notes && c.read) return 3;
  if(c.notes && c.read) return 2;
  if(c.read) return 1;
  return 0;
};

// Proposed candidate priority. Synthetic weekly aggregates are NOT production proof.
// Eligible is the full cohort roster (including students with zero engagement); no
// silent denominator shrinkage to app-openers. A "meaningful action" must satisfy
// a server-side event contract; the demo uses pre-aggregated illustrative counts.
export function weeklyLearningPulse(learners) {
  const eligible = learners.filter(s => s.eligible !== false);
  const engaged = eligible.filter(s => (s.weeklyActions || 0) > 0);
  const prevEligibleAndEngaged = eligible.filter(s => (s.previousWeekActions || 0) > 0);
  const returned = prevEligibleAndEngaged.filter(s => (s.weeklyActions || 0) > 0);
  const activeApp = eligible.filter(s => (s.activeDays || 0) > 0);
  const activeDays = sum(activeApp, 'activeDays');
  return {
    eligible: eligible.length,
    meaningfulLearners: engaged.length,
    meaningfulCoverage: safeRate(engaged.length, eligible.length),
    priorMeaningfulLearners: prevEligibleAndEngaged.length,
    returningMeaningfulLearners: returned.length,
    weekToWeekReturn: safeRate(returned.length, prevEligibleAndEngaged.length),
    totalMeaningfulActions: sum(engaged, 'weeklyActions'),
    actionsPerMeaningfulLearner: engaged.length ? sum(engaged, 'weeklyActions') / engaged.length : null,
    // diagnostic only, not a target nor a proxy for learning
    averageAppMinutesPerActiveDay: safeRate(sum(activeApp, 'weeklyAppMinutes'), activeDays)
  };
}


// Front-end SIMULATION of the user-selected Resume -> Practice -> Reward pilot.
// Only a trusted server can validate real attempts and issue actual rewards.
// The caller owns the in-memory set of already-rewarded event ids.
export const DEMO_PRACTICE_QUESTION_IDS = Object.freeze(['linear-1','linear-2','linear-3']);
export const DEMO_PRACTICE_OPTIONS = Object.freeze({'linear-1':['2','4','7'],'linear-2':['2','3','5'],'linear-3':['3','5','7']});
export const DEMO_PRACTICE_ANSWERS = Object.freeze({'linear-1':'4','linear-2':'3','linear-3':'3'});
export function evaluatePracticeAttempt(attempt, rewardedEventIds = new Set()) {
  const q = DEMO_PRACTICE_QUESTION_IDS;
  if (!attempt || attempt.taskId !== 'demo-linear-equations' ||
      typeof attempt.sourceEventId !== 'string' || !attempt.sourceEventId.startsWith('demo-') ||
      !attempt.answers || typeof attempt.answers !== 'object' ||
      q.some(id=>!DEMO_PRACTICE_OPTIONS[id].includes(String(attempt.answers[id]??'')))) {
    return {accepted:false,reason:'Complete all three practice answers first.',coins:0,correct:null};
  }
  if (rewardedEventIds.has(attempt.sourceEventId)) {
    return {accepted:true,reason:'Already counted: no duplicate reward.',coins:0,correct:q.filter(id=>String(attempt.answers[id])===DEMO_PRACTICE_ANSWERS[id]).length};
  }
  // Submission *evidence* is mandatory; accuracy is shown separately so low
  // scorers are not penalised. No real server attestation exists in this demo.
  return {accepted:true,reason:'Demo practice submission accepted.',coins:10,correct:q.filter(id=>String(attempt.answers[id])===DEMO_PRACTICE_ANSWERS[id]).length};
}