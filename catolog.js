// catalog.js
// Master list of services, procedures, labs, and supplies

const procedures = [
  // ======================
  // VISIT CODES
  // ======================
  {
    service: "99202\nNew Pt Limited",
    cpt: "99202",
    hcpcs: "",
    icd10: "",
    fullprice: 170,
    keywords: ["limited-new", "new pt", "99202"]
  },
  {
    service: "99203\nNew Pt Intermediate",
    cpt: "99203",
    hcpcs: "",
    icd10: "",
    fullprice: 240,
    keywords: ["intermediate-new", "new pt", "99203"]
  },
  {
    service: "99204\nNew Pt Comprehensive",
    cpt: "99204",
    hcpcs: "",
    icd10: "",
    fullprice: 365,
    keywords: ["comprehensive-new", "new pt", "99204"]
  },
  {
    service: "99211\nEst Pt Minimal (RN)",
    cpt: "99211",
    hcpcs: "",
    icd10: "",
    fullprice: 51,
    keywords: ["minimal-established", "est pt", "99211"]
  },
  {
    service: "99212\nEst Pt Limited",
    cpt: "99212",
    hcpcs: "",
    icd10: "",
    fullprice: 101,
    keywords: ["limited-established", "est pt", "99212"]
  },
  {
    service: "99213\nEst Pt Intermediate",
    cpt: "99213",
    hcpcs: "",
    icd10: "",
    fullprice: 166,
    keywords: ["intermediate-established", "est pt", "99213"]
  },
  {
    service: "99214\nEst Pt Comprehensive",
    cpt: "99214",
    hcpcs: "",
    icd10: "",
    fullprice: 243,
    keywords: ["comprehensive-established", "est pt", "99214"]
  },
  {
    service: "99384\nPreventive New 12–17",
    cpt: "99384",
    hcpcs: "",
    icd10: "",
    fullprice: 306,
    keywords: ["preventive new", "99384", "12–17"]
  },
  {
    service: "99385\nPreventive New 18–39",
    cpt: "99385",
    hcpcs: "",
    icd10: "",
    fullprice: 267,
    keywords: ["preventive new", "99385", "18–39"]
  },
  {
    service: "99386\nPreventive New 40–64",
    cpt: "99386",
    hcpcs: "",
    icd10: "",
    fullprice: 285,
    keywords: ["preventive new", "99386", "40–64"]
  },
  {
    service: "99394\nPreventive Est 12–17",
    cpt: "99394",
    hcpcs: "",
    icd10: "",
    fullprice: 262,
    keywords: ["preventive established", "99394", "12–17"]
  },
  {
    service: "99395\nPreventive Est 18–39",
    cpt: "99395",
    hcpcs: "",
    icd10: "",
    fullprice: 267,
    keywords: ["preventive established", "99395", "18–39"]
  },
  {
    service: "99396\nPreventive Est 40–64",
    cpt: "99396",
    hcpcs: "",
    icd10: "",
    fullprice: 285,
    keywords: ["preventive established", "99396", "40–64"]
  },

  // ======================
  // PROCEDURES
  // ======================
  {
    service: "Implant Insertion",
    cpt: "11981",
    hcpcs: "J7307",
    icd10: "Z30.017",
    fullprice: 316,
    keywords: ["implant insert", "nexplanon", "insertion"]
  },
  {
    service: "Implant Removal",
    cpt: "11982",
    hcpcs: "",
    icd10: "Z30.46",
    fullprice: 349,
    keywords: ["implant removal", "nexplanon", "removal"]
  },
  {
    service: "Implant Removal + Reinsertion",
    cpt: "11983",
    hcpcs: "",
    icd10: "Z30.017",
    fullprice: 478,
    keywords: ["implant reinsertion", "nexplanon", "remove + insert"]
  },
  {
    service: "IUD Insertion",
    cpt: "58300",
    hcpcs: "J7297, J7296, J7300",
    icd10: "Z30.430",
    fullprice: 178,
    keywords: ["iud insert", "liletta", "paragard", "mirena"]
  },
  {
    service: "IUD Removal",
    cpt: "58301",
    hcpcs: "",
    icd10: "Z30.432",
    fullprice: 211,
    keywords: ["iud removal", "liletta", "paragard", "mirena"]
  },

  // ======================
  // COMMON MEDS
  // ======================
  {
    service: "Doxycycline",
    cpt: "",
    hcpcs: "",
    icd10: "A56.01",
    fullprice: 1,
    keywords: ["doxycycline", "sti treatment", "antibiotic"]
  },
  {
    service: "Rocephin (Ceftriaxone inj)",
    cpt: "",
    hcpcs: "J0696",
    icd10: "A54.01",
    fullprice: 20,
    keywords: ["rocephin", "ceftriaxone", "sti treatment"]
  },
  {
    service: "Bicillin L-A",
    cpt: "",
    hcpcs: "J0561",
    icd10: "A51.0",
    fullprice: 30,
    keywords: ["bicillin", "syphilis"]
  },

  // ======================
  // LABS
  // ======================
  {
    service: "Chlamydia (CHL)",
    cpt: "87491",
    hcpcs: "",
    icd10: "Z11.8",
    fullprice: 15,
    keywords: ["chlamydia", "chl"]
  },
  {
    service: "Gonorrhea (GC)",
    cpt: "87591",
    hcpcs: "",
    icd10: "Z11.3",
    fullprice: 15,
    keywords: ["gonorrhea", "gc"]
  },
  {
    service: "HPV",
    cpt: "87624",
    hcpcs: "",
    icd10: "Z11.51",
    fullprice: 52,
    keywords: ["hpv"]
  },
  {
    service: "Liquid Based PAP",
    cpt: "88175",
    hcpcs: "",
    icd10: "Z12.4",
    fullprice: 30,
    keywords: ["pap", "liquid pap"]
  },
  {
    service: "Conventional PAP",
    cpt: "88164",
    hcpcs: "",
    icd10: "Z12.4",
    fullprice: 23,
    keywords: ["pap", "conventional pap"]
  },

  // ======================
  // SUPPLIES + CONTRACEPTIVES
  // ======================
  {
    service: "Depo (Medroxyprogesterone)",
    cpt: "",
    hcpcs: "J1050",
    icd10: "Z30.42",
    fullprice: 27,
    keywords: ["depo", "medroxyprogesterone", "j1050"]
  },
  {
    service: "Nexplanon",
    cpt: "",
    hcpcs: "J7307",
    icd10: "Z30.017",
    fullprice: 573,
    keywords: ["nexplanon", "implant", "j7307"]
  },
  {
    service: "NuvaRing",
    cpt: "",
    hcpcs: "J7303",
    icd10: "Z30.011",
    fullprice: 8,
    keywords: ["nuvaring", "ring", "birth control"]
  },
  {
    service: "Xulane Patch",
    cpt: "",
    hcpcs: "J7304",
    icd10: "Z30.011",
    fullprice: 75,
    keywords: ["xulane", "patch", "birth control"]
  },

  // ======================
  // ORAL CONTRACEPTIVES (OC) – dropdown
  // ======================
  {
    service: "Alese",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    keywords: ["alese", "oc", "pill", "s4993"]
  },
  {
    service: "Apri",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    keywords: ["apri", "oc", "pill", "s4993"]
  },
  {
    service: "Aviane",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    keywords: ["aviane", "oc", "pill", "s4993"]
  },
  {
    service: "Camila",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 28,
    keywords: ["camila", "oc", "pop", "progestin"]
  },
  {
    service: "Cryselle",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    keywords: ["cryselle", "oc", "pill"]
  },
  {
    service: "Levora",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 14,
    keywords: ["levora", "oc", "pill"]
  },
  {
    service: "Lutera",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 16,
    keywords: ["lutera", "oc", "pill"]
  },
  {
    service: "Sprintec",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    keywords: ["sprintec", "oc", "pill"]
  },
  {
    service: "Tri-Lo Marzia",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 14,
    keywords: ["tri-lo marzia", "oc", "pill"]
  },
  {
    service: "Trivora",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 14,
    keywords: ["trivora", "oc", "pill"]
  }
];

export default procedures;
// End of catolog.js