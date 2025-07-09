import { useMemo } from "react";
import { AddressType, ContactType } from "@/types/store/contacts";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import PageLoader from "@/layouts/PageLoader";
import PhoneInput from "react-phone-input-2";
import { emailPattern, httpsUrlPattern } from "@/utils/validation";
import { toast } from "react-toastify";
import Select from "react-select";
import { countryOptions } from "@/utils/constantValues";
import { accountType, currency } from "@/constants/data";
import { contactsLoadingState } from "@/store/contacts";

function NewContactModal({
  contact,
  modalOpen,
  toggleModal,
  openDeleteModal,
  handleContactInfo,
  handleContactStatus,
  handleAddressStatus,
}: {
  contact: ContactType;
  modalOpen: boolean;
  toggleModal: () => void;
  openDeleteModal: (_id?: string) => void;
  handleContactInfo: (type: string, value: string) => void;
  handleContactStatus: (type: string, value: string) => void;
  handleAddressStatus: (key: keyof AddressType, value: string) => void;
}) {
  const memoContact = useMemo(() => contact, [contact]);
  const loadingState = useSelector(contactsLoadingState);
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} centered size="lg">
      <ModalHeader toggle={toggleModal}>
        <div className="pt-3 pb-2">
          <h1 className="text-center">Contact Details</h1>
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="text-left">
          <h4>Account Information</h4>
        </div>
        <div className="row mt-3">
          <div className="col-sm-4">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              className="form-control"
              value={memoContact.firstname}
              onChange={(e) => handleContactStatus("firstname", e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={memoContact.lastname}
              onChange={(e) => handleContactStatus("lastname", e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="form-control"
              value={memoContact.email}
              onChange={(e) => handleContactStatus("email", e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-8">
            <label htmlFor="">Company Name</label>
            <input
              type="text"
              className="form-control"
              value={memoContact.contactInfo.companyName}
              onChange={(e) => handleContactInfo("companyName", e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <label htmlFor="">Account Type</label>
            <select
              className="form-control"
              value={memoContact.role}
              onChange={(e) => handleContactStatus("role", e.target.value)}
            >
              {accountType.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row d-flex mt-3">
          <div className="col-sm-4">
            <label htmlFor="">Job Title</label>
            <input
              type="text"
              className="form-control"
              value={memoContact.contactInfo.jobTitle}
              onChange={(e) => handleContactInfo("jobTitle", e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <label htmlFor="">Direct Number</label>
            <PhoneInput
              country={"ch"}
              inputStyle={{
                maxWidth: "100%",
              }}
              value={memoContact.contactInfo.directNumber}
              onChange={(e) => handleContactInfo("directNumber", e)}
              placeholder="Enter phone number"
            />
          </div>
          <div className="col-sm-4">
            <label htmlFor="">Office Number</label>
            <PhoneInput
              country={"ch"}
              inputStyle={{
                maxWidth: "100%",
              }}
              value={memoContact.contactInfo.officeNumber}
              onChange={(e) => handleContactInfo("officeNumber", e)}
              placeholder="Enter phone number"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-4">
            <label htmlFor="">Currency</label>
            <select
              className="form-control"
              name="currency"
              value={memoContact.contactInfo.currency}
              onChange={(e) => handleContactInfo("currency", e.target.value)}
            >
              {currency.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="col-sm-4">
            <label htmlFor="">WebSite</label>
            <input
              type="text"
              className="form-control"
              name="website"
              placeholder="https://example.com"
              value={memoContact.contactInfo.website}
              onChange={(e) => handleContactInfo("website", e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <label htmlFor="">Employees</label>
            <input
              type="number"
              min={0}
              defaultValue={0}
              className="form-control"
              name="employees"
              value={memoContact.contactInfo.employees}
              onChange={(e) => handleContactInfo("employees", e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="row text-left mt-3">
            <h4>Address Information</h4>
          </div>
          <div className="row">
            <div className="col-sm-4">
              Street
              <input
                type="text"
                className="form-control my-2"
                value={memoContact.contactInfo.address?.street}
                onChange={(e) => handleAddressStatus("street", e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              City
              <input
                type="text"
                className="form-control my-2"
                value={memoContact.contactInfo.address?.city}
                onChange={(e) => handleAddressStatus("city", e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              State
              <input
                type="text"
                className="form-control my-2"
                value={memoContact.contactInfo.address?.state}
                onChange={(e) => handleAddressStatus("state", e.target.value)}
              />
            </div>
            <div className="col-sm-3">
              Zip Code
              <input
                type="text"
                className="form-control my-2"
                value={memoContact.contactInfo.address?.zipCode}
                onChange={(e) => handleAddressStatus("zipCode", e.target.value)}
              />
            </div>
            <div className="col-sm-9">
              Country
              <Select
                placeholder="  Select Country..."
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    padding: "0.03rem 0.5rem",
                  }),
                }}
                className="my-2"
                options={countryOptions as { label: string; value: string }[]}
                value={countryOptions.filter(
                  (countryList) =>
                    countryList.value ===
                    memoContact.contactInfo.address?.country
                )}
                onChange={(e) => handleAddressStatus("country", e.value)}
                formatOptionLabel={(e: any) => (
                  <div className="d-flex fs-6">
                    <img
                      src={`https://flagcdn.com/w20/${e.value.toLowerCase()}.png`}
                      alt={e.label}
                      style={{
                        width: "27px",
                        height: "20px",
                        marginRight: "10px",
                        marginTop: "2px",
                      }}
                    />
                    {e.label}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={loadingState}
          onClick={() => {
            if (!emailPattern.test(memoContact.email || ""))
              toast.warning("Please enter a valid email");
            else openDeleteModal(memoContact._id);
          }}
        >
          {memoContact._id?.length ? "Update" : "Add"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default NewContactModal;
