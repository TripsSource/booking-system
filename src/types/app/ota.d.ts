export interface OtaState {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  travelAgentProfile: OtaProfile;
  createdAt: string;
  updatedAt: string;
}

export interface OtaProfile {
  addr: OtaAddr;
  agencyName: string;
  incorpYear: string;
  phone: string;
  tourType: string;
  cities: string[];
  clientType: string[];
  budget: string;
  percent: number;
  commissionPay: string;
  preferredCurrency: string;
  includeFee: boolean;
  bank: OtaBank;
  countryCode: string;
}

export interface OtaAddr {
  street: string;
  city: string;
  postal: string;
  state: string;
  country: string;
}

export interface OtaBank {
  name: string;
  addr: string;
  iban: string;
  swift: string;
}
