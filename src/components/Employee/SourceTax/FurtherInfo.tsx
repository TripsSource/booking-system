import React from "react";
import {
  CONCUBINAGES,
  CONCUBINAGESDETAILS,
  FURTHEREMPLOYMENTS,
  OTHEREMPLOYMENTS,
  RELIGIONS,
  swissCities,
  TYPEEMPLOYMENTS,
} from "@/constants/data";

import { IntegerNumber } from "@/utils/validation";
import { countryOptions } from "@/utils/constantValues";
import { FaCircleInfo } from "react-icons/fa6";
import moment from "moment";
import CustomDatePicker from "@/Common/CustomDatePicker";

function FurtherInfo({
  action,
  furtherInfo,
  empAddress,
  FurtherInfoHandleEmployee,
}: {
  action: boolean;
  furtherInfo: any;
  empAddress: string;
  FurtherInfoHandleEmployee: any;
}) {
  const {
    religion,
    typeOfEmployment,
    concubinage,
    furtherEmployment,
    detailsOfOtherEmployment,
    isResidentWeeklyOrOneDay,
    workingDaysPerMonth,
    weeklyResidenceAddress,
    crossBorderCommuterData,
  } = furtherInfo;
  const AddressCountry = countryOptions.find(
    (country) => country.value === empAddress
  );

  const handleFurtherInfo = (type: string, value: any) => {
    FurtherInfoHandleEmployee({ ...furtherInfo, [type]: value });
  };

  return (
    <div className="mb-3 border-1 border rounded-3 p-2">
      <label className="form-label-title mt-3">
        <strong className="mx-3">Further information</strong>
      </label>
      <hr className="hr" />
      <div className="d-flex justify-content-start mx-2 mb-3">
        <div className="w-50 mx-2">
          <label className="form-label-title">Religion</label>
          <select
            className="form-control"
            disabled={!action}
            value={religion}
            onChange={(e) => handleFurtherInfo("religion", e.target.value)}
          >
            {RELIGIONS.map((label, index) => (
              <option key={index} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-50 mx-2">
          <label className="form-label-title">Type of employment</label>
          <select
            className="form-control"
            disabled={!action}
            value={typeOfEmployment}
            onChange={(e) =>
              handleFurtherInfo("typeOfEmployment", e.target.value)
            }
          >
            {TYPEEMPLOYMENTS.map((label: string, index: number) => (
              <option key={index} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-start mx-2 mb-3">
        <div className="w-50 mx-2">
          <label className="form-label-title d-flex align-items-center">
            <div>Concubinage</div>
            <span
              className="ms-1"
              title="Only to be specified if the person ... is subject to source tax, ... is single, divorced, separated, or widowed and ... has children eligible for deductions."
            >
              <FaCircleInfo size={15} />
            </span>
          </label>
          <select
            className="form-control"
            value={concubinage}
            onChange={(e) =>
              handleFurtherInfo(
                "concubinage",
                e.target.value === "Yes" ? "Sole custody" : ""
              )
            }
            disabled={!action}
          >
            {CONCUBINAGES.map((label, index) => (
              <option key={index} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-50 mx-2">
          {concubinage !== "" && (
            <>
              <label className="form-label-title">Concubinage details</label>
              <select
                className="form-control"
                value={concubinage}
                onChange={(e) =>
                  handleFurtherInfo("concubinage", e.target.value)
                }
                disabled={!action}
              >
                {CONCUBINAGESDETAILS.map((label, index) => (
                  <option key={index} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-start mx-2 mb-3">
        <div className="w-50 mx-2">
          <label className="form-label-title">Further employment</label>
          <select
            className="form-control"
            value={furtherEmployment}
            onChange={(e) =>
              FurtherInfoHandleEmployee({
                ...furtherInfo,
                furtherEmployment: e.target.value,
                detailsOfOtherEmployment: {
                  detailsType: "Unknown",
                  amount: 0,
                },
              })
            }
            disabled={!action}
          >
            {FURTHEREMPLOYMENTS.map((label, index) => (
              <option key={index} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-50 mx-2">
          {furtherEmployment !== "None" && (
            <>
              <label className="form-label-title">
                Details of other employment
              </label>
              <select
                className="form-control"
                value={detailsOfOtherEmployment.detailsType}
                onChange={(e) =>
                  handleFurtherInfo("detailsOfOtherEmployment", {
                    detailsType: e.target.value,
                    amount: 0,
                  })
                }
                disabled={!action}
              >
                {OTHEREMPLOYMENTS.map((label, index) => (
                  <option key={index} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        {detailsOfOtherEmployment.detailsType !== "Unknown" && (
          <div className="mx-2">
            <label className="form-label-title">
              {detailsOfOtherEmployment.detailsType ===
              "Total activity rate for all additional employers (input as percentage)"
                ? "Amount"
                : "Percentages"}
            </label>
            <div className="d-flex justify-content-start align-items-center">
              <input
                className="form-control me-1"
                type="number"
                min={0}
                value={detailsOfOtherEmployment.amount}
                onChange={(e) =>
                  handleFurtherInfo("detailsOfOtherEmployment", {
                    ...detailsOfOtherEmployment,
                    amount:
                      detailsOfOtherEmployment.detailsType ===
                      "Total activity rate for all additional employers (input as percentage)"
                        ? IntegerNumber(e.target.value)
                        : IntegerNumber(e.target.value, 100),
                  })
                }
                disabled={!action}
              />
              <span className="fs-6">
                {detailsOfOtherEmployment.detailsType ===
                "Total activity rate for all additional employers (input as percentage)"
                  ? "CHF(₣)"
                  : "%"}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-start mx-2 mb-2">
        <label className="form-label-title mx-2">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={empAddress === "CH" ? false : true}
            disabled
          />
          Place of residence abroad (
          {AddressCountry?.value === "CH"
            ? "Place of residence in Switzerland"
            : AddressCountry?.label}
          )
        </label>
      </div>
      <div className="d-flex justify-content-start align-items-center mx-2 mb-2">
        <div className="mx-2">
          <label className="form-label-title">Source tax canton:</label>
          <label className="d-flex align-items-center mx-1">
            <input
              type="radio"
              checked={!isResidentWeeklyOrOneDay}
              onChange={() =>
                handleFurtherInfo("isResidentWeeklyOrOneDay", false)
              }
              className="form-check-input me-2 mb-2"
              disabled={!action || AddressCountry?.value === "CH"}
            />
            Resident (weekly)
          </label>
        </div>
        <div className="mx-2">
          <label className="form-label-title">Source tax municipality:</label>
          <label className="d-flex align-items-center mx-1">
            <input
              type="radio"
              checked={isResidentWeeklyOrOneDay}
              onChange={() =>
                handleFurtherInfo("isResidentWeeklyOrOneDay", true)
              }
              className="form-check-input me-2 mb-2"
              disabled={!action || AddressCountry?.value === "CH"}
            />
            Resident (one day)
            <span
              className="ms-1"
              title="For one-day residents, the source tax canton and municipality matches the information provided by the company or the corresponding workplace."
            >
              <FaCircleInfo size={15} />
            </span>
          </label>
        </div>
        <div className="mx-2">
          <label className="form-label-title">
            Working days in Switzerland (per month)
          </label>
          <div className="d-flex justify-content-start align-items-center">
            <input
              className="form-control me-1"
              type="number"
              min={0}
              max={20}
              value={workingDaysPerMonth}
              onChange={(e) =>
                handleFurtherInfo(
                  "workingDaysPerMonth",
                  IntegerNumber(e.target.value, 20)
                )
              }
              disabled={!action || AddressCountry?.value === "CH"}
            />
            <span className="fs-6">/20</span>
          </div>
        </div>
      </div>
      <div className="mt-3 border-1 border rounded-3 p-2 mx-3">
        <label className="form-label-title mt-3">
          <strong className="ms-4 me-2">Weekly residence address</strong>
          <span title="To be indicated only for weekly residents.">
            <FaCircleInfo size={15} />
          </span>
        </label>
        <hr className="hr" />
        <div className="mx-4 w-50">
          <label className="form-label-title">Street and house number</label>
          <input
            className="form-control"
            type="text"
            value={weeklyResidenceAddress.streetAndHouseNumber}
            onChange={(e) =>
              handleFurtherInfo("weeklyResidenceAddress", {
                ...weeklyResidenceAddress,
                streetAndHouseNumber: e.target.value,
              })
            }
            disabled={
              !action ||
              AddressCountry?.value === "CH" ||
              isResidentWeeklyOrOneDay
            }
          />
        </div>
        <div className="mx-4 d-flex justify-content-start mt-3">
          <div className="mx-1">
            <label className="form-label-title">Zip code</label>
            <input
              className="form-control"
              type="text"
              value={weeklyResidenceAddress.zipCode}
              onChange={(e) =>
                handleFurtherInfo("weeklyResidenceAddress", {
                  ...weeklyResidenceAddress,
                  zipCode: e.target.value,
                })
              }
              disabled={
                !action ||
                AddressCountry?.value === "CH" ||
                isResidentWeeklyOrOneDay
              }
            />
          </div>
          <div className="mx-1">
            <label className="form-label-title">City</label>
            <input
              className="form-control"
              type="text"
              value={weeklyResidenceAddress.city}
              onChange={(e) =>
                handleFurtherInfo("weeklyResidenceAddress", {
                  ...weeklyResidenceAddress,
                  city: e.target.value,
                })
              }
              disabled={
                !action ||
                AddressCountry?.value === "CH" ||
                isResidentWeeklyOrOneDay
              }
            />
          </div>
          <div className="mx-1">
            <label className="form-label-title">Canton</label>
            <select
              className="form-control"
              value={weeklyResidenceAddress.canton}
              onChange={(e) =>
                handleFurtherInfo("weeklyResidenceAddress", {
                  ...weeklyResidenceAddress,
                  canton: e.target.value,
                })
              }
              defaultValue=""
              disabled={
                !action ||
                AddressCountry?.value === "CH" ||
                isResidentWeeklyOrOneDay
              }
            >
              {swissCities.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="mx-1">
            <label className="form-label-title d-flex justify-content-between">
              Municipality number
              <span title="The Federal Statistical Office of Switzerland  assigns a number to each municipality.">
                <FaCircleInfo size={15} />
              </span>
            </label>
            <input
              className="form-control"
              type="text"
              value={weeklyResidenceAddress.municipalityNumber}
              onChange={(e) =>
                handleFurtherInfo("weeklyResidenceAddress", {
                  ...weeklyResidenceAddress,
                  municipalityNumber: e.target.value,
                })
              }
              disabled={
                !action ||
                AddressCountry?.value === "CH" ||
                isResidentWeeklyOrOneDay
              }
            />
          </div>
        </div>
      </div>
      <div className="m-3 border-1 border rounded-3 p-2">
        <label className="form-label-title mt-3">
          <strong className="ms-4 me-2">Cross-border commuter data</strong>
          <span title="Only to be indicated for cross-border commuters.">
            <FaCircleInfo size={15} />
          </span>
        </label>
        <hr className="hr" />
        <div className="d-flex justify-content-start">
          <div className="mx-4 w-50">
            <label className="form-label-title">Place of birth</label>
            <input
              className="form-control"
              type="text"
              value={crossBorderCommuterData.placeOfBirth}
              onChange={(e) =>
                handleFurtherInfo("crossBorderCommuterData", {
                  ...crossBorderCommuterData,
                  placeOfBirth: e.target.value,
                })
              }
              disabled={!action || AddressCountry?.value === "CH"}
            />
          </div>
          <div className="mx-4 w-50">
            <label className="form-label-title">
              Tax ID at the country of origin
            </label>
            <input
              className="form-control"
              type="text"
              value={crossBorderCommuterData.taxIdAtTheCountryOfRegion}
              onChange={(e) =>
                handleFurtherInfo("crossBorderCommuterData", {
                  ...crossBorderCommuterData,
                  taxIdAtTheCountryOfRegion: e.target.value,
                })
              }
              disabled={!action || AddressCountry?.value === "CH"}
            />
          </div>
        </div>
        <div className="mx-4 d-flex justify-content-start mt-3">
          <div className="mx-1">
            <label className="form-label-title">
              Cross border commuter since
              <span
                className="ms-2"
                title="Person has a G permit: Date of first issue (date of entry on the G permit). Person does not have a G permit: Date since which the person has been works in Switzerland or becomes liable to withholding tax"
              >
                <FaCircleInfo size={15} />
              </span>
            </label>
            <div>
              <CustomDatePicker
                classes="form-control"
                date={
                  !crossBorderCommuterData.startDate
                    ? null
                    : moment(crossBorderCommuterData.startDate).toDate()
                }
                onChange={(e) =>
                  handleFurtherInfo("crossBorderCommuterData", {
                    ...crossBorderCommuterData,
                    startDate: moment(e).format("YYYY-MM-DD"),
                  })
                }
                disabled={!action || AddressCountry?.value === "CH"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FurtherInfo;
