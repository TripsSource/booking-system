import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { initialStateType } from "@/types/store/travelAgent";
import errorHandler from "@/utils/errorHandler";
import {
  getAllTravelAgents,
  getTravelAgent,
  updateTravelAgent,
} from "@/store/travelAgent/index.api";
import { TravelAgentState } from "@/types/app/travelAgent";

const initialState: initialStateType = {
  travelAgents: [],
  travelAgent: {} as TravelAgentState,
  loading: false,
};

export const getAllTravelAgentsAction = createAsyncThunk(
  "/get/all travel agents",
  errorHandler(getAllTravelAgents)
);

export const getTravelAgentAction = createAsyncThunk(
  "/get/travel agent",
  errorHandler(getTravelAgent)
);

export const updateTravelAgentAction = createAsyncThunk(
  "/update/:id",
  errorHandler(updateTravelAgent)
);

const TravelAgentReducers = createSlice({
  name: "TravelAgentReducers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllTravelAgentsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTravelAgentsAction.fulfilled, (state, action) => {
        if (action.payload?.["data"]) state.travelAgents = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllTravelAgentsAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTravelAgentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTravelAgentAction.fulfilled, (state, action) => {
        if (action.payload?.["data"]) state.travelAgent = action.payload.data;
        state.loading = false;
      })
      .addCase(getTravelAgentAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTravelAgentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTravelAgentAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateTravelAgentAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const allAgents = (state: RootState) =>
  state.TravelAgentReducers.travelAgents;
export const selectedAgent = (state: RootState) =>
  state.TravelAgentReducers.travelAgent;
export const travelAgentLoading = (state: RootState) =>
  state.TravelAgentReducers.loading;

export default TravelAgentReducers.reducer;
