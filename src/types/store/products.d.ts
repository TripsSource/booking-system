import { ProductDetailState } from "@/types/app/product";

export interface initialStateType {
  products: readProductState[];
  productLoading: boolean;
  loading: boolean;
  product: ProductDetailState;
}

export interface readProductState {
  _id: string;
  name: string;
  description: string;
  destination: string;
  totalIndividualPrices: {
    startingLocationId: string;
    totalIndividualPrice: number;
  }[];
  options?: number;
  availableDate?: string;
  liveStatus: boolean;
  image: string;
  isPrivate: boolean;
  maxPrice: number;
  minPrice: number;
  minCost: number;
  maxCost: number;
}
