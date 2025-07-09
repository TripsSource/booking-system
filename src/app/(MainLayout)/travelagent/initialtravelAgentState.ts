import { TravelAgentState } from "@/types/app/travelAgent";

export const initialTravelAgent: TravelAgentState = {
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
    preferredCurrency: "",
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

export const validateTravelAgent = (agent: TravelAgentState) => {
  const isEmpty = (value: any) =>
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    value === null ||
    value === undefined;

  if (isEmpty(agent.firstname)) {
    return true;
  }

  if (isEmpty(agent.lastname)) {
    return true;
  }

  if (isEmpty(agent.email)) {
    return true;
  }

  if (isEmpty(agent.role)) {
    return true;
  }

  const profile = agent.travelAgentProfile;

  for (const field of [
    "street",
    "city",
    "postal",
    "state",
    "country",
  ] as const) {
    if (isEmpty(profile.addr[field])) {
      return true;
    }
  }

  // Other profile fields
  if (isEmpty(profile.agencyName)) {
    return true;
  }

  if (isEmpty(profile.incorpYear)) {
    return true;
  }

  if (isEmpty(profile.phone)) {
    return true;
  }

  if (isEmpty(profile.tourType)) {
    return true;
  }

  if (isEmpty(profile.cities)) {
    return true;
  }

  if (isEmpty(profile.clientType)) {
    return true;
  }

  if (isEmpty(profile.budget)) {
    return true;
  }

  if (isEmpty(profile.commissionPay)) {
    return true;
  }

  if (isEmpty(profile.preferredCurrency)) {
    return true;
  }

  for (const field of ["name", "addr", "iban", "swift"] as const) {
    if (!profile.bank || isEmpty(profile.bank[field])) {
      return true;
    }
  }

  return false;
};
