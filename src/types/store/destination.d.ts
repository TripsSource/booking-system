import { DestinationDetailState } from "../app/destination";

export interface initialStateType {
  destinations: readDestinationType[];
  destination: DestinationDetailState;
  destinationsTitles: readDestinationTitleType[];
  loading: boolean;
}

export interface readDestinationTitleType {
  _id: string;
  destinationTitle: string;
}
export interface readDestinationType {
  _id: string;
  destinationTitle: string;
  shortDescription: string;
  images: string[];
}
