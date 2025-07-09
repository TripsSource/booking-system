import { TourDetailState } from "@/types/app/tour";

export interface TourDetailProps {
  tour: TourDetailState;
  handleTour?: (param: string, value: boolean | string) => void;
}

export interface AvailabilityAndPricingProps {
  tour: TourDetailState;
  handleTour?: (
    param: string,
    value: boolean | string | string[] | Date
  ) => void;
}

export interface PictureInsertionProps {
  tour: TourDetailState;
  handleTour: (param: string, file: File[] | string[]) => void;
}

export interface BookingDetailsProps {
  tour: TourDetailState;
  handleTour?: (param: string, value: boolean | string) => void;
}

export interface CostDetailsProps {
  tour: TourDetailState;
  handleTour: (param: string, value: string) => void;
}
