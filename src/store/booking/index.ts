import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/utils/api";
import { Response } from "@/types/api";
import { RootState } from "..";

import {
  BookingType,
  initialStateType,
  readBookingType,
} from "@/types/store/booking";
import {
  bookingCreate,
  deleteBooking,
  getBookingById,
  getBookings,
  updateBooking,
  getAllPastBookings,
} from "@/store/booking/index.api";
import errorHandler from "@/utils/errorHandler";
import { initalBooking } from "@/app/(MainLayout)/booking/InitialBookingState";

const initialState: initialStateType = {
  bookings: [initalBooking],
  booking: {} as BookingType,
  loading: false,
};

export const getBookingsAction = createAsyncThunk(
  "/bookings",
  errorHandler(getBookings)
);

export const getBookingByIdAction = createAsyncThunk(
  "/bookings/:id",
  errorHandler(getBookingById)
);

export const deleteBookingsAction = createAsyncThunk(
  "/booking/delete",
  errorHandler(deleteBooking)
);

export const createBookingAction = createAsyncThunk(
  "/booking/create",
  errorHandler(bookingCreate)
);

export const updateBookingAction = createAsyncThunk(
  "/booking/update",
  errorHandler(updateBooking)
);

export const getAllPastBookingsAction = createAsyncThunk(
  "/booking/getPastBookings",
  errorHandler(getAllPastBookings)
);

const BookingReducers = createSlice({
  name: "BookingReducers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBookingsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingsAction.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(getBookingsAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBookingByIdAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingByIdAction.fulfilled, (state, action) => {
        // state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(getBookingByIdAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteBookingsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBookingsAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteBookingsAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createBookingAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBookingAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createBookingAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateBookingAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBookingAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateBookingAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const bookingsState = (state: RootState) =>
  state.BookingReducers.bookings;
export const bookingsLoadingState = (state: RootState) =>
  state.BookingReducers.loading;

export default BookingReducers.reducer;
