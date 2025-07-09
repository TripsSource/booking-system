import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Response } from "@/types/api";
import { RootState } from "..";
import errorHandler from "@/utils/errorHandler";
import { initialStateType } from "@/types/store/operations";
import {
  createReport,
  getOperaionBookings,
  getOperationSchedule,
  getOperationScheduleByDay,
  setGuideAndDriver,
} from "./index.api";

const initialState: initialStateType = {
  bookings: [],
  loading: false,
};

export const getOperaionBookingsAction = createAsyncThunk(
  "/operations/overview",
  errorHandler(getOperaionBookings)
);

export const setGuideAndDriverAction = createAsyncThunk(
  "/operations/overview/:id",
  errorHandler(setGuideAndDriver)
);

export const getOperationScheduleAction = createAsyncThunk(
  "/operations/schedule",
  errorHandler(getOperationSchedule)
);

export const getOperationScheduleByDayAction = createAsyncThunk(
  "/operations/schedule",
  errorHandler(getOperationScheduleByDay)
);

export const createReportAction = createAsyncThunk(
  "/operations/report",
  errorHandler(createReport)
);

const OperationsReducers = createSlice({
  name: "OperationsReducers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOperaionBookingsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOperaionBookingsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.data;
      })
      .addCase(getOperaionBookingsAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(setGuideAndDriverAction.pending, (state) => {
        // state.loading = true;
      })
      .addCase(setGuideAndDriverAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(setGuideAndDriverAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const OperationLoading = (state: RootState) =>
  state.OperationsReducers.loading;
export const OperationBookings = (state: RootState) =>
  state.OperationsReducers.bookings;

export default OperationsReducers.reducer;
