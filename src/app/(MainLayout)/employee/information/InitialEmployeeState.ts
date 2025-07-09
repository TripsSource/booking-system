import {
  EmployeeAbsenceState,
  EmployeeAddressState,
  EmployeeEmployementState,
  EmployeeInfoState,
  EmployeeInsuranceState,
  EmployeeSourceTaxState,
  EmployeeState,
} from "@/types/app/employee";

export const initialEmployeePersonalInfo: EmployeeInfoState = {
  lastname: "",
  firstname: "",
  gender: "Male",
  birthDate: "",
  nationality: "CH",
  stayPermitCategory: "",
  language: "English",
  maritalStatus: "",
  settledDownValidFrom: "",
  maritalStatusValidFrom: "",
  retirementInsuranceNumber: "",
  unknown: false,
  email: "",
  phone: "",
};

export const initialEmployeeEmployment: EmployeeEmployementState = {
  period: {
    entryDate: "",
    withdrawalDate: "",
    withdrawalReason: "",
  },
  relationship: { contract: "", isWorkingTimeRegular: true, level: 10 },
  monthlyAction: false,
  monthlyWage: "",
  workPlace: "Head office",
  empNumber: "",
  effectiveVacationDays: "",
  vacDaysFullLoad: "",
  useWorkingHoursOfWorkplace: false,
  hoursPerWeek: "",
  lessonsPerWeek: "",
};

export const initialEmployeeAddress: EmployeeAddressState = {
  additionalLine: "",
  streetAndHouseNumber: "",
  postOfficeBox: "",
  regionProvinceStateDistrict: "",
  country: "CH",
  city: "",
  zipCode: "",
  canton: "",
  municipalityNumber: "",
};

export const initialEmployeeInsurance: EmployeeInsuranceState = {
  AHVexempt: false,
  AHVcontributionsAtRetirementAge: "",
  UVGsolution: false,
  insuranceContributionCode: "1",
  occupationalBenefitPlan: false,
  ppSolution: false,
  setContributionsInPercent: false,
  companyContribution: "",
  employeeContribution: "",
  compensationOffice: false,
};

export const initialEmployeeAbsence: EmployeeAbsenceState = {
  reason: "Illness",
  isOpen: true,
  isHalfDay: false,
  startDate: "",
  endDate: "",
  continuedPay: "100",
  disability: "100",
};

export const initialEmployeeSourceTax: EmployeeSourceTaxState = {
  action: false,
  code: { codeType: "tariff", codeData: "", isSpecificApprove: false },
  furtherInfo: {
    religion: "",
    typeOfEmployment: "Not employed",
    concubinage: "",
    furtherEmployment: "None",
    detailsOfOtherEmployment: {
      detailsType: "Unknown",
      amount: "",
    },
    isPlaceOfResidenceAbroad: false,
    isResidentWeeklyOrOneDay: false,
    workingDaysPerMonth: 20,
    weeklyResidenceAddress: {
      streetAndHouseNumber: "",
      zipCode: "",
      city: "",
      canton: "",
      municipalityNumber: "",
    },
    crossBorderCommuterData: {
      placeOfBirth: "",
      taxIdAtTheCountryOfRegion: "",
      startDate: "",
    },
  },
  spouse: {
    lastname: "",
    firstname: "",
    dateOfBirth: "",
    unknown: false,
    retirementInsuranceNumber: "",
    isSameAddressAsEmployee: false,
    address: {
      additionalLine: "",
      streetAndHouseNumber: "",
      postOfficeBox: "",
      regionProvinceStateDistrict: "",
      country: "",
      city: "",
      zipCode: "",
      canton: "",
      municipalityNumber: "",
    },
    typeOfIncome: "",
    typeOfEmployment: "",
    startDate: "",
    endDate: "",
    cantonOfEmployment: "",
    residenceCountry: "",
    residenceCanton: "",
  },
};

export const initialEmployee: EmployeeState = {
  personalInfo: initialEmployeePersonalInfo,
  employment: initialEmployeeEmployment,
  address: initialEmployeeAddress,
  bankDetails: { institutionName: "", IBAN: "", BIC: "" },
  insurance: initialEmployeeInsurance,
  absence: [initialEmployeeAbsence],
  sourceTax: initialEmployeeSourceTax,
};
