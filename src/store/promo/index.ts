import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

import errorHandler from "@/utils/errorHandler";
import { initialStateType } from "@/types/store/promo";
import {
  createPromo,
  getAllPromo,
  deletePromo,
  validPromo,
} from "@/store/promo/index.api";

const initialState: initialStateType = {
  loading: false,
};

export const createPromoAction = createAsyncThunk(
  "/promo/create",
  errorHandler(createPromo)
);

export const getAllPromoAction = createAsyncThunk(
  "/promo/get/all",
  errorHandler(getAllPromo)
);

export const deletePromoAction = createAsyncThunk(
  "/promo/delete",
  errorHandler(deletePromo)
);

export const validPromoAction = createAsyncThunk(
  "/promo/delete",
  errorHandler(validPromo)
);

const PromoReducers = createSlice({
  name: "PromoReducers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createPromoAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPromoAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPromoAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(validPromoAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(validPromoAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(validPromoAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const PromoLoadingState = (state: RootState) =>
  state.PromoReducers.loading;

export default PromoReducers.reducer;
