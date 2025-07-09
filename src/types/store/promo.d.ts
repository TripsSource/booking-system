export interface initialStateType {
  loading: boolean;
}

export interface getPromoState {
  page: number;
  perPage: number;
  search: string;
  sort: string;
  order: string;
}
