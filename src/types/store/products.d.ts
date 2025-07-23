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
  shortDescription: string;
  destination: string;
  totalIndividualPrices: {
    startingLocationId: string;
    totalIndividualPrice: number;
  }[];
  tours: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  image: string;
  maxPrice: number;
  minPrice: number;
  minCost: number;
  maxCost: number;
}
