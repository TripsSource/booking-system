import {
  ProductBookingDetailsState,
  ProductGuideDetailState,
  ProductRevenueState,
  ProductSupplierState,
  onlineMapState,
} from "@/types/app/product";
import { ProductCostState, ProductDetailState } from "@/types/app/product";
import { Dispatch, SetStateAction } from "react";
import { readProductState } from "@/types/store/products";

export interface ProductDetailProps {
  product: ProductDetailState;
  handleProduct: (type: string, value: string | onlineMapState) => void;
  handleTours: (
    i: number,
    type: string,
    value:
      | string
      | number
      | boolean
      | string[]
      | ProductRevenueState
      | ProductSupplierState[]
      | ProductGuideDetailState[]
  ) => void;
  addTour: () => void;
  removeTour: (i: number) => void;
}

export interface AvailabilityAndPricingProps {
  product: ProductDetailState;
  handleProduct: (
    type: string,
    value: string | string[] | { startDate: string; endDate: string }[]
  ) => void;
}

export interface PictureInsertionProps {
  product: ProductDetailState;
  handleProduct: (type: string, file: File[] | string[]) => void;
}

export interface ContentWriterAreaProps {
  product: ProductDetailState;
}

export interface BookingDetailsProps {
  product: ProductDetailState;
  handleProduct: (type: string, value: ProductBookingDetailsState) => void;
}

export interface CostDetailsProps {
  product: ProductDetailState;
  handleTours: (
    index: number,
    type: string,
    value: ProductRevenueState
  ) => void;
}

export interface ReadProductsProps {
  products: readProductState[];
  deleted: boolean;
  setDeleted: Dispatch<SetStateAction<boolean>>;
}

export interface GuideDetailsProps {
  product: ProductDetailState;
  handleTours: (
    index: number,
    type: string,
    value: ProductGuideState[]
  ) => void;
}

export interface SupplierDetailProps {
  product: ProductDetailState;
  handleTours: (
    index: number,
    type: string,
    value: ProductSupplierState[]
  ) => void;
}
