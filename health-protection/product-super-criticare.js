"use strict";
/* ================= SUPER CRITICARE ================= */
const SCC_CLAIMS = [
  {y:2, en:'Early stage cancer', cn:'早期癌症', pct:100},
  {y:4, en:'Re-diagnosed cancer (24-mth wait met)', cn:'癌症复发（已满24个月等待期）', pct:100},
  {y:6, en:'Heart attack (different CI, 12-mth wait met)', cn:'心脏病（不同重疾，已满12个月等待期）', pct:100},
  {y:8, en:'Recurrent heart attack (24-mth wait met)', cn:'心脏病复发（已满24个月）', pct:0, capped:'300'},
  {y:9, en:'Advanced kidney failure', cn:'晚期肾衰竭', pct:100},
  {y:11,en:'Advanced stage stroke', cn:'晚期中风', pct:0, capped:'300'},
  {y:12,en:'Major organ transplant', cn:'重大器官移植', pct:100},
  {y:14,en:'Advanced Parkinson’s disease', cn:'晚期帕金森病', pct:100},
  {y:16,en:'Severe rheumatoid arthritis (Special, +10%)', cn:'严重类风湿关节炎（特别保障，另加10%）', pct:10, special:1}
];
function rScc(){
  const s=S.scc;
  const endAge = s.mode==='toage' ? s.toAge : Math.min(99, s.age + Math.ceil((76-s.age)/s.term)*s.term);
  const lastRen = {5:75,10:75,15:75,20:75,25:74,30:69}[s.term];
  const segs=[{from:s.age,to:endAge,label:tr('CI cover up to 600%','重疾最高600%'),color:C.primaryDark,lane:1}];
  const markers=[{age:Math.min(85,endAge),label:tr('Alzheimer’s ends','阿尔茨海默终止'),color:C.warn}];
  if(s.mode==='ren'){
    for(let a=s.age+s.term; a<endAge; a+=s.term) markers.push({age:a,label:tr('renews','续保'),color:C.axis});
    markers.push({age:Math.min(lastRen,endAge),label:tr('last renewal','最后续保'),color:C.primaryDark});
  }
  const tl = ageline({a0:s.age, a1:endAge, segs, markers, payTo:endAge,
    payLabel:tr('term premiums','定期保费')});
  /* claim stack */
  let cum=0, segsHtml='';
  const shown = SCC_CLAIMS.slice(0, s.claims);
  shown.forEach(c=>{
    if(c.special){ segsHtml += `<div style="width:5%;background:${C.accent}" title="+10% special conditions">+10%</div>`; return; }
    if(c.capped){ return; }
    cum += c.pct;
    segsHtml += `<div style="width:${100/6}%;background:${cum<=300?C.primaryDark:C.secondary}">${cum}%</div>`;
  });
  const capHit = shown.some(c=>c.capped);
  return head('HSBC Life Super CritiCare',
      tr('Multi-claim critical illness, early to advanced stage','多重赔付重疾险，覆盖早期至晚期'),
      tr('Pays up to 600% of SA','累计最高赔付保额600%'),'','scc')
    +`<div class="controls">
      ${segBtns('scc','mode',[{v:'toage',t:tr('To age','保至指定年龄')},{v:'ren',t:tr('Renewable','可续保定期')}])}
      ${s.mode==='toage'
        ? ctrlSel('scc','toAge',tr('Cover to age','保障至'),[50,55,60,65,70,75].map(a=>({v:a,t:a})))
        : ctrlSel('scc','term',tr('Term (years)','保障期（年）'),[5,10,15,20,25,30].map(t=>({v:t,t:t})))}
      ${ctrlNum('scc','age',tr('Entry age','投保年龄'),1,1,74)}
      ${ctrlNum('scc','sa',tr('Sum assured S$','保额（新元）'),10000,50000,350000)}
    </div>`
    +`<div class="tl-wrap">${tl}</div>
    ${timelineNotes([
      tr('Can be a standalone basic plan or a rider attached to selected HSBC Life plans','可作为独立基本计划，或作为附加险附加于指定汇丰人寿计划'),
      tr('Each eligible CI claim pays 100% of sum assured','每次合资格重疾理赔为保额100%'),
      tr('Overall policy cap is 600% of sum assured','整张保单累计上限为保额600%'),
      tr('Diabetes Care renews yearly while diabetes is confirmed by appointed doctors','如指定医生确认仍患糖尿病，糖尿病关护计划每年续期')
    ])}`
    +`<h3 style="margin-top:16px;font-size:15px;">${tr('Claim stack - walk a client through repeated claims','理赔叠加演示 - 向客户展示多次理赔')}</h3>
     <div class="stackbar">${segsHtml||`<div style="width:100%;background:transparent;color:${C.faint}">${tr('press Add claim','点击 添加理赔')}</div>`}</div>
     <div class="claimbtns">
       <button class="primary" onclick="set('scc','claims',Math.min(${SCC_CLAIMS.length},S.scc.claims+1))">${tr('Add claim','添加理赔')}</button>
       <button onclick="set('scc','claims',0)">${tr('Reset','重置')}</button>
     </div>
     <div>${shown.map(c=>`<span class="${c.capped?'note-chip':'ok-chip'}">${tr('Yr','第')} ${c.y}${tr('',' 年')}: ${tr(c.en,c.cn)} ${c.capped?tr('- not paid, cancer/heart/stroke 300% cap reached','- 不予赔付，癌症/心脏病/中风合计已达300%上限'):(c.special?'+'+fmt(Math.min(.1*S.scc.sa,25000)):'+'+fmt(S.scc.sa))}</span>`).join('')}</div>
     ${capHit?`<p class="muted" style="margin-top:6px;font-size:12.5px;">${tr('Cancers, heart attacks and strokes share a combined 300% cap; the overall policy cap is 600% of SA.','癌症、心脏病与中风合计上限为保额的300%；整张保单的总上限为保额的600%。')}</p>`:''}
    <div class="cmp-grid">
      <div class="cmp-card"><h3>${tr('Per-claim mechanics','单次理赔规则')}</h3>
        ${row(tr('Each CI claim','每次重疾理赔'),tr('100% of SA','保额的100%'))}
        ${row(tr('Early/intermediate cap','早期/中期单项上限'),'S$350,000')}
        ${row(tr('Same CI to advanced','同一重疾进展至晚期'),tr('no wait, remaining SA','无等待期，赔余额'))}
        ${row(tr('Different CI','不同重疾'),tr('12-month wait','等待12个月'))}
        ${row(tr('Cancer/heart/stroke recurrence','癌症/心脏病/中风复发'),tr('24-month wait','等待24个月'))}
      </div>
      <div class="cmp-card"><h3>${tr('Extras that do not reduce SA','不扣减保额的额外保障')}</h3>
        ${row(tr('Special conditions','特别疾病'),tr('11 conditions, +10% SA, max S$25k each','11种疾病，另加保额10%，每项上限2.5万'))}
        ${row(tr('Juvenile, below 18','未满18岁少儿疾病'),tr('10 conditions, +10% SA, max S$25k each','10种疾病，另加保额10%，每项上限2.5万'))}
        ${row(tr('Diabetes Care Programme','糖尿病关护计划'),tr('worth S$2,500 p.a., no SA reduction','价值每年2,500新元，不扣减保额'))}
        ${row(tr('Death benefit','身故给付'),tr('S$10,000, basic plan only','1万新元，仅适用于基本计划'))}
        ${row(tr('Optional premium waivers','可选保费豁免'),tr('ECIUN, payer eraser, involuntary income cover','ECIUN、投保人豁免、非自愿失业保障'))}
      </div>
      <div class="cmp-card"><h3>${tr('Timing rules','时间规则')}</h3>
        ${row(tr('Initial waiting period','初始等待期'),tr('90 days (early/intermediate, heart & cancer)','90天（早中期及心脏/癌症类）'))}
        ${row(tr('Survival period','生存期'),tr('7 days','7天'))}
        ${row(tr('Last renewal age','最后续保年龄'),tr('75 (5-20y) / 74 (25y) / 69 (30y)','75（5-20年）/74（25年）/69（30年）'))}
        ${row(tr('Max expiry age','最高满期年龄'),'99')}
      </div>
    </div>`;
}
