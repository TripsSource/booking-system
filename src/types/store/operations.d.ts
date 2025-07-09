import { OperationBookingState } from "@/types/app/operation";

export interface initialStateType {
  bookings: OperationBookingState[];
  loading: boolean;
}
