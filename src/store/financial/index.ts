import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/utils/api";
import { Response } from "@/types/api";
import { RootState } from "..";
import {
  initialStateType,
  marginType,
  revenueType,
} from "@/types/store/financial";
import { marginsState, otaState } from "@/types/app/financial";
import errorHandler from "@/utils/errorHandler";
import {
  CreateOTA,
  DeleteOTA,
  GetMargin,
  GetOTAS,
  GetProductRevenue,
  UpdateMargin,
  UpdateOTA,
  getForInvoices,
  getForInvoice,
  createInvoice,
  getInvoices,
  deleteInvoice,
  getMailInvoice,
  createMailInvoice,
} from "@/store/financial/index.api";

const initialState: initialStateType = {
  margin: {
    shortTourMargin: 0,
    mediumTourMargin: 0,
    longTourMargin: 0,
    shortMarkup: "",
    mediumMarkup: "",
    longMarkup: "",
  } as marginType,
  OTA: [] as otaState[],
  revenue: {} as revenueType,
  loading: false,
};

export const getMarginAction = createAsyncThunk(
  "/margin/read",
  errorHandler(GetMargin)
);

export const getOTASAction = createAsyncThunk(
  "/ota/read/all",
  errorHandler(GetOTAS)
);

export const updateMarginAction = createAsyncThunk(
  "/margin/update",
  errorHandler(UpdateMargin)
);

export const getProductRevenueAction = createAsyncThunk(
  "/revenue/get",
  errorHandler(GetProductRevenue)
);

export const createOTAAction = createAsyncThunk(
  "/ota/create",
  errorHandler(CreateOTA)
);

export const updateOTAAction = createAsyncThunk(
  "/ota/update/id",
  errorHandler(UpdateOTA)
);

export const deleteOTAAction = createAsyncThunk(
  "/ota/delete/id",
  errorHandler(DeleteOTA)
);

export const getForInvoicesAction = createAsyncThunk(
  "/invoice/bookings",
  errorHandler(getForInvoices)
);

export const getForInvoiceAction = createAsyncThunk(
  "/invoice/booking",
  errorHandler(getForInvoice)
);

export const createInvoiceAction = createAsyncThunk(
  "/invoice/create",
  errorHandler(createInvoice)
);

export const getInvoicesAction = createAsyncThunk(
  "/invoice/get/all",
  errorHandler(getInvoices)
);

export const deleteInvoiceAction = createAsyncThunk(
  "/invoice/delete",
  errorHandler(deleteInvoice)
);

export const getMailInvoiceAction = createAsyncThunk(
  "/mail/invoice",
  errorHandler(getMailInvoice)
);

export const createMailInvoiceAction = createAsyncThunk(
  "/mail/invoice/create",
  errorHandler(createMailInvoice)
);

const FinancialReducers = createSlice({
  name: "FinancialReducers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMarginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMarginAction.fulfilled, (state, action) => {
        state.margin = action.payload;
        state.loading = false;
      })
      .addCase(getMarginAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateMarginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMarginAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMarginAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOTASAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOTASAction.fulfilled, (state, action) => {
        state.OTA = action.payload;
        state.loading = false;
      })
      .addCase(getOTASAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProductRevenueAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductRevenueAction.fulfilled, (state, action) => {
        state.loading = false;
        if (typeof action.payload !== "string") {
          state.revenue = action.payload;
        }
      })
      .addCase(getProductRevenueAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteOTAAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOTAAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteOTAAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createMailInvoiceAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMailInvoiceAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createMailInvoiceAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const marginState = (state: RootState) => state.FinancialReducers.margin;
export const OTAState = (state: RootState) => state.FinancialReducers.OTA;
export const revenueState = (state: RootState) =>
  state.FinancialReducers.revenue;
export const loadingState = (state: RootState) =>
  state.FinancialReducers.loading;

export default FinancialReducers.reducer;
