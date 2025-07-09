import { ContactType } from "@/types/store/contacts";

export const initalContact: ContactType = {
  firstname: "",
  lastname: "",
  email: "",
  contactInfo: {
    currency: "CHF",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  },
};
