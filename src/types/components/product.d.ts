import {
  ProductBookingDetailsState,
  onlineMapState,
  ProductDetailState,
  ProductGuideState,
  ProductLocationState,
  RunDownState,
  timeSlotsState,
} from "@/types/app/product";
import { ProductCostState, ProductDetailState } from "@/types/app/product";
import { Dispatch, SetStateAction } from "react";
import { readProductState } from "@/types/store/products";

export interface ProductDetailProps {
  product: ProductDetailState;
  handleProduct: (
    param: string,
    value: boolean | string | ProductCostState[] | onlineMapState
  ) => void;
  handleLocations: (i: number, param: string, value: string) => void;
  addLocations: () => void;
  removeLocations: (i: number) => void;
}

export interface AvailabilityAndPricingProps {
  product: ProductDetailState;
  handleProduct: (
    param: string,
    value: timeSlotsState | string | string[]
  ) => void;
}

export interface PictureInsertionProps {
  product: ProductDetailState;
  handleProduct: (param: string, file: File[] | string[]) => void;
}

export interface ContentWriterAreaProps {
  product: ProductDetailState;
}

export interface BookingDetailsProps {
  product: ProductDetailState;
  handleProduct: (param: string, value: ProductBookingDetailsState) => void;
}

export interface CostDetailsProps {
  product: ProductDetailState;
  handleProduct: (param: string, value: ProductCostState[]) => void;
}

export interface ReadProductsProps {
  products: readProductState[];
  deleted: boolean;
  setDeleted: Dispatch<SetStateAction<boolean>>;
}

export interface GuideDetailsProps {
  product: ProductDetailState;
  handleProduct: (param: string, value: ProductGuideState[]) => void;
}
