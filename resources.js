// resources.js
// resources.js

// ...existing code...
const resources = {
  dental: [
    {
      name: "Good Shepherd Clinic",
      phone: "(605) 717-2080",
      address: "1020 State Street, Spearfish, SD",
      hours: "Monday: 6:00PM – 9:00PM",
      description: "Low-cost dental care and checkups for uninsured adults."
    },
    {
      name: "South Dakota Oral Health Program (Department of Health)",
      phone: "(605) 773-3361",
      address: "Statewide Services",
      hours: "",
      description: "Oral health education and prevention resources."
    },
    {
      name: "Delta Dental Foundation – South Dakota Programs",
      phone: "(605) 224-7345, 1-800-627-3961",
      address: "Statewide Services",
      hours: "",
      description: "Statewide programs and services available in Spearfish and surrounding areas."
    }
  ],

  medical: [
    {
      name: "Monument Health Spearfish Hospital",
      phone: "(605) 644-4000",
      address: "1440 North Main Street, Spearfish, SD",
      hours: "Open 24 Hours",
      description: "Full-service regional hospital with emergency care."
    },
    {
      name: "Monument Health Spearfish Clinic, North 10th Street",
      phone: "(605) 717-8595",
      address: "1420 North 10th Street, Spearfish, SD",
      hours: "Monday – Friday: 7:00AM – 5:00PM",
      description: ""
    },
    {
      name: "Monument Health Spearfish Clinic, North Avenue",
      phone: "(605) 644-4170",
      address: "1445 North Avenue, Spearfish, SD",
      hours: "Monday – Friday: 7:30AM – 5:00PM",
      description: ""
    },
    {
      name: "Monument Health Orthopedics and Sports Medicine – Spearfish",
      phone: "(605) 644-4460",
      address: "2479 East Colorado Boulevard, Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM",
      description: ""
    },
    {
      name: "Monument Health Rehabilitation – Spearfish",
      phone: "(605) 644-4470",
      address: "2449 East Colorado Boulevard, Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM",
      description: ""
    },
    {
      name: "Monument Health Home+ Home Health and Hospice – Spearfish",
      phone: "(605) 644-4170",
      address: "931 East Colorado Boulevard, Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM",
      description: ""
    },
    {
      name: "Monument Health Home+ Home Medical Equipment – Spearfish",
      phone: "(605) 644-4170",
      address: "911 East Colorado Boulevard, Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM",
      description: ""
    },
    {
      name: "Monument Health Home+ Pharmacy – Spearfish",
      phone: "(605) 717-8860",
      address: "1420 North 10th Street, Suite 1, Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 6:00PM; Saturday: 9:00AM – 1:00PM",
      description: ""
    },
    {
      name: "Monument Health Surgery Center",
      phone: "(605) 755-1100",
      address: "1316 North 10th Street, Spearfish, SD",
      hours: "Monday – Friday: 7:00AM – 5:00PM",
      description: ""
    },
    {
      name: "Good Shepherd Clinic Spearfish",
      phone: "(605) 717-2080",
      address: "1020 State Street, Spearfish, SD",
      hours: "Mondays at 6:00PM",
      description: "Community clinic offering basic medical services."
    },
    {
      name: "Family Health Education Services",
      phone: "(605) 717-8920",
      address: "930 N 10th Street, Spearfish, SD",
      hours: "Monday – Thursday: 8:00AM – 5:00PM",
      description: ""
    },
    {
      name: "Community Health Center of the Black Hills",
      phone: "(605) 721-8939",
      address: "350 Pine Street, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM",
      description: ""
    }
  ],

  pregnancy: [
    {
      name: "Bella Pregnancy Resource Center",
      phone: "(605) 642-4140",
      address: "119 E Grant St, Suite 2, Spearfish, SD",
      hours: "Monday: 12:00PM – 5:00PM; Tuesday: 10:00AM – 3:00PM; Wednesday: 12:00PM – 5:00PM; Thursday: 10:00AM – 3:00PM",
      description: "Pregnancy testing, ultrasounds, and counseling services."
    },
    {
      name: "Ensō Mental Health – Maternal & Postpartum Therapy",
      phone: "(605) 519-5850",
      address: "Spearfish, SD",
      hours: "",
      description: "Maternal and postpartum therapy services."
    },
    {
      name: "Lutheran Social Services (LSS) Pregnancy Counseling",
      phone: "(605) 559-3500, 1-800-201-5061",
      address: "2920 Sheridan Lake Road, Rapid City, SD",
      hours: "",
      description: "Pregnancy counseling and support services."
    },
    {
      name: "Catholic Social Services – Trinity Pregnancy and Adoption",
      phone: "(605) 348-6086",
      address: "529 Kansas City Street, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM",
      description: "Pregnancy and adoption services."
    }
  ],

  familyPlanning: [
    {
      name: "Care Net Pregnancy Resource Center",
      phone: "(605) 341-4477",
      address: "1774 Centre St Suite #1, Rapid City, SD",
      hours: "Monday – Thursday: 9:00AM – 5:00PM",
      description: "Pregnancy resource and support services."
    },
    {
      name: "Fall River Health Services – Family Planning Clinic",
      phone: "(605) 745-5135",
      address: "1201 Highway 71 South, Hot Springs, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM",
      description: "Family planning and reproductive health services."
    },
    {
      name: "Urban Indian Health – Pierre Clinic",
      phone: "(605) 224-8841",
      address: "1714 Abbey Road, Pierre, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM",
      description: ""
    }
  ],
  familyEducation: [
    {
      name: "South Dakota Parent Education Program",
      phone: "(605) 348-0305",
      address: "1774 Centre St Suite #1, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Common Sense Parenting Program",
      phone: "Call for class schedules",
      address: "",
      hours: ""
    },
    {
      name: "Black Hills Special Services Cooperative (boys club)",
      phone: "(605) 394-5120",
      address: "Counties: Lawrence, Meade, Pennington and Fall River",
      hours: ""
    },
    {
      name: "Catholic Social Services (virtual options)",
      phone: "(605) 338-6086, (800) 727-2401",
      address: "Rapid City, Pine Ridge and Virtual",
      hours: ""
    },
    {
      name: "Youth & Family Services (YFS) (girls club)",
      phone: "(605) 342-4195",
      address: "1920 N Plaza Blvd, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Early Childhood Connections (ECC)",
      phone: "(605) 342-6464",
      address: "3645 Sturgis Rd Ste 110, Rapid City, SD",
      hours: "Monday – Thursday: 8:00AM – 5:00PM; Friday: 8:00AM – 4:00PM"
    }
  ],

  adoption: [
    {
      name: "Bethany Christian Services",
      phone: "(800) 238-4269",
      address: "217 Kansas City St, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Catholic Social Services",
      phone: "(605) 348-6086",
      address: "529 Kansas City St, Suite 100, Rapid City, SD",
      hours: "Mon: 8:00AM – 5:00PM (5:00PM – 7:00PM by appt); Tue–Thu: 8:00AM – 5:00PM; Fri: 8:00AM – 12:00PM"
    },
    {
      name: "Lutheran Social Services",
      phone: "(605) 791-6700",
      address: "2920 Sheridan Lake Rd, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "SD Dept. of Social Services – Child Protection Services",
      phone: "(605) 394-2525",
      address: "510 N Cambell St, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Children's Home Society of South Dakota – Therapeutic Foster Care and Adoption",
      phone: "(605) 343-2811",
      address: "1330 Jolly Lane, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "All About U Adoptions",
      phone: "(605) 770-2357",
      address: "P.O. Box 90542, Sioux Falls, SD",
      hours: "24/7 Help-Line"
    },
    {
      name: "Heart 2 Heart Adoptions",
      phone: "(605) 360-7914",
      address: "Sioux Falls, SD",
      hours: "24/7 Availability"
    }
  ],

  fosterCareServices: [
    {
      name: "SD Dept. of Social Services – Child Protection Services (local office)",
      phone: "(605) 394-2525",
      address: "Find local office",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Lutheran Social Services of SD – Foster Care Services",
      phone: "(605) 444-7500",
      address: "2519 Windmill Drive, Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Abbott House – Therapeutic Foster Care",
      phone: "(605) 996-2486",
      address: "909 Court Merrill, Mitchell, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Messengers Children's Center - Children's Home Society",
      phone: "(605) 343-2811",
      address: "1330 Jolly Lane, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Catholic Social Services – Foster Care Services",
      phone: "(605) 348-6086",
      address: "529 Kansas City Street, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    }
  ],

  breastfeeding: [
    {
      name: "Monument Health Breastfeeding Services – Spearfish Hospital",
      phone: "(605) 644-4000",
      address: "1440 North Main Street, Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 3:00PM"
    },
    {
      name: "Black Hills Breastfeeding and Beyond",
      phone: "(605) 416-1778",
      address: "777 Deadwood Avenue, Rapid City, SD",
      hours: "By Appointment Only"
    },
    {
      name: "South Dakota WIC Program – Lawrence County Office",
      phone: "(800) 738-2301",
      address: "Locate local office",
      hours: ""
    }
  ],

  carSeatPrograms: [
    {
      name: "Early Childhood Connections",
      phone: "(605) 342-6464",
      address: "3645 Sturgis Road, Suite 110, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Safe Kids Worldwide – South Dakota",
      phone: "",
      address: "networkmembers@safekids.org",
      hours: ""
    }
  ],

  childSupportEnforcement: [
    {
      name: "SD Division of Child Support – Rapid City Office",
      phone: "(605) 394-2525, (1-800) 644-2914",
      address: "221 Mall Drive, Suite 101, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "SD Dept. of Social Services – Spearfish Office",
      phone: "(605) 642-6904",
      address: "120 Industrial Dr Suite 6, Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "SD Dept. of Social Services – Sturgis Office",
      phone: "(605) 347-2588",
      address: "2200 West Main Street, Sturgis, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "SD Dept. of Social Services – Belle Fourche Office",
      phone: "(605) 892-2731",
      address: "711 5th Avenue, Belle Fourche, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "SD Dept. of Social Services – Custer Office",
      phone: "(605) 673-4347",
      address: "1164 Mount Rushmore Road, Suite 3, Custer, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Social Security Administration Online Services",
      phone: "",
      address: "Visit ssa.gov",
      hours: ""
    }
  ],

  sdHealthPrograms: [
    {
      name: "South Dakota Dept. of Health – All Women Count",
      phone: "(1-800) 738-2301",
      address: "Provides screening services (ages 30–64); eligibility based on income; services available at most local clinics",
      hours: ""
    },
    {
      name: "South Dakota Dept. of Health – WIC",
      phone: "(1-800) 738-2301",
      address: "Nutrition education, breastfeeding support, healthy food for pregnant women, infants, children to age five; income-based eligibility",
      hours: ""
    },
    {
      name: "South Dakota QuitLine",
      phone: "(1-800) 737-8487 or 711",
      address: "Free phone counseling to help quit smoking",
      hours: ""
    }
  ],

  youthPrograms: [
    {
      name: "Boys & Girls Club of the Black Hills",
      phone: "(605) 340-0389",
      address: "Lead-Deadwood area",
      hours: ""
    },
    {
      name: "Big Brothers Big Sisters of the Black Hills",
      phone: "(605) 343-1488",
      address: "Rapid City, SD",
      hours: ""
    },
    {
      name: "Northern Hills Alliance for Children",
      phone: "(605) 559-2007",
      address: "630 N. Main St., Spearfish, SD",
      hours: ""
    },
    {
      name: "Sturgis Youth Center (free during school)",
      phone: "(605) 347-2991",
      address: "1401 Lazelle St., Sturgis, SD",
      hours: ""
    }
  ],

  fosterTransitionResources: [
    {
      name: "Children's Home Society of South Dakota",
      phone: "(605) 965-3192",
      address: "Visit their website or contact offices directly",
      hours: ""
    },
    {
      name: "Foster Youth to Independence (FYI) Initiative",
      phone: "202-708-1112",
      address: "Resources for foster youth transitioning to independent living; contact local public housing agency or HUD website",
      hours: ""
    }
  ],

  youthHotlines: [
    { name: "988 Suicide & Crisis Lifeline", phone: "988", notes: "" },
    { name: "YouthLine", phone: "1-877-968-8491", notes: 'Text "teen2teen" to 839863' },
    { name: "The Trevor Project", phone: "1-866-488-7386", notes: 'Text "START" to 678678' },
    { name: "National Runaway Safeline", phone: "1-800-RUNAWAY (786-2929)", notes: 'Text "HOME" to 741741' }
  ],

  foodAssistance: [
    {
      name: "Spearfish Community Pantry",
      phone: "(605) 642-0940",
      address: "131 Yankee Street, Spearfish, SD",
      hours: "Mon, Wed, Fri: 9:00AM – 12:00PM"
    },
    {
      name: "Feeding South Dakota – Mobile Food Pantry",
      phone: "(605) 335-0364",
      address: "Various locations",
      hours: "Schedules vary; call or visit website"
    },
    {
      name: "Lord's Cupboard",
      phone: "(605) 584-3263",
      address: "111 S Main Street, Lead, SD",
      hours: "Call for hours"
    },
    {
      name: "Hot Springs Food Pantry",
      phone: "(605) 745-5447",
      address: "107 N Chicago Street, Hot Springs, SD",
      hours: "Tue & Thu: 1:00PM – 3:00PM"
    },
    {
      name: "Custer Food Pantry Inc",
      phone: "(605) 673-3565",
      address: "Main Street, Custer, SD",
      hours: "First 3 Wednesdays & Saturdays: 10:00AM – 1:00PM (Pick up only)"
    },
    {
      name: "Feeding South Dakota – Rapid City Distribution Center",
      phone: "(605) 348-2689",
      address: "1111 N Creek Drive, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Sturgis Kiwanis Food Pantry",
      phone: "(605) 720-2511",
      address: "801 6th Street, Sturgis, SD",
      hours: "Mon, Wed, Fri: 9:00AM – 12:00PM"
    }
  ],

  nutrition: [
    {
      name: "SNAP (Supplemental Nutrition Assistance Program)",
      phone: "(605) 773-3493",
      address: "700 Governors Drive, Pierre, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM; toll-free: 1-877-999-5612"
    },
    {
      name: "WIC Program",
      phone: "877-999-5612",
      address: "1300 North Avenue, Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Back to Basics Nutrition Education Center",
      phone: "(605) 641-8428",
      address: "522 West Jackson Blvd, Spearfish, SD",
      hours: "Mon & Wed: 9:00AM – 4:00PM; Tue & Thu: 10:00AM – 5:00PM; Fri: 10:00AM – 4:00PM; Sat: By appt"
    },
    {
      name: "Monument Health Nutrition Services",
      phone: "(605) 644-4000",
      address: "1440 North Main Street, Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    }
  ],

  clothingAndHousehold: [
    {
      name: "The Salvation Army of Spearfish Family Store & Donation Center",
      phone: "(605) 642-0924",
      address: "320 Ryan Road, Spearfish, SD",
      hours: "Tue – Sat: 9:00AM – 5:00PM"
    },
    {
      name: "St. Vincent de Paul Thrift Store",
      phone: "(605) 717-2499",
      address: "137 East Illinois Street, Spearfish, SD",
      hours: "Mon – Sat: 9:00AM – 5:00PM"
    },
    {
      name: "Habitat for Humanity ReStore – Spearfish",
      phone: "(605) 717-1882",
      address: "2915 East Colorado Boulevard, Spearfish, SD",
      hours: "Tue – Sat: 9:00AM – 5:00PM"
    },
    {
      name: "Northern Hills Area CASA Program – CASA Closet",
      phone: "(605) 722-4558",
      address: "741 North 5th Street, Spearfish, SD",
      hours: "By Appointment Only"
    }
  ],

  emergencyLoans: [
    {
      name: "SD Dept. of Social Services – Economic Assistance Division",
      phone: "(605) 394-2525",
      address: "",
      hours: ""
    },
    {
      name: "Society of St. Vincent de Paul – Spearfish Conference",
      phone: "(605) 717-2499",
      address: "1311 1st Street, Spearfish, SD",
      hours: "Call for appointment"
    }
  ],

  housingAssistance: [
    {
      name: "Lawrence County Housing and Redevelopment Commission",
      phone: "(605) 578-1401",
      address: "795 Main Street, Deadwood, SD",
      hours: ""
    },
    {
      name: "SD CARES Housing Assistance Program",
      phone: "Call 2-1-1",
      address: "Statewide program",
      hours: "24/7"
    },
    {
      name: "Iron Creek Plaza",
      phone: "(605) 545-5083",
      address: "1710 Ryan Road, Spearfish, SD",
      hours: "Call for hours"
    },
    {
      name: "Golden Manor Apartments",
      phone: "(605) 642-7603",
      address: "620 N 11th Street, Spearfish, SD",
      hours: "Call for hours"
    },
    {
      name: "Pioneer Memorial Manor",
      phone: "(605) 642-4744",
      address: "930 Tenth Street, Spearfish, SD",
      hours: "Call for hours"
    },
    {
      name: "Stanford Courts",
      phone: "(605) 642-3326",
      address: "112 E Colorado Boulevard, Spearfish, SD",
      hours: "Call for hours"
    },
    {
      name: "NeighborWorks Dakota Home Resources",
      phone: "(605) 578-1401",
      address: "795 Main Street, Deadwood, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    }
  ],

  legalAssistance: [
    {
      name: "Dakota Plains Legal Services (DPLS) - Rapid Office",
      phone: "(605) 716-5666",
      address: "202 E. St. Joseph Street, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Access to Justice, Inc. (A2J)",
      phone: "1-855-287-3510",
      address: "222 E. Capitol Avenue #3, Pierre, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "South Dakota Free Legal Answers",
      phone: "",
      address: "sd.freelegalanswers.org",
      hours: ""
    },
    {
      name: "South Dakota Law Help",
      phone: "",
      address: "sdlawhelp.org",
      hours: ""
    },
    {
      name: "South Dakota Dept. of Social Services – Legal Services",
      phone: "",
      address: "Locate local office",
      hours: ""
    }
  ],

  utilityAssistance: [
    {
      name: "SD Dept. of Social Services – Energy Assistance",
      phone: "(1-800) 233-8503",
      address: "910 East Sioux Avenue, Pierre, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "SD CARES Housing Assistance Program",
      phone: "211",
      address: "",
      hours: ""
    },
    {
      name: "Butte Electric Cooperative – Energy Assistance",
      phone: "(605) 456-2494",
      address: "109 S. Dartmouth Avenue, Newell, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Salvation Army – Spearfish Service Extension Office",
      phone: "(605) 642-0924",
      address: "320 Ryan Road, Spearfish, SD",
      hours: "Tuesday: 9:00AM – 3:00PM (MT)"
    }
  ],

  weatherizationPrograms: [
    {
      name: "SD Dept. of Social Services – Weatherization Assistance Program",
      phone: "(1-800) 233-8503",
      address: "910 East Sioux Avenue, Pierre, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Western South Dakota Community Action Agency",
      phone: "(605) 348-1460",
      address: "1844 Lombardy Drive, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "GROW South Dakota – Weatherization Assistance Program",
      phone: "(605) 698-7654",
      address: "104 Ash St. E., Sisseton, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    }
  ],

  employmentServices: [
    {
      name: "SD Dept. of Labor and Regulation – Spearfish Job Service Office",
      phone: "(605) 642-6900",
      address: "120 Industrial Drive, Suite 8, Spearfish, SD",
      hours: "Mon, Tue, Wed, Fri: 8:00AM – 5:00PM; Thu: 9:00AM – 5:00PM"
    },
    {
      name: "SD Dept. of Labor and Regulation – Division of Reemployment Assistance",
      phone: "(605) 626-2452",
      address: "420 S. Roosevelt Street, Aberdeen, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "SD Dept. of Labor and Regulation – Rapid City Job Service Office",
      phone: "(605) 394-2296",
      address: "2330 N. Maple Ave., Suite 1, Rapid City, SD",
      hours: "Mon, Tue, Wed, Fri: 8:00AM – 5:00PM; Thu: 9:00AM – 5:00PM"
    }
  ],

  literacyAndEducation: [
    {
      name: "Spearfish Public Library – Summer Reading Program",
      phone: "(605) 642-1330",
      address: "625 N 5th Street, Spearfish, SD",
      hours: "Mon–Thu: 9:00AM – 7:00PM; Fri: 9:00AM – 5:00PM; Sat: 10:00AM – 2:00PM"
    },
    {
      name: "Community Education of the Black Hills",
      phone: "(605) 394-5120",
      address: "Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Phoenix Rising Education Program (PREP)",
      phone: "(605) 721-7860",
      address: "P.O. Box 995, Spearfish, SD",
      hours: ""
    },
    {
      name: "South Dakota Literacy Council, Inc.",
      phone: "(605) 773-3134",
      address: "P.O. Box 624, Spearfish, SD",
      hours: ""
    },
    {
      name: "Black Hills Special Services Cooperative (BHSSC) – Adult Literacy Services",
      phone: "(605) 347-4467",
      address: "2885 Dickson Dr, PO Box 218, Sturgis, SD",
      hours: "Monday – Friday: 7:00AM – 4:00PM"
    },
    {
      name: "SD Adult Education and Literacy Programs",
      phone: "(605) 773-3101",
      address: "Programs available statewide",
      hours: ""
    },
    {
      name: "Western Dakota Tech – Adult Education Center",
      phone: "(605) 718-2411",
      address: "(800) Mickelson Dr, Rapid City, SD",
      hours: "Monday – Friday: 8:00AM – 4:00PM"
    }
  ],

  financialLiteracy: [
    { name: "Black Hills Federal Credit Union (BHFCU)", phone: "(605) 718-1818" },
    { name: "Consumer Credit Counseling Service of the Black Hills (CCCS)", phone: "(605) 348-4550" },
    { name: "Black Hills Community Loan Fund (BHCLF)", phone: "(605) 519-5124" }
  ],

  mentalHealthAndSubstanceUse: [
    {
      name: "Ensō Mental Health",
      phone: "(605) 519-5850",
      address: "717 North 5th Street, Spearfish, SD",
      hours: "Mon–Thu: 8:00AM – 5:00PM; Fri: 8:00AM – 2:00PM; other times by appt"
    },
    {
      name: "Funk Counseling",
      phone: "(605) 645-0141",
      address: "Spearfish, SD",
      hours: "Monday and Thursday evenings by appointment"
    },
    {
      name: "Consumer Credit Counseling Service of the Black Hills (CCCSBH)",
      phone: "(605) 348-4550, (1-800) 568-6615",
      address: "2310 North Maple Avenue, Rapid City, SD",
      hours: "Mon–Tue: 8:00AM – 5:00PM; Wed: 8:00AM – 8:30PM; Thu: 8:00AM – 5:00PM; Fri: 8:00AM – 3:00PM"
    },
    {
      name: "Lutheran Social Services of SD – Center for Financial Resources",
      phone: "(605) 330-2700, 1-888-258-2227",
      address: "705 East 41st Street, Suite 100, Sioux Falls, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    }
  ],

  crisisIntervention: [
    {
      name: "Artemis House / Victims of Violence Intervention Program, Inc.",
      phone: "(605) 642-7825, (1-800) 999-2348",
      address: "PO Box 486, Spearfish, SD",
      hours: "Business Office: Mon–Fri: 8:00AM – 4:30PM"
    },
    {
      name: "Lutheran Social Services of SD – Spearfish Office",
      phone: "(605) 559-3500",
      address: "2519 Windmill Drive, Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Crisis Intervention Shelter Service – Sturgis",
      phone: "(605) 347-0050, (1-800) 755-8432",
      address: "PO Box 842, Sturgis, SD",
      hours: "24/7 Hotline"
    }
  ],

  griefSupport: [
    {
      name: "Monument Health Grief Counseling and Support Groups",
      phone: "",
      address: "https://monument.health/services/grief-counseling-and-support-groups/",
      hours: ""
    },
    {
      name: "Spearfish United Methodist Church – GriefShare Program",
      phone: "(605) 642-3457",
      address: "845 North 5th Street, Spearfish, SD",
      hours: "Call for schedule"
    },
    {
      name: "Ensō Mental Health – Grief and Loss Therapy",
      phone: "(605) 519-5850",
      address: "Spearfish, SD",
      hours: "Monday – Friday: 8:00AM – 5:00PM"
    },
    {
      name: "Helpline Center – Survivor Support Services at Spearfish Site",
      phone: "(1-800) 999-2348",
      address: "Spearfish, SD",
      hours: "24/7"
    }
  ],

  transportation: [
    {
      name: "Prairie Hills Transit",
      phone: "(605) 642-6668",
      address: "2015 Tumble Weed Trail, Spearfish, SD",
      hours: "24/7"
    }
  ],

  driversLicensing: [
    {
      name: "SD Driver Licensing Program – Spearfish Exam Station",
      phone: "(605) 773-6883",
      address: "120 Industrial Drive, Suite 3, Spearfish, SD",
      hours: "Wed & Thu: 8:00AM – 5:00PM (apps accepted until 4:00PM)"
    },
    {
      name: "SD Driver Licensing Program – Rapid City Exam Station",
      phone: "(605) 773-6883",
      address: "1301 East Catron Boulevard, Rapid City, SD",
      hours: "Mon–Fri: 7:00AM – 5:30PM (apps accepted until 4:30PM)"
    },
    {
      name: "SD Driver Licensing Program – Sturgis Exam Station",
      phone: "(605) 773-6883",
      address: "1300 Sherman Street, Sturgis, SD",
      hours: "Tuesday: 8:00AM – 5:00PM (apps accepted until 4:00PM)"
    },
    {
      name: "SD Driver Licensing Program – Belle Fourche Exam Station",
      phone: "(605) 773-6883",
      address: "511 6th Avenue, Belle Fourche, SD",
      hours: "Tuesday: 8:30AM – 4:15PM (apps accepted until 3:45PM)"
    }
  ],

  culturalAndCommunity: [
    {
      name: "NDN Collective",
      phone: "(605) 791-3999",
      address: "317 Main St, Rapid City, SD"
    },
    {
      name: "Black Hills Center for American Indian Health (BHCAIH)",
      phone: "(605) 348-6100",
      address: "701 Saint Joseph St, Rapid City, SD"
    },
    {
      name: "Oglala Lakota Cultural & Economic Revitalization Initiative",
      phone: "(605) 455-1126",
      address: "Pine Ridge Reservation, SD (virtual services available)"
    },
    {
      name: "Native Healing Program – YMCA of Rapid City",
      phone: "(605) 718-9622",
      address: "815 Kansas City St, Rapid City, SD"
    },
    {
      name: "SD Dept. of Tribal Relations",
      phone: "(605) 773-3415",
      address: "302 East Dakota Avenue, Pierre, SD"
    },
    {
      name: "National Indigenous Women's Resource Center (NIWRC)",
      phone: "(406) 477-3896",
      address: ""
    }
  ],

  cancerSupport: [
    {
      name: "Monument Health - Cancer Care Institute",
      phone: "(605) 755-2300",
      address: "353 Fairmont Boulevard, Rapid City, SD",
      hours: "Monday – Friday: 7:00AM – 5:00PM"
    },
    {
      name: "American Cancer Society – South Dakota",
      phone: "(1-800) 227-2345 (24/7 Helpline)",
      address: "PO Box 1146, Sioux Falls, SD"
    },
    {
      name: "Fort Meade VA Medical Center – Palliative and Hospice Care",
      phone: "(605) 347-2511",
      address: "113 Comanche Road, Fort Meade, SD",
      hours: "Monday – Friday: 8:00AM – 4:30PM"
    }
  ],

  diabetesSupport: [
    {
      name: "Spearfish Diabetes Support Group",
      phone: "(605) 644-4000",
      address: "Monument Health Spearfish Clinic",
      hours: "Meetings: last Wednesday of each month at 2:00PM"
    },
    {
      name: "Rapid City Diabetes Support Group",
      phone: "(605) 755-3300",
      address: "Rapid City Regional Hospital, Room 341, Fairmont Street, Rapid City, SD",
      hours: "Meetings: first Thursday monthly at 5:30PM (no meetings Dec–Feb)"
    },
    {
      name: "Monument Health Diabetes Education and Support",
      phone: "(605) 755-3300",
      address: "Monument Health Spearfish Clinic, 1420 North 10th Street, Spearfish, SD",
      hours: ""
    }
  ],

  aaMeetings: [
    { name: "Spearfish AA Group", address: "129 W Michigan Street, Spearfish, SD", hours: "Wednesday 6:30AM" },
    { name: "Noon at Newman's AA", address: "814 W King Street, Spearfish, SD", hours: "Thursday 12:00PM" },
    { name: "Spearfish Sunday Literature Group", address: "845 N 5th Street, Spearfish, SD", hours: "Sunday 8:00PM" }
  ],

  naMeetings: [
    { name: "Crow Peak Clean and Crazy Group", address: "845 North 5th Street, Spearfish, SD", hours: "Tuesday 7:00PM" },
    { name: "More Will Be Revealed Group", address: "845 North 5th Street, Spearfish, SD", hours: "Sunday 8:00PM" }
  ],

  elderlyAndDisability: {
    inHomeCare: [
      { name: "Black Hills Caregiving", phone: "(605) 390-3980" },
      { name: "Good Samaritan Society – Home Health of the Black Hills", phone: "(605) 342-0529" }
    ],
    seniorActivityCenters: [
      { name: "Canyon Lake Activity Center", phone: "(605) 721-8710" },
      { name: "Sturgis Senior Citizens Center", phone: "(605) 347-5877" }
    ],
    elderlySupport: [
      { name: "Meals on Wheels Western South Dakota", phone: "(605) 394-6002" },
      { name: "Prairie Hills Transit", phone: "(605) 642-6668" }
    ],
    disabilityServices: [
      {
        name: "SD Dept. of Human Services – Division of Rehabilitation Services",
        phone: "(605) 642-6817",
        address: "1300 North Avenue, Spearfish, SD",
        hours: "Monday – Friday: 8:00AM – 5:00PM"
      },
      {
        name: "Northern Hills Training Center",
        phone: "(605) 642-2785",
        address: "625 Harvard Street, Spearfish, SD",
        hours: "Monday – Friday: 8:00AM – 5:00PM"
      },
      {
        name: "Western Resources for Independent Living – Spearfish",
        phone: "(605) 718-1930",
        address: "430 Oriole Drive, Suite C, Spearfish, SD",
        hours: "Monday – Friday: 8:00AM – 5:00PM"
      },
      {
        name: "Long Term Services and Supports – Spearfish Site",
        phone: "(605) 642-6981",
        address: "1300 North Avenue, Spearfish, SD",
        hours: "Monday – Friday: 8:00AM – 5:00PM"
      },
      {
        name: "Vocational Rehabilitation – Spearfish Office",
        phone: "(605) 642-6817",
        address: "1300 North Avenue, Spearfish, SD",
        hours: "Monday – Friday: 8:00AM – 5:00PM"
      }
    ]
  },

  petCare: {
    adoptionAndSurrender: [
      {
        name: "Humane Society of the Black Hills (HSBH)",
        phone: "(605) 394-4170",
        address: "1820 East St. Patrick Street, Rapid City, SD",
        hours: "Mon–Fri: 11:00AM – 5:00PM; Sat: 10:00AM – 5:00PM"
      },
      {
        name: "Battle Mountain Humane Society",
        phone: "(605) 745-7283",
        address: "27254 Wind Cave Road, Hot Springs, SD",
        hours: "Daily: 11:00AM – 3:00PM"
      },
      {
        name: "Western Hills Humane Society",
        phone: "(605) 642-1576",
        address: "324 Industrial Drive, Spearfish, SD",
        hours: "Mon–Sat: 11:00AM – 4:00PM"
      }
    ],
    medicalAssistance: [
      { name: "Operation Pets, Inc.", phone: "(605) 858-2871", address: "2380 Deadwood Ave, Rapid City, SD" },
      { name: "Oglala Pet Project (OPP)", phone: "(605) 455-1518", address: "Pine Ridge Indian Reservation, SD" }
    ],
    spayNeuter: [
      { name: "SD West River Spay/Neuter Coalition", phone: "(605) 593-5550", notes: "Clinics held in Rapid City and other locations; pre-registration required" },
      { name: "Operation Pets, Inc.", phone: "(605) 858-2871", address: "Rapid City, SD" }
    ]
  },

  miscellaneousHotlines: [
    { name: "South Dakota Helpline Center", phone: "211", hours: "24/7" },
    { name: "988 Suicide & Crisis Lifeline", phone: "988", hours: "24/7" },
    { name: "South Dakota Substance Abuse Hotline", phone: "866-210-1303", hours: "24/7" },
    { name: "National Domestic Violence Hotline", phone: "(1-800) 799-SAFE (7233)", hours: "24/7" },
    { name: "Farm and Rural Stress Hotline", phone: "(1-800) 691-4336", hours: "24/7" },
    { name: "Poison Control Center", phone: "(1-800) 222-1222", hours: "24/7" },
    {
      name: "National Human Trafficking Hotline",
      phone: "1-888-373-7888",
      notes: 'Text "HELP" or "INFO" to 233733',
      hours: "24/7"
    }
  ]
};
// --- Rendering Function ---
function renderResources(category, tableId) {
  const tableBody = document.getElementById(tableId);
  if (!tableBody) return;

  resources[category].forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Name">${item.name}</td>
      <td data-label="Phone Number">${item.phone}</td>
      <td data-label="Address">${item.address}</td>
      <td data-label="Open Hours">${item.hours}</td>
      <td data-label="Description">${item.description}</td>
    `;
    tableBody.appendChild(row);
  });
}

// --- Load all sections ---
document.addEventListener("DOMContentLoaded", () => {
  renderResources("dental", "dental-table-body");
  renderResources("medical", "medical-table-body");
  renderResources("pregnancy", "pregnancy-table-body");
  renderResources("familyPlanning", "family-planning-table-body");
});
// ...existing code...

// --- Rendering Function ---
function renderResources(category, tableId) {
  const tableBody = document.getElementById(tableId);
  if (!tableBody) return;

  resources[category].forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Name">${item.name}</td>
      <td data-label="Phone Number">${item.phone}</td>
      <td data-label="Address">${item.address}</td>
      <td data-label="Open Hours">${item.hours}</td>
      <td data-label="Description">${item.description}</td>
    `;
    tableBody.appendChild(row);
  });
}
// --- Helper to normalize resource entries ---
function flattenResource(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === "object") {
    // concatenate any array-valued properties (handles nested sections like elderlyAndDisability, petCare)
    return Object.values(data)
      .filter(v => Array.isArray(v))
      .flat();
  }
  return [];
}

// --- Single rendering function (handles items with phone/address/hours/description/notes) ---
function renderResources(categoryKey, tableId) {
  const tableBody = document.getElementById(tableId);
  if (!tableBody) return;
  const items = flattenResource(resources[categoryKey]);
  items.forEach((item) => {
    const phone = item.phone || item.phoneNumber || "";
    const address = item.address || item.address || item.address === "" ? item.address : "";
    const hours = item.hours || item.hours === "" ? item.hours : "";
    const description = item.description || item.notes || item.notes === "" ? (item.description || item.notes) : "";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Name">${item.name || ""}</td>
      <td data-label="Phone Number">${phone}</td>
      <td data-label="Address">${address}</td>
      <td data-label="Open Hours">${hours}</td>
      <td data-label="Description">${description}</td>
    `;
    tableBody.appendChild(row);
  });
}

// --- Map of HTML tbody IDs to resource keys ---
const renderMap = {
  "dental-table-body": "dental",
  "medical-table-body": "medical",
  "pregnancy-table-body": "pregnancy",
  "family-planning-table-body": "familyPlanning",
  "family-education-table-body": "familyEducation",
  "adoption-table-body": "adoption",
  "foster-care-table-body": "fosterCareServices",
  "breastfeeding-table-body": "breastfeeding",
  "car-seat-table-body": "carSeatPrograms",
  "child-support-table-body": "childSupportEnforcement",
  "sd-health-programs-table-body": "sdHealthPrograms",
  "youth-programs-table-body": "youthPrograms",
  "foster-transition-table-body": "fosterTransitionResources",
  "youth-hotlines-table-body": "youthHotlines",
  "food-assistance-table-body": "foodAssistance",
  "nutrition-table-body": "nutrition",
  "clothing-household-table-body": "clothingAndHousehold",
  "emergency-loans-table-body": "emergencyLoans",
  "housing-assistance-table-body": "housingAssistance",
  "legal-assistance-table-body": "legalAssistance",
  "utility-assistance-table-body": "utilityAssistance",
  "weatherization-table-body": "weatherizationPrograms",
  "employment-services-table-body": "employmentServices",
  "literacy-education-table-body": "literacyAndEducation",
  "financial-literacy-table-body": "financialLiteracy",
  "mental-health-table-body": "mentalHealthAndSubstanceUse",
  "crisis-intervention-table-body": "crisisIntervention",
  "grief-support-table-body": "griefSupport",
  "transportation-table-body": "transportation",
  "drivers-licensing-table-body": "driversLicensing",
  "cultural-community-table-body": "culturalAndCommunity",
  "cancer-support-table-body": "cancerSupport",
  "diabetes-support-table-body": "diabetesSupport",
  "aa-meetings-table-body": "aaMeetings",
  "na-meetings-table-body": "naMeetings",
  "elderly-disability-table-body": "elderlyAndDisability",
  "pet-care-table-body": "petCare",
  "miscellaneous-hotlines-table-body": "miscellaneousHotlines"
};

// --- Load all mapped sections ---
document.addEventListener("DOMContentLoaded", () => {
  Object.entries(renderMap).forEach(([tableId, categoryKey]) => {
    renderResources(categoryKey, tableId);
  });
});