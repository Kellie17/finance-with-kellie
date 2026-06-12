"use strict";
/* ================= OVERVIEW ================= */
function rOver(){
  const items=[
    {id:'shield', en:'Hospital bills, as charged, for life', cn:'住院账单按实际费用终身保障', span:tr('age 1 to lifetime','1岁起，终身'), bar:[1,100]},
    {id:'scc', en:'Repeated CI payouts, up to 600% of SA', cn:'重疾多次赔付，累计至保额600%', span:tr('to age 75, renewable to 99','保至75岁，可续保至99'), bar:[30,99]},
    {id:'pc', en:'Hospital cash on top of insurance', cn:'保险之外的住院现金', span:tr('renewable to 85','续保至85岁'), bar:[30,85]},
    {id:'lt3', en:'Whole life + multiplier for the working years', cn:'终身寿险+工作年期保障倍数', span:tr('to age 99','至99岁'), bar:[30,99]},
    {id:'tpa', en:'Term cover with cash value on limited pay', cn:'定期保障，限期缴费含现金价值', span:tr('to chosen age, convert by 65','至所选年龄，65岁前可转换'), bar:[30,70]},
    {id:'tpp', en:'Pure term - renewable or to-age, SGD/USD', cn:'纯定期 - 可续保或保至指定年龄', span:tr('to age 99 max','最长至99岁'), bar:[30,99]},
    {id:'tl', en:'Direct-purchase simple term', cn:'直接投保简易定期', span:tr('renewable to 80','可续保至80岁'), bar:[30,80]}
  ];
  const compareRows = items.map(it=>{
    const m = PRODUCT_META[it.id];
    return `<tr>
      <td><b>${PROD[it.id]()}</b><br><span class="muted">${tr(m.bestEn,m.bestCn)}</span></td>
      <td>${tr(m.purposeEn,m.purposeCn)}</td>
      <td>${tr(m.premiumEn,m.premiumCn)}</td>
      <td>${tr(m.coverEn,m.coverCn)}</td>
      <td>${tr(m.claimEn,m.claimCn)}</td>
      <td><button type="button" onclick="openTab('${it.id}')">${tr('Open','打开')}</button></td>
    </tr>`;
  }).join('');
  return head(tr('Comparison tab','对比标签页'),
      tr('Choose by client need first, then open the product tab for timeline details','先按客户需求筛选，再打开产品标签页看时间轴细节'),
      tr('7 products','7个产品'),'navy')
    +`<div class="compare-wrap"><table class="compare">
      <tr>
        <th>${tr('Product','产品')}</th>
        <th>${tr('Main purpose','主要用途')}</th>
        <th>${tr('Premium style','缴费方式')}</th>
        <th>${tr('Coverage span','保障期限')}</th>
        <th>${tr('Claim style','理赔方式')}</th>
        <th></th>
      </tr>
      ${compareRows}
    </table></div>
    <div class="cmp-grid">`+items.map(it=>{
      const w0=(it.bar[0]-1)/99*100, w1=(it.bar[1]-it.bar[0])/99*100;
      return `<div class="cmp-card" style="cursor:pointer" onclick="openTab('${it.id}')">
        <h3>${PROD[it.id]()}</h3>
        <span class="best-for" style="margin-top:0;">${tr('Best for: ','适合：')}${tr(PRODUCT_META[it.id].bestEn,PRODUCT_META[it.id].bestCn)}</span>
        <p style="font-size:13px;margin:4px 0 8px 0;">${tr(it.en,it.cn)}</p>
        <div style="height:12px;background:#f3f1ea;border-radius:6px;position:relative;overflow:hidden;">
          <div style="position:absolute;left:${w0}%;width:${w1}%;top:0;bottom:0;background:var(--primary);border-radius:6px;"></div>
        </div>
        <p class="muted" style="font-size:12px;margin-top:6px;">${it.span}</p>
      </div>`;
    }).join('')+`</div>
    <p class="muted" style="margin-top:14px;font-size:12.5px;">${tr('Coverage bars are indicative spans from a typical entry age of 30 (Shield from age 1).','保障条为示意区间，按典型30岁投保（Shield自1岁起）。')}</p>`;
}

/* ================= render ================= */
const RENDER = {over:rOver, shield:rShield, scc:rScc, pc:rPc, lt3:rLt3, tpa:rTpa, tpp:rTpp, tl:rTl};
function render(){
  document.getElementById('tabs').innerHTML = Object.keys(PROD).map(id=>
    `<button class="${G.tab===id?'active':''}" onclick="openTab('${id}')">${PROD[id]()}</button>`).join('');
  document.getElementById('app').innerHTML = `<div class="panel">${RENDER[G.tab]()}</div>`;
}
renderFooter();
render();
