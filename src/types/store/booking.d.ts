import { ProductDetailState } from "@/types/app/product";
import { Questions, TravellerState } from "../app/booking";

export interface initialStateType {
  bookings: BookingType[];
  loading: boolean;
  booking: BookingType;
}

export interface readBookingType {
  _id: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  message: string;
  replyFlag: boolean;
  productId: {
    _id: string;
    name: string;
  };
}

export interface BookingType {
  _id?: string;
  bookingDetails: {
    _id?: string;
    mainTraveller: TravellerState;
    questions: Questions;
    productId: string;
    startingLocationId: string;
    meetingLocation: string;
    adultCount: number;
    childCount: number;
    infantCount: number;
    bookingDate: string;
    startTime: string;
    otherTravellers: {
      firstname: string;
      lastname: string;
      birthDate: string;
    }[];
    amount: number;
    isPrivate: boolean;
  };
}

export interface BookingDetails {
  _id?: string;
  ota?: string;
  bookingDetails: any;
  mainTraveller: TravellerState;
  questions: Questions;
  productId: string;
  productName?: string;
  startingLocationId: string;
  meetingLocation: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
  bookingDate: string;
  startTime: string;
  otherTravellers: {
    firstname: string;
    lastname: string;
    birthDate: string;
  };
  amount: number;
  isPrivate: boolean;
  status: string;
}
