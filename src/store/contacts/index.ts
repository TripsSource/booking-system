import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

import errorHandler from "@/utils/errorHandler";

import { ContactType, initialStateType } from "@/types/store/contacts";
import {
  createContact,
  deleteContact,
  deleteContacts,
  fileUpload,
  getContacts,
  getContactsById,
  getSuppliers,
  updateContact,
} from "@/store/contacts/index.api";

const initialState: initialStateType = {
  contacts: [],
  suppliers: [],
  contact: {} as ContactType,
  loading: false,
};

export const getContactsAction = createAsyncThunk(
  "/contacts",
  errorHandler(getContacts)
);

export const getContactByIdAction = createAsyncThunk(
  "/contacts/:id",
  errorHandler(getContactsById)
);

export const deleteContactByIdAction = createAsyncThunk(
  "/contacts/delete/:id",
  errorHandler(deleteContact)
);
export const deleteContactsAction = createAsyncThunk(
  "/contacts/delete",
  errorHandler(deleteContacts)
);

export const createContactAction = createAsyncThunk(
  "/contacts/create",
  errorHandler(createContact)
);

export const updateContactAction = createAsyncThunk(
  "/contacts/update/:id",
  errorHandler(updateContact)
);

export const getSuppliersAction = createAsyncThunk(
  "/contact/suppliers",
  errorHandler(getSuppliers)
);

export const fileJSONUploadAction = createAsyncThunk(
  "/contact/JSON",
  errorHandler(fileUpload)
);

const ContactReducers = createSlice({
  name: "ContactReducers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getContactsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getContactsAction.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.loading = false;
      })
      .addCase(getContactsAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getContactByIdAction.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getContactByIdAction.fulfilled, (state, action) => {
        state.contact = action.payload;
        state.loading = false;
      })
      .addCase(getContactByIdAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteContactByIdAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContactByIdAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteContactByIdAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createContactAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContactAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createContactAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateContactAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContactAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateContactAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSuppliersAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSuppliersAction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.["data"]) state.suppliers = action.payload.data;
      })
      .addCase(getSuppliersAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const contactsState = (state: RootState) =>
  state.ContactReducers.contacts;
export const contactState = (state: RootState) => state.ContactReducers.contact;
export const contactsLoadingState = (state: RootState) =>
  state.ContactReducers.loading;
export const suppliersState = (state: RootState) =>
  state.ContactReducers.suppliers;

export default ContactReducers.reducer;
