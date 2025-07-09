import { BookingType } from "@/types/store/booking";

export const initalBooking: BookingType = {
  bookingDetails: {
    mainTraveller: {
      firstname: "",
      lastname: "",
      birthDate: "",
      email: "",
      phoneNumber: "",
      emailMeNews: false,
      lang: "",
      country: "",
    },
    questions: {
      allergyQuestion: "",
      mobilityQuestion: "",
      medicalQuestion: "",
    },
    productId: "",
    startingLocationId: "",
    meetingLocation: "",
    adultCount: 1,
    childCount: 0,
    infantCount: 0,
    bookingDate: "",
    startTime: "",
    otherTravellers: [
      {
        firstname: "",
        lastname: "",
        birthDate: "",
      },
    ],
    amount: 0,
    isPrivate: false,
  },
};
