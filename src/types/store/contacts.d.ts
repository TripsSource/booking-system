import { ProductDetailState } from "@/types/app/product";
import { Questions, TravellerState } from "../app/booking";

export interface initialStateType {
  contacts: ContactType[];
  loading: boolean;
  contact: ContactType;
  suppliers: {
    companyName: string;
    createdAt: string;
    _id: string;
  }[];
}

export interface ContactType {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  role?: string;
  contactInfo: {
    companyName?: string;
    jobTitle?: string;
    directNumber?: string;
    officeNumber?: string;
    website?: string;
    currency?: string;
    employees?: string;
    address?: AddressType;
    createdAt?: string;
  };
}

export interface AddressType {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}
