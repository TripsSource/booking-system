import { otaState } from "@/types/app/financial";

export interface initialStateType {
  margin: marginType;
  OTA: otaState[];
  loading: boolean;
  revenue: revenueType;
}
export interface marginType {
  shortTourMargin: number;
  mediumTourMargin: number;
  longTourMargin: number;
  shortMarkup: string;
  mediumMarkup: string;
  longMarkup: string;
}

export interface revenueType {
  productId: string;
  productName: string;
  tourDurationHours: number;
  isPrivate: boolean;
  numberOfParticipants: number;
  revenues: revenue[];
  marginSettings: {
    applicableMargin: number;
    markupPercentage: number;
  };
}

export interface revenue {
  childRetailPrice: number;
  childrenCost: number;
  driverCost: number;
  earnings: number;
  fixedCostMarkup: number;
  guideCost: number;
  startingLocationId: {
    destinationTitle: string;
    _id: string;
  };
  totalBulkCost: number;
  totalFixedCost: number;
  totalIndividualCost: number;
  totalRetailPrice: number;
  totalRetailPricePerPerson: number;
  otaPrices: OTAType[];
}

export interface OTAType {
  otaChildPrice: number;
  otaName: string;
  otaPricePerPerson: number;
  otaPriceTotal: number;
}
