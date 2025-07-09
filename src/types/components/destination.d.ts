import { DestinationDetailState } from "../app/destination";

export interface DestinationDetailProps {
  destination: DestinationDetailState;
  handleDistination: (
    params: string,
    value: string | string[] | File[]
  ) => void;
}
