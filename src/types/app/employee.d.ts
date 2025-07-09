export interface EmployeeState {
  _id?: string;
  personalInfo: EmployeeInfoState;
  employment: EmployeeEmployementState;
  bankDetails: EmployeeBankDetailsState;
  insurance: EmployeeInsuranceState;
  absence: EmployeeAbsenceState[];
  sourceTax: EmployeeSourceTaxState;
  address: EmployeeAddressState;
}

export interface EmployeeInfoState {
  firstname: string;
  lastname: string;
  gender: string;
  birthDate: string;
  nationality: string;
  stayPermitCategory: string;
  language: string;
  maritalStatus: string;
  settledDownValidFrom: string;
  maritalStatusValidFrom: string;
  retirementInsuranceNumber: string;
  unknown: boolean;
  email: string;
  phone: string;
}

export interface EmployeeEmployementState {
  period: {
    entryDate: string;
    withdrawalDate: string;
    withdrawalReason: string;
  };
  relationship: {
    contract: string;
    isWorkingTimeRegular: boolean;
    level: number;
  };
  monthlyAction: boolean;
  monthlyWage: string | number;
  workPlace: string;
  empNumber: string | number;
  effectiveVacationDays: string | number;
  vacDaysFullLoad: string | number;
  useWorkingHoursOfWorkplace: false;
  hoursPerWeek: string | number;
  lessonsPerWeek: string | number;
}

export interface EmployeeAbsenceState {
  reason: string;
  isOpen: boolean;
  isHalfDay: boolean;
  startDate: string;
  endDate: string;
  continuedPay: string;
  disability: string;
}

export interface EmployeeInsuranceState {
  AHVexempt: boolean;
  AHVcontributionsAtRetirementAge: string;
  UVGsolution: boolean;
  insuranceContributionCode: string;
  occupationalBenefitPlan: boolean;
  ppSolution: boolean;
  setContributionsInPercent: boolean;
  companyContribution: string | number;
  employeeContribution: string | number;
  compensationOffice: boolean;
}

export interface EmployeeBankDetailsState {
  institutionName: string;
  IBAN: string;
  BIC: string;
}

export interface EmployeeSourceTaxState {
  action: boolean;
  code: { codeType: string; codeData: string; isSpecificApprove: boolean };
  furtherInfo: {
    religion: string;
    typeOfEmployment: string;
    concubinage: string;
    furtherEmployment: string;
    detailsOfOtherEmployment: {
      detailsType: string;
      amount: number | string;
    };
    isPlaceOfResidenceAbroad: boolean;
    isResidentWeeklyOrOneDay: boolean;
    workingDaysPerMonth: number;
    weeklyResidenceAddress: {
      streetAndHouseNumber: string;
      zipCode: string;
      city: string;
      canton: string;
      municipalityNumber: string;
    };
    crossBorderCommuterData: {
      placeOfBirth: string;
      taxIdAtTheCountryOfRegion: string;
      startDate: string;
    };
  };
  spouse: {
    lastname: string;
    firstname: string;
    dateOfBirth: string;
    unknown: boolean;
    retirementInsuranceNumber: string;
    isSameAddressAsEmployee: boolean;
    typeOfIncome: string;
    typeOfEmployment: string;
    startDate: string;
    endDate: string;
    address: {
      additionalLine: string;
      streetAndHouseNumber: string;
      postOfficeBox: string;
      regionProvinceStateDistrict: string;
      country: string;
      city: string;
      zipCode: string;
      canton: string;
      municipalityNumber: string;
    };
    cantonOfEmployment: string;
    residenceCountry: string;
    residenceCanton: string;
  };
}

export interface EmployeeAddressState {
  additionalLine: string;
  streetAndHouseNumber: string;
  postOfficeBox: string;
  regionProvinceStateDistrict: string;
  country: string;
  city: string;
  zipCode: string;
  canton: string;
  municipalityNumber: string;
}

export interface RoleMembersState {
  _id: string;
  firstname: string;
  lastname: string;
  role: string;
}
