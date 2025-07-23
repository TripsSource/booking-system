export const PRIVATE_TOUR: string = "Private Tour";
export const SMALLGROUP_TOUR: string = "Small group Tour";
export const PRIVATE_TOUR_MIN: number = 1;
export const PRIVATE_TOUR_MAX: number = 8;
export const SMALLGROUP_TOUR_MIN: number = 1;
export const SMALLGROUP_TOUR_DEFAULT: number = 15;
export const TOUR_CITIES: { id: string; city: string }[] = [
  { id: "1", city: "Basel" },
  { id: "2", city: "Bern" },
  { id: "3", city: "Lucerne" },
  { id: "4", city: "Zurich" },
  { id: "5", city: "Interlaken" },
];

export const PRODUCT_WEEK: { id: string; day: string }[] = [
  { id: "1", day: "Monday" },
  { id: "2", day: "Tuesday" },
  { id: "3", day: "Wednesday" },
  { id: "4", day: "Thursday" },
  { id: "5", day: "Friday" },
  { id: "6", day: "Saturday" },
  { id: "7", day: "Sunday" },
];

export const DAY_WEEK = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export const PRODUCTSTEPS: { count: number; label: string }[] = [
  { count: 0, label: "Rundown" },
  { count: 1, label: "Content Writer Area" },
  { count: 2, label: "Picture Insertion" },
  { count: 3, label: "Cost Details" },
  { count: 4, label: "Booking Details" },
  { count: 5, label: "Guide Details" },
  { count: 6, label: "Supplier Details" },
];

export const FINANCIALSTEPS: { count: number; label: string }[] = [
  { count: 0, label: "Revenue" },
  { count: 1, label: "Generated Invoices" },
  { count: 2, label: "Payroll" },
  { count: 3, label: "Cost Center" },
  { count: 4, label: "Reporting" },
  { count: 5, label: "Margins Module" },
  { count: 6, label: "OTA Margins" },
];

export const TOURSTEPS: { count: number; label: string }[] = [
  { count: 0, label: "Tour details" },
  { count: 1, label: "Availability and Pricing" },
  { count: 2, label: "Client/Customer details" },
];

export const QUESTIONS: string[] = [
  "Do you have any allergies we should be aware of to help keep you comfortable during your trip?",
  "Do you have any mobility or walking concerns so we can plan accordingly?",
  "Do you have any medical conditions we should consider when visiting higher altitudes to ensure your well-being?",
];

const prefix1: string[] = ["A", "B", "C", "L", "M", "N", "R", "S", "T"]
  .map((e) =>
    Array.from({ length: 10 }).flatMap((_, i) => [`${e}${i}N`, `${e}${i}Y`])
  )
  .flat();
const prefix2: string[] = ["H", "P", "U"]
  .map((e) =>
    Array.from({ length: 9 }).flatMap((_, i) => [
      `${e}${i + 1}N`,
      `${e}${i + 1}Y`,
    ])
  )
  .flat();
export const prefix: string[] = [
  ...prefix1,
  ...prefix2,
  "E0N",
  "E0Y",
  "G9N",
  "HEN",
  "HEY",
  "MEN",
  "MEY",
  "NON",
  "NOY",
  "PEL",
  "PPA",
  "PSP",
  "Q9N",
  "SFN",
  "V9N",
].sort();

export const CREATEEMPLOYEESTEPS: string[] = [
  "Personal Information",
  "Employment",
  "Address",
  "Bank Details",
  "Insurance",
  "Absence",
  "Source Tax",
];

export const EMPLOYEESTEPS: { label: string; value: string }[] = [
  { label: "Active employees", value: "active" },
  { label: "Inactive employees", value: "inactive" },
  { label: "All employees", value: "all" },
  { label: "Deleted employees", value: "deleted" },
];

export const MONTHSTEPS: string[] = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const PERMITCATEGORY: string[] = [
  "Yearly Stay (B)",
  "Asylum Seeker (N)",
  "Cross Border (G)",
  "In Need For Protection (S)",
  "Other",
  "Settled Down (C)",
  "Short Term (L)",
  "Registration procedure for short-term employment (90 days)",
  "Registration procedure for short-term employment (120 days)",
  "Temporarily admitted persons (F)",
  "Residence permit with gainful employment (Ci)",
];

export const LANGUAGE: string[] = ["German", "French", "English", "Italian"];

export const MARITAL: string[] = [
  "unknown",
  "single",
  "married",
  "divorced",
  "widowed",
  "separated",
  "registered partnership",
  "partnership dissolved by law",
  "partnership dissolved by death",
  "partnership dissolved by declaration of lost",
];

export const PERIOD: string[] = [
  "Withdrawal from company",
  "Retirement",
  "Death",
  "Invalidity",
];

export const RELATIONSHIP: string[] = [
  "Permanent contract with monthly salary",
  "Permanent contract with monthly salary and annual working time",
  "Permanent contract with hourly salary",
  "Permanent contract with commission, lump sums, piecework pay",
  "Fixed-term contract with monthly salary",
  "Fixed-term contract with hourly salary",
  "Fixed-term contract with commission, lump sums, piecework pay",
  "Board of directors",
  "Apprenticeship contract",
  "Internship contract",
];

export const ABSENCEREASON: string[] = [
  "Illness",
  "Accident",
  "Maternity/Paternity leave",
  "Military leave",
  "Vacation",
  "Interruption of work",
];

export const BOOKINGSTEPS: string[] = [
  "Contact details",
  "Booking Tour",
  "Review",
];

export const PAYROLLSTEPS = [
  // {
  //   count: 0,
  //   label: "Employees",
  //   sub: [
  //     { count: 10, label: "Personal Information" },
  //     { count: 11, label: "Employment" },
  //     { count: 12, label: "Bank Details" },
  //     { count: 13, label: "Insurance" },
  //     { count: 14, label: "Source Tax" },
  //   ],
  // },
  {
    count: 0,
    label: "Company",
    sub: [
      { count: 10, label: "Master Data" },
      { count: 11, label: "Insurances" },
      { count: 12, label: "Wage Types" },
      { count: 13, label: "Account Plan" },
    ],
  },
  { count: 1, label: "Salary Slip" },
  { count: 2, label: "Statistics" },
];

export const RELIGIONS: string[] = [
  "Roman Catholic",
  "Christian Catholic",
  "Evangelical reformed",
  "Jewish community",
  "Other or no religion",
];
export const TYPEEMPLOYMENTS: string[] = [
  "Not employed",
  "Main activity",
  "Secondary activity",
];

export const PREDEFINED: string[] = [
  "Not subject to withholding tax w/ church ta",
  "Not subject to withholding tax w/o church tax",
  "Monetary value services residing abroad w/ church tax",
  "Monetary value services residing abroad w/o church tax",
  "Honorary board of directors residing abroad w/ church tax",
  "Honorary board of directors residing abroad w/o church tax",
  "Tariff for special agreement with France",
];

export const CONCUBINAGES: string[] = [
  "No concubinage",
  "Yes",
  "No",
  "Unknown",
];

export const CONCUBINAGESDETAILS: string[] = [
  "Sole custody",
  "Shared custody and higher income",
  "Adult child and higher income",
];

export const FURTHEREMPLOYMENTS: string[] = [
  "None",
  "Other activity in Switzerland",
  "Other activity in a foreign country",
  "Other activities in Switzerland and in a foreign country",
];

export const OTHEREMPLOYMENTS: string[] = [
  "Unknown",
  "Total activity rate for all additional employers (input as percentage)",
  "Gross monthly income from all additional employers",
];

export const swissCities = [
  "Argovia",
  "Appenzell Inner-Rhodes",
  "Appenzell Outer-Rhodes",
  "Berne",
  "Basle-Country",
  "Basle-City",
  "Fribourg",
  "Geneva",
  "Glaris",
  "Grisons",
  "Jura",
  "Lucerne",
  "Neuchâtel",
  "Nidwald",
  "Obwald",
  "St. Gall",
  "Schaffhouse",
  "Soleure",
  "Schwyz",
  "Thurgovia",
  "Ticino",
  "Uri",
  "Vaud",
  "Valais",
  "Zug",
  "Zurich",
];

export const TYPEOFINCOMES = [
  "No income",
  "Work or wage replacement",
  "(Work or wage replacement) and pension",
  "Pension",
];

export const OperationTableHeaderTitles = [
  { label: "Date", sortField: "bookingDate" },
  { label: "Client", sortField: "mainTraveller.firstname" },
  { label: "Source", sortField: "otaType" },
  { label: "Tour", sortField: "bokun.productName" },
  { label: "Time Booked", sortField: "createdAt" },
  { label: "PAX", sortField: "startTime" },
  { label: "Tour Start", sortField: "startTime" },
  { label: "Meeting Location", sortField: "meetingLocation" },
  { label: "Guide", sortField: "guide.firstname" },
  { label: "Driver", sortField: "driver.firstname" },
  { label: "Status", sortField: "status" },
];

export const tourofTypes = [
  "Private Tours",
  "Small Groups Tours",
  "Transfers",
  "Packages",
];

export const interesteCities = [
  "Basel",
  "Bern",
  "Lucerne",
  "Lugano",
  "Interlaken",
  "Geneva",
  "Zermatt",
  "Zurich",
];

export const tourofClients = [
  "Solo",
  "Couples",
  "Honeymooners",
  "Families",
  "Cooperate",
];

export const budgetPerClient = [
  "1,000-4,999",
  "5,000-9,999",
  "10,000-19,999",
  "20,000+",
];

export const commissionPaymentMethod = ["Wire", "Other"];
export const accountType = [
  "Direct Client",
  "Guide",
  "Travel Agent",
  "OTA",
  "Hotel",
  "Cruise Company",
  "Tour Company",
];

export const currency = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "AUD",
  "CAD",
  "JPY",
  "CNY",
  "CHF",
  "NZD",
];

export const TRAVELAGENTSTEPS: { count: number; label: string }[] = [
  { count: 0, label: "Information" },
  { count: 1, label: "Commission" },
  { count: 2, label: "Bank" },
];
