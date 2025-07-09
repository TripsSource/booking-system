import { Response } from "@/types/api";
import { marginsState, otaState, supplierInvoice } from "@/types/app/financial";
import { marginType, revenueType } from "@/types/store/financial";
import { api } from "@/utils/api";

export const GetMargin = async () => {
  return await api
    .get<Response<marginType>>("/api/financial/margin")
    .then((res) => res.data);
};

export const GetOTAS = async () => {
  return await api
    .get<Response<otaState[]>>("/api/financial/ota-margin")
    .then((res) => res.data);
};

export const UpdateMargin = async (data: marginsState) => {
  return await api
    .post<Response<marginType>>("/api/financial/margin", data)
    .then((res) => res.data);
};

export const GetProductRevenue = async (id: string) => {
  return await api.get(`/api/products/revenue/${id}`).then((res) => res.data);
};

export const CreateOTA = async (data: otaState) => {
  return await api
    .post("/api/financial/ota-margin", data)
    .then((res) => res.data);
};

export const UpdateOTA = async (data: otaState) => {
  return await api
    .put(`/api/financial/ota-margin/${data.id}`, data)
    .then((res) => res.data);
};

export const DeleteOTA = async (id: string) => {
  return await api
    .delete(`/api/financial/ota-margin/${id}`)
    .then((res) => res.data);
};

export const getForInvoices = async () => {
  return await api
    .get(`/api/financial/invoice/bookings`)
    .then((res) => res.data);
};

export const getForInvoice = async (id: string) => {
  return await api
    .get(`/api/financial/invoice/bookings/${id}`)
    .then((res) => res.data);
};

export const createInvoice = async (data: any) => {
  return await api
    .post(`/api/financial/invoice/create`, { ...data })
    .then((res) => res.data);
};

export const getInvoices = async () => {
  return await api.get("/api/financial/invoice").then((res) => res.data);
};

export const deleteInvoice = async (id: string) => {
  return await api
    .delete(`/api/financial/invoice/${id}`)
    .then((res) => res.data);
};

export const getMailInvoice = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  return await api
    .get("/api/financial/mail-invoice", { params: { page, perPage } })
    .then((res) => res.data);
};

export const createMailInvoice = async (data: supplierInvoice) => {
  return await api
    .post("/api/financial/mail-invoice", data)
    .then((res) => res.data);
};
