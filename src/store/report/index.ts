import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { initialStateType } from "@/types/store/report";
import errorHandler from "@/utils/errorHandler";
import {
  readAllReports,
  readReport,
  createReport,
} from "@/store/report/index.api";
import { reportState } from "@/types/app/report";

const initialState: initialStateType = {
  reports: [],
  report: {} as reportState,
  loading: false,
};

export const readAllReportsAction = createAsyncThunk(
  "/reports/readAll",
  errorHandler(readAllReports)
);

export const readReportAction = createAsyncThunk(
  "/report/read",
  errorHandler(readReport)
);

export const createReportAction = createAsyncThunk(
  "/report/create",
  errorHandler(createReport)
);

const ReportsReducers = createSlice({
  name: "ReportsReducers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(readAllReportsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(readAllReportsAction.fulfilled, (state, action) => {
        if (action.payload?.["data"]) state.reports = action.payload.data;
        state.loading = false;
      })
      .addCase(readAllReportsAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(readReportAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(readReportAction.fulfilled, (state, action) => {
        if (action.payload?.["data"]) state.report = action.payload.data;
        state.loading = false;
      })
      .addCase(readReportAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createReportAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReportAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createReportAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const reportLoadingState = (state: RootState) =>
  state.ReportsReducers.loading;

export default ReportsReducers.reducer;
