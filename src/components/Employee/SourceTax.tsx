import React from "react";
import { EmployeeSourceTaxState, EmployeeState } from "@/types/app/employee";
import { FaCircleInfo } from "react-icons/fa6";
import { PREDEFINED, prefix } from "@/constants/data";
import FurtherInfo from "@/components/Employee/SourceTax/FurtherInfo";
import Spouse from "@/components/Employee/SourceTax/Spouse";

function SourceTax({
  employee,
  handleEmployee,
}: {
  employee: EmployeeState;
  handleEmployee: (type: string, value: EmployeeSourceTaxState) => void;
}) {
  const { personalInfo, sourceTax, address } = employee;
  const { maritalStatus } = personalInfo;
  const { action, code, furtherInfo, spouse } = sourceTax;

  const SourceTaxHandleEmployee = (type: string, value: any) => {
    handleEmployee("sourceTax", { ...sourceTax, [type]: value });
  };

  const FurtherInfoHandleEmployee = (value: any) => {
    handleEmployee("sourceTax", { ...sourceTax, furtherInfo: value });
  };

  const SpouseHandleEmployee = (value: any) => {
    handleEmployee("sourceTax", { ...sourceTax, spouse: value });
  };

  return (
    <form className="theme-form mega-form">
      <div className="mx-2 d-flex align-items-end">
        <label className="form-label-title">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={action}
            onChange={(e) =>
              SourceTaxHandleEmployee("action", e.target.checked)
            }
          />
          Employee is liable for source tax
        </label>
      </div>
      <div className="mb-3 border-1 border rounded-3 p-2">
        <label className="form-label-title mt-3">
          <strong className="mx-3">Code</strong>
        </label>
        <hr className="hr" />
        <div className="d-flex row mx-2 mb-3">
          <div className="col-sm-3">
            <label
              className={`form-label-title d-flex align-items-start ${
                !action ? "text-secondary" : ""
              }`}
            >
              <input
                type="radio"
                className="form-check-input me-2"
                disabled={!action}
                defaultChecked
                checked={code.codeType === "tariff code"}
                onChange={() =>
                  SourceTaxHandleEmployee("code", {
                    ...code,
                    codeType: "tariff code",
                  })
                }
              />
              Tariff code
              <span
                className="ms-1"
                title="With the help of the tariff code, the tax rate is automatically determined from the tables for each payslip based on income and canton."
              >
                <FaCircleInfo size={15} />
              </span>
            </label>
            <label
              className={`form-label-title d-flex align-items-start ${
                !action ? "text-secondary" : ""
              }`}
            >
              <input
                type="radio"
                className="form-check-input me-2"
                disabled={!action}
                checked={code.codeType === "predefined"}
                onChange={() =>
                  SourceTaxHandleEmployee("code", {
                    ...code,
                    codeType: "predefined",
                  })
                }
              />
              Predefined
            </label>
            <label
              className={`form-label-title d-flex align-items-start ${
                !action ? "text-secondary" : ""
              }`}
            >
              <input
                type="radio"
                className="form-check-input me-2"
                disabled={!action}
                checked={code.codeType === "open"}
                onChange={() =>
                  SourceTaxHandleEmployee("code", {
                    ...code,
                    codeType: "open",
                    codeData: "",
                  })
                }
              />
              Open
            </label>
          </div>
          <div className="col-sm-9">
            <div className="d-flex justify-content-start">
              <select
                className="form-control w-25"
                disabled={code.codeType !== "tariff code" || !action}
                onChange={(e) =>
                  SourceTaxHandleEmployee("code", {
                    ...code,
                    codeData: e.target.value,
                  })
                }
                value={
                  code.codeType !== "tariff code" || !action
                    ? ""
                    : code.codeData
                }
                defaultValue=""
              >
                <option value="" disabled>
                  e.g. A1Y
                </option>
                {prefix.map((label, index) => (
                  <option key={index} value={label}>
                    {label}
                  </option>
                ))}
              </select>
              <label
                className={`form-label-title ms-5 mt-2 ${
                  !action ? "text-secondary" : ""
                }`}
              >
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={code.isSpecificApprove}
                  onChange={(e) =>
                    SourceTaxHandleEmployee("code", {
                      ...code,
                      isSpecificApprove: e.target.checked,
                    })
                  }
                  disabled={!action}
                />
                specially approved
              </label>
              {code.codeType === "tariff" && action && code.codeData === "" && (
                <span className="mx-3 mt-1 text-danger fs-5">
                  Invalid source tax rate
                </span>
              )}
            </div>
            <div className="d-flex justify-content-start w-75 mt-3">
              <select
                className="form-control"
                value={
                  code.codeType !== "predefined" || !action ? "" : code.codeData
                }
                onChange={(e) =>
                  SourceTaxHandleEmployee("code", {
                    ...code,
                    codeData: e.target.value,
                  })
                }
                disabled={code.codeType !== "predefined" || !action}
              >
                {PREDEFINED.map((label, index) => (
                  <option key={index} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-start w-75 mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="free text"
                value={code.codeType !== "open" || !action ? "" : code.codeData}
                onChange={(e) =>
                  SourceTaxHandleEmployee("code", {
                    ...code,
                    codeData: e.target.value,
                  })
                }
                disabled={code.codeType !== "open" || !action}
              />
            </div>
          </div>
        </div>
      </div>
      <FurtherInfo
        {...{
          action,
          furtherInfo,
          empAddress: address.country,
          FurtherInfoHandleEmployee,
        }}
      />
      <Spouse {...{ action, spouse, maritalStatus, SpouseHandleEmployee }} />
    </form>
  );
}

export default SourceTax;
