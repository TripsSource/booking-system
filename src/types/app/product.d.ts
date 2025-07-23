export interface ProductDetailState {
  _id?: string;
  destinationId: string;
  destinationTitle?: string;
  tours: ProductTourState[];
  name: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string | null;
  blackOuts: { startDate: string; endDate: string }[];
  inclusions: string[];
  exclusions: string[];
  onlineMap: onlineMapState;
  bring: string;
  knowBefore: string;
  images: File[];
  bookingDetails: ProductBookingDetailsState;
  isActive: boolean;
  isDeleted?: boolean;
  otaLive: { otaName: string; status: boolean; id: string }[];
  currentImages?: string[];
  deletedImages?: string[];
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

export interface onlineMapState {
  usaPosition: [number, number];
  locations: [number, number][];
}

export interface ProductRevenueState {
  clientTrainTicket: string | number;
  swissHalfFareTravelPass: string | number;
  mountainTicket1: string | number;
  mountainTicket2: string | number;
  boatTicket: string | number;
  tasting1: string | number;
  tasting2: string | number;
  tasting3: string | number;
  guideTrainTicket: string | number;
  transportation: string | number;
  totalIndividualCost?: number;
  totalBulkCost?: number;
  childrenCost: string | number;
}

export interface ProductGuideDetailState {
  position: string;
  pointsToCover: string;
}

export interface ProductSupplierState {
  supplierId: string | null;
  time: string;
}

export interface ProductTourState {
  _id?: string;
  productId?: string;
  destinationId: string;
  meetingLocation: string | null;
  destinationTitle?: string;
  isPrivate: boolean;
  withDriver: boolean;
  members: string | number;
  times: string[];
  duration: string | number;
  revenue: ProductRevenueState;
  guideDetails: ProductGuideDetailState[];
  suppliers: ProductSupplierState[];
  otaLive: { otaName: string; status: boolean; id: string }[];
}
