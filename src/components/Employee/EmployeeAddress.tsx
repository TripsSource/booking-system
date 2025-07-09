import { EmployeeAddressState, EmployeeState } from "@/types/app/employee";
import React from "react";

import { FaCircleInfo } from "react-icons/fa6";
import { swissCities } from "@/constants/data";
import { SelectCountry } from "@/Common/SelectCountry";

function EmployeeAddress({
  employee,
  handleEmployee,
}: {
  employee: EmployeeState;
  handleEmployee: (type: string, value: EmployeeAddressState) => void;
}) {
  const { address } = employee;
  const {
    additionalLine,
    streetAndHouseNumber,
    postOfficeBox,
    regionProvinceStateDistrict,
    country,
    city,
    zipCode,
    canton,
    municipalityNumber,
  } = address;

  const AddressHandleEmployee = (type: string, value: string) => {
    handleEmployee("address", { ...address, [type]: value });
  };

  const countryHandleEmployee = (value: {
    country: string;
    canton: string;
  }) => {
    handleEmployee("address", { ...address, ...value });
  };

  return (
    <form className="theme-form mega-form">
      <div className="d-flex row">
        <div className="col-sm-4">
          <label className="form-label-title">Additional line</label>
          <input
            className="form-control"
            type="text"
            value={additionalLine}
            onChange={(e) =>
              AddressHandleEmployee("additionalLine", e.target.value)
            }
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Street and house number</label>
          <input
            className="form-control"
            type="text"
            value={streetAndHouseNumber}
            onChange={(e) =>
              AddressHandleEmployee("streetAndHouseNumber", e.target.value)
            }
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">
            Region, province, state or district
          </label>
          <input
            className="form-control"
            type="text"
            value={regionProvinceStateDistrict}
            onChange={(e) =>
              AddressHandleEmployee(
                "regionProvinceStateDistrict",
                e.target.value
              )
            }
          />
        </div>
      </div>
      <div className="d-flex row mt-3">
        <div className="col-sm-4">
          <label className="form-label-title">Postal Code</label>
          <input
            className="form-control"
            type="number"
            value={zipCode}
            onChange={(e) =>
              AddressHandleEmployee("zipCode", e.target.value.slice(0, 4))
            }
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Location</label>
          <input
            className="form-control"
            type="text"
            value={city}
            onChange={(e) => AddressHandleEmployee("city", e.target.value)}
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Country</label>
          <SelectCountry
            {...{
              param: country,
              handleParam: (param) =>
                countryHandleEmployee({
                  country: param,
                  canton: param !== "CH" ? "" : canton,
                }),
            }}
          />
        </div>
      </div>
      <div className="d-flex row mt-3">
        <div className="col-sm-4">
          <label className="form-label-title">Mailbox</label>
          <input
            className="form-control"
            type="text"
            value={postOfficeBox}
            onChange={(e) =>
              AddressHandleEmployee("postOfficeBox", e.target.value)
            }
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title d-flex align-items-end">
            <div>Canton</div>
            <span
              className="ms-1"
              title="Der Wohnsitzkanton ist für die Quellensteuer von Bedeutung."
            >
              <FaCircleInfo size={15} />
            </span>
          </label>
          <select
            className="form-control"
            value={canton}
            onChange={(e) => AddressHandleEmployee("canton", e.target.value)}
            defaultValue=""
            disabled={country !== "CH"}
          >
            {country !== "CH" ? (
              <option value="">Expatriate</option>
            ) : (
              swissCities.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="col-sm-4">
          <label className="form-label-title d-flex align-items-end">
            <div>Municipality number</div>
            <span
              className="ms-1"
              title="Der Wohnsitzkanton ist für die Quellensteuer von Bedeutung."
            >
              <FaCircleInfo size={15} />
            </span>
          </label>
          <input
            className="form-control"
            type="number"
            value={municipalityNumber}
            onChange={(e) =>
              AddressHandleEmployee("municipalityNumber", e.target.value)
            }
          />
        </div>
      </div>
    </form>
  );
}

export default EmployeeAddress;
