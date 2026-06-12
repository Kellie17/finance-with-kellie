"use strict";
/* ================= TERM PROTECT ADVANTAGE ================= */
function rTpa(){
  const s=S.tpa;
  const tl = ageline({a0:s.age, a1:s.covTo,
    segs:[{from:s.age,to:s.covTo,label:tr(`Death + TI ${fmt(s.sa)}`,`身故+末疾 ${fmt(s.sa)}`),color:C.primaryDark,lane:1},
          {from:s.age+2,to:s.age+s.pay,label:tr('Cash value builds','现金价值累积'),color:C.good,lane:2,dash:1}],
    markers:[{age:65,label:tr('convert by 65','65岁前转换'),color:C.axis},
             {age:s.covTo,label:tr('cover ends','保障终止'),color:C.primaryDark}],
    payTo:s.age+s.pay, payLabel:tr(`pay ${s.pay} years`,`缴费${s.pay}年`)});
  return head('HSBC Life Term Protect Advantage',
      tr('Flexible term cover with a cash value twist on limited pay','灵活定期保障，限期缴费另有现金价值'),
      tr('Term + cash value','定期+现金价值'),'','tpa')
    +`<div class="controls">
      ${ctrlNum('tpa','age',tr('Entry age','投保年龄'),1,18,60)}
      ${ctrlSel('tpa','covTo',tr('Cover to age','保障至'),[60,65,70,75,80].map(a=>({v:a,t:a})))}
      ${ctrlSel('tpa','pay',tr('Premium term','缴费年期'),[10,15,20].map(p=>({v:p,t:p+tr(' yrs','年')})))}
      ${ctrlNum('tpa','sa',tr('Sum insured S$','保额（新元）'),50000,100000,5000000)}
    </div>`
    +`<div class="tl-wrap">${tl}</div>
    ${timelineNotes([
      tr('Guaranteed cash value starts from policy year 3','保证现金价值自第3保单年度起'),
      tr('Conversion option is available before age 65','65岁前可行使转换权')
    ])}`
    +`<div class="cmp-grid">
      <div class="cmp-card"><h3>${tr('Brochure reference case','手册参考案例')}</h3>
        ${row(tr('Male 35, cover to 70','35岁男性，保障至70岁'),'S$1,000,000')}
        ${row(tr('Pay 15 years','缴费15年'),tr('S$1,818 / yr','每年1,818新元'))}
        ${row(tr('Guaranteed cash value at yr 15','第15年保证现金价值'),'S$15,544')}
        ${row(tr('Disability cover rider','失能附加险'),tr('+S$280 / yr for S$1m','每年另加280新元保100万'))}
        <p class="muted" style="font-size:12px;margin-top:6px;">${tr('Cash value starts in policy year 3, peaks around end of premium term, then runs down to zero at expiry.','现金价值自第3保单年度起累积，约在缴费期末达到峰值，其后逐步降至期满时为零。')}</p>
      </div>
      <div class="cmp-card"><h3>${tr('Flexibility','灵活性')}</h3>
        ${row(tr('Convertibility','转换权'),tr('to whole life/endowment before 65','65岁前转终身/储蓄险'))}
        ${row(tr('Guaranteed insurability','保证可保权'),tr('marriage, child, property, first job','结婚、生育、置业、首份工作'))}
        ${row(tr('Unemployment support','失业支援'),tr('defer premiums up to 365 days','保费最长可延付365天'))}
        ${row(tr('Riders','附加险'),tr('disability, advanced CI cover/waiver','失能、晚期重疾保障/豁免'))}
      </div>
    </div>`;
}

/* ================= TERM PROTECTOR PRIME ================= */
function rTpp(){
  const s=S.tpp;
  let segs=[], markers=[{age:60,label:tr('convert by 60','60岁前转换'),color:C.axis}], end;
  if(s.form==='ren'){
    const lastRen={15:75,20:75,25:74,30:69}[s.term];
    end = Math.min(99, s.age + Math.ceil((lastRen+1-s.age)/s.term)*s.term);
    for(let a=s.age; a<end; a+=s.term){
      segs.push({from:a,to:Math.min(a+s.term,end),label:(a===s.age?tr('first term','首个期限'):tr('renewed','续保')),color:a===s.age?C.primaryDark:C.warn,lane:1});
      if(a>s.age && a!==lastRen) markers.push({age:a,label:tr('renewal','续保'),color:C.warn});
    }
    markers.push({age:lastRen,label:tr('last renewal','最后续保'),color:C.primaryDark});
  } else {
    end = s.toAge;
    segs.push({from:s.age,to:end,label:tr('Death + TI cover','身故+末疾保障'),color:C.primaryDark,lane:1});
    segs.push({from:s.age,to:end,label:tr('Indexation option','指数化选择'),color:C.good,lane:2,dash:1});
  }
  const tl = ageline({a0:s.age, a1:end, segs, markers, payTo:end,
    payLabel:tr('regular premiums','定期缴费')});
  return head('HSBC Life Term Protector Prime',
      tr('Pure term protection - renewable terms or level cover to a chosen age','纯定期保障 - 可续保定期或保至指定年龄'),
      tr('SGD or USD','新元或美元'),'','tpp')
    +`<div class="controls">
      ${segBtns('tpp','form',[{v:'ren',t:tr('Renewable','可续保')},{v:'toage',t:tr('To age','保至指定年龄')}])}
      ${s.form==='ren'
        ? ctrlSel('tpp','term',tr('Term (years)','期限（年）'),[15,20,25,30].map(t=>({v:t,t:t})))
        : ctrlSel('tpp','toAge',tr('Cover to age','保障至'),[50,55,60,65,70,75,85,99].map(a=>({v:a,t:a})))}
      ${ctrlNum('tpp','age',tr('Entry age','投保年龄'),1,18,60)}
    </div>`
    +`<div class="tl-wrap">${tl}</div>
    ${timelineNotes([
      tr('Renewable terms are repriced at renewal age','可续保期限按续保年龄重新定价'),
      tr('To-age form can add yearly indexation','保至指定年龄形式可选择每年指数化')
    ])}`
    +`<div class="cmp-grid">
      <div class="cmp-card"><h3>${tr('Renewable form','可续保形式')}</h3>
        ${row(tr('Terms','期限'),tr('15 / 20 / 25 / 30 years','15/20/25/30年'))}
        ${row(tr('Renewal','续保'),tr('automatic, same term, no underwriting','自动按原期限续保，免核保'))}
        ${row(tr('Last renewal age','最后续保年龄'),'75 / 75 / 74 / 69')}
        ${row(tr('Renewal premium','续保保费'),tr('repriced at attained age','按届时年龄重新定价'))}
      </div>
      <div class="cmp-card"><h3>${tr('To-age form','保至指定年龄形式')}</h3>
        ${row(tr('Cover to','保障至'),tr('age 50-75, 85 or 99','50至75、85或99岁'))}
        ${row(tr('Premiums','保费'),tr('guaranteed within the term','期限内保证不变'))}
        ${row(tr('Indexation option','指数化选择'),tr('+5% or CPI, whichever higher','每年+5%或按通胀，取高者'))}
        ${row(tr('Cash value','现金价值'),tr('none - pure protection','无 - 纯保障'))}
      </div>
    </div>`;
}

/* ================= TERM LITE ================= */
function rTl(){
  const s=S.tl;
  let segs=[], markers=[], end, payLabel;
  if(s.term==='5yr'){
    end = 80;
    for(let a=s.age; a<80; a+=5){
      segs.push({from:a,to:Math.min(a+5,80),label:a===s.age?tr('5-yr term','5年期'):tr('renews','续保'),color:a===s.age?C.primaryDark:C.warn,lane:1});
    }
    markers.push({age:80,label:tr('last renewal','最后续保'),color:C.primaryDark});
    payLabel = tr('premiums reset every 5 years','保费每5年重设');
  } else if(s.term==='20yr'){
    end = s.age+20;
    segs.push({from:s.age,to:end,label:tr('20-year level term','20年定期'),color:C.primaryDark,lane:1});
    payLabel = tr('premiums for 20 years','缴费20年');
  } else {
    end = 65;
    segs.push({from:s.age,to:65,label:tr('cover to age 65','保障至65岁'),color:C.primaryDark,lane:1});
    payLabel = tr('premiums to age 65','缴费至65岁');
  }
  markers.push({age:Math.min(65,end),label:tr('Riders end','附加险终止'),color:C.axis});
  const tl = ageline({a0:s.age, a1:end, segs, markers, payTo:end, payLabel});
  return head('DIRECT - HSBC Life - Term Lite',
      tr('Simple direct-purchase term cover, no advice process','直接投保的简易定期保障，无需顾问流程'),
      tr('S$50k-400k','保额5万至40万'),'grey','tl')
    +`<div class="controls">
      ${segBtns('tl','term',[{v:'5yr',t:tr('5-yr renewable','5年可续保')},{v:'20yr',t:tr('20-yr','20年')},{v:'to65',t:tr('To 65','保至65岁')}])}
      ${ctrlNum('tl','age',tr('Entry age','投保年龄'),1,18,s.term==='to65'?60:65)}
      ${ctrlNum('tl','sa',tr('Coverage S$','保额（新元）'),10000,50000,400000)}
    </div>`
    +`<div class="tl-wrap">${tl}</div>
    ${timelineNotes([
      tr('Direct-purchase term with simpler choices','直接投保定期，选项较简单'),
      tr('TPD and Termcare rider coverage ends at age 65','全残及Termcare附加险保障至65岁')
    ])}`
    +`<div class="cmp-grid">
      <div class="cmp-card"><h3>${tr('What it pays','给付内容')}</h3>
        ${row(tr('Death / terminal illness','身故/末期疾病'),fmt(s.sa))}
        ${row(tr('TPD (advance, to 65)','完全永久失能（预付，至65岁）'),fmt(s.sa))}
        ${row(tr('Termcare rider','Termcare附加险'),tr('30 CIs, to age 65','30种重疾，至65岁'))}
      </div>
      <div class="cmp-card"><h3>${tr('Eligibility','投保资格')}</h3>
        ${row(tr('Entry age, 5-yr & 20-yr','投保年龄（5年/20年期）'),'18-65')}
        ${row(tr('Entry age, to 65','投保年龄（保至65岁）'),'18-60')}
        ${row(tr('Coverage','保额范围'),'S$50,000-400,000')}
        ${row(tr('Early CI / payer waiver','早期重疾/投保人豁免'),tr('not on direct channel - see adviser','直销渠道不提供 - 需经顾问'))}
      </div>
    </div>`;
}
