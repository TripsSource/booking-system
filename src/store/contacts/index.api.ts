import { Response } from "@/types/api";
import { ContactType } from "@/types/store/contacts";
import { api } from "@/utils/api";

export interface CreateContactSuccess {
  message: string;
}

export interface CreateContactFailure {
  error: string;
}

export interface DeleteContactSuccess {
  message: string;
}

export interface DeleteContactFailure {
  error: string;
}

export interface DeleteContactsSuccess {
  message: string;
}

export interface DeleteContactsFailure {
  error: string;
}

export interface UpdateBookingSuccess {
  message: string;
}

export interface UpdateBookingFailure {
  error: string;
}

export interface GetContactsFailure {
  error: string;
}
export interface GetContactFailure {
  error: string;
}

export const createContact = async (data: ContactType) => {
  return api.post("/api/contact", data).then((res) => res.data);
};

export const deleteContact = async (
  id: string
): Promise<Response<DeleteContactSuccess | DeleteContactFailure>> => {
  return await api.delete(`/api/contact/${id}`).then((res) => res.data);
};

export const deleteContacts = async (): Promise<
  Response<DeleteContactsSuccess | DeleteContactsFailure>
> => {
  return await api.delete(`/api/contact`).then((res) => res.data);
};

export const getContacts = async ({
  page,
  perPage,
  search,
  sort,
  order,
}: {
  page: number;
  perPage: number;
  search: string;
  sort: string;
  order: string;
}) => {
  return await api
    .get(`/api/contact`, { params: { page, perPage, search, sort, order } })
    .then((res) => res.data);
};

export const getContactsById = async (
  id: string
): Promise<Response<ContactType>> => {
  return await api.get(`/api/contact/${id}`).then((res) => res.data);
};

export const updateContact = async (data: ContactType) => {
  return await api
    .put(`/api/contact/${data._id}`, data)
    .then((res) => res.data);
};

export const getSuppliers = async () => {
  return await api.get(`/api/contact/suppliers`).then((res) => res.data);
};

export const fileUpload = async (data: File[]) => {
  const formData = new FormData();
  data.map((file: File) => {
    formData.append("files", file);
  });
  return await api.post("/api/contact/file", formData).then((res) => res.data);
};
