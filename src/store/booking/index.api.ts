import { Response } from "@/types/api";
import { BookingDetails, BookingType } from "@/types/store/booking";
import { api } from "@/utils/api";

export interface BookingCreateSuccess {
  clientSecret: string;
  message: string;
}

export interface BookingCreateFailure {
  error: string;
}

export const bookingCreate = async (data: BookingType) => {
  return api.post("/api/bookings", data).then((res) => res.data);
};

export const deleteBooking = async (id: string) => {
  return await api.delete(`/api/bookings/${id}`).then((res) => res.data);
};

export const getBookings = async (pages: { page: number; perPage: number }) => {
  return await api
    .get(`/api/bookings/all`, {
      params: {
        page: pages.page,
        perPage: pages.perPage,
      },
    })
    .then((res) => res.data);
};

export const getBookingById = async (id: string) => {
  return await api
    .get<Response<BookingType>>(`/api/bookings/${id}`)
    .then((res) => res.data);
};

export const updateBooking = async (
  data: BookingType
): Promise<Response<BookingCreateSuccess | BookingCreateFailure>> => {
  return await api
    .put(`/api/bookings/${data._id}`, data)
    .then((res) => res.data);
};

export const getAllPastBookings = async () => {
  return await api.get("/api/bookings/todayBooking").then((res) => res.data);
};
