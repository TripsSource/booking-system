import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { ContactType } from "@/types/store/contacts";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";
import {
  contactsLoadingState,
  deleteContactByIdAction,
} from "@/store/contacts";
import PageLoader from "@/layouts/PageLoader";
import PurePagination from "@/Common/PurePagination";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

function ReadContacts({
  contacts,
  deleted,
  pages,
  setDeleted,
  toggleModal,
  openUpdateModal,
  handlePages,
  order,
  sort,
  handleSortOrder,
}: {
  contacts: ContactType[];
  deleted: boolean;
  pages: { page: number; perPage: number; totalPages: number };
  setDeleted: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  openUpdateModal: (_id: string) => void;
  handlePages: (type: string, value: number) => void;
  order: string;
  sort: string;
  handleSortOrder: (item: string) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const contactsLoading = useSelector(contactsLoadingState);

  const memoContacts = useMemo(() => contacts, [contacts]);
  const [deletefModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deletefModal);
  const [deleteId, setDeleteId] = useState<string>("");

  const openDeleteModal = async () => {
    setDeleteModal(false);
    const { payload } = await dispatch(deleteContactByIdAction(deleteId));
    if (payload && "message" in payload && payload.message) {
      toast.success(`${payload.message}`);
      setDeleted(!deleted);
    } else if (payload && "error" in payload && payload.error) {
      toast.error(`${payload.error}`);
    }
  };

  const contactTitles = [
    { label: "First Name", value: "firstname" },
    { label: "Last Name", value: "lastname" },
    { label: "Email", value: "email" },
    { label: "Role", value: "role" },
    { label: "Company Name", value: "contactInfo.companyName" },
  ];

  return (
    <div className="card-body">
      <div className="table-responsive table-desi">
        {contacts && contacts.length > 0 && (
          <PurePagination
            {...{
              pages,
              handlePages,
              loading: contactsLoading,
            }}
          />
        )}
        <table className="user-table table table-striped">
          <thead>
            <tr>
              {contactTitles.map((title, index) => (
                <th
                  key={index}
                  className="text-center text-nowrap"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortOrder(title.value)}
                >
                  <div className="d-flex justify-content-center align-items-center">
                    {title.label}
                    {title.value === sort && order === "asc" && (
                      <FaSortUp className="mt-2" />
                    )}
                    {title.value === sort && order === "desc" && (
                      <FaSortDown className="mb-2" />
                    )}
                  </div>
                </th>
              ))}
              <th className="text-center text-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {memoContacts.length < 0 || contactsLoading ? (
              <tr>
                <td colSpan={7}>
                  <PageLoader />
                </td>
              </tr>
            ) : memoContacts.length > 0 ? (
              memoContacts.map((contact, index) => (
                <tr key={index}>
                  <td className="text-center text-nowrap">
                    {contact.firstname}
                  </td>
                  <td className="text-center text-nowrap">
                    {contact.lastname}
                  </td>
                  <td className="text-center text-nowrap">{contact.email}</td>
                  <td className="text-center text-nowrap">
                    {contact.contactInfo?.jobTitle === ""
                      ? contact.contactInfo?.jobTitle
                      : contact.role}
                  </td>
                  <td className="text-center text-nowrap">
                    {contact.contactInfo?.companyName}
                  </td>

                  <td
                    className="text-center text-nowrap"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="mt-1">
                        <Link
                          href={""}
                          onClick={() => {
                            if (
                              (contact as ContactType).contactInfo?.companyName
                            ) {
                              toggleModal();
                              openUpdateModal(contact._id ?? "");
                            } else {
                              toast.warning("This is not a valid contact");
                            }
                          }}
                        >
                          <i className="fa fa-pencil-square-o fs-5" />
                        </Link>
                      </div>
                      <div className="ms-3">
                        <Link
                          href={""}
                          onClick={() => {
                            setDeleteModal(true);
                            setDeleteId(contact._id ?? "");
                          }}
                        >
                          <i className="fa fa-trash-o fs-5" />
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Data</td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal
          isOpen={deletefModal}
          toggle={toggleDeleteModal}
          centered
          size="md"
        >
          <ModalHeader toggle={toggleDeleteModal}>Delete</ModalHeader>
          <ModalBody>
            <span>Are you sure you want to delete this?</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleDeleteModal}>
              Cancel
            </Button>
            <Button color="primary" onClick={openDeleteModal}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default ReadContacts;
