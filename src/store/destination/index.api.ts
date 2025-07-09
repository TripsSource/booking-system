import { api } from "@/utils/api";
import { DestinationDetailState } from "@/types/app/destination";
import { readDestinationType } from "@/types/store/destination";
import { Response } from "@/types/api";

export const DeleteDestination = async (id: string) => {
  return await api.delete(`/api/destinations/${id}`).then((res) => res.data);
};

export const CreateDestination = async (data: DestinationDetailState) => {
  const formData = new FormData();
  formData.append("destinationTitle", data.destinationTitle);
  formData.append("generalDescription", data.generalDescription);
  data.images.forEach((image: File) => {
    formData.append("images", image);
  });
  return await api.post("/api/destinations", formData).then((res) => res.data);
};

export const UpdateDestination = async (data: DestinationDetailState) => {
  const formData = new FormData();
  formData.append("destinationTitle", data.destinationTitle);
  formData.append("generalDescription", data.generalDescription);
  formData.append("deletedImages", JSON.stringify(data.deletedImages));
  data.images.forEach((image: File) => {
    formData.append("images", image);
  });
  return await api
    .put(`/api/destinations/${data._id}`, formData)
    .then((res) => res.data);
};

export const GetDestinations = async () => {
  return await api
    .get<Response<readDestinationType[]>>(`/api/destinations`)
    .then((res) => res.data);
};

export const GetDestinationId = async (id: string) => {
  return await api.get(`/api/destinations/${id}`).then((res) => res.data);
};

export const GetDestinationTitles = async () => {
  return await api.get("/api/destinations/titles").then((res) => res.data);
};
