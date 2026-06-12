"use strict";
/* ================= SHIELD ================= */
const SHIELD_PREM = {  /* age: [MediShield Life, private portion, AWL] - premium tables 1 Apr 2026, incl 9% GST */
  A:{30:[295,300,300],40:[503,510,300],50:[637,1215,600],60:[903,2426,600],70:[1326,4200.70,600]},
  B:{30:[295,100.70,300],40:[503,169.60,300],50:[637,365.50,600],60:[903,548.20,600],70:[1326,1061.20,600]}
};
function rShield(){
  const s=S.shield, p=s.plan, pr=SHIELD_PREM[p][s.age], cash=Math.max(0, pr[1]-pr[2]);
  const ded = s.age>=81 ? 5250 : 3500;
  const tl = ageline({a0:1, a1:100,
    segs:[
      {from:1,to:100,label:tr('Renewable for life','终身续保'),color:C.good,lane:1},
      {from:1,to:75,label:tr('New entry window','可投保窗口'),color:C.axis,lane:2,dash:1}
    ],
    markers:[
      {age:41,label:tr('AWL S$600','医保额度600'),color:C.warn},
      {age:71,label:tr('AWL S$900','医保额度900'),color:C.warn},
      {age:76,label:tr('renewal only','仅限续保'),color:C.primaryDark},
      {age:81,label:tr('deductible up','自付额上调'),color:C.primaryDark}
    ],
    payTo:100, payLabel:tr('yearly age-banded premiums','按年龄段年缴保费')});
  const proration = p==='B' ? tr('Private hospital claims pro-rated to 50% on Plan B','B计划在私立医院按50%比例赔付') : tr('Full cover in private hospital on Plan A','A计划私立医院全额保障');
  return head('HSBC Life Shield '+tr('Plan','计划')+' '+p,
      tr('MediSave-approved Integrated Shield Plan on top of MediShield Life','公积金认可的综合健保双全计划，叠加于终身健保之上'),
      p==='A'?tr('Private hospital','私立医院'):tr('Public A ward','公立A级病房'),'navy','shield')
    +`<div class="controls">${segBtns('shield','plan',[{v:'A',t:'Plan A'},{v:'B',t:'Plan B'}])}
      ${ctrlSel('shield','age',tr('Age next birthday','下次生日年龄'),[30,40,50,60,70].map(a=>({v:a,t:a})))}</div>`
    +`<div class="tl-wrap">${tl}</div>
    ${timelineNotes([
      tr('Guaranteed renewable for life; no lifetime claim limit','终身保证续保；无终身理赔上限'),
      tr('Private portion uses MediSave AWL first, then cash if needed','私人保障部分先用医保储蓄限额，超出部分现金支付')
    ])}`
    +`<div class="cmp-grid">
      <div class="cmp-card"><h3>${tr('Annual premium at age','该年龄的年缴保费')} ${s.age}</h3>
        ${row(tr('MediShield Life (MediSave)','终身健保（公积金全额）'),fmt2(pr[0]))}
        ${row(tr('Shield Plan '+p+' private portion','Shield '+p+' 私人部分'),fmt2(pr[1]))}
        ${row(tr('MediSave-payable (AWL)','公积金可付（额度）'),fmt2(Math.min(pr[1],pr[2])))}
        ${row(tr('Cash outlay','现金支出'),'<span style="color:var(--primary-dark)">'+fmt2(cash)+'</span>')}
      </div>
      <div class="cmp-card"><h3>${tr('One hospital bill, in order','一张住院账单的赔付顺序')}</h3>
        ${row(tr('1. Deductible (per policy year)','1. 自付额（每保单年度）'),fmt(ded))}
        ${row(tr('2. Co-insurance','2. 共同承担'),'10%')}
        ${row(tr('3. Insurer pays the rest','3. 其余由保险公司承担'),tr('as charged','按实际费用'))}
        ${row(tr('Policy year limit','保单年度限额'),p==='A'?tr('S$2.5m panel / S$1m non-panel','合作医生250万/非合作100万'):'S$1,000,000')}
        <span class="note-chip">${proration}</span>
      </div>
      <div class="cmp-card"><h3>${tr('Around the hospital stay','住院前后保障')}</h3>
        ${row(tr('Pre-hospitalisation','住院前'),tr('90 / 180 days','90 / 180 天'))}
        ${row(tr('Post-hospitalisation','住院后'),tr('180 / 365 days','180 / 365 天'))}
        ${row(tr('Longer windows when','较长窗口适用于'),tr('panel or restructured hosp.','合作医生或公立医院'))}
        ${row(tr('Enhanced Care II rider','Enhanced Care II 附加险'),tr('co-ins capped S$6,000/yr (5%, panel)','共担封顶每年6,000（5%，合作网络）'))}
      </div>
    </div>
    <details class="rules"><summary>${tr('Key rules','主要规则')}</summary>
      <p>${tr('Singapore Citizens and PRs only. Two parts: MediShield Life (CPF Board) plus HSBC Life private coverage. Waiting periods: 300 days pregnancy complications, 365 days congenital and high-cost drugs, 730 days living donor transplant.','仅限新加坡公民及永久居民。保单由两部分组成：终身健保（公积金局）加汇丰人寿私人保障。等待期：妊娠并发症300天，先天性疾病及高价药物365天，活体器官捐赠移植730天。')}</p>
      <p>${tr('Estimated total premiums age 1 to 100: Plan A S$366,688 (cash S$309,688), Plan B S$115,882 (cash S$70,148). Source: PS Ver 7.1 p9.','1至100岁估算总保费：A计划366,688新元（现金309,688），B计划115,882新元（现金70,148）。来源：产品摘要7.1版第9页。')}</p>
    </details>`;
}
