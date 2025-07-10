"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

import ReadContacts from "@/components/contacts/ReadContacts";
import { toast } from "react-toastify";
import RoleProvider from "@/providers/RoleProvider";
import {
  createContactAction,
  fileJSONUploadAction,
  getContactByIdAction,
  getContactsAction,
  updateContactAction,
} from "@/store/contacts";
import { AddressType, ContactType } from "@/types/store/contacts";
import { initalContact } from "./InitialContactState";
import NewContactModal from "@/components/contacts/NewContactModal";

function page() {
  const dispatch = useDispatch<AppDispatch>();
  const [deleted, setDeleted] = useState(false);
  const [contact, setContact] = useState<ContactType>(initalContact);
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState<File[]>([]);
  const [contacts, setContacts] = useState<{
    data: ContactType[];
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
    search: string;
    sort: string;
    order: string;
  }>({
    data: [],
    page: 1,
    perPage: 10,
    totalPages: 0,
    totalCount: 0,
    search: "",
    sort: "",
    order: "",
  });
  const { page, perPage, totalPages, totalCount, search, sort, order } =
    contacts;
  const toggleModal = () => setModalOpen(!modalOpen);

  const fileUpload = async () => {
    if (file.length) {
      const { payload } = await dispatch(fileJSONUploadAction(file));
    }
    setFile([]);
  };

  useEffect(() => {
    fileUpload();
  }, [file.length]);

  const fetchData = async () => {
    const { payload } = await dispatch(
      getContactsAction({ page, perPage, search, sort, order })
    );
    if (payload?.["data"]) {
      setContacts((pre) => ({
        ...pre,
        ...payload,
      }));
    } else {
      setContacts((pre) => ({
        ...pre,
        data: [],
      }));
      console.log("Unexpected payload:", payload);
    }
  };

  useEffect(() => {
    fetchData();
  }, [deleted, page, perPage, sort, order]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleContactStatus = (type: string, value: string) => {
    setContact({ ...contact, [type]: value });
  };

  const handleContactInfo = (type: string, value: string) => {
    setContact({
      ...contact,
      contactInfo: { ...contact.contactInfo, [type]: value },
    });
  };

  const handleAddressStatus = (key: keyof AddressType, value: string) => {
    setContact({
      ...contact,
      contactInfo: {
        ...contact.contactInfo,
        address: {
          ...contact.contactInfo.address,
          [key]: value,
        } as AddressType,
      },
    });
  };

  const openModal = async () => {
    setContact(initalContact);
    setModalOpen(true);
  };

  const openDeleteModal = async (_id?: string) => {
    const { payload } = _id?.length
      ? await dispatch(updateContactAction({ _id, ...contact }))
      : await dispatch(createContactAction(contact));
    if (payload?.["message"]) {
      setModalOpen(false);
      toast.success(`${payload.message}`);
      fetchData();
    } else {
      toast.error(`${payload.error}`);
      console.log("Unexpected payload:", payload);
    }
  };

  const openUpdateModal = async (_id: string) => {
    const { payload } = await dispatch(getContactByIdAction(_id));
    if (payload && "data" in payload && payload.data) {
      setContact(payload.data as ContactType);
    } else if (payload && "error" in payload && payload.error) {
      toast.error(`${payload.error}`);
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setFile(files);
  };

  const handlePages = (type: string, value: number | string) => {
    if (type === "perPage")
      setContacts((pre) => ({ ...pre, page: 1, perPage: Number(value) }));
    else setContacts((pre) => ({ ...pre, [type]: value }));
  };

  const handleSortOrder = (item: string) => {
    if (!sort && !order) {
      setContacts({ ...contacts, sort: item, order: "asc" });
    } else if (sort === item) {
      const nextOrder =
        order === "asc" ? "desc" : order === "desc" ? "" : "asc";

      setContacts({
        ...contacts,
        sort: nextOrder ? sort : "",
        order: nextOrder,
      });
    } else {
      setContacts({ ...contacts, sort: item, order: "asc" });
    }
  };

  return (
    <RoleProvider target="Contact Area">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            {/* <div style={{ width: "20rem", height: "1rem" }}>
              <DropZoneCommon
                value={file}
                onFilesSelected={handleFilesSelected}
                multiple={false}
                classes="btn btn-outline-primary"
                title="JSON file Upload"
              />
            </div> */}
            <div className="mb-3 d-flex align-items-center">
              <label className="form-label-title mt-1">Search: </label>
              <input
                className="form-control"
                value={search}
                onChange={(e) => handlePages("search", e.target.value)}
              />
            </div>

            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => openModal()}
            >
              New Contact
            </button>
          </div>
        </div>
        <ReadContacts
          {...{
            contacts: contacts.data,
            pages: { page, perPage, totalPages },
            deleted,
            setDeleted,
            toggleModal,
            openUpdateModal,
            handlePages,
            order,
            sort,
            handleSortOrder,
          }}
        />
      </div>
      <NewContactModal
        {...{
          contact,
          modalOpen,
          toggleModal,
          openDeleteModal,
          handleContactInfo,
          handleContactStatus,
          handleAddressStatus,
        }}
      />
    </RoleProvider>
  );
}

export default page;
