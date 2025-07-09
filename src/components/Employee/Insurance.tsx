import { EmployeeInsuranceState, EmployeeState } from "@/types/app/employee";
import React from "react";
import { FaCircleInfo } from "react-icons/fa6";

function Insurance({
  employee,
  handleEmployee,
}: {
  employee: EmployeeState;
  handleEmployee: (type: string, value: EmployeeInsuranceState) => void;
}) {
  const { insurance } = employee;
  const {
    AHVexempt,
    AHVcontributionsAtRetirementAge,
    UVGsolution,
    insuranceContributionCode,
    occupationalBenefitPlan,
    ppSolution,
    setContributionsInPercent,
    companyContribution,
    employeeContribution,
    compensationOffice,
  } = insurance;

  const InsuranceHandleEmployee = (
    type: string,
    value: string | boolean | number
  ) => {
    handleEmployee("insurance", { ...insurance, [type]: value });
  };

  return (
    <form className="theme-form mega-form">
      <div className="mt-2 border-1 border rounded-3 p-2">
        <label className="form-label-title mt-3 mx-3">
          <strong>
            Retirement/unemployment insurance contribution obligation
          </strong>
        </label>
        <hr className="hr" />
        <div className="d-flex justify-content-start align-items-start">
          <div className="d-flex align-items-end mx-3">
            <label className="form-label-title">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={AHVexempt}
                onChange={(e) =>
                  InsuranceHandleEmployee("AHVexempt", e.target.checked)
                }
              />
              AHV exempt (marginal wage)
            </label>
          </div>
          <div className="mx-3 mb-3">
            <label className="form-label-title d-flex align-items-center">
              <div>AHV contributions at retirement age (reference age)</div>
              <span
                className="ms-1"
                title="Since 1 January 2024, employees of retirement age can choose whether to calculate AHV contributions on their entire salary or continue to use the tax-free amount of CHF 1400."
              >
                <FaCircleInfo size={15} />
              </span>
            </label>
            <select
              className="form-control"
              value={AHVcontributionsAtRetirementAge}
              onChange={(e) =>
                InsuranceHandleEmployee(
                  "AHVcontributionsAtRetirementAge",
                  e.target.value
                )
              }
            >
              <option value="0">Not selected</option>
              <option value="1">Exemption limit of CHF 1400</option>
              <option value="2">Full AHV contributions</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-3 border-1 border rounded-3 p-2">
        <label className="form-label-title mt-3 mx-3">
          <strong>
            Non-occupational / occupational accident insurance (NOAI, OAI)
          </strong>
        </label>
        <hr className="hr" />
        <div className="mt-2 mx-3">
          <label className="form-label-title">AI solution</label>
          <label className="form-label-title d-flex align-items-center">
            <input
              type="radio"
              className="form-check-input me-2"
              checked={UVGsolution}
              onChange={(e) =>
                InsuranceHandleEmployee("UVGsolution", e.target.checked)
              }
            />
            UVG solution
          </label>
        </div>
        <div className="mt-2 mx-3">
          <label className="form-label-title">Insurance contribution</label>
          <div className="d-flex justify-content-start mt-1">
            <div className="mx-5">
              <label className="form-label-title">-Occupational accident</label>
              <label className="form-label-title d-flex align-items-center">
                <input
                  type="radio"
                  checked={insuranceContributionCode === "0"}
                  className="form-check-input me-2 mb-1"
                  onClick={() =>
                    InsuranceHandleEmployee("insuranceContributionCode", "0")
                  }
                />
                no contributions
              </label>
              <label className="form-label-title d-flex align-items-center">
                <input
                  type="radio"
                  checked={insuranceContributionCode !== "0"}
                  className="form-check-input me-2 mb-1"
                  onClick={() =>
                    InsuranceHandleEmployee("insuranceContributionCode", "1")
                  }
                />
                Employer
              </label>
            </div>
            <div className="mx-5">
              <label className="form-label-title">
                -Non-occupational accident
              </label>
              <label
                className={`form-label-title d-flex align-items-center ${
                  insuranceContributionCode === "0" ? "text-secondary" : ""
                }`}
              >
                <input
                  type="radio"
                  className="form-check-input me-2 mb-1"
                  disabled={insuranceContributionCode === "0"}
                  checked={insuranceContributionCode === "1" ? true : false}
                  onClick={() =>
                    InsuranceHandleEmployee("insuranceContributionCode", "1")
                  }
                />
                no contributions
              </label>
              <label
                className={`form-label-title d-flex align-items-center ${
                  insuranceContributionCode === "0" ? "text-secondary" : ""
                }`}
              >
                <input
                  type="radio"
                  className="form-check-input me-2 mb-1"
                  disabled={insuranceContributionCode === "0"}
                  checked={insuranceContributionCode === "2" ? true : false}
                  onClick={() =>
                    InsuranceHandleEmployee("insuranceContributionCode", "2")
                  }
                />
                Employer (100%)
              </label>
              <label
                className={`form-label-title d-flex align-items-center ${
                  insuranceContributionCode === "0" ? "text-secondary" : ""
                }`}
              >
                <input
                  type="radio"
                  className="form-check-input me-2 mb-1"
                  disabled={insuranceContributionCode === "0"}
                  checked={insuranceContributionCode === "3" ? true : false}
                  onClick={() =>
                    InsuranceHandleEmployee("insuranceContributionCode", "3")
                  }
                />
                Employer (50%/100%)
                <span
                  className="ms-1"
                  title="Depending on the setting for the insurance solution, the contributions may be split between the employer and the employee (50% each) or made only by the employee (100%)."
                >
                  <FaCircleInfo size={15} />
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-1 mx-2">
          <span>(Code: {insuranceContributionCode})</span>
        </div>
      </div>
      <div className="mt-3 border-1 border rounded-3 p-2">
        <label className="form-label-title mt-3 mx-3">
          <input
            type="checkbox"
            className="form-check-input me-1"
            checked={occupationalBenefitPlan}
            onChange={(e) =>
              InsuranceHandleEmployee(
                "occupationalBenefitPlan",
                e.target.checked
              )
            }
          />
          <strong>Occupational benefit plan (PP)</strong>
        </label>
        <hr className="hr" />
        <div className="my-2 d-flex justify-content-start">
          <label className="form-label-title mt-3 mx-3">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={ppSolution}
              onChange={(e) =>
                InsuranceHandleEmployee("ppSolution", e.target.checked)
              }
              disabled={!occupationalBenefitPlan}
            />
            <strong className={occupationalBenefitPlan ? "" : "text-secondary"}>
              PP solution
            </strong>
          </label>
          <div className="form-check form-switch d-flex align-items-center mx-5 mt-2">
            <input
              type="checkbox"
              role="switch"
              className="form-check-input me-2 mb-1"
              id="contributions_percent"
              checked={setContributionsInPercent}
              onChange={(e) =>
                handleEmployee("insurance", {
                  ...insurance,
                  setContributionsInPercent: e.target.checked,
                  companyContribution: "",
                  employeeContribution: "",
                })
              }
              disabled={!ppSolution}
            />
            <label
              className="form-check-label mt-2"
              htmlFor="contributions_percent"
            >
              <strong>Set contributions in percent</strong>
            </label>
          </div>
        </div>
        <div className="d-flex row mb-3 mx-2">
          <div className="col-sm-6">
            <label className="form-label-title">Company contribution</label>
            <div className="d-flex justify-content-start align-items-center">
              <input
                className="form-control me-1"
                type="number"
                min={0}
                value={companyContribution}
                onChange={(e) =>
                  InsuranceHandleEmployee(
                    "companyContribution",
                    setContributionsInPercent
                      ? Math.max(0, Math.min(100, Number(e.target.value)))
                      : Math.max(0, Number(e.target.value))
                  )
                }
                disabled={!ppSolution}
              />
              <span className="fs-6">
                {setContributionsInPercent ? "%" : "CHF(₣)"}
              </span>
            </div>
          </div>
          <div className="col-sm-6">
            <label className="form-label-title">Employee contribution</label>
            <div className="d-flex justify-content-start align-items-center">
              <input
                className="form-control me-1"
                type="number"
                min={0}
                value={employeeContribution}
                onChange={(e) =>
                  InsuranceHandleEmployee(
                    "employeeContribution",
                    setContributionsInPercent
                      ? Math.max(0, Math.min(100, Number(e.target.value)))
                      : Math.max(0, Number(e.target.value))
                  )
                }
                disabled={!ppSolution}
              />
              <span className="fs-6">{ppSolution ? "%" : "CHF(₣)"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 border-1 border rounded-3 p-2">
        <label className="form-label-title mt-3 mx-3">
          <strong>
            Compensation fund and non-obligatory additional insurance
          </strong>
        </label>
        <hr className="hr" />
        <div className="mt-3 mx-3">
          <label className="form-label-title">
            Family compensation fund (FCF)
            <strong className="text-danger">*</strong>
          </label>
          <div>
            <label className="form-label-title mt-2">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={compensationOffice}
                onChange={(e) =>
                  InsuranceHandleEmployee(
                    "compensationOffice",
                    e.target.checked
                  )
                }
              />
              Compensation Office
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Insurance;
