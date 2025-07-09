import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/utils/api";
import { Response } from "@/types/api";
import { toast } from "react-toastify";
import { RootState } from "..";

export interface TourRow {
  id: number;
  max_capacity: string;
  duration_minutes: string;
  meeting_location: string;
  start_date: string;
  end_date: string;
  guide_rate: string;
  ticket_cost: string;
  vehicle_cost: string;
  uploadedFiles: File[];
  indefinite_availability: boolean;
  general_description: string;
  private_tour: boolean;
  time_slots: any;
  name: string;
  short_description: string;
  duration_hours: number;
  location: string;
  what_to_bring: string;
  know_before: string;
  questions: string;
  image?: string | null | undefined;
}

interface TimeSlot {
  time: string;
  day_of_week: string;
  specific_date: string;
}

interface TourData {
  tourName: string;
  shortDescription: string;
  generalDescription: string;
  durationHours: string;
  durationMinutes: string;
  whatToBring: string;
  knowBefore: string;
  questions: string;
  privateTour: boolean;
  meetingLocation: string;
  uploadedFiles: File[];
  indefiniteAvailability: boolean;
  startDate: string;
  endDate: string;
  timeSlots: TimeSlot[];
  guideRate: string;
  ticketCost: string;
  vehicleCost: string;
  maxiumumCapacity: string;
  onlineMap: {
    usaPosition: [number, number];
    locations: [number, number][];
  };
}

interface InitialState {
  tourRows: TourRow[];
  tourData: TourData;
  loading: boolean;
  error: string | null;
}

type TourTypes = {
  tourName: string;
  shortDescription: string;
  generalDescription: string;
  durationHours: string;
  durationMinutes: string;
  whatToBring: string;
  knowBefore: string;
  questions: string;
  privateTour: boolean;
  meetingLocation: string;
  uploadedFiles: File[]; // Store images here
  indefiniteAvailability: boolean;
  startDate: string;
  endDate: string;
  timeSlots: {
    time: string;
    day_of_week: string;
    specific_date: string;
  }[];
  guideRate: string;
  ticketCost: string;
  vehicleCost: string;
  maxiumumCapacity: string;
};

const initialState: InitialState = {
  tourRows: [],
  tourData: {
    tourName: "",
    shortDescription: "",
    generalDescription: "",
    durationHours: "",
    durationMinutes: "",
    whatToBring: "",
    knowBefore: "",
    questions: "",
    privateTour: false,
    meetingLocation: "",
    timeSlots: [
      {
        time: "",
        day_of_week: "",
        specific_date: "",
      },
    ],
    guideRate: "",
    ticketCost: "",
    vehicleCost: "",
    maxiumumCapacity: "",
    uploadedFiles: [],
    indefiniteAvailability: false,
    startDate: "",
    endDate: "",
    onlineMap: {
      usaPosition: [50, 10],
      locations: [],
    },
  },
  loading: false,
  error: null,
};

export const addTourAction = createAsyncThunk<
  any,
  TourTypes,
  { state: RootState }
>("tours/addtour", async (tourData, thunkAPI) => {
  const onlineMap = thunkAPI.getState().TourReducers.tourData.onlineMap;
  try {
    const formData = new FormData();
    formData.append("image", tourData.uploadedFiles[0]); // Append image
    formData.append("name", tourData.tourName);
    formData.append("short_description", tourData.shortDescription);
    formData.append("general_description", tourData.generalDescription);
    formData.append("duration_hours", tourData.durationHours);
    formData.append("duration_minutes", tourData.durationMinutes);
    formData.append("what_to_bring", tourData.whatToBring);
    formData.append("know_before", tourData.knowBefore);
    formData.append("questions", tourData.questions);
    formData.append("private_tour", JSON.stringify(tourData.privateTour));
    formData.append("meeting_location", tourData.meetingLocation);
    formData.append("time_slots", JSON.stringify(tourData.timeSlots));
    formData.append("start_date", tourData.startDate);
    formData.append("end_date", tourData.endDate);
    formData.append(
      "indefinite_availability",
      JSON.stringify(tourData.indefiniteAvailability)
    );
    formData.append("max_capacity", tourData.maxiumumCapacity);
    formData.append("guide_rate", tourData.guideRate);
    formData.append("ticket_cost", tourData.ticketCost);
    formData.append("vehicle_cost", tourData.vehicleCost);
    formData.append("is_additional_name_required", JSON.stringify(false));
    formData.append("is_additional_email_required", JSON.stringify(false));

    formData.append("itinerary_points", JSON.stringify(onlineMap.locations));
    const response = await api.post<Response<{ id: string; image: string }>>(
      `/api/tours`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data; // Expected response: { id, image }
  } catch (error) {
    return error.response?.data?.error || "Something went wrong.";
  }
});

export const getToursAction = createAsyncThunk<
  TourRow[],
  void,
  { rejectValue: string }
>("tours/read", async (_req, { rejectWithValue }) => {
  try {
    const response = await api.get<Response<TourRow[]>>(`/api/tours`);

    return response.data; // Expected response: { id, image }
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.error || "Something went wrong."
    );
  }
});

export const deleteToursAction = createAsyncThunk(
  "tours/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      // Your delete logic here, using the id
      const response = await api.delete<Response<object>>(`/api/tours/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error deleting tour.");
    }
  }
);

export const updateTourAction = createAsyncThunk(
  "tours/update",
  async (
    { id, tourData }: { id: number; tourData: TourTypes },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", tourData.uploadedFiles[0]); // Append image
      formData.append("name", tourData.tourName);
      formData.append("short_description", tourData.shortDescription);
      formData.append("general_description", tourData.generalDescription);
      formData.append("duration_hours", tourData.durationHours);
      formData.append("duration_minutes", tourData.durationMinutes);
      formData.append("what_to_bring", tourData.whatToBring);
      formData.append("know_before", tourData.knowBefore);
      formData.append("questions", tourData.questions);
      formData.append("private_tour", JSON.stringify(tourData.privateTour));
      formData.append("meeting_location", tourData.meetingLocation);
      formData.append("time_slots", JSON.stringify(tourData.timeSlots));
      formData.append("start_date", tourData.startDate);
      formData.append("end_date", tourData.endDate);
      formData.append(
        "indefinite_availability",
        JSON.stringify(tourData.indefiniteAvailability)
      );
      formData.append("max_capacity", tourData.maxiumumCapacity);
      formData.append("guide_rate", tourData.guideRate);
      formData.append("ticket_cost", tourData.ticketCost);
      formData.append("vehicle_cost", tourData.vehicleCost);
      formData.append("is_additional_name_required", JSON.stringify(false));
      formData.append("is_additional_email_required", JSON.stringify(false));

      const response = await api.put<Response<{ id: string; image: string }>>(
        `/api/tours/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // Expected response: { id, image }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Something went wrong."
      );
    }
  }
);

const TourReducers = createSlice({
  name: "TourReducers",
  initialState,
  reducers: {
    setOnlineMap: (state, action) => {
      state.tourData.onlineMap = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addTourAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTourAction.fulfilled, (state, action) => {
        toast.success("Tour added successfully!");
        state.loading = false;
      })
      .addCase(addTourAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(getToursAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getToursAction.fulfilled, (state, action) => {
        state.tourRows = action.payload;
        state.loading = false;
      })
      .addCase(getToursAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(deleteToursAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteToursAction.fulfilled, (state, action) => {
        state.loading = false;
        state.tourRows = state.tourRows.filter(
          (row, idx) => row.id !== action.payload
        );
        toast.success("Tour deleted successfully!");
      })
      .addCase(deleteToursAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updateTourAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTourAction.fulfilled, (state, action) => {
        toast.success("Tour updated successfully!");
        state.loading = false;
      })
      .addCase(updateTourAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { setOnlineMap } = TourReducers.actions;

export const tourRowsState = (state: RootState) => state.TourReducers;

export default TourReducers.reducer;
