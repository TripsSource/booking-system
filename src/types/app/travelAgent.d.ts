export interface TravelAgentState {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  travelAgentProfile: {
    addr: {
      street: string;
      city: string;
      postal: string;
      state: string;
      country: string;
    };
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
    bank: {
      name: string;
      addr: string;
      iban: string;
      swift: string;
    };
    countryCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AgentState {
  _id: string;
  firstname: string;
  lastname: string;
  agencyName: string;
  phone: string;
  incorpYear: string;
  email: string;
  isDeleted: boolean;
  isActive: boolean;
}
