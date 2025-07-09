import { api } from "@/utils/api";

export const getOtaBookings = async ({
  url,
  sort,
  order,
  page,
  perPage,
}: {
  url: string;
  sort: string;
  order: string;
  page: number;
  perPage: number;
}) => {
  return await api
    .get(`/api/${url}/bookings`, {
      params: { page, perPage, sort, order },
    })
    .then((res) => res.data);
};
