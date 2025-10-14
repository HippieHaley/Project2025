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
    fullprice: 296,
    category: "visits",
    visitType: "preventive",
    keywords: ["preventive new", "99385", "18–39"]
  },
  {
    name: "Preventive New 40–64",
    cpt: "99386",
    hcpcs: "",
    icd10: "",
    fullprice: 431,
    category: "visits",
    visitType: "preventive",
    keywords: ["preventive new", "99386", "40–64"]
  },
  {
    name: "Preventive Est 12–17",
    cpt: "99394",
    hcpcs: "",
    icd10: "",
    fullprice: 245,
    category: "visits",
    visitType: "preventive",
    keywords: ["preventive established", "99394", "12–17"]
  },
  {
    name: "Preventive Est 18–39",
    cpt: "99395",
    hcpcs: "",
    icd10: "",
    fullprice: 245,
    category: "visits",
    visitType: "preventive",
    keywords: ["preventive established", "99395", "18–39"]
  },
  {
    name: "Preventive Est 40–64",
    cpt: "99396",
    hcpcs: "",
    icd10: "",
    fullprice: 431,
    category: "visits",
    visitType: "preventive",
    keywords: ["preventive established", "99396", "40–64"]
  },

  // ======================
  // PROCEDURES
  // ======================
  {
  name: "Injection Fee",
  cpt: "96372",
  hcpcs: "",
  icd10: "",
  fullprice: 38,
  category: "procedures",
  keywords: ["injection", "96372"]
},
{
  name: "Venipuncture",
  cpt: "36415",
  hcpcs: "",
  icd10: "",
  fullprice: 7,
  category: "procedures",
  keywords: ["venipuncture", "blood draw", "36415"]
},
  {
    name: "Implant Insertion",
    cpt: "11981",
    hcpcs: "J7307",
    icd10: "Z30.017",
    fullprice: 318,
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
{
  name: "Female Genital Wart Treatment",
  cpt: "56501",
  hcpcs: "",
  icd10: "A63.0",
  fullprice: 323,
  category: "procedures",
  keywords: ["female genital wart", "wart treatment", "56501"]
},
{
  name: "Male Genital Wart Treatment",
  cpt: "54050",
  hcpcs: "",
  icd10: "A63.0",
  fullprice: 300,
  category: "procedures",
  keywords: ["male genital wart", "wart treatment", "54050"]
},
{
  name: "Vasectomy",
  cpt: "55250",
  hcpcs: "",
  icd10: "Z30.2",
  fullprice: 847,
  category: "procedures",
  keywords: ["vasectomy", "male sterilization", "55250"]
},

  // ======================
  // LABS
  // ======================
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
    fullprice: 20,
    category: "labs",
    keywords: ["pap", "conventional pap"]
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
  name: "Pathology Interpretation",
  cpt: "88141",
  hcpcs: "",
  icd10: "",
  fullprice: 72,
  category: "labs",
  keywords: ["pathology", "interpretation", "88141"]
},
{
  name: "Wet Mount/Gram Stain",
  cpt: "87210",
  hcpcs: "",
  icd10: "N76.0",
  fullprice: 15,
  category: "labs",
  keywords: ["wet mount", "gram stain", "87210"]
},
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
  name: "Urine Pregnancy Test",
  cpt: "81025",
  hcpcs: "",
  icd10: "Z32.02",
  fullprice: 20,
  category: "labs",
  keywords: ["pregnancy test", "urine", "81025"]
},
{
  name: "HIV Rapid",
  cpt: "86703",
  hcpcs: "",
  icd10: "B20",
  fullprice: 40,
  category: "labs",
  keywords: ["HIV", "rapid", "86703"]
},
{
  name: "HIV Serum",
  cpt: "87389",
  hcpcs: "",
  icd10: "B20",
  fullprice: 22,
  category: "labs",
  keywords: ["HIV", "serum", "87389"]
},
{
  name: "Syphilis-RPR Qualitative",
  cpt: "86592",
  hcpcs: "",
  icd10: "A51.9",
  fullprice: 20,
  category: "labs",
  keywords: ["syphilis", "RPR", "86592"]
},
{
  name: "Syphilis-TPPA",
  cpt: "86593",
  hcpcs: "",
  icd10: "A51.9",
  fullprice: 30,
  category: "labs",
  keywords: ["syphilis", "TPPA", "86593"]
},
{
  name: "HSV PCR",
  cpt: "87529",
  hcpcs: "",
  icd10: "B00.9",
  fullprice: 0,
  category: "labs",
  keywords: ["herpes", "HSV PCR", "87529"]
},
{
  name: "HSV SERUM",
  cpt: "87529",
  hcpcs: "",
  icd10: "B00.9",
  fullprice: 0,
  category: "labs",
  keywords: ["herpes", "HSV SERUM", "86695"]
},
  {
  name: "Herpes Viral Culture",
  cpt: "87254",
  hcpcs: "",
  icd10: "A60.9",
  fullprice: 35,
  category: "labs",
  keywords: ["herpes", "viral culture", "87254"]
},

  // ======================
  // SUPPLIES + CONTRACEPTIVES
  // ======================
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
  name: "Liletta IUD",
  cpt: "",
  hcpcs: "J7297",
  icd10: "Z30.430",
  fullprice: 130,
  category: "meds",
  keywords: ["Liletta", "IUD", "J7297"]
},
{
  name: "Bayer IUD",
  cpt: "",
  hcpcs: "J7302",
  icd10: "Z30.430",
  fullprice: 0,
  category: "meds",
  keywords: ["bayer", "IUD", "J7302"]
},
{
  name: "Paragard IUD",
  cpt: "",
  hcpcs: "J7300",
  icd10: "Z30.430",
  fullprice: 315,
  category: "meds",
  keywords: ["Paragard", "IUD", "J7300"]
},
  {
  name: "Mirena IUD",
  cpt: "",
  hcpcs: "J7302",
  icd10: "Z30.430",
  fullprice: 310,
  category: "meds",
  keywords: ["Mirena", "IUD", "J7302"]
},
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
    name: "NuvaRing",
    cpt: "",
    hcpcs: "J7303",
    icd10: "Z30.011",
    fullprice: 75,
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
{
  name: "Azithromycin",
  cpt: "",
  hcpcs: "",
  icd10: "A74.9",
  fullprice: 0,
  category: "meds",
  keywords: ["azithromycin", "antibiotic"]
},
{
  name: "Suprax",
  cpt: "",
  hcpcs: "",
  icd10: "A56.00",
  fullprice: 0,
  category: "meds",
  keywords: ["suprax", "cefixime", "antibiotic"]
},
{
  name: "Acyclovir",
  cpt: "",
  hcpcs: "",
  icd10: "B00.9",
  fullprice: 0,
  category: "meds",
  keywords: ["acyclovir", "antiviral"]
},
{
  name: "Metronidazole",
  cpt: "",
  hcpcs: "",
  icd10: "A07.2",
  fullprice: 0,
  category: "meds",
  keywords: ["metronidazole", "antibiotic"]
},
{
  name: "Fluconazole",
  cpt: "",
  hcpcs: "",
  icd10: "B37.3",
  fullprice: 0,
  category: "meds",
  keywords: ["fluconazole", "antifungal"]
},
{
  name: "Ibuprofen",
  cpt: "",
  hcpcs: "",
  icd10: "M79.1",
  fullprice: 0,
  category: "meds",
  keywords: ["ibuprofen", "pain reliever"]
},
{
  name: "Clindamycin Cream",
  cpt: "",
  hcpcs: "",
  icd10: "N76.0",
  fullprice: 0,
  category: "meds",
  keywords: ["clindamycin", "cream", "antibiotic"]
},
{
  name: "Clotrimazole Cream",
  cpt: "",
  hcpcs: "",
  icd10: "B37.3",
  fullprice: 0,
  category: "meds",
  keywords: ["clotrimazole", "cream", "antifungal"]
},
{
name: "Basal Thermometer",
  cpt: "",
  hcpcs: "A4931",
  icd10: "",
  fullprice: 16,
  category: "meds",
  keywords: ["basal thermometer", "A4931"]
},
{
  name: "VCF Foam",
  cpt: "",
  hcpcs: "A4269",
  icd10: "",
  fullprice: 16,
  category: "meds",
  keywords: ["VCF foam", "contraceptive", "A4269"]
},
{
  name: "Gynol II",
  cpt: "",
  hcpcs: "A4269",
  icd10: "",
  fullprice: 7,
  category: "meds",
  keywords: ["Gynol II", "contraceptive", "A4269"]
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
    category: "oral contraceptives",
    keywords: ["alese", "oc", "pill", "s4993"]
  },
  {
    name: "Apri",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    category: "oral contraceptives",
    keywords: ["apri", "oc", "pill", "s4993"]
  },
  {
    name: "Aubra",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 6,
    category: "oral contraceptives",
    keywords: ["Aubra", "oc", "pill", "S4993"]
  },
  {
    name: "Aviane",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 4,
    category: "oral contraceptives",
    keywords: ["aviane", "oc", "pill", "s4993"]
  },
  {
    name: "Camila",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 7,
    category: "oral contraceptives",
    keywords: ["camila", "oc", "pop", "progestin"]
  },
  {
    name: "Cryselle",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    category: "oral contraceptives",
    keywords: ["cryselle", "oc", "pill"]
  },
  {
    name: "Doxycycline 100mg",
    cpt: "",
    hcpcs: "",
    icd10: "",
    fullprice: 1,
    category: "oral contraceptives",
    keywords: ["doxycycline", "oral", "pill"]
  },
  {
    name: "Enpresse",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 6,
    category: "oral contraceptives",
    keywords: ["Enpresse", "oc", "pill", "S4993"]
  },
  {
    name: "Heather",
    cpt: "",
    hcpcs: "S4993",
    icd10: "",
    fullprice: 6,
    category: "oral contraceptives",
    keywords: ["Heather", "oc", "pill", "S4993"]
  },
  {
    name: "Levora",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 14,
    category: "oral contraceptives",
    keywords: ["levora", "oc", "pill"]
  },
  {
    name: "Lutera",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 16,
    category: "oral contraceptives",
    keywords: ["lutera", "oc", "pill"]
  },
  {
    name: "Sprintec",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 5,
    category: "oral contraceptives",
    keywords: ["sprintec", "oc", "pill"]
  },
  {
    name: "Tri-Lo Marzia",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 2,
    category: "oral contraceptives",
    keywords: ["tri-lo marzia", "oc", "pill"]
  },
  {
    name: "Trivora",
    cpt: "",
    hcpcs: "S4993",
    icd10: "Z30.011",
    fullprice: 14,
    category: "oral contraceptives",
    keywords: ["trivora", "oc", "pill"]
  },
  {
  name: "Chateal",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  category: "oral contraceptives",
  keywords: ["Chateal", "oc", "pill", "S4993"]
},
{
  name: "Cyred",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  category: "oral contraceptives",
  keywords: ["Cyred", "oc", "pill", "S4993"]
},
{
  name: "Jolivette",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  category: "oral contraceptives",
  keywords: ["Jolivette", "oc", "pill", "S4993"]
},
{
  name: "Lyza",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  category: "oral contraceptives",
  keywords: ["Lyza", "oc", "pill", "S4993"]
},
{
  name: "Mononessa",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  category: "oral contraceptives",
  keywords: ["Mononessa", "oc", "pill", "S4993"]
},
{
  name: "Nor QD",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 9,
  category: "oral contraceptives",
  keywords: ["Nor QD", "oc", "pill", "S4993"]
},
{
  name: "Nordette",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  category: "oral contraceptives",
  keywords: ["Nordette", "oc", "pill", "S4993"]
},
{
  name: "Norethindrone",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 1,
  category: "oral contraceptives",
  keywords: ["Norethindrone", "oc", "pill", "S4993"]
},
{
  name: "Nortrel 777",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 6,
  category: "oral contraceptives",
  keywords: ["Nortrel 777", "oc", "pill", "S4993"]
},
{
  name: "Orsythia",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  category: "oral contraceptives",
  keywords: ["Orsythia", "oc", "pill", "S4993"]
},
{
  name: "Portia",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 1,
  category: "oral contraceptives",
  keywords: ["Portia", "oc", "pill", "S4993"]
},
{
  name: "Reclipsen",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 11,
  category: "oral contraceptives",
  keywords: ["Reclipsen", "oc", "pill", "S4993"]
},
{
  name: "Simpresse",
  cpt: "",
  hcpcs: "S4993",
  icd10: "",
  fullprice: 5,
  category: "oral contraceptives",
  keywords: ["Simpresse", "oc", "pill", "S4993"]
},
{
  name: "Sronyx",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  category: "oral contraceptives",
  keywords: ["Sronyx", "oc", "pill", "S4993"]
},
{
  name: "Tri-Lo Sprintec",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 2,
  category: "oral contraceptives",
  keywords: ["Tri-Lo Sprintec", "oc", "pill", "S4993"]
},
{
  name: "TriNessa Lo",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  category: "oral contraceptives",
  keywords: ["TriNessa Lo", "oc", "pill", "S4993"]
},
{
  name: "Triphasil",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 4,
  category: "oral contraceptives",
  keywords: ["Triphasil", "oc", "pill", "S4993"]
},
{
  name: "Vilbra",
  cpt: "",
  hcpcs: "S4993",
  icd10: "Z30.011",
  fullprice: 5,
  category: "oral contraceptives",
  keywords: ["Vilbra", "oc", "pill", "S4993"]
},
{
  name: "My Way Emergency Contraception",
  cpt: "",
  hcpcs: "",
  icd10: "",
  fullprice: 12,
  category: "oral contraceptives",
  keywords: ["My Way", "emergency contraception", "pill"]
},
{
  name: "Norgestimate/Ethinyl Estradiol",
  cpt: "",
  hcpcs: "",
  icd10: "",
  fullprice: 2,
  category: "oral contraceptives",
  keywords: ["Norgestimate", "Ethinyl Estradiol", "pill"]
},
{
  name: "Zafemy",
  cpt: "",
  hcpcs: "",
  icd10: "",
  fullprice: 85,
  category: "oral contraceptives",
  keywords: ["Zafemy", "patch", "contraceptive"]
}
];


export default procedures;