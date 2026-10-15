// Synthetic data generator. This is NOT Alcovia production data.
export const AS_OF = '2026-10-15';
const firstNames=['Aarav','Aditi','Advait','Aisha','Anaya','Arjun','Avni','Dev','Diya','Ishaan','Kabir','Kiara','Meera','Mihir','Naina','Neil','Rhea','Rohan','Sana','Vihaan'];
let seed=20261015;
function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
function int(a,b){return Math.floor(a+rand()*(b-a+1));}
function dateAgo(days){const d=new Date('2026-10-15T12:00:00Z');d.setUTCDate(d.getUTCDate()-days);return d.toISOString().slice(0,10);}
export const leads=Array.from({length:460},(_,i)=>{
  const age=int(0,89),createdOn=dateAgo(age);
  const campaign=['Meta / Parents / A','Meta / Teen / B','Meta / Workshop / C','Organic','Referral'][int(0,4)];
  const qualified=rand()<((campaign==='Organic'||campaign==='Referral')?.68:.43);
  const discoveryBooked=qualified&&rand()<.76;
  const discoveryShowed=discoveryBooked&&rand()<.71;
  const ambitionCompleted=discoveryShowed&&rand()<.65;
  const architectCompleted=ambitionCompleted&&rand()<.73;
  const paid=architectCompleted&&rand()<.39;
  const paidDate=new Date(createdOn+'T12:00:00Z'); paidDate.setUTCDate(paidDate.getUTCDate()+int(2,14));
  const paidOn=paid && paidDate<=new Date(AS_OF+'T23:59:59Z')?paidDate.toISOString().slice(0,10):null;
  return {id:'L'+String(i+1).padStart(4,'0'),createdOn,campaign,qualified,discoveryBooked,discoveryShowed,ambitionCompleted,architectCompleted,paid:Boolean(paidOn),paidOn,source:campaign==='Organic'?'organic':campaign==='Referral'?'referral':'paid'};
});
export const campaigns=[
 {name:'Meta / Parents / A',type:'Programme',impressions:124000,clicks:3560,spend:89200,leads:184,qualified:84,frequency:2.7,attributedRevenue:320000,landingDrop:.51,loadMs:2450},
 {name:'Meta / Teen / B',type:'Programme',impressions:93000,clicks:1990,spend:73300,leads:112,qualified:34,frequency:3.4,attributedRevenue:104000,landingDrop:.68,loadMs:4100},
 {name:'Meta / Workshop / C',type:'Workshop',impressions:80000,clicks:3250,spend:35800,leads:101,qualified:51,frequency:2.1,attributedRevenue:156000,landingDrop:.41,loadMs:1900}
];
export const payments=Array.from({length:120},(_,i)=>{
  const product=['trial','full','workshop'][int(0,2)];
  const amount=product==='trial'?34999:product==='full'?129999:3999;
  const r=rand();
  return {id:'INV-'+(i+1001),date:dateAgo(int(0,89)),product,amount,status:r<.66?'captured':r<.87?'invoiced':'refunded'};
});
export const renewals=Array.from({length:10},(_,i)=>({student:'Student '+String(i+1).padStart(2,'0'),due:dateAgo(-int(1,35)),value:129999,owner:['Advisor A','Advisor B'][i%2]}));
export const students=firstNames.map((name,i)=>{
  const sessions=i<7?0:int(1,12),focusSessions=sessions?int(0,sessions):0;
  const tasksAssigned=int(12,28),tasksDone=int(3,tasksAssigned),chaptersTarget=int(9,21);
  const eventsPlanned=int(2,6),eventsDelivered=int(0,eventsPlanned);
  const ratingCount=eventsDelivered?int(0,eventsDelivered):0;
  const weeklyActions = ((i>=7 && i<=14) || i>=18) ? int(1,4) : 0;
  const previousWeekActions = (i>=7 && i<=18) ? int(1,4) : 0;
  const weeklyAppMinutes = sessions ? int(20,160) : 0;
  return {id:'ALC'+String(i+1).padStart(3,'0'),name: name+' (demo)',grade:int(8,12),eligible:true,sessions,activeDays:sessions?int(1,5):0,weeklyActions,previousWeekActions,weeklyAppMinutes,focusSessions,focusMinutes:focusSessions*int(12,36),tasksAssigned,tasksDone,overdueTasks:int(0,5),chaptersTarget,chaptersReady:int(0,chaptersTarget),quizOffered:14,quizTaken:int(0,14),eventsPlanned,eventsDelivered,ratingCount,ratingTotal:ratingCount*(3+rand()*2),advisor:i%2?'Advisor A':'Advisor B'};
});
export const hypotheses=[
 {id:'H1',problem:'Focus use drops after first trial',evidence:'11 opened Focus; only 5 use regularly (brief)',test:'5 student interviews + 7-day first-focus cohort; instrument focus-start and completion',decision:'Prototype an easier resume flow only if the barrier is supported',owner:'Product lead'},
 {id:'H2',problem:'Realm is active but study is not',evidence:'13 used Realm; 1 used syllabus this week (brief)',test:'Observe 5 Realm sessions and map next meaningful study action',decision:'Test an optional Realm-to-study prompt against a no-prompt baseline',owner:'Product lead'},
 {id:'H3',problem:'Advisor updates are manual',evidence:'Progress written across documents and ClickUp (brief)',test:'Shadow 2 advisor reviews; measure time and missing fields',decision:'Automate only the top recurring record-keeping steps',owner:'Systems designer'}
];