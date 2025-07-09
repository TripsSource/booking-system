export interface PromoCodeState {
  code: string;
  percent: number;
  maxUses: string;
  expiresAt: string;
  noExpiry: boolean;
}

export interface ViewPromoState {
  data: ViewPromoDataState[];
  page: number;
  perPage: number;
  totalPages: number;
  totalCount: number;
  search: string;
  sort: string;
  order: string;
}

export interface ViewPromoDataState {
  code: string;
  createdAt: string;
  createdBy: {
    firstname: string;
    lastname: string;
    _id: string;
  };
  expiresAt: string;
  isActive: boolean;
  maxUses: number;
  percent: number;
  updatedAt: string;
  usedCount: number;
  __v: number;
  _id: string;
}
