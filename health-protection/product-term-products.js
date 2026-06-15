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
      tr('Conversion option is available before age 65','65岁前可行使转换权'),
      tr('Limited-pay term cover with no maturity value at the end of the policy term','限期缴费定期保障；保单期满时无期满价值')
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
        ${row(tr('Guaranteed insurability','保证可保权'),tr('marriage/divorce, child, school entry, age 21, property, first full-time job','结婚/离婚、添丁、升学、21岁、置业、首份全职工作'))}
        ${row(tr('Unemployment support','失业支援'),tr('if unemployed at least 30 days, defer premiums up to 365 days','失业至少30天，可延付保费最多365天'))}
        ${row(tr('Limited-pay advantage','限期缴费优势'),tr('complete base premium commitment earlier; rider premiums may still change','较早完成主约缴费承诺；附加险保费仍可能调整'))}
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
      tr('Renewable terms renew automatically and are not dependent on health condition','可续保期限自动续保，且不取决于健康状况'),
      tr('Renewal premiums are repriced at attained age','续保保费按届时年龄重新定价'),
      tr('To-age form can add yearly indexation','保至指定年龄形式可选择每年指数化')
    ])}`
    +`<div class="cmp-grid">
      <div class="cmp-card"><h3>${tr('Renewable form','可续保形式')}</h3>
        ${row(tr('Terms','期限'),tr('15 / 20 / 25 / 30 years','15/20/25/30年'))}
        ${row(tr('Renewal','续保'),tr('automatic, same term, no underwriting','自动按原期限续保，免核保'))}
        ${row(tr('Last renewal age','最后续保年龄'),'75 / 75 / 74 / 69')}
        ${row(tr('Renewal premium','续保保费'),tr('repriced at attained age','按届时年龄重新定价'))}
        ${row(tr('Maximum expiry','最高满期年龄'),'99')}
      </div>
      <div class="cmp-card"><h3>${tr('To-age form','保至指定年龄形式')}</h3>
        ${row(tr('Cover to','保障至'),tr('age 50-75, 85 or 99','50至75、85或99岁'))}
        ${row(tr('Premiums','保费'),tr('guaranteed within the term','期限内保证不变'))}
        ${row(tr('Indexation option','指数化选择'),tr('+5% or CPI, whichever higher','每年+5%或按通胀，取高者'))}
        ${row(tr('Indexation stops','指数化终止'),tr('age 60 or 5 years before expiry, earlier of both','60岁或期满前5年，以较早者为准'))}
        ${row(tr('Cash value','现金价值'),tr('none - pure protection','无 - 纯保障'))}
      </div>
      <div class="cmp-card"><h3>${tr('Conversion & riders','转换权与附加险')}</h3>
        ${row(tr('Convertibility','转换权'),tr('from 1st policy anniversary, age 60 or younger','第1保单周年后且60岁或以下'))}
        ${row(tr('Conversion limits','转换限制'),tr('same or lower SA, no partial conversion, no admitted claim','相同或较低保额，不可部分转换，无已获批理赔'))}
        ${row(tr('Currency','币种'),tr('SGD or USD','新元或美元'))}
        ${row(tr('CI / TPD riders','重疾/全残附加险'),tr('Advance CI, CI Plus, Early CI II, Advance TPD II','预支重疾、重疾Plus、早期重疾II、预支全残II'))}
        ${row(tr('Waiver / survival riders','豁免/生存给付'),tr('Premium Waiver, Payer PremiumEraser, Survival Payout to-age 99','保费豁免、投保人豁免、99岁期满生存给付'))}
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
      tr('5-year term renews every 5 years regardless of health condition, up to last renewal age 80','5年期每5年续保，不受健康状况影响，最后续保年龄80岁'),
      tr('TPD and Termcare rider coverage ends at age 65','全残及Termcare附加险保障至65岁')
    ])}`
    +`<div class="cmp-grid">
      <div class="cmp-card"><h3>${tr('What it pays','给付内容')}</h3>
        ${row(tr('Death / terminal illness','身故/末期疾病'),fmt(s.sa))}
        ${row(tr('TPD (advance, to 65)','完全永久失能（预付，至65岁）'),fmt(s.sa))}
        ${row(tr('Termcare rider','Termcare附加险'),tr('30 CIs, to age 65','30种重疾，至65岁'))}
      </div>
      <div class="cmp-card"><h3>${tr('Eligibility','投保资格')}</h3>
        ${row(tr('Entry age, 5-yr renewable','投保年龄（5年可续保）'),'18-65')}
        ${row(tr('Entry age, 20-yr','投保年龄（20年期）'),'18-60')}
        ${row(tr('Entry age, to 65','投保年龄（保至65岁）'),'18-60')}
        ${row(tr('Coverage','保额范围'),'S$50,000-400,000')}
        ${row(tr('Early CI / payer waiver','早期重疾/投保人豁免'),tr('not on direct channel - see adviser','直销渠道不提供 - 需经顾问'))}
      </div>
      <div class="cmp-card"><h3>${tr('Simple purchase flow','简易投保流程')}</h3>
        ${row('1',tr('Choose cover amount and policy term','选择保障额及保单期限'))}
        ${row('2',tr('Choose payment frequency and optional cover','选择缴费频率及可选保障'))}
        ${row('3',tr('Fill in personal details','填写个人资料'))}
        ${row('4',tr('Prepare required documents','准备相关文件'))}
        ${row('5',tr('Make payment and wait for approval','付款并等待批核'))}
      </div>
    </div>`;
}

/* ================= HAPPYMUMMY / HAPPYFAMILY ================= */
function rHappy(){
  const stages=[
    {hEn:'From week 13', hCn:'怀孕第13周起', bEn:'EmpoweredMum covers mother for death, pregnancy complications, hospital care and early delivery by caesarean section.', bCn:'EmpoweredMum开始保障母亲：身故、妊娠并发症、住院护理及早产剖腹产。'},
    {hEn:'Birth of child', hCn:'宝宝出生', bEn:'Newborn cover starts for death, congenital illnesses, hospital care and developmental delay.', bCn:'新生儿保障开始：身故、先天性疾病、住院护理及发育迟缓。'},
    {hEn:'Within 60 days', hCn:'出生后60天内', bEn:'Apply for free first-year Shield Plan B and use transfer or newborn purchase options without underwriting.', bCn:'申请首年免费Shield B计划，并可免核保行使转移或新生儿投保选择。'},
    {hEn:'End of year 3', hCn:'第3保单年度末', bEn:'EmpoweredMum ends; Flexi Protector or Life Treasure III can continue for mother or child.', bCn:'EmpoweredMum终止；Flexi Protector或Life Treasure III可继续保障母亲或孩子。'}
  ];
  const pregnancy=[
    'Abruptio placentae','Amniotic fluid embolism','Choriocarcinoma and malignant hydatidiform mole',
    'Disseminated intravascular coagulation','Fatty liver of pregnancy',
    'Gestational diabetes mellitus resulting in foetal macrosomia and neonatal hypoglycaemia',
    'HELLP syndrome','Incompetent cervix leading to preterm birth','Miscarriage due to accident',
    'Placenta increta or percreta','Postpartum haemorrhage requiring hysterectomy',
    'Pre-eclampsia with severe features or eclampsia','Still birth','Uterine rupture','Vasa previa'
  ];
  const congenital=[
    'Absence of 2 limbs','Anal atresia','Atrial septal defect','Biliary atresia','Cerebral palsy',
    'Cleft palate or cleft lip','Club foot','Coarctation of the aorta',
    'Congenital Abnormalities of the Kidney and Urinary Tract (CAKUT)','Congenital blindness',
    'Congenital cataract','Congenital deafness','Congenital diaphragmatic hernia',
    'Congenital dislocation of hip','Congenital hypertrophic pyloric stenosis',
    'Development dysplasia of the hip','Down syndrome','Infantile hydrocephalus',
    'Patent ductus arteriosus','Retinopathy of prematurity','Spina bifida','Tetralogy of Fallot',
    'Tracheo-esophageal fistula or esophageal atresia','Transposition of great vessel',
    'Truncus arteriosis','Ventricular septal defect'
  ];
  const motherHospital=[
    'Any covered pregnancy complication','Complications of lactational mastitis','Inpatient psychiatric treatment',
    'Post-natal anaemia','Puerperal pyrexia','Pulmonary embolism','Repair of 4th degree perineal tear',
    'Septic pelvic thrombophlebitis','Surgical site infection following caesarean section',
    'Uterine infection or transfusion due to retained placenta following childbirth'
  ];
  const childHospital=[
    'Admission into ICU or HDU','Avian influenza A (H7N9) and (H5N1)','Chikungunya fever',
    'Creutzfeldt-Jakob disease','Dengue haemorrhagic fever','Ebola',
    'Hospitalisation as an inpatient due to hand, foot and mouth disease',
    'Incubation of the newborn child for more than 3 consecutive days immediately following birth',
    'Japanese encephalitis','Malaria','Nipah virus encephalitis',
    'Phototherapy or blood transfusion for severe neonatal jaundice',
    'Premature birth requiring neo-natal ICU or HDU','Rabies','Severe measles','Typhoid fever','Zika virus'
  ];
  const list=items=>`<ol>${items.map(x=>`<li>${x}</li>`).join('')}</ol>`;
  return head('HSBC Life HappyMummy / HappyFamily',
      tr('EmpoweredMum prenatal cover bundled with Flexi Protector or Life Treasure III','EmpoweredMum孕期保障，搭配Flexi Protector或Life Treasure III'),
      tr('Prenatal + family','孕期+家庭'),'','happy')
    +`<div class="stage-flow">${stages.map(s=>`
      <div class="stage-card"><b>${tr(s.hEn,s.hCn)}</b><span>${tr(s.bEn,s.bCn)}</span></div>`).join('')}</div>
    ${timelineNotes([
      tr('EmpoweredMum is a 3-year single premium prenatal plan','EmpoweredMum为3年期趸缴孕期计划'),
      tr('Mother is covered from the 13th week of pregnancy','母亲自怀孕第13周起受保'),
      tr('Free first-year Shield Plan B must be applied for within 60 days from birth','首年免费Shield B计划须在宝宝出生后60天内申请')
    ])}`
    +`<div class="cmp-grid">
      <div class="cmp-card"><h3>${tr('Mother benefits','母亲保障')}</h3>
        ${row(tr('Early C-section','早产剖腹产'),tr('15% SA, medically necessary, before 36 weeks, singleton only','保额15%，须医学需要，36周前，仅单胎'))}
        ${row(tr('Pregnancy complications','妊娠并发症'),tr('100% SA for any of 15 conditions','15种疾病之一给付保额100%'))}
        ${row(tr('Hospital care','住院护理'),tr('2% SA per day, up to 30 days, 10 events','每日保额2%，最多30天，10类事件'))}
        ${row(tr('Death benefit','身故给付'),tr('100% SA','保额100%'))}
      </div>
      <div class="cmp-card"><h3>${tr('Baby benefits','宝宝保障')}</h3>
        ${row(tr('Congenital illnesses','先天性疾病'),tr('100% SA for any of 26 conditions','26种疾病之一给付保额100%'))}
        ${row(tr('Hospital care','住院护理'),tr('2% SA per day, up to 30 days, 17 events','每日保额2%，最多30天，17类事件'))}
        ${row(tr('Developmental delay','发育迟缓'),tr('15% SA, capped S$3,000, from attained age 28 months','保额15%，上限3,000新元，自28个月起'))}
        ${row(tr('Death benefit','身故给付'),tr('100% SA','保额100%'))}
      </div>
      <div class="cmp-card"><h3>${tr('Bundle options','搭配方式')}</h3>
        ${row('HappyMummy',tr('EmpoweredMum + Flexi Protector or Life Treasure III for mother or newborn','EmpoweredMum + 母亲或新生儿的Flexi Protector或Life Treasure III'))}
        ${row(tr('Transfer option','转移选择'),tr('transfer Flexi Protector or Life Treasure III cover from mother to child within 60 days, no underwriting','60天内可将Flexi Protector或Life Treasure III保障由母亲转至孩子，免核保'))}
        ${row('HappyFamily',tr('parents may buy Flexi Protector or Life Treasure III for newborn within 60 days, no underwriting','父母可在60天内为新生儿投保Flexi Protector或Life Treasure III，免核保'))}
        ${row(tr('Shield Plan B','Shield B计划'),tr('free 1st-year basic premium; MediShield Life/rider premiums still payable','首年基本计划保费免费；仍须缴付终身健保及附加险保费'))}
      </div>
      <div class="cmp-card"><h3>${tr('Important limits','重要限制')}</h3>
        ${row(tr('Benefit termination','保障终止'),tr('pregnancy complication / congenital illness benefit terminates once paid','妊娠并发症/先天性疾病给付后该项终止'))}
        ${row(tr('Shield exclusions','Shield除外'),tr('known pre-existing or congenital conditions are not covered under the free Shield offer','免费Shield优惠不保障已知既往或先天状况'))}
        ${row(tr('Definitions','定义'),tr('full definitions are in the EmpoweredMum product summary','完整定义以EmpoweredMum产品摘要为准'))}
      </div>
    </div>
    <details class="rules"><summary>${tr('Covered condition lists from the brochure','产品手册列明的受保疾病清单')}</summary>
      <div class="condition-grid">
        <div><h4>${tr('Pregnancy complications (15)','妊娠并发症（15）')}</h4>${list(pregnancy)}</div>
        <div><h4>${tr('Congenital illnesses (26)','先天性疾病（26）')}</h4>${list(congenital)}</div>
        <div><h4>${tr('Mother hospital care events (10)','母亲住院护理事件（10）')}</h4>${list(motherHospital)}</div>
        <div><h4>${tr('Child hospital care events (17)','宝宝住院护理事件（17）')}</h4>${list(childHospital)}</div>
      </div>
    </details>`;
}
