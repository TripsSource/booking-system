import moment from "moment";
import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { formatInsuranceNumber } from "@/utils/validation";
import { SelectCountry } from "@/Common/SelectCountry";
import { swissCities, TYPEOFINCOMES } from "@/constants/data";
import CustomDatePicker from "@/Common/CustomDatePicker";

function Spouse({
  action,
  spouse,
  maritalStatus,
  SpouseHandleEmployee,
}: {
  action: boolean;
  spouse: any;
  maritalStatus: string;
  SpouseHandleEmployee: any;
}) {
  const {
    lastname,
    firstname,
    dateOfBirth,
    unknown,
    retirementInsuranceNumber,
    isSameAddressAsEmployee,
    typeOfIncome,
    typeOfEmployment,
    startDate,
    endDate,
    address,
    cantonOfEmployment,
    residenceCountry,
    residenceCanton,
  } = spouse;

  const availableSpouse =
    maritalStatus === "married" || maritalStatus === "registered partnership";

  const handleSpouse = (type: string, value: any) => {
    SpouseHandleEmployee({ ...spouse, [type]: value });
  };

  return (
    <div className="mb-3 border-1 border rounded-3 p-2">
      <label className="form-label-title mt-3">
        <strong className="mx-3">Spouse</strong>
      </label>
      <hr className="hr" />
      <div className="d-flex justify-content-start mx-3 mb-3">
        <div className="w-100">
          <label className="form-label-title">Last name</label>
          <input
            type="text"
            className="form-control"
            value={lastname}
            onChange={(e) => handleSpouse("lastname", e.target.value)}
            placeholder="Last name"
            disabled={!action || !availableSpouse}
          />
        </div>
        <div className="ms-4 w-100">
          <label className="form-label-title">First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={firstname}
            onChange={(e) => handleSpouse("firstname", e.target.value)}
            disabled={!action || !availableSpouse}
          />
        </div>
        <div className="ms-4 w-100">
          <label className="form-label-title">Date of birth</label>
          <div>
            <CustomDatePicker
              classes="form-control"
              date={!dateOfBirth ? null : moment(dateOfBirth).toDate()}
              onChange={(e) =>
                handleSpouse("dateOfBirth", moment(e).format("YYYY-MM-DD"))
              }
              maxDate={moment(Date.now()).toDate()}
              disabled={!action || !availableSpouse}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-start mx-3 mb-3">
        <div>
          <label className="form-label-title d-flex align-items-center">
            <div>Retirement insurance number</div>
            <span
              className="ms-1"
              title="The Central Compensation Office in Geneva assigns a retirement insurance (RI) number to all newborns and immigrants, which is valid for the rest of your life and remains the same even after a name change. Further information on the structure of the RI number can be found on the Swiss Federal Social Insurance Office website (in German) ."
            >
              <FaCircleInfo size={15} />
            </span>
          </label>
          <input
            type="text"
            className="form-control"
            value={retirementInsuranceNumber}
            onChange={(e) =>
              SpouseHandleEmployee({
                ...spouse,
                unknown: false,
                retirementInsuranceNumber: formatInsuranceNumber(
                  e.target.value,
                  retirementInsuranceNumber
                ),
              })
            }
            placeholder="e.g. 756.1234.5678.97"
            disabled={!action || !availableSpouse}
          />
        </div>
        <div className="ms-5 d-flex align-items-end">
          <label className="form-label-title">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={unknown}
              onChange={(e) =>
                SpouseHandleEmployee({
                  ...spouse,
                  unknown: e.target.checked,
                  retirementInsuranceNumber:
                    e.target.checked === true ? "" : retirementInsuranceNumber,
                })
              }
              disabled={!action || !availableSpouse}
            />
            Unknown
          </label>
        </div>
      </div>
      {retirementInsuranceNumber.length < 15 && !unknown && (
        <span className="text-danger mx-3">
          The retirement insurance number consists of 13 digits.
        </span>
      )}
      <div className="m-3 border-1 border rounded-3 p-2">
        <label className="form-label-title mt-3">
          <input
            type="checkbox"
            className="form-check-input ms-4"
            checked={isSameAddressAsEmployee}
            onChange={(e) =>
              handleSpouse("isSameAddressAsEmployee", e.target.checked)
            }
            disabled={!action || !availableSpouse}
          />
          <strong className="mx-2">Same address as the employee</strong>
        </label>
        <hr className="hr" />
        <div className="d-flex justify-content-start">
          <div className="mx-4 w-50">
            <label className="form-label-title">Additional line</label>
            <input
              className="form-control"
              type="text"
              placeholder="e.g. c/o"
              value={address.additionalLine}
              onChange={(e) =>
                handleSpouse("address", {
                  ...address,
                  additionalLine: e.target.value,
                })
              }
              disabled={!action || !availableSpouse || isSameAddressAsEmployee}
            />
          </div>
          <div className="mx-4 w-50">
            <label className="form-label-title">Street and house number</label>
            <input
              className="form-control"
              type="text"
              value={address.streetAndHouseNumber}
              onChange={(e) =>
                handleSpouse("address", {
                  ...address,
                  streetAndHouseNumber: e.target.value,
                })
              }
              disabled={!action || !availableSpouse || isSameAddressAsEmployee}
            />
          </div>
        </div>
        <div className="d-flex justify-content-start mt-3">
          <div className="mx-4 w-50">
            <label className="form-label-title">P.O. Box</label>
            <input
              className="form-control"
              type="text"
              value={address.postOfficeBox}
              onChange={(e) =>
                handleSpouse("address", {
                  ...address,
                  postOfficeBox: e.target.value,
                })
              }
              disabled={!action || !availableSpouse || isSameAddressAsEmployee}
            />
          </div>
          <div className="mx-4 w-50">
            <label className="form-label-title">
              Region, province, state or district
            </label>
            <input
              className="form-control"
              type="text"
              value={address.regionProvinceStateDistrict}
              onChange={(e) =>
                handleSpouse("address", {
                  ...address,
                  regionProvinceStateDistrict: e.target.value,
                })
              }
              disabled={!action || !availableSpouse || isSameAddressAsEmployee}
            />
          </div>
        </div>
        <div className="mx-4 d-flex justify-content-start mt-3">
          <div className="mx-1">
            <label className="form-label-title">Zip code</label>
            <input
              className="form-control"
              type="number"
              value={address.zipCode}
              onChange={(e) =>
                handleSpouse("address", {
                  ...address,
                  zipCode: e.target.value.slice(0, 4),
                })
              }
              disabled={!action || !availableSpouse || isSameAddressAsEmployee}
            />
          </div>
          <div className="mx-1">
            <label className="form-label-title">City</label>
            <input
              className="form-control"
              type="text"
              value={address.city}
              onChange={(e) =>
                handleSpouse("address", {
                  ...address,
                  city: e.target.value,
                })
              }
              disabled={!action || !availableSpouse || isSameAddressAsEmployee}
            />
          </div>
          <div className="mx-1 w-25">
            <label className="form-label-title">Canton</label>
            <select
              className="form-control"
              value={address.canton}
              onChange={(e) =>
                handleSpouse("address", {
                  ...address,
                  canton: e.target.value,
                })
              }
              defaultValue=""
              disabled={
                !action ||
                !availableSpouse ||
                isSameAddressAsEmployee ||
                address.country !== "CH"
              }
            >
              {address.country !== "CH" ? (
                <option value=""></option>
              ) : (
                swissCities.map((e, i) => (
                  <option key={i} value={e}>
                    {e}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mx-1 w-25">
            <label className="form-label-title">Country</label>
            <SelectCountry
              {...{
                param: address.country,
                disabled:
                  !action || !availableSpouse || isSameAddressAsEmployee,
                handleParam: (param) =>
                  handleSpouse("address", {
                    ...address,
                    country: param,
                  }),
              }}
            />
          </div>
        </div>
      </div>
      <div className="mx-2 mb-3">
        <div className="d-flex justify-content-start w-100">
          <div className="mx-2 w-100">
            <label className="form-label-title">
              Type of income
              <span
                className="ms-1"
                title="In the case of wage or replacement income, the employment type, employment period and the canton of employment must also be specified."
              >
                <FaCircleInfo size={15} />
              </span>
            </label>
            <select
              className="form-control"
              value={typeOfIncome}
              onChange={(e) =>
                SpouseHandleEmployee({
                  ...spouse,
                  typeOfIncome: e.target.value,
                  typeOfEmployment:
                    e.target.value === "No income" ||
                    e.target.value === "Pension"
                      ? ""
                      : typeOfEmployment,
                })
              }
              disabled={!action || !availableSpouse}
            >
              {TYPEOFINCOMES.map((label, index) => (
                <option value={label} key={index}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="mx-2 w-100">
            <label className="form-label-title">Type of employment</label>
            <select
              className="form-control"
              value={typeOfEmployment}
              onChange={(e) => handleSpouse("typeOfEmployment", e.target.value)}
              disabled={
                !action ||
                !availableSpouse ||
                typeOfIncome === "No income" ||
                typeOfIncome === "" ||
                typeOfIncome === "Pension"
              }
            >
              <option value="" disabled></option>
              <option value="Main">Main activity</option>
              <option value="Secondary">Secondary activity</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-start w-100 mx-2 mt-3">
          <div className="w-100">
            <label className="form-label-title">Employed from</label>
            <div>
              <CustomDatePicker
                classes="form-control"
                date={!startDate ? null : moment(startDate).toDate()}
                onChange={(e) =>
                  handleSpouse("startDate", moment(e).format("YYYY-MM-DD"))
                }
                disabled={!action || !availableSpouse}
              />
            </div>
          </div>
          <div className="w-100 ms-3">
            <label className="form-label-title">Employed until</label>
            <div>
              <CustomDatePicker
                classes="form-control"
                date={!endDate ? null : moment(endDate).toDate()}
                onChange={(e) =>
                  handleSpouse("endDate", moment(e).format("YYYY-MM-DD"))
                }
                disabled={!action || !availableSpouse}
              />
            </div>
          </div>
          <div className="mx-3 w-100">
            <label className="form-label-title">Canton of employment</label>
            <select
              className="form-control"
              value={cantonOfEmployment}
              onChange={(e) =>
                handleSpouse("cantonOfEmployment", e.target.value)
              }
              defaultValue=""
              disabled={
                !action ||
                !availableSpouse ||
                typeOfIncome === "No income" ||
                typeOfIncome === "" ||
                typeOfIncome === "Pension"
              }
            >
              {typeOfIncome === "No income" ||
              typeOfIncome === "" ||
              typeOfIncome === "Pension" ? (
                <option value=""></option>
              ) : (
                swissCities.map((e, i) => (
                  <option key={i} value={e}>
                    {e}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-start w-100 mx-2 mt-3">
          <div className="w-100">
            <label className="form-label-title">
              Residence country
              <span
                className="ms-1"
                title="Two-digit country code according to ISO 3166 Alpha-2. (Not all countries are saved with a German name in the official standard - the English name is displayed here for help purposes.)"
              >
                <FaCircleInfo size={15} />
              </span>
            </label>
            <SelectCountry
              {...{
                param: residenceCountry,
                disabled: !action || !availableSpouse,
                handleParam: (param) => handleSpouse("residenceCountry", param),
              }}
            />
          </div>
          <div className="mx-4 w-100">
            <label className="form-label-title">Residence canton</label>
            <select
              className="form-control"
              value={residenceCanton}
              onChange={(e) => handleSpouse("residenceCanton", e.target.value)}
              defaultValue=""
              disabled={residenceCountry !== "CH"}
            >
              {residenceCountry !== "CH" ? (
                <option value=""></option>
              ) : (
                swissCities.map((e, i) => (
                  <option key={i} value={e}>
                    {e}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spouse;
