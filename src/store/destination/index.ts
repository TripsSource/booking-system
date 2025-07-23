import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/utils/api";
import { Response } from "@/types/api";
import { RootState } from "..";
import {
  initialStateType,
  readDestinationType,
} from "@/types/store/destination";
import { DestinationDetailState } from "@/types/app/destination";
import errorHandler from "@/utils/errorHandler";
import {
  CreateDestination,
  DeleteDestination,
  GetDestinationId,
  GetDestinations,
  GetDestinationTitles,
  UpdateDestination,
} from "@/store/destination/index.api";

const initialState: initialStateType = {
  destinations: [] as readDestinationType[],
  destination: {} as DestinationDetailState,
  destinationsTitles: [{ _id: "", destinationTitle: "" }],
  loading: false,
};

export const crateDestinationAction = createAsyncThunk(
  "/destination/create",
  errorHandler(CreateDestination)
);

export const updateDestinationAction = createAsyncThunk(
  "/destination/update",
  errorHandler(UpdateDestination)
);

export const getDestinationsAction = createAsyncThunk(
  "/destination/read/all",
  errorHandler(GetDestinations)
);

export const getDestinationIdAction = createAsyncThunk(
  "/destination/read",
  errorHandler(GetDestinationId)
);

export const deleteDestinationAction = createAsyncThunk(
  "/destination/delete",
  errorHandler(DeleteDestination)
);

export const getDestinationTitlesAction = createAsyncThunk(
  "/destination/titles",
  errorHandler(GetDestinationTitles)
);

const DestinationsReducers = createSlice({
  name: "DestinationsReducers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(crateDestinationAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(crateDestinationAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(crateDestinationAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateDestinationAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDestinationAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDestinationAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDestinationsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDestinationsAction.fulfilled, (state, action) => {
        state.destinations = action.payload.data;
        state.loading = false;
      })
      .addCase(getDestinationsAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDestinationIdAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDestinationIdAction.fulfilled, (state, action) => {
        state.destination = action.payload.data;
        state.loading = false;
      })
      .addCase(getDestinationIdAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDestinationTitlesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDestinationTitlesAction.fulfilled, (state, action) => {
        state.destinationsTitles = action.payload.data;
        state.loading = false;
      })
      .addCase(getDestinationTitlesAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const destinationsState = (state: RootState) =>
  state.DestinationsReducers.destinations;
export const destinationIdState = (state: RootState) =>
  state.DestinationsReducers.destination;
export const destinationTitlesState = (state: RootState) =>
  state.DestinationsReducers.destinationsTitles;
export const destinationLoadingState = (state: RootState) =>
  state.DestinationsReducers.loading;

export default DestinationsReducers.reducer;
