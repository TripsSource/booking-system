import { ProductDetailState } from "@/types/app/product";
import { readReportState, reportState } from "@/types/app/report";

export interface initialStateType {
  reports: readReportState[];
  loading: boolean;
  report: reportState;
}
