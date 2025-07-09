export interface DestinationDetailState {
  _id?: string;
  destinationTitle: string;
  generalDescription: string;
  images: File[];
  currentImages?: string[];
  deletedImages?: string[];
}
