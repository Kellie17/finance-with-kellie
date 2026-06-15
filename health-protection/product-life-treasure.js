"use strict";
/* ================= LIFE TREASURE III ================= */
function rLt3(){
  const s=S.lt3, end=99;
  const steps=[1,.9,.8,.7,.6,.5];
  const segs=[
    {from:s.age,to:s.mca,label:tr(`${s.mult}x multiplier cover`,`${s.mult}倍保障`),color:C.primaryDark,lane:1},
    {from:s.mca+5,to:end,label:tr('50% floor after step-down','递减后50%底线'),color:C.axis,lane:1},
    {from:s.age,to:80,label:tr('Accidental death double','意外身故双倍'),color:C.accent,lane:2,dash:1}
  ];
  const markers=[{age:s.mca,label:tr('Multiplier age','倍数年龄'),color:C.primaryDark}];
  for(let k=1;k<=4;k++) if(s.mca+k<end) markers.push({age:s.mca+k,label:`${100-10*k}%`,color:C.warn});
  markers.push({age:99,label:tr('matures','满期'),color:C.good});
  const tl = ageline({a0:s.age, a1:end, segs, markers,
    payTo:s.age+s.pay, payLabel:tr(`pay ${s.pay} years`,`缴费${s.pay}年`)});
  return head('HSBC Life - Life Treasure III',
      tr('Participating whole life cover to age 99 with a protection multiplier','分红终身寿险，保障至99岁，附保障倍数'),
      tr('Whole of life','终身'),'','lt3')
    +`<div class="controls">
      ${ctrlNum('lt3','age',tr('Entry age','投保年龄'),1,1,70)}
      ${ctrlNum('lt3','sa',tr('Basic sum assured S$','基本保额（新元）'),10000,50000,2000000)}
      ${ctrlSel('lt3','mult',tr('Multiplier','倍数'),[2.5,3.5,4.5,6].map(m=>({v:m,t:m+'x'})))}
      ${ctrlSel('lt3','mca',tr('Multiplier to age','倍数保障至'),[65,70,80].map(a=>({v:a,t:a})))}
      ${ctrlSel('lt3','pay',tr('Premium term','缴费年期'),[10,15,20,25,30].map(p=>({v:p,t:p+tr(' yrs','年')})))}
    </div>`
    +`<div class="tl-wrap">${tl}</div>
    ${timelineNotes([
      tr('Multiplier benefit steps down after the chosen multiplier age','保障倍数在所选倍数年龄后逐步递减'),
      tr('All values are Non-Guaranteed unless stated','所有数值除非注明均为非保证'),
      tr('Multiplier can apply to basic benefits, accidental death and eligible CI riders','保障倍数可适用于基本保障、意外身故及合资格重疾附加险')
    ])}`
    +`<div class="cmp-grid">
      <div class="cmp-card"><h3>${tr('Base plan','基本计划')}</h3>
        ${row(tr('Core benefits','核心保障'),tr('death, TPD and terminal illness to age 99','身故、全残及末期疾病至99岁'))}
        ${row(tr('Family Support Benefit','家庭支援给付'),tr('2 years of premiums on spouse or parent death','配偶或父母身故时给付2年保费'))}
        ${row(tr('Premium terms','缴费年期'),tr('10 / 15 / 20 / 25 / 30 years','10/15/20/25/30年'))}
        ${row(tr('Premium frequency','缴费频率'),tr('monthly, quarterly, semi-annual or annual','每月、每季、每半年或每年'))}
      </div>
      <div class="cmp-card"><h3>${tr('How the cover moves','保障如何变化')}</h3>
        ${row(tr('To age '+s.mca,'至'+s.mca+'岁'),fmt(s.sa*s.mult))}
        ${steps.slice(1).map((f,k)=>row(tr('Age '+(s.mca+k+1)+(k===4?' to 99':''),(s.mca+k+1)+'岁'+(k===4?'至99岁':'')),fmt(s.sa*s.mult*f))).join('')}
        ${row(tr('Accidental death','意外身故'),tr('extra basic SA or multiplier benefit to age 80','至80岁额外给付基本保额或倍数保障'))}
        <p class="muted" style="font-size:12px;margin-top:6px;">${tr('Death benefit is the higher of the multiplier benefit or sum assured plus accumulated bonuses.','身故保险金为倍数保障与保额加累积红利两者中的较高者。')}</p>
      </div>
      <div class="cmp-card"><h3>${tr('Cash value & options','现金价值与选择权')}</h3>
        ${row(tr('Surrender value','退保价值'),tr('from policy year 3','自第3保单年度起'))}
        ${row(tr('Bonuses','红利'),tr('reversionary + terminal (non-gtd)','复归红利+终期红利（非保证）'))}
        ${row(tr('Payout option','现金领取选择'),tr('selected portion of SV over 10 yrs after multiplier age','倍数年龄后可将所选退保价值分10年领取'))}
        ${row(tr('Guaranteed insurability','保证可保权'),tr('marriage, child, property; no extra health questions','结婚、生育、置业；无需额外健康问题'))}
      </div>
      <div class="cmp-card"><h3>${tr('Riders','附加险')}</h3>
        ${row(tr('Early CI Benefit III','早期重疾III'),tr('170 conditions','170种疾病'))}
        ${row(tr('CI Benefit III','重疾III'),tr('56 advanced CIs','56种晚期重疾'))}
        ${row(tr('Top 5 CIs extra','五大重疾额外赔付'),tr('+50% of rider SA','附加保额的+50%'))}
        ${row(tr('Special / juvenile conditions','特别/少儿疾病'),tr('14 + 14 conditions, +20% rider SA, max S$25k each','14+14种，另加附加保额20%，每项上限2.5万'))}
        ${row(tr('Payer PremiumEraser','投保人豁免'),tr('death, TPD, early-to-advanced CI, involuntary unemployment','身故、全残、早至晚期重疾、非自愿失业'))}
      </div>
    </div>`;
}
