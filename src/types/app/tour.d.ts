export interface TourDetailState {
  _id?: string;
  name: string;
  destination:
    | string
    | {
        createdAt: string;
        destinationTitle: string;
        generalDescription: string;
        images: string[];
        updatedAt: string;
        __v: number;
        _id: string;
      };
  description: string;
  isPrivate: boolean;
  withDriver: boolean;
  startingLocations: ProductLocationState[];
  members: string;
  onlineMap: onlineMapState;
  timeSlots: timeSlotsState;
  exclusions: string[];
  inclusions: string[];
  images: File[];
  bring: string;
  knowBeforeGo: string;
  bookingDetails: ProductBookingDetailsState;
  revenues: ProductCostState[];
  liveStatus: boolean;
  currentImages?: string[];
  deletedImages?: string[];
}

export interface ProductCostState {
  startingLocationId: string;
  clientTrainTicket: string;
  swissHalfFareTravelPass: string;
  mountainTicket1: string;
  mountainTicket2: string;
  boatTicket: string;
  tasting1: string;
  tasting2: string;
  tasting3: string;
  guideTrainTicket: string;
  transportation: string;
  childrenCost: string;
  totalBulkCost?: number;
  totalIndividualCost?: number;
}

export interface ProductLocationState {
  _id: string;
  meetingLocation: string;
  durationHours: string;
}

export interface ProductBookingDetailsState {
  leadFullName: boolean;
  leadBirth: boolean;
  leadEmail: boolean;
  leadPhone: boolean;
  othersFullName: boolean;
  othersPhone: boolean;
  allergyQuestion: boolean;
  mobilityQuestion: boolean;
  medicalQuestion: boolean;
}

export interface timeSlotsState {
  startDate: string;
  endDate: string;
  blackOuts: string[];
  times: string[];
}

export interface onlineMapState {
  usaPosition: [number, number];
  locations: [number, number][];
}
