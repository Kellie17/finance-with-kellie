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
      tr('Private portion uses MediSave AWL first, then cash if needed','私人保障部分先用医保储蓄限额，超出部分现金支付'),
      tr('Enhanced Care II can reduce co-insurance to 5% and cap it for panel or restructured hospital care','Enhanced Care II可将共同承担降至5%，合作医生或公立医院可封顶')
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
      <div class="cmp-card"><h3>${tr('Panel & LOG','合作网络与担保信')}</h3>
        ${row(tr('Private hospital LOG','私立医院担保信'),tr('call 6342 5292 at least 3 days before planned admission','计划住院前至少3天致电6342 5292'))}
        ${row(tr('Restructured hospital LOG','公立医院担保信'),tr('deposit waiver up to S$120k or bill amount, lower of both','押金豁免最高12万或账单金额，以较低者为准'))}
        ${row(tr('Panel GP / specialist','合作全科/专科'),tr('GP S$10; specialist S$130 first, S$100 follow-up','全科10；专科首诊130，复诊100'))}
        ${row(tr('Dental panel','牙科网络'),tr('preferential fees; Shield covers dental only for accident during hospitalisation','优惠收费；Shield只保障住院期间意外牙科治疗'))}
      </div>
      <div class="cmp-card"><h3>${tr('Enhanced Care II','Enhanced Care II')}</h3>
        ${row(tr('Co-insurance','共同承担'),tr('5%; cap S$6,000/yr for panel or restructured care','5%；合作医生或公立医院每年封顶6,000'))}
        ${row(tr('Planned overseas treatment','计划海外治疗'),tr('A/B up to S$50k p.a.; Standard S$25k, 90-day wait','A/B每年最高5万；标准计划2.5万，等待90天'))}
        ${row(tr('Emergency outpatient accident','紧急门诊意外'),tr('A S$3k / B S$1.5k / Standard S$750 p.a.','A 3,000 / B 1,500 / 标准750 每年'))}
        ${row(tr('Dementia cover','失智症保障'),tr('up to S$500 for consultation and prescribed medication','诊症及处方药最高500'))}
        ${row(tr('TCM after hospitalisation','住院后中医'),tr('S$50/visit, up to 365 days after discharge','每次50，出院后最长365天'))}
      </div>
      <div class="cmp-card"><h3>${tr('Cancer drugs','癌症药物')}</h3>
        ${row(tr('Treatment vs services','治疗与服务'),tr('CDL drug-indication pairs vs consultations, scans, labs and administration','CDL药物-适应症组合；另含诊症、扫描、化验及给药服务'))}
        ${row(tr('Shield Plan A/B','Shield A/B计划'),tr('CDL: 5x MediShield Life limits','CDL：终身健保限额5倍'))}
        ${row(tr('Standard Plan','标准计划'),tr('CDL treatment 3x; services 2x','CDL治疗3倍；服务2倍'))}
        ${row(tr('Enhanced Care II','Enhanced Care II'),tr('CDL 18x treatment + 15x services; non-CDL S$30k/mo A/B, S$5k/mo Standard','CDL治疗18倍+服务15倍；非CDL A/B每月3万，标准每月5,000'))}
        ${row(tr('Non-CDL note','非CDL说明'),tr('classes A-E only; no co-insurance cap','仅A-E类别；无共同承担封顶'))}
      </div>
      <div class="cmp-card"><h3>${tr('SavvyClaim & recovery','SavvyClaim与追偿')}</h3>
        ${row(tr('Reward levels','折扣等级'),tr('10%, 12%, 15%, 18%, 20%','10%、12%、15%、18%、20%'))}
        ${row(tr('Applies to','适用于'),tr('Enhanced Care II Plan A','Enhanced Care II A计划'))}
        ${row(tr('Can retain/improve','可保留或提高'),tr('no claim, restructured care, or company-insurance recovery','无理赔、公立医院治疗或公司保险追偿'))}
        ${row(tr('Claims recovery','理赔追偿'),tr('claim other insurer, complete notice, email docs, HSBC follows up','先向其他保险索赔，填通知书，电邮文件，HSBC跟进'))}
        ${row(tr('Recovery email','追偿电邮'),'cc.life@mail.life.hsbc.com.sg')}
      </div>
    </div>
    <details class="rules"><summary>${tr('Key rules','主要规则')}</summary>
      <p>${tr('Singapore Citizens and PRs only. Two parts: MediShield Life (CPF Board) plus HSBC Life private coverage. Waiting periods: 300 days pregnancy complications, 365 days congenital and high-cost drugs, 730 days living donor transplant.','仅限新加坡公民及永久居民。保单由两部分组成：终身健保（公积金局）加汇丰人寿私人保障。等待期：妊娠并发症300天，先天性疾病及高价药物365天，活体器官捐赠移植730天。')}</p>
      <p>${tr('Estimated total premiums age 1 to 100: Plan A S$366,688 (cash S$309,688), Plan B S$115,882 (cash S$70,148). Source: PS Ver 7.1 p9.','1至100岁估算总保费：A计划366,688新元（现金309,688），B计划115,882新元（现金70,148）。来源：产品摘要7.1版第9页。')}</p>
      <p>${tr('Premium table notes: premium rates include 9% GST, are for Singapore Citizens/PRs and are Non-Guaranteed. Age bands 76 and above are renewal only. MediShield Life premiums may differ due to subsidies, rebates or additional premiums.','保费表说明：保费含9%消费税，适用于新加坡公民/永久居民，且为非保证。76岁及以上年龄段仅限续保。终身健保保费会因补贴、回扣或额外保费而不同。')}</p>
      <p>${tr('Claims recovery process: submit the claim to the other insurer first, complete the HSBC Life Shield Claims Recovery Notice, then email the notice and supporting documents to cc.life@mail.life.hsbc.com.sg.','理赔追偿流程：先向其他保险公司提交理赔，填写HSBC Life Shield Claims Recovery Notice，再把通知书及证明文件电邮至cc.life@mail.life.hsbc.com.sg。')}</p>
    </details>`;
}
