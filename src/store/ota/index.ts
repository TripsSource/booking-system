import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

import errorHandler from "@/utils/errorHandler";
import { initialStateType } from "@/types/store/ota";
import { getOtaBookings } from "@/store/ota/index.api";

const initialState: initialStateType = {
  bookings: [],
  booking: {},
  loading: false,
};

export const getOtaBookingsAction = createAsyncThunk(
  "/ota/bookings",
  errorHandler(getOtaBookings)
);

const OtaReducers = createSlice({
  name: "OtaReducers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOtaBookingsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOtaBookingsAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getOtaBookingsAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const bookingsState = (state: RootState) => state.OtaReducers.bookings;
export const bookingsLoadingState = (state: RootState) =>
  state.OtaReducers.loading;

export default OtaReducers.reducer;
