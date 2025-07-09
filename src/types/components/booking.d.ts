import { BookingState } from "@/types/app/booking";

export interface LeadTravelerProps {
  book: BookingState;
  handleBook: (e: HTMLInputElement) => void;
  handleCustomBook: (param: string, value: string) => void;
}

export interface AdditionalTravelersProps {
  book: BookingState;
  handleCustomBook: (param: string, value: string[]) => void;
}

export interface TourDetailsProps {
  book: BookingState;
  handleCustomBook: (param: string, value: string) => void;
}

export interface SpecialRequirementsProps {
  book: BookingState;
  handleBook: (e: HTMLTextAreaElement) => void;
}
