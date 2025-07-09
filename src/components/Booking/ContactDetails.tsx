import React from "react";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import { languages } from "country-data";
import { BookingFormState, TravellerState } from "@/types/app/booking";
import moment from "moment";
import CustomDatePicker from "@/Common/CustomDatePicker";

const ContactDetails = ({
  mainTraveller,
  updateNestedBookingDetails,
  handleBookingMintraveler,
}: {
  mainTraveller: TravellerState;
  updateNestedBookingDetails: (
    type: keyof BookingFormState["bookingDetails"],
    key: string,
    value: string | boolean | undefined
  ) => void;
  handleBookingMintraveler: (phone: string, country: string) => void;
}) => {
  const options = languages.all.map((language) => ({
    label: language.name,
    value: language.name,
  }));

  return (
    <div className="border p-5">
      <div className="mb-4">
        <label className="form-label-title fs-5 border-bottom border-5 border-success">
          Main traveller's contact details
        </label>
      </div>
      <div className="d-flex row">
        <div className="col-sm-6">
          <label className="form-label-title">
            First Name<span>*</span>
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your first name"
            value={mainTraveller.firstname}
            onChange={(e) =>
              updateNestedBookingDetails(
                "mainTraveller",
                "firstname",
                e.target.value
              )
            }
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label-title">
            Last name<span>*</span>
          </label>
          <input
            className="form-control"
            placeholder="Enter your last name"
            type="text"
            value={mainTraveller.lastname}
            onChange={(e) =>
              updateNestedBookingDetails(
                "mainTraveller",
                "lastname",
                e.target.value
              )
            }
          />
        </div>
      </div>
      <div className="d-flex row mt-3">
        <div className="col-sm-6">
          <label className="form-label-title text-center text-nowrap">
            Your email address<span>*</span>
          </label>
          <input
            className="form-control"
            type="email"
            placeholder="Enter your mail"
            value={mainTraveller.email}
            onChange={(e) =>
              updateNestedBookingDetails(
                "mainTraveller",
                "email",
                e.target.value
              )
            }
          />
          <div className="form-check form-switch mt-3">
            <div className="d-flex align-items-start">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="emailStatus"
                checked={mainTraveller.emailMeNews}
                onChange={(e) =>
                  updateNestedBookingDetails(
                    "mainTraveller",
                    "emailMeNews",
                    e.target.checked
                  )
                }
              />
              <label
                className="form-check-label align-content-center fs-6 ms-3 text-center text-nowrap"
                htmlFor="emailStatus"
              >
                Email me with news and offers
              </label>
            </div>
          </div>
        </div>
        <div className="col-sm-6 text-left text-nowrap">
          <label className="form-label-title">Phone number</label>
          <PhoneInput
            country={"ch"}
            placeholder="Enter phone number"
            value={mainTraveller.phoneNumber}
            inputStyle={{
              width: "100%",
            }}
            onChange={(e, country) =>
              handleBookingMintraveler(e, (country as any)?.name || "")
            }
          />
        </div>
      </div>
      <div className="d-flex row">
        <div className="col-sm-6 text-left text-nowrap">
          <label className="form-label-title">
            Language<span>*</span>
          </label>
          <Select
            placeholder=" Enter your language..."
            value={options.filter(
              (language) => language.value === mainTraveller.lang
            )}
            onChange={(e) =>
              updateNestedBookingDetails("mainTraveller", "lang", e?.value)
            }
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                padding: "0.3rem 1rem",
              }),
            }}
            options={options as any}
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label-title">
            Date of birth<span>*</span>
          </label>
          <CustomDatePicker
            date={
              !mainTraveller.birthDate
                ? null
                : moment(mainTraveller.birthDate).toDate()
            }
            maxDate={moment(Date.now()).toDate()}
            onChange={(e) =>
              updateNestedBookingDetails(
                "mainTraveller",
                "birthDate",
                moment(e).format("YYYY-MM-DD")
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
