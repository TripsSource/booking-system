import { ProductCostState, ProductDetailState } from "@/types/app/product";
import moment from "moment";

export const initialCost: ProductCostState = {
  startingLocationId: "",
  clientTrainTicket: "",
  swissHalfFareTravelPass: "",
  mountainTicket1: "",
  mountainTicket2: "",
  boatTicket: "",
  tasting1: "",
  tasting2: "",
  tasting3: "",
  guideTrainTicket: "",
  transportation: "",
  childrenCost: "",
};

export const initialProduct: ProductDetailState = {
  name: "",
  description: "",
  destination: "",
  isPrivate: false,
  members: "15",
  withDriver: true,
  startingLocations: [{ _id: "", meetingLocation: "", durationHours: "" }],
  onlineMap: {
    usaPosition: [46.8, 8.23],
    locations: [],
  },
  timeSlots: {
    startDate: moment(Date.now()).format("YYYY-MM-DD"),
    endDate: moment(Date.now()).format("YYYY-MM-DD"),
    blackOuts: [],
    times: [],
  },
  exclusions: [""],
  inclusions: [""],
  images: [],
  bring: "",
  knowBeforeGo: "",
  bookingDetails: {
    leadFullName: true,
    leadBirth: true,
    leadEmail: true,
    leadPhone: true,
    othersFullName: true,
    othersPhone: true,
    allergyQuestion: true,
    mobilityQuestion: true,
    medicalQuestion: true,
  },
  revenues: [initialCost],
  liveStatus: true,
  guideDetails: [
    {
      startingLocationId: "",
      itineraryStops: [
        {
          position: "",
          pointsToCover: "",
        },
      ],
    },
  ],
  suppliers: [
    { startingLocationId: "", contacts: [{ supplierId: "", timeSlot: "" }] },
  ],
};
