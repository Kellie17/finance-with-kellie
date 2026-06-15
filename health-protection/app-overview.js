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
    note:tr('Delivery-only, MOH medians show C-section is materially higher than natural birth: about +S$1.2k to +S$1.7k in subsidised B2/C, +S$3.8k to +S$4.0k in public A/B1, and +S$4.8k to +S$8.2k+ in private 1-bed examples.','只看分娩账单，MOH中位数显示剖腹产明显高于自然产：津贴B2/C约多1.2千至1.7千新元，公立A/B1约多3.8千至4.0千新元，私人1人房例子约多4.8千至8.2千新元以上。')
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
const ppCell=(label,html)=>`<div class="pp-cell"><em>${label}</em>${html}</div>`;
const prePrimaryCards=[
  {
    tier:tr('Basic','基础'), total:'S$8k - S$70k',
    note:tr('public/subsidised delivery path, AOP/POP childcare, low gear spend','公立/津贴分娩路线、AOP/POP托育、低用品开支'),
    setup:tr('S$8k - S$18k','8千至1.8万新元'), monthly:'S$3 - S$746', yearly:'S$36 - S$8,952',
    childTotal:'S$210 - S$52k'
  },
  {
    tier:tr('Advanced','进阶'), total:'S$82k - S$189k',
    note:tr('private gynae, nanny, new baby setup and private preschool','私人妇产科、月嫂、新宝宝用品及私人幼儿园'),
    setup:tr('S$19k - S$49k','1.9万至4.9万新元'), monthly:'S$900 - S$2,000', yearly:'S$10,800 - S$24,000',
    childTotal:'S$63k - S$140k'
  },
  {
    tier:tr('Luxury','高端'), total:'S$236k - S$353k+',
    note:tr('private 1-bed or suite, confinement centre and premium preschool','私人1人房或套房、月子中心及高端幼儿园'),
    setup:tr('S$61k - S$108k+','6.1万至10.8万新元以上'), monthly:'S$2,500 - S$3,500+', yearly:'S$30,000 - S$42,000+',
    childTotal:'S$175k - S$245k+',
    hot:true
  }
];
const prePrimaryGroups=[
  {
    h:tr('1. Birth and first-year setup','1. 分娩及第一年准备'),
    rows:[
      {l:tr('Natural birth route','自然产路线'),
       b:costLine('S$8k - S$16k',tr('checkups, medicine, delivery, jaundice, confinement, first-year necessities','产检、药物、分娩、黄疸、月子、第一年用品')),
       a:costLine('S$19k - S$44k',tr('private gynae, mixed hospital route, nanny, new gear and formula','私人妇产科、公私立医院组合、月嫂、新用品及奶粉')),
       x:costLine('S$61k - S$102k+',tr('senior private care, private 1-bed, confinement centre and premium setup','资深私人医疗、私人1人房、月子中心及高端用品'))},
      {l:tr('C-section route','剖腹产路线'),
       b:costLine('S$9k - S$18k',tr('same basket, using subsidised C-section examples','同一篮子，按津贴剖腹产例子')),
       a:costLine('S$23k - S$49k',tr('same basket, using public B1/private or private 2-bed examples','同一篮子，按公立B1/私人或私人2人房例子')),
       x:costLine('S$66k - S$108k+',tr('same basket, using private 1-bed/suite-style range','同一篮子，按私人1人房/套房式区间'))},
      {l:tr('Baby necessities average','宝宝用品平均'),
       b:costLine('S$417 - S$833/month',tr('about S$5k - S$10k/year','约每年5千至1万新元')),
       a:costLine('S$833 - S$1,667/month',tr('about S$10k - S$20k/year','约每年1万至2万新元')),
       x:costLine('S$2,083+/month',tr('about S$25k+/year','约每年2.5万新元以上'))}
    ]
  },
  {
    h:tr('2. Recurring childcare burn','2. 托育持续开支'),
    rows:[
      {l:tr('Monthly childcare','每月托育'),
       b:costLine('S$3 - S$746/month net',tr('after AOP/POP subsidies, income-dependent','扣AOP/POP津贴后，视收入而定')),
       a:costLine('S$900 - S$2,000/month net',tr('private preschool after basic subsidy','私人幼儿园扣基本津贴后')),
       x:costLine('S$2,500 - S$3,500+/month',tr('premium private or international-style preschool','高端私人或国际课程式幼儿园'))},
      {l:tr('Yearly childcare','年度托育'),
       b:costLine('S$36 - S$8,952/year',tr('12 months of monthly range','月度区间乘12个月')),
       a:costLine('S$10,800 - S$24,000/year',tr('12 months of monthly range','月度区间乘12个月')),
       x:costLine('S$30,000 - S$42,000+/year',tr('12 months of monthly range','月度区间乘12个月'))},
      {l:tr('Childcare total before Primary 1','上小学前托育总额'),
       b:costLine('S$210 - S$52k',tr('about 70 months from 2 months old to age 6','约70个月，从2个月大至6岁')),
       a:costLine('S$63k - S$140k',tr('about 70 months from 2 months old to age 6','约70个月，从2个月大至6岁')),
       x:costLine('S$175k - S$245k+',tr('about 70 months from 2 months old to age 6','约70个月，从2个月大至6岁'))}
    ]
  },
  {
    h:tr('3. All-in before Primary 1','3. 上小学前总额'),
    rows:[
      {l:tr('Natural birth path','自然产路线'),
       b:costLine('S$8k - S$69k',tr('one-off setup plus childcare total','一次性准备加托育总额')),
       a:costLine('S$82k - S$184k',tr('one-off setup plus childcare total','一次性准备加托育总额')),
       x:costLine('S$236k - S$347k+',tr('one-off setup plus childcare total','一次性准备加托育总额'))},
      {l:tr('C-section path','剖腹产路线'),
       b:costLine('S$9k - S$70k',tr('one-off setup plus childcare total','一次性准备加托育总额')),
       a:costLine('S$86k - S$189k',tr('one-off setup plus childcare total','一次性准备加托育总额')),
       x:costLine('S$241k - S$353k+',tr('one-off setup plus childcare total','一次性准备加托育总额'))}
    ]
  }
];
const trimesterCards=[
  {
    h:tr('1st trimester','第一孕期'),
    weeks:tr('Weeks 1-12','第1-12周'),
    visits:tr('1-2 doctor visits','看医生1-2次'),
    mediumCost:'S$600 - S$1,500',
    highCost:'S$900 - S$2,800+',
    note:tr('Confirm pregnancy, dating scan, baseline blood tests and optional Down syndrome screening. This is where first-consult + scan + bloodwork can quickly feel like hundreds.','确认怀孕、预产期扫描、基础验血及可选唐氏筛查。第一次门诊加扫描和验血，很容易就是数百新元。')
  },
  {
    h:tr('2nd trimester','第二孕期'),
    weeks:tr('Weeks 13-27','第13-27周'),
    visits:tr('3-4 doctor visits','看医生3-4次'),
    mediumCost:'S$800 - S$2,200',
    highCost:'S$1,200 - S$3,500+',
    note:tr('Monthly reviews plus the 20-week anomaly scan, anaemia check, OGTT and pregnancy vaccines if advised. Package coverage varies, so add-ons matter.','每月复诊，加20周结构扫描、贫血检查、妊娠糖尿病OGTT及医生建议的孕期疫苗。配套涵盖不同，额外项目会影响总额。')
  },
  {
    h:tr('3rd trimester','第三孕期'),
    weeks:tr('Week 28 to delivery','第28周至分娩'),
    visits:tr('5-8 doctor visits','看医生5-8次'),
    mediumCost:'S$1,200 - S$3,500',
    highCost:'S$2,000 - S$5,000+',
    note:tr('Visits step up to every 2 weeks, then weekly near delivery; budget for growth scan, GBS swab and extra monitoring if needed.','复诊会增加至约每两周一次，临近分娩每周一次；预留成长扫描、GBS拭子及必要额外监测。')
  },
  {
    h:tr('4th trimester','第四孕期'),
    weeks:tr('Birth to 12 weeks after delivery','出生至产后12周'),
    visits:tr('2-5 doctor visits','看医生2-5次'),
    mediumCost:'S$300 - S$1,800',
    highCost:'S$500 - S$2,500+',
    note:tr('Mother postnatal review plus baby weight, jaundice, feeding and vaccination/development checks. Extra jaundice review can add cost.','妈妈产后复诊，加宝宝体重、黄疸、喂养及疫苗/发育检查。额外黄疸复查会增加费用。')
  }
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
  <section class="visit-rhythm">
    <div class="visit-title">
      <h3>${tr('Pregnancy Visit Rhythm and Check-up Cost','孕期复诊次数与产检费用')}</h3>
      <p>${tr('Medium-to-high planning ranges per stage, not subsidised floor pricing and not one-visit pricing. Healthy low-risk pregnancies are usually around 8 to 10 antenatal visits, then mother and baby reviews after birth.','以下为每个阶段的中高预算区间，不是津贴最低价，也不是单次门诊价。健康低风险孕期通常约8至10次产检，宝宝出生后再做妈妈及宝宝复诊。')}</p>
    </div>
    <div class="visit-grid">${trimesterCards.map(c=>`
      <div class="visit-card">
        <h4>${c.h}</h4>
        <span class="visit-weeks">${c.weeks}</span>
        <span class="visit-count">${c.visits}</span>
        <div class="visit-costs">
          <div><span>${tr('Medium stage total','中等阶段总额')}</span><b>${c.mediumCost}</b></div>
          <div><span>${tr('High stage total','高预算阶段总额')}</span><b>${c.highCost}</b></div>
        </div>
        <p>${c.note}</p>
      </div>`).join('')}</div>
    <div class="visit-note"><b>${tr('Real fee anchors.','真实费用参考。')}</b> ${tr('KKH private women consultations start from S$167.86 - S$208.84 for a first consultation and S$118.59 - S$158.27 for repeat consultations. SGH private specialist fees start from S$170.48 - S$221.27 first visit and S$118.59 - S$159.47 repeat. Raffles Womens Centre lists S$221.27 first and S$159.47 subsequent, plus S$19.62 practice cost. Thomson cites pregnancy first consultation with scan at S$200 - S$350, follow-up consultations at S$120 - S$200 and detailed anomaly scans at S$300 - S$500. KKH private antenatal package starts from S$818 before GST for 6 consultations with scans/tests. MediSave Maternity Package can reimburse up to S$900 for pre-delivery expenses.','KKH私人妇科门诊第一次约167.86至208.84新元起，复诊118.59至158.27新元起。SGH私人专科第一次约170.48至221.27新元起，复诊118.59至159.47新元起。Raffles Womens Centre列明第一次221.27新元，复诊159.47新元，另有19.62新元practice cost。Thomson资料显示孕期第一次门诊含扫描约200至350新元，复诊120至200新元，详细结构扫描300至500新元。KKH私人产检配套税前818新元起，含6次咨询及部分扫描/检查。保健储蓄产妇配套可报销产前费用最高900新元。')}</div>
  </section>
  <section class="preprimary-snapshot">
    <div class="pp-title">
      <h3>${tr('Before Primary 1 Cost Snapshot','上小学前成本快照')}</h3>
      <p>${tr('Read this first: total range, monthly childcare burn, yearly childcare burn and childcare total before school starts.','先看这里：总额区间、每月托育开支、年度托育开支，以及上小学前托育总额。')}</p>
    </div>
    <div class="pp-scenario-grid">${prePrimaryCards.map(c=>`
      <div class="pp-card ${c.hot?'highlight':''}">
        <div class="pp-tier"><span>${c.tier}</span></div>
        <span class="pp-total">${c.total}</span>
        <p>${c.note}</p>
        <div class="pp-mini">
          <div><span>${tr('Pregnancy to age 1','怀孕至1岁')}</span><b>${c.setup}</b></div>
          <div><span>${tr('Childcare monthly','托育每月')}</span><b>${c.monthly}</b></div>
          <div><span>${tr('Childcare yearly','托育每年')}</span><b>${c.yearly}</b></div>
          <div><span>${tr('Childcare before P1','小学前托育')}</span><b>${c.childTotal}</b></div>
        </div>
      </div>`).join('')}</div>
    <div class="pp-groups">${prePrimaryGroups.map(g=>`
      <div class="pp-group">
        <h4>${g.h}</h4>
        ${g.rows.map(r=>`<div class="pp-line">
          <div class="pp-line-label">${r.l}</div>
          ${ppCell(tr('Basic','基础'),r.b)}
          ${ppCell(tr('Advanced','进阶'),r.a)}
          ${ppCell(tr('Luxury','高端'),r.x)}
        </div>`).join('')}
      </div>`).join('')}</div>
  </section>
  <p class="cost-note"><b>${tr('Delivery-only reality check.','只看分娩账单。')}</b> ${tr('C-section is not close to natural birth on the hospital bill itself. The all-in pregnancy-to-age-1 totals look closer only because checkups, jaundice, confinement and baby necessities sit in the same basket. For planning, keep a separate C-section buffer of about S$1k-S$2k on subsidised wards, S$4k-S$5k for public A/B1 or private 2-bed, and S$5k-S$8k+ for private 1-bed/suite style care.','剖腹产本身的医院账单并不接近自然产。怀孕至1岁总额看起来较接近，只是因为产检、黄疸、月子和宝宝用品都放在同一个篮子里。规划时应另预留剖腹产缓冲：津贴病房约1千至2千新元，公立A/B1或私人2人房约4千至5千新元，私人1人房/套房式护理约5千至8千新元以上。')}</p>
  <p class="cost-note"><b>${tr('Before Primary School assumption.','小学前假设。')}</b> ${tr('The tally uses the detailed ranges below, assumes about 70 months of childcare from 2 months old to age 6, and excludes helper, car, housing, parent income loss, NICU and major complications.','合计使用下方明细区间，假设从2个月大至6岁约70个月托育，不包括女佣、车、住房、父母收入损失、NICU及重大并发症。')}</p>
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
  <p class="mini-source">${tr('Research updated 16 Jun 2026 from KKH, Gleneagles, MOH, ECDA, MOE, polytechnic and NUS fee pages, plus current market price references in the Source Pack.','研究于2026年6月16日更新，来源包括KKH、Gleneagles、MOH、ECDA、MOE、理工学院及NUS费用页面，以及资料包内的当前市场价格参考。')}</p>`;
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
