export interface BookingState {
  name: string;
  surname: string;
  birth: string;
  phone: string;
  email: string;
  travelers: string[];
  tour: string;
  tourDate: string;
  requirements: string;
}

export interface BookingFormState {
  bookingDetails: ProductBookingDetailsState;
  paymentInfo: {
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
    country: string;
    zipCode: string;
    checkBooking: boolean;
  };
}

export interface ProductBookingDetailsState {
  productId: string;
  startingLocationId: string;
  adultCount: string;
  childCount: string;
  bookingDate: string;
  startTime: string;
  mainTraveller: TravellerState;
  questions: Questions;
  otherTravellers: TravellerState[];
  amount: number;
}

export interface Questions {
  allergyQuestion: string;
  mobilityQuestion: string;
  medicalQuestion: string;
}

export interface TravellerState {
  firstname: string;
  lastname: string;
  birthDate: string;
  email?: string;
  phoneNumber?: string;
  emailMeNews?: boolean;
  lang?: string;
  country?: string;
}
