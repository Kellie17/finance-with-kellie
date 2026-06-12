"use strict";
/* ================= PRIME CARE ================= */
const PC = {
  cancer:[5000,10000,15000], death:[1000,2000,3000], rb:[80,150,250], icu:[160,300,500],
  surg:{cx:[1600,3000,5000], mj:[800,1500,2500], it:[400,750,1250], mn:[160,300,500]},
  ann:[16000,30000,50000], life:[80000,150000,250000], addAnn:[10000,15000,20000], addLife:[50000,75000,100000]
};
function rPc(){
  const s=S.pc, i=s.plan-1;
  const tl = ageline({a0:s.age, a1:86,
    segs:[{from:s.age,to:85,label:tr('Renewable to age 85','续保至85岁'),color:C.good,lane:1}],
    markers:[
      {age:65,label:tr('last entry band','最后投保年龄段'),color:C.warn},
      {age:85,label:tr('last renewal','最后续保'),color:C.primaryDark},
      {age:86,label:tr('ends','终止'),color:C.primaryDark}
    ],
    payTo:85, payLabel:tr('yearly age-banded premiums','按年龄段年缴保费')});
  return head('HSBC Life Prime Care '+tr('Plan','计划')+' '+s.plan,
      tr('Hospital cash and surgical plan that pays on top of your medical insurance','住院现金及手术计划，在医疗保险之外另行给付'),
      tr('Cash benefits','现金给付'),'','pc')
    +`<div class="controls">${segBtns('pc','plan',[{v:1,t:'Plan 1'},{v:2,t:'Plan 2'},{v:3,t:'Plan 3'}])}
      ${ctrlNum('pc','age',tr('Entry age','投保年龄'),1,1,65)}</div>`
    +`<div class="tl-wrap">${tl}</div>
    ${timelineNotes([
      tr('Yearly renewal is available to age 85','每年可续保至85岁'),
      tr('No-claim discount can step from 10% to 30%','无理赔折扣可由10%递增至30%')
    ])}`
    +`<table class="sched"><tr><th>${tr('Benefit','保障项目')}</th><th>Plan 1</th><th>Plan 2</th><th>Plan 3</th></tr>
      ${[['cancer',tr('First major cancer diagnosis (lump sum, once)','首次确诊重大癌症（一次性给付）'),PC.cancer],
         ['rb',tr('Daily room & board (max 90 days/condition)','每日住院津贴（每病况最多90天）'),PC.rb],
         ['icu',tr('Daily ICU (max 45 days/condition)','每日重症监护（每病况最多45天）'),PC.icu],
         ['cx',tr('Surgical - complex','手术 - 复杂'),PC.surg.cx],
         ['mj',tr('Surgical - major','手术 - 大型'),PC.surg.mj],
         ['ann',tr('Annual in-patient limit','住院年度限额'),PC.ann],
         ['life',tr('Lifetime in-patient limit','住院终身限额'),PC.life],
         ['addAnn',tr('Dialysis / cancer treatment / transplant (each, annual)','透析/癌症治疗/器官移植（每项年度）'),PC.addAnn],
         ['death',tr('Death benefit','身故给付'),PC.death]]
        .map(rw=>`<tr class="${false?'hl':''}"><td>${rw[1]}</td>${rw[2].map((v,j)=>`<td style="${j===i?'background:#eef7ef;font-weight:700':''}">${fmt(v)}</td>`).join('')}</tr>`).join('')}
    </table>
    <div style="margin-top:10px;">
      <span class="ok-chip">${tr('No-claim discount: 10% after 1 year, 20% after 2, 30% after 3+','无理赔折扣：1年10%，2年20%，3年及以上30%')}</span>
      <span class="note-chip">${tr('90-day waiting period for the cancer benefit','癌症给付设90天等待期')}</span>
      <span class="note-chip">${tr('Reimbursement items coordinate with Shield/other policies','报销项目与健保计划及其他保单协调，不超过实际费用')}</span>
    </div>
    <details class="rules"><summary>${tr('Sample premiums (Plan 3, male, incl GST)','保费示例（计划3，男性，含消费税）')}</summary>
      <p>${tr('Up to 18: S$219.61 - 31-35: S$362.51 - 61-65: S$1,013.83 - 84-85 (renewal only): S$3,560.44 per year. Bands 66 and above are renewal only. Source: PS Dec 2025 s3.','18岁以下：219.61 - 31至35岁：362.51 - 61至65岁：1,013.83 - 84至85岁（仅续保）：3,560.44新元/年。66岁及以上年龄段仅限续保。来源：2025年12月产品摘要第3节。')}</p>
    </details>`;
}
