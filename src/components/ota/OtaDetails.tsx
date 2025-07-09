import {
  budgetPerClient,
  commissionPaymentMethod,
  currency,
  interesteCities,
  tourofClients,
  tourofTypes,
} from "@/constants/data";
import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import { countryOptions } from "@/utils/constantValues";
import Select from "react-select";
import { OtaAddr, OtaBank, OtaProfile, OtaState } from "@/types/app/ota";
import moment from "moment";
import { useSelector } from "react-redux";
import { userState } from "@/store/auth";

function OtaDetails({
  ota,
  handleOta,
}: {
  ota: OtaState;
  handleOta: (type: string, value: string | string[] | OtaProfile) => void;
}) {
  const { firstname, lastname, email, travelAgentProfile } = ota;
  const {
    addr,
    agencyName,
    incorpYear,
    phone,
    tourType,
    cities,
    clientType,
    budget,
    commissionPay,
    preferredCurrency,
    bank,
    percent,
  } = travelAgentProfile;
  const user = useSelector(userState);

  const handleTravelAgentProfile = (
    type: string,
    value: string | number | string[] | boolean | OtaAddr | OtaBank
  ) => {
    handleOta("travelAgentProfile", {
      ...travelAgentProfile,
      [type]: value,
    });
  };

  return (
    <>
      <div className="row">
        <div className="row">
          <div className="col-sm-4">
            <label className="form-label-title">First name</label>
            <input
              className="form-control"
              placeholder="John"
              type="text"
              value={firstname}
              onChange={(e) => handleOta("firstname", e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">Last name</label>

            <input
              className="form-control"
              type="text"
              placeholder="Doe"
              value={lastname}
              onChange={(e) => handleOta("lastname", e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => handleOta("email", e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex row mt-3">
          <div className="col-sm-4">
            <label className="form-label-title">Travel Agency Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="ABC Hotel"
              value={agencyName}
              onChange={(e) =>
                handleTravelAgentProfile("agencyName", e.target.value)
              }
            />
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">Type of Tours</label>
            <select
              required
              className="form-control"
              value={tourType}
              onChange={(e) =>
                handleTravelAgentProfile("tourType", e.target.value)
              }
            >
              <option value="">--Select Type of Tours--</option>
              {tourofTypes.map((tourType, index) => (
                <option value={tourType} key={index}>
                  {tourType}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">Phone Number</label>
            <PhoneInput
              country={"ch"}
              placeholder="Enter phone number"
              inputStyle={{
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                padding: "1.4rem 0 1.4rem 3rem",
              }}
              value={phone}
              onChange={(e) => handleTravelAgentProfile("phone", e)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-9">
            <label className="form-label-title">Interested Cities</label>
            <Typeahead
              id="multiple-typeahead"
              multiple
              options={interesteCities}
              placeholder="Select Cities...."
              selected={cities}
              onChange={(e) =>
                handleTravelAgentProfile(
                  "cities",
                  e.map((option) =>
                    typeof option === "string" ? option : option.label
                  )
                )
              }
            />
          </div>
          <div className="col-sm-3">
            <label className="form-label-title">Year of Incorporation</label>
            <div className="custom-datepicker">
              <DatePicker
                selected={incorpYear ? moment(incorpYear).toDate() : undefined}
                onChange={(date: any) =>
                  handleTravelAgentProfile(
                    "incorpYear",
                    moment(date).format("YYYY-MM-DD")
                  )
                }
                maxDate={moment().toDate()}
                showYearPicker
                dateFormat="yyyy"
                placeholderText="YYYY"
                className="custom-input form-control"
                yearItemNumber={10}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <label className="form-label-title mt-3">
          <strong>Address Information</strong>
        </label>
        <hr className="hr" />
        <div className="row">
          <div className="col-sm-4">
            <label className="form-label-title">Street</label>
            <input
              className="form-control"
              type="text"
              value={addr.street}
              onChange={(e) =>
                handleTravelAgentProfile("addr", {
                  ...addr,
                  street: e.target.value,
                })
              }
            />
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">City</label>
            <input
              className="form-control"
              type="text"
              value={addr.city}
              onChange={(e) =>
                handleTravelAgentProfile("addr", {
                  ...addr,
                  city: e.target.value,
                })
              }
            />
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">Postal Code</label>
            <input
              className="form-control"
              type="text"
              value={addr.postal}
              onChange={(e) =>
                handleTravelAgentProfile("addr", {
                  ...addr,
                  postal: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-4">
            <label className="form-label-title">State</label>
            <input
              className="form-control"
              type="text"
              value={addr.state}
              onChange={(e) =>
                handleTravelAgentProfile("addr", {
                  ...addr,
                  state: e.target.value,
                })
              }
            />
          </div>
          <div className="col-sm-8">
            <label className="form-label-title">Country</label>
            <Select
              placeholder="Select Country..."
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  padding: "0.3rem",
                }),
              }}
              options={countryOptions as { label: string; value: string }[]}
              value={countryOptions.filter(
                (countryList) => countryList.label === addr.country
              )}
              onChange={(e) =>
                handleTravelAgentProfile("addr", {
                  ...addr,
                  country: e.label,
                })
              }
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
      <div className="mt-5">
        <label className="form-label-title mt-3">
          <strong>Commission Information</strong>
        </label>
        <hr className="hr" />
        <div className="row">
          <div className="col-sm-4">
            <label className="form-label-title">
              Commission Payment Method
            </label>
            <select
              required
              className="form-control"
              value={commissionPay}
              onChange={(e) =>
                handleTravelAgentProfile("commissionPay", e.target.value)
              }
            >
              <option value="">--Select Commission Payment Method--</option>
              {commissionPaymentMethod.map((tourType, index) => (
                <option value={tourType} key={index}>
                  {tourType}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">
              Preferred Currency for Payment
            </label>
            <select
              required
              className="form-control"
              value={preferredCurrency}
              onChange={(e) =>
                handleTravelAgentProfile("preferredCurrency", e.target.value)
              }
            >
              <option value="">
                --Select Preferred Currency for Payment--
              </option>
              {currency.map((tourType, index) => (
                <option value={tourType} key={index}>
                  {tourType}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">Budget Per Client</label>
            <select
              required
              className="form-control"
              value={budget}
              onChange={(e) =>
                handleTravelAgentProfile("budget", e.target.value)
              }
              disabled={user.role !== "Admin"}
            >
              <option value="">--Select Budget Per Client--</option>
              {budgetPerClient.map((tourType, index) => (
                <option value={tourType} key={index}>
                  {tourType}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-8">
            <label className="form-label-title">Type of Clients</label>
            <Typeahead
              id="multiple-typeahead"
              multiple
              selected={clientType}
              options={tourofClients}
              onChange={(e) =>
                handleTravelAgentProfile(
                  "clientType",
                  e.map((option) =>
                    typeof option === "string" ? option : option.label
                  )
                )
              }
              placeholder="Select client types...."
            />
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">Percent</label>
            <input
              required
              type="number"
              className="form-control"
              value={percent}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                handleTravelAgentProfile(
                  "percent",
                  isNaN(val) ? 0 : Math.max(0, Math.min(100, val))
                );
              }}
              disabled={user.role !== "Admin"}
            />
            <div className="show-hide mt-1">%</div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <label className="form-label-title mt-3">
          <strong>Bank Information</strong>
        </label>
        <hr className="hr" />
        <div className="row">
          <div className="col-sm-6">
            <label className="form-label-title">Beneficiary Name</label>
            <input
              className="form-control"
              type="text"
              value={bank?.name}
              onChange={(e) =>
                handleTravelAgentProfile("bank", {
                  ...bank,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label-title">IBAN Or Account Number</label>
            <input
              className="form-control"
              type="text"
              value={bank?.iban}
              onChange={(e) =>
                handleTravelAgentProfile("bank", {
                  ...bank,
                  iban: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-8">
            <label className="form-label-title">Address</label>
            <input
              className="form-control"
              type="text"
              value={bank?.addr}
              onChange={(e) =>
                handleTravelAgentProfile("bank", {
                  ...bank,
                  addr: e.target.value,
                })
              }
            />
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">SWIFT Code</label>
            <input
              className="form-control"
              type="text"
              value={bank?.swift}
              onChange={(e) =>
                handleTravelAgentProfile("bank", {
                  ...bank,
                  swift: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OtaDetails;
