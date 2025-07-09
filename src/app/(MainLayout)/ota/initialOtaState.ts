import { OtaState } from "@/types/app/ota";

export const initialOTA: OtaState = {
  firstname: "",
  lastname: "",
  email: "",
  role: "",
  travelAgentProfile: {
    addr: {
      street: "",
      city: "",
      postal: "",
      state: "",
      country: "",
    },
    agencyName: "",
    incorpYear: "",
    phone: "",
    tourType: "",
    cities: [],
    clientType: [],
    budget: "",
    commissionPay: "",
    preferredCurrency: "CHF",
    includeFee: false,
    bank: {
      name: "",
      addr: "",
      iban: "",
      swift: "",
    },
    countryCode: "",
    percent: 0,
  },
  createdAt: "",
  updatedAt: "",
};
