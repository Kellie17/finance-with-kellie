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
      tr('Bonuses and future values are Non-Guaranteed unless stated','红利及未来价值除非说明均非保证')
    ])}`
    +`<div class="cmp-grid">
      <div class="cmp-card"><h3>${tr('How the cover moves','保障如何变化')}</h3>
        ${row(tr('To age '+s.mca,'至'+s.mca+'岁'),fmt(s.sa*s.mult))}
        ${steps.slice(1).map((f,k)=>row(tr('Age '+(s.mca+k+1)+(k===4?' to 99':''),(s.mca+k+1)+'岁'+(k===4?'至99岁':'')),fmt(s.sa*s.mult*f))).join('')}
        <p class="muted" style="font-size:12px;margin-top:6px;">${tr('Death benefit is the higher of the multiplier benefit or sum assured plus accumulated bonuses.','身故保险金为倍数保障与保额加累积红利两者中的较高者。')}</p>
      </div>
      <div class="cmp-card"><h3>${tr('Cash value & options','现金价值与选择权')}</h3>
        ${row(tr('Surrender value','退保价值'),tr('from policy year 3','自第3保单年度起'))}
        ${row(tr('Bonuses','红利'),tr('reversionary + terminal (non-gtd)','复归红利+终期红利（非保证）'))}
        ${row(tr('Payout option','现金领取选择'),tr('up to 80% of SV over 10 yrs, after multiplier age','倍数期后10年内领取至多80%退保价值'))}
        ${row(tr('Guaranteed insurability','保证可保权'),tr('3 life events before 55, up to S$300k','55岁前人生事件可加保3次，上限30万'))}
      </div>
      <div class="cmp-card"><h3>${tr('Riders','附加险')}</h3>
        ${row(tr('Early CI Benefit III','早期重疾III'),tr('170 conditions','170种疾病'))}
        ${row(tr('CI Benefit III','重疾III'),tr('56 advanced CIs','56种晚期重疾'))}
        ${row(tr('Top 5 CIs extra','五大重疾额外赔付'),tr('+50% of rider SA','附加保额的+50%'))}
        ${row(tr('Payer PremiumEraser','投保人豁免'),tr('waives premiums on death/TPD/CI','身故/全残/重疾豁免保费'))}
      </div>
    </div>`;
}
