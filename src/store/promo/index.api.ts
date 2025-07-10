import { PromoCodeState } from "@/types/app/promo";
import { getPromoState } from "@/types/store/promo";
import { api } from "@/utils/api";

export const createPromo = async (data: PromoCodeState) => {
  return await api.post("/api/promo", data).then((res) => res.data);
};

export const getAllPromo = async (data: getPromoState) => {
  return await api
    .get("/api/promo", { params: { ...data } })
    .then((res) => res.data);
};

export const deletePromo = async (id: string) => {
  return await api.delete(`/api/promo/${id}`).then((res) => res.data);
};

export const validPromo = async (code: string) => {
  return await api.post("/api/promo/code", { code }).then((res) => res.data);
};
