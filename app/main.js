import {AS_OF,leads,campaigns,payments,renewals,students,hypotheses} from './demo-data.js';
import {inPeriod,money,percent,safeRate,sum,cohortFunnel,campaignsSummary,revenueSummary,cohortUsage,weeklyLearningPulse,evaluatePracticeAttempt,DEMO_PRACTICE_QUESTION_IDS} from './metrics.js';
const $=id=>document.getElementById(id);
const end=AS_OF;
let days=30,tab='gtm',advisor='all';
const start=()=>{const d=new Date(end+'T12:00:00Z');d.setUTCDate(d.getUTCDate()-(days-1));return d.toISOString().slice(0,10)};
const filter=(xs,key='date')=>xs.filter(x=>inPeriod(x[key],start(),end));
function metric(label,value,foot){return `<div class="metric"><div class="metric-label">${label}</div><div class="metric-value">${value}</div><div class="metric-foot">${foot}</div></div>`}
const bar=(label,value,total,color='',suffix='')=>`<div class="bar-group"><div class="bar-line"><span>${label}</span><b>${suffix||percent(safeRate(value,total))}</b></div><div class="track"><div class="fill ${color}" style="width:${Math.max(0,Math.min(100,100*value/(total||1)))}%"></div></div></div>`;
function renderGTM(){
 const ps=filter(payments);const target=days===7?300000:days===30?1200000:3600000;
 const r=revenueSummary(ps,target);
 const ls=filter(leads,'createdOn');const f=cohortFunnel(ls);
 const cps=campaignsSummary(campaigns.map(c=>{const cohortLeads=ls.filter(l=>l.campaign===c.name);const ratio=days/90;return {...c,spend:Math.round(c.spend*ratio),impressions:Math.round(c.impressions*ratio),clicks:Math.round(c.clicks*ratio),leads:cohortLeads.length,qualified:cohortLeads.filter(l=>l.qualified).length,attributedRevenue:Math.round(c.attributedRevenue*ratio)};}));
 $('windowTag').textContent=`${start()} — ${end}`;
 $('revenueKpis').innerHTML=metric('Captured revenue',money(r.achieved),'Workshop + trial + full programme')+metric('Target attainment',percent(r.attainment),`Illustrative target ${money(r.target)}`)+metric('Unpaid invoices',money(r.unpaid),'Issued but not captured')+metric('New lead cohort',f.total,'By lead creation date');
 const mix=[['3-month trial',r.breakdown.trial,'#83bca1'],['Full programme',r.breakdown.full,'#247e60'],['Workshops · ₹3,999/seat',r.breakdown.workshop,'#c6dac7']];
 $('revenueMix').innerHTML=`<div class="split-bar">${mix.map((m)=>`<span style="width:${r.achieved?m[1]/r.achieved*100:0}%;background:${m[2]}"></span>`).join('')}</div>`+mix.map(m=>`<div class="legend-row"><span><i class="swatch" style="background:${m[2]}"></i>${m[0]}</span><strong>${money(m[1])}</strong></div>`).join('')+`<p class="small-note">Workshop unit price comes from the brief; other prices and all transactions are dummy data.</p>`;
 $('collections').innerHTML=`<div class="stat-line"><span>Invoice value awaiting payment</span><b>${money(r.unpaid)}</b></div><div class="stat-line"><span>Refunded amount (separate)</span><b>${money(r.refunds)}</b></div><div class="mini-heading">UPCOMING RENEWALS · DEMO</div>`+renewals.slice(0,3).map(x=>`<div class="renewal"><span class="date">${x.due.slice(5)}</span><span>${x.student}</span><b>${x.owner}</b></div>`).join('')+`<p class="small-note">In production, automate the owner reminder; do not count renewals until payment is captured.</p>`;
 const stages=[['Leads',f.total],['Qualified',f.qualified],['Discovery booked',f.booked],['Discovery attended',f.showed],['Teen ambition interview',f.ambition],['Architect session',f.architect],['Paid enrolment',f.converted]];
 $('funnelSub').textContent=`${f.total} new leads`;
 $('funnel').innerHTML=stages.map(([label,value],i)=>`<div class="funnel-row"><span class="stage">${label}</span><div class="track"><div class="fill ${i>4?'light':i>2?'alt':''}" style="width:${100*value/(f.total||1)}%"></div></div><strong>${value}</strong></div>`).join('')+`<p class="small-note">Conversion estimates are provisional for recent leads; compare equal-maturity cohorts in a production dashboard.</p>`;
 $('funnelInsights').innerHTML=`<div class="diagnostic"><small>DISCOVERY SHOW-UP RATE</small><strong>${percent(f.bookedShowRate)}</strong><p>Attended / booked, among these leads. Check reminders and scheduling friction before changing scripts.</p></div><div class="diagnostic"><small>QUALIFIED → PAID</small><strong>${percent(f.qualifiedToPaid)}</strong><p>Paid conversions / qualified leads. Don't treat students who have not matured through the funnel as lost.</p></div><div class="diagnostic"><small>MEDIAN DAYS TO PAYMENT</small><strong>${f.timeToPaid===null?'—':f.timeToPaid.toFixed(1)+' days'}</strong><p>From lead creation to payment, paid-only selection bias. Use cohort follow-up time in RCA.</p></div>`;
 const ct=$('campaignType').value;
 $('campaignTable').innerHTML=cps.filter(c=>ct==='all'||ct===c.type).map(c=>`<tr><td><b>${c.name}</b><br><span class="small-note">${c.type}</span></td><td>${percent(c.ctr)}</td><td>${c.cpql===null?'—':money(c.cpql)}</td><td>${c.frequency.toFixed(1)}</td><td>${percent(c.landingDrop)}</td><td>${c.roas===null?'—':c.roas.toFixed(2)+'x'}</td><td><span class="${c.action==='Monitor'?'table-ok':'table-flag'}">${c.action}</span></td></tr>`).join('');
}
function renderStudents(){
 let cohort=students.filter(s=>advisor==='all'||advisor===s.advisor);const u=cohortUsage(cohort);const w=weeklyLearningPulse(cohort);
 $('studentKpis').innerHTML=metric('Meaningful weekly coverage',percent(w.meaningfulCoverage),`${w.meaningfulLearners} of ${w.eligible} eligible students · demo`)+metric('Week-on-week return',percent(w.weekToWeekReturn),`${w.returningMeaningfulLearners} of ${w.priorMeaningfulLearners} prior-week meaningful learners`)+metric('Meaningful actions',w.totalMeaningfulActions,`${w.actionsPerMeaningfulLearner===null?'—':w.actionsPerMeaningfulLearner.toFixed(1)} per participating learner`)+metric('Task completion',percent(u.taskCompletion),'Done / assigned · separate outcome lens');
 $('learningBridge').innerHTML=`<div class="priority-head"><span class="priority-tag">CANDIDATE-CHOSEN DIRECTION</span><h3>Return for progress, not simply for screen time</h3><p>The goal is more eligible students completing a purposeful learning action this week and returning to do so the next week. Completion still needs independent checks for understanding.</p></div><div class="columns two"><div class="bridge-bar">${bar('Eligible roster',w.eligible,w.eligible,'',`${w.eligible} students`)}${bar('Opened the app',u.active,w.eligible,'light',`${u.active} / ${w.eligible}`)}${bar('Meaningful learning action',w.meaningfulLearners,w.eligible,'',`${w.meaningfulLearners} / ${w.eligible}`)}</div><div class="bridge-note"><b>Screen time is a diagnostic, not the north star</b><p>Illustrative app minutes per active day: <strong>${w.averageAppMinutesPerActiveDay===null?'—':w.averageAppMinutesPerActiveDay.toFixed(1)+' min'}</strong>. Alcovia's 30-minute aspiration should be tested against learning value, not treated as an unconditional KPI.</p><p>Guardrails: verified understanding, student-reported burden, advisor effort, and event-data completeness.</p></div></div><p class="small-note">Demo week: 9–15 Oct 2026 vs prior 2–8 Oct. Student numbers and weekly events are entirely synthetic. Brief-provided 20-user/Realm/Focus aggregates appear separately below.</p>`;
 $('outcomeLenses').innerHTML=`<div class="lens"><b>QUANTITY</b><p>Events delivered: <strong>${sum(cohort,'eventsDelivered')}</strong> / ${sum(cohort,'eventsPlanned')} scheduled (${percent(u.deliveryRate)}). Owner confirms occurrence.</p></div><div class="lens"><b>QUALITY</b><p>Average optional post-session feedback: <strong>${u.learnerRating===null?'—':u.learnerRating.toFixed(1)}/5</strong>, from ${sum(cohort,'ratingCount')} responses. Display non-response separately.</p></div><div class="lens"><b>PERFORMANCE</b><p>Chapters ready: <strong>${sum(cohort,'chaptersReady')}</strong> / ${sum(cohort,'chaptersTarget')} planned; <strong>${u.lateStudents}</strong> students have overdue tasks.</p></div><div class="lens"><b>ENGAGEMENT</b><p>Focus tool adoption: <strong>${percent(u.focusAdoption)}</strong>. Weekly learning coverage: <strong>${percent(w.meaningfulCoverage)}</strong>. Neither by itself proves learning outcomes.</p></div>`;
 const flagged=cohort.filter(s=>s.overdueTasks>=3).sort((a,b)=>b.overdueTasks-a.overdueTasks);
 $('advisorQueue').innerHTML=(flagged.slice(0,6).map(s=>`<div class="queue-row"><span><strong>${s.name}</strong><br><span class="small-note">${s.advisor} · Grade ${s.grade}</span></span><span class="risk">${s.overdueTasks} overdue</span></div>`).join('')||'<p class="small-note">No students meet this demo flag.</p>')+`<p class="small-note">A flag initiates a supportive review, never an automated penalty.</p>`;
 const select=$('studentSelect'),old=select.value;
 select.innerHTML=cohort.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
 select.value=cohort.some(s=>s.id===old)?old:cohort[0]?.id;
 renderStudentDetail(cohort.find(s=>s.id===select.value));
}
function renderStudentDetail(s){
 if(!s){$('studentDetail').innerHTML='<p>No students.</p>';return;}
 $('studentDetail').innerHTML=`<div class="student-head"><div><div class="student-name">${s.name}</div><div class="student-meta">Grade ${s.grade} · ${s.advisor} · ID ${s.id}</div></div><span>Demo only</span></div><div class="student-bars">${bar('Tasks completed',s.tasksDone,s.tasksAssigned,'',`${s.tasksDone} / ${s.tasksAssigned}`)}${bar('Ready chapters',s.chaptersReady,s.chaptersTarget,'alt',`${s.chaptersReady} / ${s.chaptersTarget}`)}${bar('Quiz participation',s.quizTaken,s.quizOffered,'light',`${s.quizTaken} / ${s.quizOffered}`)}${bar('Delivered sessions',s.eventsDelivered,s.eventsPlanned,'',`${s.eventsDelivered} / ${s.eventsPlanned}`)}</div><p class="small-note">Meaningful actions this week: ${s.weeklyActions}; previous week: ${s.previousWeekActions}. Focus minutes: ${s.focusMinutes}. These are fabricated demonstration events; academic understanding needs independent assessments.</p>`;
}
function renderDelivery(){
 const phases=[['01','Frame','Week 1','Interview 5 students and 2 advisors; document workflow bottlenecks; baseline events','Product lead'],['02','Instrument','Weeks 2–3','Define source-of-truth tables and events; audit ClickUp/Razorpay mapping; ship read-only telemetry','Engineer + designer'],['03','Pilot','Weeks 4–6','Pilot advisor dashboard with 5 students and a focused study-flow improvement','All three'],['04','Decide & scale','Weeks 7–10','Review retention, time saved and data completeness; kill weak ideas; roll out only proven changes','Product lead']];
 $('deliverySteps').innerHTML=phases.map(x=>`<article class="step"><small>${x[0]} / ${x[2]}</small><h3>${x[1]}</h3><p>${x[3]}</p><p><b>Accountable:</b> ${x[4]}</p></article>`).join('');
 $('hypotheses').innerHTML=hypotheses.map(h=>`<article class="hyp-card"><div class="hyp-id">${h.id}</div><div><h3>${h.problem}</h3><p>Brief evidence: ${h.evidence}</p></div><div><p class="hyp-test"><b>First test:</b> ${h.test}</p><p><b>Conditional decision:</b> ${h.decision}</p></div></article>`).join('');
}
function navigate(next){tab=next;document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.tab===next));document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===next));document.querySelector('.top-actions').style.display=next==='gtm'?'flex':'none';const titles={gtm:['GTM & Revenue','One operating view for acquisition, conversion and collections.'],students:['Student Outcomes','Meaningful learning progress, not just screen time.'],delivery:['Delivery System','A repeatable way to prioritise, ship and learn with a team of three.']};$('pageTitle').textContent=titles[next][0];$('pageSubtitle').textContent=titles[next][1];}
document.querySelectorAll('.nav').forEach(n=>n.addEventListener('click',()=>navigate(n.dataset.tab)));
// Candidate-selected UX path: a visible next action + a reward only after
// simulated practice evidence submission. This state exists only in this tab.
let pilotOpened=false, pilotRewarded=false;
const demoAwardedEventIds = new Set();
const pilotEventId='demo-linear-equations-first-attempt';
$('resumePlan').addEventListener('click',()=>{
 pilotOpened=true;
 $('pilotPracticeForm').hidden=false;
 $('pilotWorkflow').innerHTML='<strong>Study plan resumed</strong><p>Next: complete the three practice questions below. <b>0 coins earned so far.</b></p><small>Opening or focusing a task does not qualify as learning evidence.</small>';
 $('resumePlan').textContent='Practice checkpoint open';
 $('resumePlan').disabled=true;
});
$('pilotPracticeForm').addEventListener('submit',event=>{
 event.preventDefault();
 if(!pilotOpened)return;
 const form=new FormData(event.currentTarget);
 const answers=Object.fromEntries(DEMO_PRACTICE_QUESTION_IDS.map(id=>[id,form.get(id)]));
 const result=evaluatePracticeAttempt({taskId:'demo-linear-equations',sourceEventId:pilotEventId,answers},demoAwardedEventIds);
 if(!result.accepted){
   $('pilotWorkflow').innerHTML='<strong>Submission incomplete</strong><p>Answer all three practice questions first. No reward has been issued.</p>';
   return;
 }
 if(result.coins>0){demoAwardedEventIds.add(pilotEventId);pilotRewarded=true;}
 $('pilotWorkflow').innerHTML=`<strong>${result.coins>0?'Practice recorded (demo)':'Attempt already recorded'}</strong><p>${result.correct}/3 correct · <b>${result.coins>0?'+10 demo coins':'No additional coins'}</b>.</p><small>Practice attempt accepted in this local simulation. This does not establish chapter mastery, and no real coins or analytics events were sent.</small>`;
 $('practiceSubmit').disabled=true;
 $('practiceSubmit').textContent='Practice submitted';
});
$('pilotReset').addEventListener('click',()=>{
 // UI reset intentionally does not reset the in-session grant ledger.
 $('pilotPracticeForm').reset();
 $('practiceSubmit').disabled=false;
 $('practiceSubmit').textContent='Submit practice evidence';
 $('pilotWorkflow').innerHTML='<strong>Practice answers cleared</strong><p>Your example answers have been reset. Any accepted attempt stays recorded for this session; duplicate evidence never issues another reward.</p>';
});

$('dateRange').addEventListener('change',e=>{days=Number(e.target.value);renderGTM()});
$('campaignType').addEventListener('change',renderGTM);
$('advisorSelect').addEventListener('change',e=>{advisor=e.target.value;renderStudents()});
$('studentSelect').addEventListener('change',e=>renderStudentDetail(students.find(s=>s.id===e.target.value)));
$('methodButton').addEventListener('click',()=>$('methodDialog').showModal());
$('closeMethod').addEventListener('click',()=>$('methodDialog').close());
renderGTM();renderStudents();renderDelivery();navigate('students');