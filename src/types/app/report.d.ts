export interface readReportState {
  _id: string;
  productId: {
    _id: string;
    name: string;
  };
  bookingId: {
    bokun?: { isPrivate: boolean; productName: string };
    _id: string;
    bookingDate: string;
    startTime: string;
  }[];
  createdBy: {
    _id: string;
    firstname: string;
    lastname: string;
  };
}

export interface reportState {
  productId: string | { _id: string; name: string; isPrivate: boolean };
  bookingId:
    | {
        accountName: string;
        adultCount: number;
        amount: number;
        bokun: {
          productName: string;
          isPrivate: boolean;
        };
        bookingDate: string;
        childCount: number;
        createdAt: string;
        driver: null | string;
        guide: string;
        infantCount: number;
        mainTraveller: {
          country: string;
          email: string;
          emailMeNews: boolean;
          firstname: string;
          lastname: string;
          phoneNumber: string;
        };
        meetingLocation: string;
        otaId: string;
        otaType: string;
        otherTravellers: string[];
        paymentIntent: string[];
        startTime: string;
        status: string;
        updatedAt: string;
        __v: number;
        _id: string;
      }[]
    | string[];
  earn: number;
  break: number;
  feedback: string;
  files: File[];
  startTime: string;
  endTime: string;
  createdAt?: string;
  updatedAt?: string;
}
