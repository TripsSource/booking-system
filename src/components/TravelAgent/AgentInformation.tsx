import { interesteCities, tourofTypes } from "@/constants/data";
import { TravelAgentState } from "@/types/app/travelAgent";
import { countryOptions } from "@/utils/constantValues";
import moment from "moment";
import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";

function AgentInformation({
  agent,
  handleAgent,
  handleTravelAgentProfile,
  handleTravelAgentProfileInfo,
}: {
  agent: TravelAgentState;
  handleAgent: (type: string, value: string | string[]) => void;
  handleTravelAgentProfile: (type: string, value: string | string[]) => void;
  handleTravelAgentProfileInfo: (
    key: "addr" | "bank",
    type: string,
    value: string
  ) => void;
}) {
  return (
    <>
      <div className="row">
        <div className="col-sm-4">
          <label className="form-label-title">First name</label>
          <input
            className="form-control"
            placeholder="John"
            type="text"
            value={agent.firstname}
            onChange={(e) =>
              handleAgent("firstname", (e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Last name</label>

          <input
            className="form-control"
            type="text"
            placeholder="Doe"
            onChange={(e) =>
              handleAgent("lastname", (e.target as HTMLInputElement).value)
            }
            value={agent.lastname}
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Email</label>
          <input
            className="form-control"
            type="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) =>
              handleAgent("email", (e.target as HTMLInputElement).value)
            }
            value={agent.email}
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
            onChange={(e) =>
              handleTravelAgentProfile(
                "agencyName",
                (e.target as HTMLInputElement).value
              )
            }
            value={agent.travelAgentProfile.agencyName}
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Type of Tours</label>
          <select
            value={agent.travelAgentProfile.tourType}
            required
            className="form-control"
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
            value={agent.travelAgentProfile.phone}
            inputStyle={{
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
              padding: "1.4rem 0 1.4rem 3rem",
            }}
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
            selected={agent.travelAgentProfile.cities}
            options={interesteCities}
            onChange={(e) =>
              handleTravelAgentProfile(
                "cities",
                e.map((option) =>
                  typeof option === "string" ? option : option.label
                )
              )
            }
            placeholder="Select Cities...."
          />
        </div>
        <div className="col-sm-3">
          <label className="form-label-title">Year of Incorporation</label>
          <div className="custom-datepicker">
            <DatePicker
              selected={
                agent.travelAgentProfile?.incorpYear
                  ? moment(agent.travelAgentProfile?.incorpYear).toDate()
                  : undefined
              }
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
      <div className="mt-3">
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
              value={agent.travelAgentProfile.addr.street}
              onChange={(e) =>
                handleTravelAgentProfileInfo("addr", "street", e.target.value)
              }
            />
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">City</label>
            <input
              className="form-control"
              type="text"
              value={agent.travelAgentProfile.addr.city}
              onChange={(e) =>
                handleTravelAgentProfileInfo("addr", "city", e.target.value)
              }
            />
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">Postal Code</label>
            <input
              className="form-control"
              type="text"
              value={agent.travelAgentProfile.addr.postal}
              onChange={(e) =>
                handleTravelAgentProfileInfo("addr", "postal", e.target.value)
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
              value={agent.travelAgentProfile.addr.state}
              onChange={(e) =>
                handleTravelAgentProfileInfo("addr", "state", e.target.value)
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
                (countryList) =>
                  countryList.label === agent.travelAgentProfile.addr.country
              )}
              onChange={(e) =>
                handleTravelAgentProfileInfo("addr", "country", e.label)
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
    </>
  );
}

export default AgentInformation;
