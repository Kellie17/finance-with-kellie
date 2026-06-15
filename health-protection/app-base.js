"use strict";
/* ================= shared state ================= */
const G = { tab:'over', lang:'en' };
function tr(en, cn){ return G.lang==='cn' ? cn : en; }
const fmt  = n => (n<0?'-':'') + 'S$' + Math.abs(Math.round(n)).toLocaleString('en-US');
const fmt2 = n => 'S$' + (Math.round(n*100)/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const C = {
  primary:'#2f7d72',
  primaryDark:'#1e5d55',
  secondary:'#486581',
  accent:'#b8893a',
  good:'#39745b',
  warn:'#a36a2d',
  axis:'#315d6a',
  faint:'#7c8b86',
  textLight:'#f8fbf7'
};

const FOOT = {
  impEn: 'Illustrative only, not a Policy Illustration, not an offer or recommendation. Benefits are subject to policy terms, waiting periods, survival periods and exclusions. The official Product Summary, Policy Illustration and General Provisions prevail.',
  impCn: '本页仅供说明，不是保单利益演示，也不构成要约或建议。所有给付须符合保单条款、等待期、生存期及除外责任。一切以官方产品摘要、利益演示及保单条款为准。'
};
const SOURCE_PACK = [
  {en:'HSBC Life Shield', cn:'HSBC Life Shield', docs:[
    {en:'Product page', cn:'产品页面', href:'https://www.insurance.hsbc.com.sg/health/products/shield/'},
    {en:'Product Summary Ver 7.1', cn:'产品摘要 Ver 7.1', href:'https://isomer-user-content.by.gov.sg/3/9eec199f-c122-4cbd-b6e1-41c398685c20/ShieldPlanAB_GP_20260401_v7.1.pdf'},
    {en:'Brochure', cn:'产品手册', href:'https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/health/hsbc-life-shield-brochure.pdf'},
    {en:'Premium tables (1 Apr 2026)', cn:'保费表（2026年4月1日）', href:'https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/health/hsbc-life-shield-premium-tables.pdf'}
  ]},
  {en:'Super CritiCare', cn:'Super CritiCare', docs:[
    {en:'Product page', cn:'产品页面', href:'https://www.insurance.hsbc.com.sg/life-and-critical-illness/products/super-criticare/'},
    {en:'Brochure', cn:'产品手册', href:'https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/life/super-criticare-brochure-english.pdf'}
  ]},
  {en:'Prime Care', cn:'Prime Care', docs:[
    {en:'Product page', cn:'产品页面', href:'https://www.insurance.hsbc.com.sg/health/products/prime-care/'},
    {en:'Brochure', cn:'产品手册', href:'https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/health/prime-care-brochure.pdf'}
  ]},
  {en:'Life Treasure III', cn:'Life Treasure III', docs:[
    {en:'Product page', cn:'产品页面', href:'https://www.insurance.hsbc.com.sg/life-and-critical-illness/products/life-treasure-iii/'},
    {en:'Brochure', cn:'产品手册', href:'https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/life/life-treasure-iii-product-brochure.pdf'}
  ]},
  {en:'Term Protector / Term Protector Prime', cn:'Term Protector / Term Protector Prime', docs:[
    {en:'Product page', cn:'产品页面', href:'https://www.insurance.hsbc.com.sg/life-and-critical-illness/products/term-protector/'},
    {en:'Term Protector brochure', cn:'Term Protector 产品手册', href:'https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/life/term-protector-brochure.pdf'},
    {en:'Term Protector Prime brochure', cn:'Term Protector Prime 产品手册', href:'https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/life/term-protector-prime-brochure.pdf'}
  ]},
  {en:'HappyMummy / HappyFamily', cn:'HappyMummy / HappyFamily', docs:[
    {en:'Product page', cn:'产品页面', href:'https://www.insurance.hsbc.com.sg/life-and-critical-illness/products/happy-mummy/'},
    {en:'EmpoweredMum brochure', cn:'EmpoweredMum 产品手册', href:'https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/life/hsbclife-happymummy-happyfamily-brochure.pdf'}
  ]},
  {en:'Term Protect Advantage / Term Lite', cn:'Term Protect Advantage / Term Lite', docs:[
    {en:'Term Protect Advantage product page', cn:'Term Protect Advantage 产品页面', href:'https://www.insurance.hsbc.com.sg/life-and-critical-illness/products/term-protect-advantage/'},
    {en:'Term Protect Advantage brochure', cn:'Term Protect Advantage 产品手册', href:'https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/protection/term-protect-advantage/product-brochure.pdf'},
    {en:'Term Lite product page', cn:'Term Lite 产品页面', href:'https://www.insurance.hsbc.com.sg/life-and-critical-illness/products/direct-term-lite/'},
    {en:'Term Lite brochure', cn:'Term Lite 产品手册', href:'https://www.insurance.hsbc.com.sg/content/dam/hsbc/insn/documents/life/direct-hsbclife-term-lite-brochure-english.pdf'}
  ]}
];
const sourceLink = doc => `<a href="${encodeURI(doc.href)}" target="_blank" rel="noopener">${tr(doc.en, doc.cn)}</a>`;
function renderFooter(){
  document.getElementById('footx').innerHTML =
    `<section class="source-pack">
      <h2>${tr('Source Pack','资料包')}</h2>
      <p class="source-sub">${tr('Official product pages and documents used for this page.','本页使用的官方产品页面及文件。')}</p>
      <div class="source-grid">${SOURCE_PACK.map(src=>`
        <div class="source-card">
          <h3>${tr(src.en, src.cn)}</h3>
          <ul>${src.docs.map(doc=>`<li>${sourceLink(doc)}</li>`).join('')}</ul>
        </div>`).join('')}</div>
      <p class="source-important"><b>${tr('Important.','重要说明。')}</b> ${tr(FOOT.impEn, FOOT.impCn)}</p>
      <p class="source-copy">&copy; 2026 Kellie Zheng. All rights reserved.</p>
    </section>`;
}
function toggleLang(){
  G.lang = G.lang==='en' ? 'cn' : 'en';
  document.getElementById('langBtnEn').classList.toggle('active', G.lang==='en');
  document.getElementById('langBtnCn').classList.toggle('active', G.lang==='cn');
  document.getElementById('ngNote').textContent = tr('All Values Non-Guaranteed','所有数值均非保证');
  document.getElementById('overviewNotice').textContent = tr('This is a simplified overview to help you compare options. Final details depend on the official product summary, policy illustration and underwriting outcome.','本页为简化概览，帮助您比较不同选项。最终细节以官方产品摘要、保单利益演示及核保结果为准。');
  document.getElementById('subline').textContent = tr('Adviser tool - Kellie Zheng - coverage-and-payout view of the hand-timeline method','顾问工具 - Kellie Zheng - 手绘时间轴的保障与给付视图');
  document.getElementById('h1t').innerHTML = tr('Health &amp; Protection','健康与保障');
  renderFooter(); render();
}

/* ================= generic age timeline SVG =================
   o = { a0, a1, segs:[{from,to,label,color,lane,dash}], payTo, payLabel,
         markers:[{age,label,color}], note }
   lanes: 0 nearest axis, 1 above, 2 top.                       */
function ageline(o){
  const span = Math.max(o.a1 - o.a0, 4);
  const W = Math.max(980, span*30 + 190), x0 = 70, x1 = W - 100;
  const yAx = 250, laneY = l => yAx - 44 - l*46;
  const H = o.payTo ? 338 : 302;
  const X = a => x0 + (x1-x0)*(a-o.a0)/span;
  const labelFont = 'font-family:-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Roboto,Helvetica,Arial,sans-serif;letter-spacing:0;';
  const markerYs = [24,62,100];
  const laneRight = markerYs.map(()=>-Infinity);
  const markerWidth = m => Math.max(46, Math.min(150, String(m.label||'').length*6.4 + 28));
  function markerLane(x, width, fallback){
    for(let i=0;i<markerYs.length;i++){
      if(x - width/2 > laneRight[i] + 10){
        laneRight[i] = x + width/2;
        return i;
      }
    }
    const lane = fallback % markerYs.length;
    laneRight[lane] = Math.max(laneRight[lane], x + width/2);
    return lane;
  }
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" xmlns="http://www.w3.org/2000/svg">`;
  /* axis */
  s += `<line x1="${x0-14}" y1="${yAx}" x2="${x1+30}" y2="${yAx}" stroke="${C.axis}" stroke-width="2.2"/>
        <path d="M ${x1+30} ${yAx} l -10 -5 v 10 z" fill="${C.axis}"/>`;
  const step = span>50 ? 10 : 5;
  for(let a=o.a0; a<=o.a1; a++){
    const x=X(a), major = (a===o.a0 || a===o.a1 || a%step===0);
    s += `<line x1="${x}" y1="${yAx-(major?7:4)}" x2="${x}" y2="${yAx+(major?7:4)}" stroke="${C.axis}" stroke-width="${major?1.8:0.8}"/>`;
    if(major) s += `<text x="${x}" y="${yAx+24}" text-anchor="middle" font-size="12.5" font-weight="600" style="${labelFont}" fill="${C.axis}">${a}</text>`;
  }
  s += `<text x="${x1+34}" y="${yAx+24}" font-size="12" font-weight="600" style="${labelFont}" fill="${C.faint}">${tr('age','年龄')}</text>`;
  /* coverage segments */
  (o.segs||[]).forEach(g=>{
    const a=X(Math.max(g.from,o.a0)), b=X(Math.min(g.to,o.a1)), y=laneY(g.lane||0);
    s += `<rect x="${a}" y="${y-13}" width="${Math.max(b-a,3)}" height="26" rx="8" fill="${g.color}" opacity="${g.dash?0.45:0.85}" ${g.dash?'stroke-dasharray="6 4" stroke="'+g.color+'" stroke-width="2" fill-opacity="0.15"':''}/>`;
    s += `<text x="${(a+b)/2}" y="${y+4}" text-anchor="middle" font-size="13" font-weight="700" style="${labelFont}" fill="${g.dash?g.color:C.textLight}">${g.label}</text>`;
  });
  /* markers */
  (o.markers||[]).forEach((m,i)=>{
    if(m.age<o.a0||m.age>o.a1) return;
    const x=X(m.age), w=markerWidth(m), yTop=markerYs[markerLane(x,w,i)];
    s += `<line x1="${x}" y1="${yTop+22}" x2="${x}" y2="${yAx-4}" stroke="${m.color||C.primaryDark}" stroke-width="1.4" stroke-dasharray="4 4"/>
          <text x="${x}" y="${yTop}" text-anchor="middle" font-size="11.8" font-weight="700" style="${labelFont}" fill="${m.color||C.primaryDark}">${m.label}</text>
          <text x="${x}" y="${yTop+14}" text-anchor="middle" font-size="10.8" font-weight="700" style="${labelFont}" fill="${m.color||C.primaryDark}">@${m.age}</text>`;
  });
  /* premium bracket below axis */
  if(o.payTo){
    const ax0=X(o.a0), ax1=X(Math.min(o.payTo,o.a1)), yB=yAx+44;
    s += `<path d="M ${ax0} ${yB} h ${ax1-ax0}" stroke="${C.accent}" stroke-width="2" fill="none"/>
          <path d="M ${ax0} ${yB-7} v 14 M ${ax1} ${yB-7} v 14" stroke="${C.accent}" stroke-width="2"/>
          <text x="${(ax0+ax1)/2}" y="${yB+22}" text-anchor="middle" font-size="13" font-weight="700" style="${labelFont}" fill="${C.accent}">${o.payLabel||tr('premiums payable','缴费期')}</text>`;
  }
  if(o.note) s += `<text x="${x0}" y="${H-8}" font-size="11.5" style="${labelFont}" fill="${C.faint}">${o.note}</text>`;
  return s + `</svg>`;
}

/* ================= per-product state ================= */
const S = {
  shield:{plan:'A', age:40},
  scc:{mode:'toage', toAge:75, term:20, age:35, sa:100000, claims:0},
  pc:{plan:3, age:35},
  lt3:{sa:100000, mult:6, mca:65, pay:20, age:35},
  tpa:{age:35, covTo:70, pay:15, sa:1000000},
  tpp:{form:'ren', term:20, toAge:65, age:35},
  tl:{term:'5yr', age:35, sa:400000},
  happy:{}
};

const PROD = {
  over:  ()=>tr('Comparison','对比'),
  shield:()=>'HSBC Life Shield',
  happy: ()=>'HappyMummy / HappyFamily',
  scc:   ()=>'Super CritiCare',
  pc:    ()=>'Prime Care',
  lt3:   ()=>'Life Treasure III',
  tpa:   ()=>'Term Protect Advantage',
  tpp:   ()=>'Term Protector Prime',
  tl:    ()=>'Term Lite (Direct)'
};

const PRODUCT_META = {
  shield:{
    bestEn:'hospitalisation foundation and large medical bills',
    bestCn:'住院医疗基础及大额医疗账单',
    purposeEn:'Medical bill reimbursement',
    purposeCn:'医疗账单报销',
    premiumEn:'Yearly, age-banded',
    premiumCn:'每年缴费，按年龄段调整',
    coverEn:'Lifetime renewal',
    coverCn:'终身续保',
    claimEn:'Pays eligible hospital bills, as charged',
    claimCn:'按合资格住院账单赔付'
  },
  scc:{
    bestEn:'repeated critical illness payouts',
    bestCn:'重疾多次赔付',
    purposeEn:'Multi-claim CI protection',
    purposeCn:'多次赔付重疾保障',
    premiumEn:'Term-based',
    premiumCn:'按保障期缴费',
    coverEn:'To age 75 or renewable to 99',
    coverCn:'保至75岁或可续保至99岁',
    claimEn:'Each CI claim pays 100% of SA, up to 600%',
    claimCn:'每次重疾赔保额100%，累计最高600%'
  },
  pc:{
    bestEn:'hospital cash and recovery support',
    bestCn:'住院现金及康复支持',
    purposeEn:'Cash benefits on top of medical insurance',
    purposeCn:'医疗保险之外的现金给付',
    premiumEn:'Yearly, age-banded',
    premiumCn:'每年缴费，按年龄段调整',
    coverEn:'Renewable to age 85',
    coverCn:'可续保至85岁',
    claimEn:'Fixed cash amounts by benefit type',
    claimCn:'按保障项目给固定现金额'
  },
  lt3:{
    bestEn:'legacy protection with higher working-years cover',
    bestCn:'传承保障及工作年期较高保障',
    purposeEn:'Whole life protection and legacy planning',
    purposeCn:'终身保障及传承规划',
    premiumEn:'Limited pay',
    premiumCn:'限期缴费',
    coverEn:'To age 99',
    coverCn:'保障至99岁',
    claimEn:'Death benefit, multiplier, bonuses and riders',
    claimCn:'身故保障、保障倍数、红利及附加险'
  },
  tpa:{
    bestEn:'term cover with limited-pay cash value',
    bestCn:'含现金价值的限期缴费定期保障',
    purposeEn:'Term protection with guaranteed cash value',
    purposeCn:'带保证现金价值的定期保障',
    premiumEn:'Limited pay',
    premiumCn:'限期缴费',
    coverEn:'To chosen age',
    coverCn:'保至指定年龄',
    claimEn:'Death / terminal illness sum insured',
    claimCn:'身故/末期疾病保额'
  },
  tpp:{
    bestEn:'pure term protection in SGD or USD',
    bestCn:'新元或美元纯定期保障',
    purposeEn:'Pure term protection',
    purposeCn:'纯定期保障',
    premiumEn:'Renewable or level to-age',
    premiumCn:'可续保或保至指定年龄水平保费',
    coverEn:'To age 99 max',
    coverCn:'最长保至99岁',
    claimEn:'Death / terminal illness protection',
    claimCn:'身故/末期疾病保障'
  },
  tl:{
    bestEn:'simple direct-purchase term cover',
    bestCn:'简易直接投保定期保障',
    purposeEn:'Basic term protection',
    purposeCn:'基础定期保障',
    premiumEn:'5-year reset, 20-year, or to age 65',
    premiumCn:'5年重设、20年或保至65岁',
    coverEn:'Renewable to 80, or fixed term',
    coverCn:'可续保至80岁或固定期限',
    claimEn:'Death / terminal illness / TPD, with optional CI rider',
    claimCn:'身故/末期疾病/全残，可加重疾附加险'
  },
  happy:{
    bestEn:'expecting parents who want prenatal, newborn and family continuity',
    bestCn:'希望衔接孕期、新生儿及家庭保障的准父母',
    purposeEn:'Prenatal cover plus newborn/family protection bridge',
    purposeCn:'孕期保障加新生儿/家庭保障衔接',
    premiumEn:'EmpoweredMum single premium plus bundled plan premium',
    premiumCn:'EmpoweredMum趸缴，加搭配计划保费',
    coverEn:'From week 13 of pregnancy to policy year 3, with bundled continuation',
    coverCn:'怀孕第13周至第3保单年度，另由搭配计划延续',
    claimEn:'Fixed percentage of SA for pregnancy, newborn and hospital benefits',
    claimCn:'孕期、新生儿及住院保障按保额比例给付'
  }
};

function set(id,k,v){ S[id][k]=v; render(); }
function openTab(id){ G.tab=id; render(); window.scrollTo({top:0, behavior:'smooth'}); }
function ctrlSel(id,k,label,opts){
  return `<div class="ctrl"><label>${label}</label><select onchange="set('${id}','${k}',isNaN(this.value)?this.value:+this.value)">`+
    opts.map(o=>`<option value="${o.v}" ${String(S[id][k])===String(o.v)?'selected':''}>${o.t}</option>`).join('')+`</select></div>`;
}
function ctrlNum(id,k,label,step,min,max){
  return `<div class="ctrl"><label>${label}</label><input type="number" value="${S[id][k]}" step="${step}" min="${min}" max="${max}"
    onchange="set('${id}','${k}',Math.min(${max},Math.max(${min},+this.value||${min})))"></div>`;
}
function segBtns(id,k,opts){
  return `<div class="ctrl"><label>&nbsp;</label><div class="seg">`+opts.map(o=>
    `<button class="${String(S[id][k])===String(o.v)?'active':''}" onclick="set('${id}','${k}',${typeof o.v==='string'?`'${o.v}'`:o.v})">${o.t}</button>`).join('')+`</div></div>`;
}
function head(name,tag,badge,badgeCls,id){
  const meta = id ? PRODUCT_META[id] : null;
  return `<div class="prodhead"><h2>${name}</h2><span class="badge ${badgeCls||''}">${badge}</span><span class="tagline">${tag}</span></div>`+
    (meta ? `<div class="best-for">${tr('Best for: ','适合：')}${tr(meta.bestEn, meta.bestCn)}</div>` : '');
}
function row(l,v){ return `<div class="row"><span>${l}</span><b>${v}</b></div>`; }
function timelineNotes(items){ return `<div class="timeline-notes">${items.map(i=>`<span>${i}</span>`).join('')}</div>`; }
