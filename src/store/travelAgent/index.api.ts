import { TravelAgentState } from "@/types/app/travelAgent";
import { api } from "@/utils/api";

export const getAllTravelAgents = async ({
  page,
  perPage,
  order,
  sort,
}: {
  page: number;
  perPage: number;
  sort: string;
  order: string;
}) => {
  return await api
    .get("/api/users/agents", {
      params: { page, perPage, sort, order },
    })
    .then((res) => res.data);
};

export const updateTravelAgent = async ({
  id,
  data,
}: {
  id: string;
  data: TravelAgentState | { isActive: boolean } | { isDeleted: boolean };
}) => {
  return await api
    .put(`/api/users/agent/${id}`, { data })
    .then((res) => res.data);
};

export const getTravelAgent = async (id: string) => {
  return await api.get(`/api/users/agent/${id}`).then((res) => res.data);
};
