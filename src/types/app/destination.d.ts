export interface DestinationDetailState {
  _id?: string;
  destinationTitle: string;
  description: string;
  shortDescription: string;
  images: File[];
  currentImages?: string[];
  deletedImages?: string[];
}
