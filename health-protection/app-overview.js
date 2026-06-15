"use strict";
/* ================= HAPPYMUMMY / HAPPYFAMILY ================= */
function happySubnav(active){
const tabs=[
  {v:'cover', t:tr('HappyMummy cover','HappyMummy保障')},
  {v:'cost', t:tr('Singapore child cost','新加坡育儿成本')}
];
return `<div class="controls" style="margin-top:8px;"><div class="ctrl"><label>${tr('HappyMummy sub-tab','HappyMummy子标签')}</label><div class="seg">`+
  tabs.map(t=>`<button class="${active===t.v?'active':''}" onclick="set('happy','view','${t.v}')">${t.t}</button>`).join('')+
  `</div></div></div>`;
}
function rHappyCover(){
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
  + happySubnav('cover')
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

function costLine(main,sub){ return `<b>${main}</b><br><span class="muted">${sub}</span>`; }
function rHappyCost(){
const rows=[
  {
    stage:tr('Expecting: checkups','怀孕：产检'),
    basic:costLine('S$500 - S$1,500',tr('public/subsidised route, team care, budget extra for tests and supplements','公立/津贴路线，团队护理；另预留检查及补充剂')),
    adv:costLine('S$1,500 - S$4,000',tr('private gynae package plus detailed scan, blood tests, OGTT or NIPT if chosen','私人妇产科配套，加详细扫描、验血、糖耐或NIPT')),
    lux:costLine('S$4,000 - S$10,000+',tr('senior private gynae, high-risk monitoring, frequent scans or specialist tests','资深私人医生、高风险监测、频密扫描或专科检查')),
    note:tr('KKH private antenatal package starts from S$818 before GST; private visits often run about S$120 - S$350 with scan depending on clinic. MediSave Maternity Package can reimburse up to S$900 for pre-delivery expenses.','KKH私人产检配套从税前818新元起；私人门诊含扫描常见约120至350新元。保健储蓄产妇配套可报销产前费用最高900新元。')
  },
  {
    stage:tr('Pregnancy medicine','孕期药物'),
    basic:costLine('S$100 - S$500',tr('routine vitamins, iron, folate, calcium, nausea medication if prescribed','常规维生素、铁、叶酸、钙、止吐药等')),
    adv:costLine('S$500 - S$3,000',tr('condition-based support such as progesterone, aspirin, injections or extra review','按情况使用黄体酮、阿司匹林、针剂或额外复诊')),
    lux:costLine('S$3,000+',tr('fertility/high-risk pregnancy support, frequent labs or specialist medication','生育/高风险孕期支持、频密化验或专科药物')),
    note:tr('There is no standard baby-stabilising medication for every pregnancy. Treat this as doctor-dependent and never self-prescribe.','并非每个孕期都有标准保胎药物；必须以医生诊断为准，切勿自行用药。')
  },
  {
    stage:tr('Delivery: natural birth','分娩：自然产'),
    basic:costLine('S$946 - S$1,609 median',tr('NUH/SGH subsidised B2/C median examples from MOH bill sizes','MOH账单资料中NUH/SGH津贴B2/C中位数例子')),
    adv:costLine('S$4,345 - S$9,263 median',tr('public B1/private gynae or private 2-bed/4-bed examples','公立B1/私人医生或私人医院2/4人房例子')),
    lux:costLine('S$10,287 - S$13,367+ median',tr('private 1-bed examples; suites and complications can be much higher','私人医院1人房例子；套房及并发症可更高')),
    note:tr('MOH figures are before insurance and MediSave payouts; public hospital figures are after subsidies where applicable.','MOH数字为保险及保健储蓄赔付前；公立医院数字如适用已扣政府津贴。')
  },
  {
    stage:tr('Delivery: C-section','分娩：剖腹产'),
    basic:costLine('S$2,240 - S$3,237 median',tr('NUH/SGH subsidised B2/C median examples from MOH bill sizes','MOH账单资料中NUH/SGH津贴B2/C中位数例子')),
    adv:costLine('S$8,222 - S$13,780 median',tr('public B1/private or private 2-bed examples','公立B1/私人或私人医院2人房例子')),
    lux:costLine('S$15,074 - S$19,494+ median',tr('private 1-bed examples; complex cases and suites can exceed this','私人医院1人房例子；复杂个案及套房可超过此范围')),
    note:tr('C-section usually adds surgeon and anaesthetist fees. MOH benchmark doctor fee ranges are higher than vaginal delivery.','剖腹产通常另有手术医生及麻醉医生费用，MOH医生费基准高于自然产。')
  },
  {
    stage:tr('Baby jaundice','宝宝黄疸'),
    basic:costLine('S$298 + S$99/night',tr('home phototherapy rental if baby is suitable and paediatrician agrees','宝宝合适且儿科医生同意时，可用居家光疗租赁')),
    adv:costLine('S$800 - S$3,000+',tr('hospital phototherapy/readmission depending on ward and length of stay','医院光疗/再入院，视病房和住院天数而定')),
    lux:costLine('S$3,000 - S$8,000+',tr('private hospital readmission, paediatrician fees, longer monitoring or severe jaundice','私人医院再入院、儿科医生费、较长监测或严重黄疸')),
    note:tr('Severe neonatal jaundice can require hospital care or exchange transfusion. Do not delay clinical review.','严重新生儿黄疸可能需要住院甚至换血治疗，不应延迟就医。')
  },
  {
    stage:tr('Confinement','月子护理'),
    basic:costLine('S$800 - S$2,500',tr('DIY with confinement meals, part-time cleaning or family help','自己安排月子餐、兼职清洁或家人帮忙')),
    adv:costLine('S$2,300 - S$5,000',tr('28-day stay-in confinement nanny, before levy, angbao and food for nanny','28天住家月嫂，不含税费、红包及月嫂膳食')),
    lux:costLine('S$15,888 - S$42,000+',tr('confinement centre or premium confinement hotel for 28 days','月子中心或高端月子酒店28天')),
    note:tr('Peak periods, twins, festive surcharges and room category can change the quote materially.','旺季、双胞胎、节日附加费及房型会明显影响报价。')
  },
  {
    stage:tr('Baby necessities, first year','宝宝用品，第一年'),
    basic:costLine('S$5,000 - S$10,000',tr('mix of gifts, second-hand gear, basic stroller/cot, diapers, wipes, checkups','礼物、二手用品、基本推车/婴儿床、尿片、湿巾、体检')),
    adv:costLine('S$10,000 - S$20,000',tr('new gear, private paediatrician, S-26/formula, pump, steriliser, bottles, toys','新用品、私人儿科、S-26/奶粉、吸奶器、消毒机、奶瓶、玩具')),
    lux:costLine('S$25,000+',tr('premium stroller/car seat, smart cot, UV/anti-germ machines, premium formula, frequent private care','高端推车/安全座椅、智能婴儿床、UV/抗菌设备、高端奶粉、频密私人医疗')),
    note:tr('FairPrice S-26 Stage 1 is S$71.80 per 900g tin. Four tins a month is about S$287.20 before diapers and wipes.','FairPrice S-26一段900克每罐71.80新元；每月4罐约287.20新元，未含尿片及湿巾。')
  },
  {
    stage:tr('Childcare, 2 months to 6 years','托婴/托儿，2个月至6岁'),
    basic:costLine('S$3 - S$746/month net',tr('AOP/POP centre after subsidies; amount depends heavily on income and work status','AOP/POP中心扣津贴后，取决于收入及工作状态')),
    adv:costLine('S$900 - S$2,000/month net',tr('private preschool after basic subsidy; varies by centre and enrichment','私人幼儿园扣基本津贴后，视中心及课程而定')),
    lux:costLine('S$2,500 - S$3,500+/month',tr('premium private preschool or international-style early years programme','高端私人幼儿园或国际课程式学前教育')),
    note:tr('From Jan 2026, AOP full-day childcare cap is S$610 before GST and POP cap is S$650 before GST. Working mothers get basic subsidies of S$600 infant care or S$300 childcare, plus means-tested additional subsidy.','2026年1月起，AOP全日托儿上限税前610新元，POP税前650新元。工作母亲托婴基本津贴600新元或托儿300新元，并可按收入获额外津贴。')
  },
  {
    stage:tr('Primary school','小学'),
    basic:costLine('S$500 - S$1,500/year',tr('MOE school fee S$0 for Singapore Citizens; budget for books, uniform, transport, meals','公民MOE学费0新元；预留课本、校服、交通、餐食')),
    adv:costLine('S$3,000 - S$10,000/year',tr('MOE school plus tuition, enrichment, sport/music or holiday programmes','MOE学校加补习、才艺、运动/音乐或假期课程')),
    lux:costLine('S$25,000 - S$50,000+/year',tr('international/private school path, transport and activities extra','国际/私立学校路线，交通及活动另计')),
    note:tr('Government school fees are low, but enrichment choices can dominate the real bill.','政府学校费用低，但补习和才艺选择会成为真正的大头。')
  },
  {
    stage:tr('Secondary school','中学'),
    basic:costLine('S$300 - S$2,000/year',tr('MOE school fee S$5/month for Singapore Citizens plus misc, books and transport','公民MOE学费每月5新元，另有杂费、书本及交通')),
    adv:costLine('S$4,000 - S$15,000/year',tr('tuition, O-level/IP support, CCA gear, laptop and enrichment','补习、O水准/IP支持、CCA装备、电脑及才艺')),
    lux:costLine('S$30,000 - S$60,000+/year',tr('independent/international pathway or premium overseas boarding option','独立/国际路线或高端海外寄宿')),
    note:tr('SC monthly school fees remain S$5 for secondary and S$6 for pre-university in government and government-aided schools.','公民在政府及政府资助学校中学月费维持5新元，大学预科6新元。')
  },
  {
    stage:tr('JC or Polytechnic','JC或理工学院'),
    basic:costLine('JC S$500 - S$1,500 total; Poly ~S$9,500 total',tr('JC school fee S$6/month plus misc; poly about S$3.17k - S$3.19k/year after MOE grant','JC月费6新元加杂费；理工学院扣MOE津贴后约每年3,170至3,190新元')),
    adv:costLine('S$5,000 - S$20,000 total',tr('extra tuition, laptop, transport, project materials and internships','额外补习、电脑、交通、项目材料及实习')),
    lux:costLine('S$40,000 - S$150,000+',tr('private diploma, international pre-university or overseas foundation route','私立文凭、国际大学预科或海外预科路线')),
    note:tr('Polytechnic fees are cohort-based. SP and NYP list AY2026 Singapore Citizen fees around S$3.17k - S$3.19k per academic year.','理工学院费用按入学批次固定。SP及NYP列明AY2026公民年费约3,170至3,190新元。')
  },
  {
    stage:tr('University','大学'),
    basic:costLine('S$33,000 - S$50,000',tr('local subsidised non-medical degree while living at home','本地受津贴非医学学位，住家')),
    adv:costLine('S$60,000 - S$160,000',tr('local degree with hostel/exchange, or medicine/dentistry/law path','本地大学加宿舍/交换，或医学/牙科/法律路线')),
    lux:costLine('S$250,000 - S$700,000+',tr('overseas university with living costs, flights and exchange-rate risk','海外大学含生活费、机票及汇率风险')),
    note:tr('NUS AY2026/27 SC tuition ranges from S$8,250 - S$9,650/year for many courses, S$12,700 law, and S$30,200 medicine or dentistry.','NUS AY2026/27公民学费多数课程每年8,250至9,650新元，法律12,700新元，医学或牙科30,200新元。')
  }
];
const totalCards=[
  {h:tr('Basic path','基础选择'), a:'S$180k - S$280k', p:tr('public/subsidised delivery, AOP/POP preschool, MOE schools, local subsidised university','公立/津贴分娩，AOP/POP幼儿园，MOE学校，本地受津贴大学')},
  {h:tr('Advanced path','进阶选择'), a:'S$350k - S$650k', p:tr('private gynae, mixed private childcare, enrichment, local uni with hostel/exchange','私人妇产科，部分私人托育，补习才艺，本地大学加宿舍/交换')},
  {h:tr('Luxury path','高端选择'), a:'S$900k - S$1.8m+', p:tr('private 1-bed/suite, confinement centre, premium preschool, international/overseas education','私人1人房/套房，月子中心，高端幼儿园，国际/海外教育')}
];
return head(tr('Cost of Raising a Child in Singapore','在新加坡养育孩子的成本'),
    tr('Planning ranges from pregnancy to university, before Baby Bonus/CDA unless stated','从怀孕到大学的规划区间，除特别注明外未扣Baby Bonus/CDA'),
    tr('Cost planner','成本规划'),'navy','happy')
  + happySubnav('cost')
  + `<div class="cost-kpis">${totalCards.map(c=>`
    <div class="cost-kpi"><h3>${c.h}</h3><span class="amt">${c.a}</span><p>${c.p}</p></div>`).join('')}</div>
  ${timelineNotes([
    tr('Pregnancy, birth and first year are the biggest cash-flow shock','怀孕、分娩及第一年通常是现金流冲击最大阶段'),
    tr('Childcare and enrichment become the recurring monthly cost','托育及补习才艺会成为长期月度开支'),
    tr('University or overseas education is the long-term lump-sum goal','大学或海外教育是长期大额目标')
  ])}
  <div class="compare-wrap"><table class="compare cost">
    <tr>
      <th>${tr('Stage','阶段')}</th>
      <th>${tr('Basic','基础')}</th>
      <th>${tr('Advanced','进阶')}</th>
      <th>${tr('Luxury','高端')}</th>
      <th>${tr('Planning note','规划备注')}</th>
    </tr>
    ${rows.map(r=>`<tr>
      <td>${r.stage}</td>
      <td>${r.basic}</td>
      <td>${r.adv}</td>
      <td>${r.lux}</td>
      <td>${r.note}</td>
    </tr>`).join('')}
  </table></div>
  <p class="cost-note"><b>${tr('Important.','重要。')}</b> ${tr('These are planning ranges, not medical advice and not a quote. Delivery complications, NICU, helper/car/housing, parent income disruption, insurance claims and subsidies can move the final number sharply.','这些是规划区间，不是医疗建议，也不是报价。分娩并发症、NICU、女佣/车/住房、父母收入中断、保险理赔及津贴都会大幅改变最终数字。')}</p>
  <p class="mini-source">${tr('Research updated 15 Jun 2026 from MOH, ECDA, MOE, polytechnic and NUS fee pages, plus current market price references in the Source Pack.','研究于2026年6月15日更新，来源包括MOH、ECDA、MOE、理工学院及NUS费用页面，以及资料包内的当前市场价格参考。')}</p>`;
}

function rHappy(){
return (S.happy.view || 'cover') === 'cost' ? rHappyCost() : rHappyCover();
}

/* ================= OVERVIEW ================= */
function rOver(){
const items=[
  {id:'shield', en:'Hospital bills, as charged, for life', cn:'住院账单按实际费用终身保障', span:tr('age 1 to lifetime','1岁起，终身'), bar:[1,100]},
  {id:'happy', en:'Prenatal cover plus newborn and family protection bridge', cn:'孕期保障加新生儿及家庭保障衔接', span:tr('week 13 to year 3, then bundled continuation','孕13周至第3年，其后由搭配计划延续'), bar:[1,3]},
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
    tr('8 products','8个产品'),'navy')
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
  <p class="muted" style="margin-top:14px;font-size:12.5px;">${tr('Coverage bars are indicative spans from a typical entry age of 30, except Shield from age 1 and HappyMummy / HappyFamily from pregnancy week 13.','保障条为示意区间，通常按30岁投保；Shield自1岁起，HappyMummy / HappyFamily自怀孕第13周起。')}</p>`;
}

/* ================= render ================= */
const RENDER = {over:rOver, shield:rShield, happy:rHappy, scc:rScc, pc:rPc, lt3:rLt3, tpa:rTpa, tpp:rTpp, tl:rTl};
function render(){
document.getElementById('tabs').innerHTML = Object.keys(PROD).map(id=>
  `<button class="${G.tab===id?'active':''}" onclick="openTab('${id}')">${PROD[id]()}</button>`).join('');
document.getElementById('app').innerHTML = `<div class="panel">${RENDER[G.tab]()}</div>`;
}
renderFooter();
render();
