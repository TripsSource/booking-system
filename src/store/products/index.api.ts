import { Response } from "@/types/api";
import { ProductDetailState } from "@/types/app/product";
import { readProductState } from "@/types/store/products";
import { api } from "@/utils/api";

export const createProduct = async (data: ProductDetailState) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("bookingDetails", JSON.stringify(data.bookingDetails));
  data.images.map((image: File) => {
    formData.append("images", image);
  });
  formData.append("destinationId", data.destinationId);
  formData.append("description", data.description);
  formData.append("shortDescription", data.shortDescription);
  formData.append("tours", JSON.stringify(data.tours));
  formData.append("startDate", data.startDate);
  formData.append("endDate", data.endDate ?? "");
  formData.append("blackOuts", JSON.stringify(data.blackOuts));
  formData.append("onlineMap", JSON.stringify(data.onlineMap));
  formData.append("exclusions", JSON.stringify(data.exclusions));
  formData.append("inclusions", JSON.stringify(data.inclusions));
  formData.append("bring", data.bring);
  formData.append("knowBefore", data.knowBefore);
  // ticket
  formData.append("isActive", `${data.isActive}`);
  return await api.post("/api/products", formData).then((res) => res.data);
};

export const updateProduct = async (data: ProductDetailState) => {
  const formData = new FormData();
  formData.append("deletedImages", JSON.stringify(data.deletedImages));
  formData.append("name", data.name);
  formData.append("bookingDetails", JSON.stringify(data.bookingDetails));
  data.images.map((image: File) => {
    formData.append("images", image);
  });
  formData.append("destinationId", data.destinationId);
  formData.append("description", data.description);
  formData.append("shortDescription", data.shortDescription);
  formData.append("blackOuts", JSON.stringify(data.blackOuts));
  formData.append("tours", JSON.stringify(data.tours));
  formData.append("startDate", data.startDate);
  formData.append("endDate", data.endDate ?? "");
  formData.append("onlineMap", JSON.stringify(data.onlineMap));
  formData.append("exclusions", JSON.stringify(data.exclusions));
  formData.append("inclusions", JSON.stringify(data.inclusions));
  formData.append("bring", data.bring);
  formData.append("knowBefore", data.knowBefore);
  // ticket
  formData.append("isActive", `${data.isActive}`);

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
  sort,
  order,
  page,
  perPage,
}: {
  sort: string;
  order: string;
  page?: number;
  perPage?: number;
}) => {
  return await api
    .get(`/api/products?admin=true`, { params: { page, perPage, sort, order } })
    .then((res) => res.data);
};
