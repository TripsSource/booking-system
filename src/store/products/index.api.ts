import { Response } from "@/types/api";
import { ProductDetailState } from "@/types/app/product";
import { readProductState } from "@/types/store/products";
import { api } from "@/utils/api";

export const createProduct = async (data: ProductDetailState) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("isPrivate", `${data.isPrivate}`);
  formData.append("members", data.members);
  formData.append("withDriver", `${data.withDriver}`);
  formData.append("timeSlots", JSON.stringify(data.timeSlots));
  formData.append("bookingDetails", JSON.stringify(data.bookingDetails));
  data.images.map((image: File) => {
    formData.append("images", image);
  });
  formData.append("startingLocations", JSON.stringify(data.startingLocations));
  formData.append(
    "destination",
    typeof data.destination === "string"
      ? data.destination
      : data.destination._id
  );
  formData.append("description", data.description);
  formData.append("onlineMap", JSON.stringify(data.onlineMap));
  formData.append("exclusions", JSON.stringify(data.exclusions));
  formData.append("inclusions", JSON.stringify(data.inclusions));
  formData.append("bring", data.bring);
  formData.append("knowBeforeGo", data.knowBeforeGo);
  // ticket
  formData.append("revenues", JSON.stringify(data.revenues));
  formData.append("liveStatus", `${data.liveStatus}`);
  formData.append("guideDetails", JSON.stringify(data.guideDetails));
  formData.append("suppliers", JSON.stringify(data.suppliers));
  return await api.post("/api/products", formData).then((res) => res.data);
};

export const updateProduct = async (data: ProductDetailState) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("deletedImages", JSON.stringify(data.deletedImages));
  formData.append(
    "destination",
    typeof data.destination === "string"
      ? data.destination
      : data.destination._id
  );
  formData.append("description", data.description);
  formData.append("isPrivate", `${data.isPrivate}`);
  formData.append("withDriver", `${data.withDriver}`);
  formData.append("timeSlots", JSON.stringify(data.timeSlots));
  formData.append("bookingDetails", JSON.stringify(data.bookingDetails));
  formData.append("members", data.members);
  data.images.map((image: File) => {
    formData.append("images", image);
  });
  formData.append("startingLocations", JSON.stringify(data.startingLocations));
  formData.append("onlineMap", JSON.stringify(data.onlineMap));
  formData.append("exclusions", JSON.stringify(data.exclusions));
  formData.append("inclusions", JSON.stringify(data.inclusions));
  formData.append("bring", data.bring);
  formData.append("knowBeforeGo", data.knowBeforeGo);
  // ticket
  formData.append("revenues", JSON.stringify(data.revenues));
  formData.append("liveStatus", `${data.liveStatus}`);
  formData.append("guideDetails", JSON.stringify(data.guideDetails));
  formData.append("suppliers", JSON.stringify(data.suppliers));

  return await api
    .put(`/api/products/${data._id}`, formData)
    .then((res) => res.data);
};

export const deleteProduct = async (id: string) => {
  return await api.delete(`/api/products/${id}`).then((res) => res.data);
};

export const handleLiveStatus = async (id: string) => {
  return await api.put(`/api/products/set-live/${id}`).then((res) => res.data);
};

export const getProductId = async (id: string) => {
  return await api.get(`/api/products/${id}`).then((res) => res.data);
};

export const getProducts = async ({
  page,
  perPage,
}: {
  page?: number;
  perPage?: number;
}) => {
  return await api
    .get(`/api/products?admin=true`, { params: { page, perPage } })
    .then((res) => res.data);
};
