// catalog.js
// Master list of services, procedures, labs, and supplies

const procedures = [
  // ======================
  // VISIT CODES
  // ======================
  {
    name: "New Pt Limited",
    cpt: "99202",
    hcpcs: "",
    icd10: "",
    fullprice: 170,
    category: "visits",
    visitType: "new",
    keywords: ["limited-new", "new pt", "99202"]
  },
  {
    name: "New Pt Intermediate",
    cpt: "99203",
    hcpcs: "",
    icd10: "",
    fullprice: 240,
    category: "visits",
    visitType: "new",
    keywords: ["intermediate-new", "new pt", "99203"]
  },
  {
    name: "New Pt Comprehensive",
    cpt: "99204",
    hcpcs: "",
    icd10: "",
    fullprice: 365,
    category: "visits",
    visitType: "new",
    keywords: ["comprehensive-new", "new pt", "99204"]
  },
  {
    name: "Est Pt Minimal (RN)",
    cpt: "99211",
    hcpcs: "",
    icd10: "",
    fullprice: 51,
    category: "visits",
    visitType: "established",
    keywords: ["minimal-established", "est pt", "99211"]
  },
  {
    name: "Est Pt Limited",
    cpt: "99212",
    hcpcs: "",
    icd10: "",
    fullprice: 101,
    category: "visits",
    visitType: "established",
    keywords: ["limited-established", "est pt", "99212"]
  },
  {
    name: "Est Pt Intermediate",
    cpt: "99213",
    hcpcs: "",
    icd10: "",
    fullprice: 166,
    category: "visits",
    visitType: "established",
    keywords: ["intermediate-established", "est pt", "99213"]
  },
  {
    name: "Est Pt Comprehensive",
    cpt: "99214",
    hcpcs: "",
    icd10: "",
    fullprice: 243,
    category: "visits",
    visitType: "established",
    keywords: ["comprehensive-established", "est pt", "99214"]
  },
  {
    name: "Preventive New 12–17",
    cpt: "99384",
    hcpcs: "",
    icd10: "",
    fullprice: 306,
    category: "visits",
    visitType: "preventive",
    keywords: ["preventive new", "99384", "12–17"]
  },
  {
    name: "Preventive New 18–39",
    cpt: "99385",
    hcpcs: "",
    icd10: "",
    fullprice: 267,
    category: "visits",
    visitType: "preventive",
    keywords: ["preventive new", "99385", "18–39"]
  },
  {
    name: "Preventive New 40–64",
    cpt: "99386",
    hcpcs: "",
    icd10: "",
    fullprice: 285,
    category: "visits",
    visitType: "preventive",
    keywords: ["preventive new", "99386", "40–64"]
  },
  {
    name: "Preventive Est 12–17",
    cpt: "99394",
    hcpcs: "",
    icd10: "",
    fullprice: 262,
    category: "visits",
    visitType: "preventive",
    keywords: ["preventive established", "99394", "12–17"]
  },
  {
    name: "Preventive Est 18–39",
    cpt: "99395",
    hcpcs: "",
    icd10: "",
    fullprice: 267,
    category: "visits",
    visitType: "preventive",
    keywords: ["preventive established", "99395", "18–39"]
  },
  {
    name: "Preventive Est 40–64",
    cpt: "99396",
    hcpcs: "",
    icd10: "",
    fullprice: 285,
    category: "visits",
    visitType: "preventive",
    keywords: ["preventive established", "99396", "40–64"]
  },

  // ======================
  // PROCEDURES
  // ======================
  {
    name: "Implant Insertion",
    cpt: "11981",
    hcpcs: "J7307",
    icd10: "Z30.017",
    fullprice: 316,
    category: "procedures",
    keywords: ["implant insert", "nexplanon", "insertion"]
  },
  {
    name: "Implant Removal",
    cpt: "11982",
    hcpcs: "",
    icd10: "Z30.46",
    fullprice: 349,
    category: "procedures",
    keywords: ["implant removal", "nexplanon", "removal"]
  },
  {
    name: "Implant Removal + Reinsertion",
    cpt: "11983",
    hcpcs: "",
    icd10: "Z30.017",
    fullprice: 478,
    category: "procedures",
    keywords: ["implant reinsertion", "nexplanon", "remove + insert"]
  },
  {
    name: "IUD Insertion",
    cpt: "58300",
    hcpcs: "J7297, J7296, J7300",
    icd10: "Z30.430",
    fullprice: 178,
    category: "procedures",
    keywords: ["iud insert", "liletta", "paragard", "mirena"]
  },
  {
    name: "IUD Removal",
    cpt: "58301",
    hcpcs: "",
    icd10: "Z30.432",
    fullprice: 211,
    category: "procedures",
    keywords: ["iud removal", "liletta", "paragard", "mirena"]
  },

  // ======================
  // COMMON MEDS
  // ======================
  {
    name: "Doxycycline",
    cpt: "",
    hcpcs: "",
    icd10: "A56.01",
    fullprice: 1,
    category: "meds",
    keywords: ["doxycycline", "sti treatment", "antibiotic"]
  },
  {
    name: "Rocephin (Ceftriaxone inj)",
    cpt: "",
    hcpcs: "J0696",
    icd10: "A54.01",
    fullprice: 20,
    category: "meds",
    keywords: ["rocephin", "ceftriaxone", "sti treatment"]
  },
  {
    name: "Bicillin L-A",
    cpt: "",
    hcpcs: "J0561",
    icd10: "A51.0",
    fullprice: 30,
    category: "meds",
    keywords: ["bicillin", "syphilis"]
  },

  // ======================
  // LABS
  // ======================
  {
    name: "Chlamydia (CHL)",
    cpt: "87491",
    hcpcs: "",
    icd10: "Z11.8",
    fullprice: 15,
    category: "labs",
    keywords: ["chlamydia", "chl"]
  },
  {
    name: "Gonorrhea (GC)",
    cpt: "87591",
    hcpcs: "",
    icd10: "Z11.3",
    fullprice: 15,
    category: "labs",
    keywords: ["gonorrhea", "gc"]
  },
  {
    name: "HPV",
    cpt: "87624",
    hcpcs: "",
    icd10: "Z11.51",
    fullprice: 52,
    category: "labs",
    keywords: ["hpv"]
  },
  {
    name: "Liquid Based PAP",
    cpt: "88175",
    hcpcs: "",
    icd10: "Z12.4",
    fullprice: 30,
    category: "labs",
    keywords: ["pap", "liquid pap"]
  },
  {
    name: "Conventional PAP",
    cpt: "88164",
    hcpcs: "",
    icd10: "Z12.4",
    fullprice: 23,
    category: "labs",
    keywords: ["pap", "conventional pap"]
  },

  // ======================
  // SUPPLIES + CONTRACEPTIVES
  // ======================
  {
    name: "Depo (Medroxyprogesterone)",
    cpt: "",
    hcpcs: "J1050",
    icd10: "Z30.42",
    fullprice: 27,
    category: "meds",
    keywords: ["depo", "medroxyprogesterone", "j1050", "birth control"]
  },
  {
    name: "Nexplanon",
    cpt: "",
    hcpcs: "J7307",
    icd10: "Z30.017",
    fullprice: 573,
    category: "meds",
    keywords: ["nexplanon", "implant", "j7307", "birth control"]
  },
  {
    name: "NuvaRing",
    cpt: "",
    hcpcs: "J7303",
    icd10: "Z30.011",
    fullprice: 8,
    category: "meds",
    keywords: ["nuvaring", "ring", "birth control"]
  },
  {
    name: "Xulane Patch",
    cpt: "",
    hcpcs: "J7304",
    icd10: "Z30.011",
    fullprice: 75,
    category: "meds",
    keywords: ["xulane", "patch", "birth control"]
  },

  // ======================
  // ORAL CONTRACEPTIVES (OC) – dropdown
  // ======================
  {
    name: "Alese",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    category: " oral contraceptives",
    keywords: ["alese", "oc", "pill", "s4993"]
  },
  {
    name: "Apri",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    category: " oral contraceptives",
    keywords: ["apri", "oc", "pill", "s4993"]
  },
  {
    name: "Aviane",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    category: " oral contraceptives",
    keywords: ["aviane", "oc", "pill", "s4993"]
  },
  {
    name: "Camila",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 28,
    category: " oral contraceptives",
    keywords: ["camila", "oc", "pop", "progestin"]
  },
  {
    name: "Cryselle",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    category: " oral contraceptives",
    keywords: ["cryselle", "oc", "pill"]
  },
  {
    name: "Levora",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 14,
    category: " oral contraceptives",
    keywords: ["levora", "oc", "pill"]
  },
  {
    name: "Lutera",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 16,
    category: " oral contraceptives",
    keywords: ["lutera", "oc", "pill"]
  },
  {
    name: "Sprintec",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    category: " oral contraceptives",
    keywords: ["sprintec", "oc", "pill"]
  },
  {
    name: "Tri-Lo Marzia",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 14,
    category: " oral contraceptives",
    keywords: ["tri-lo marzia", "oc", "pill"]
  },
  {
    name: "Trivora",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 14,
    category: " oral contraceptives",
    keywords: ["trivora", "oc", "pill"]
  }
];

export default procedures;
