import React from "react";
import moment from "moment";
import { FaCircleInfo } from "react-icons/fa6";
import { PERIOD, RELATIONSHIP } from "@/constants/data";
import { EmployeeEmployementState, EmployeeState } from "@/types/app/employee";
import CustomDatePicker from "@/Common/CustomDatePicker";

function Employment({
  employee,
  handleEmployee,
}: {
  employee: EmployeeState;
  handleEmployee: (type: string, value: EmployeeEmployementState) => void;
}) {
  const { employment } = employee;
  const {
    period,
    relationship,
    monthlyAction,
    monthlyWage,
    workPlace,
    empNumber,
    effectiveVacationDays,
    vacDaysFullLoad,
    useWorkingHoursOfWorkplace,
    hoursPerWeek,
    lessonsPerWeek,
  } = employment;

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const progressBar = event.currentTarget;
    const width = progressBar.offsetWidth;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const clickPercentage = (clickX / width) * 100;
    if (clickPercentage > relationship.level) {
      EmploymentHandleEmployee("relationship", {
        ...relationship,
        level: Math.min(relationship.level + 5, 100),
      });
    } else {
      EmploymentHandleEmployee("relationship", {
        ...relationship,
        level: Math.max(relationship.level - 5, 0),
      });
    }
  };

  const EmploymentHandleEmployee = (type: string, value: any) => {
    handleEmployee("employment", { ...employment, [type]: value });
  };

  return (
    <form className="theme-form mega-form">
      <div className="mb-3 border-1 border rounded-3 p-2">
        <label className="form-label-title mt-3 mx-3">
          <strong>Employment period</strong>
        </label>
        <hr className="hr" />
        <div className="m-3 d-flex row">
          <div className="col-sm-4">
            <label className="form-label-title">Entry</label>
            <div>
              <CustomDatePicker
                classes="form-control"
                date={
                  !period.entryDate ? null : moment(period.entryDate).toDate()
                }
                onChange={(e) =>
                  EmploymentHandleEmployee("period", {
                    ...period,
                    entryDate: moment(e).format("YYYY-MM-DD"),
                  })
                }
              />
            </div>
          </div>
          <div className="col-sm-4">
            <label className="form-label-title">Withdrawal</label>
            <div>
              <CustomDatePicker
                classes="form-control"
                date={
                  !period.withdrawalDate
                    ? null
                    : moment(period.withdrawalDate).toDate()
                }
                onChange={(e) =>
                  EmploymentHandleEmployee("period", {
                    ...period,
                    withdrawalDate: moment(e).format("YYYY-MM-DD"),
                  })
                }
              />
            </div>
          </div>
          <div className="col-sm-4">
            <label className="form-label-title d-flex align-items-end">
              <div>Reason for withdrawal</div>
              <span
                className="ms-1"
                title="For early retirement at 100% the employee must be over than 58 years old and less than legal retirement age. The anticipated withdrawal date must be set as the last day of a month."
              >
                <FaCircleInfo size={15} />
              </span>
            </label>
            <select
              className="form-control"
              defaultValue=""
              value={period.withdrawalReason}
              onChange={(e) =>
                EmploymentHandleEmployee("period", {
                  ...period,
                  withdrawalReason: e.target.value,
                })
              }
            >
              <option value="" disabled>
                please select
              </option>
              {PERIOD.map((step, index) => (
                <option value={step} key={index}>
                  {step}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mb-3 border-1 border rounded-3 p-2">
        <label className="form-label-title mt-3 mx-3">
          <strong>Employment relationship</strong>
        </label>
        <hr className="hr" />
        <div className="mt-3 d-flex justify-content-start">
          <div className="mx-3">
            <label className="form-label-title">
              Employment contract <span className="text-danger">*</span>
            </label>
            <select
              className="form-control"
              defaultValue=""
              value={relationship.contract}
              onChange={(e) =>
                EmploymentHandleEmployee("relationship", {
                  ...relationship,
                  contract: e.target.value,
                })
              }
            >
              <option value="" disabled>
                please select
              </option>
              {RELATIONSHIP.map((step: string, index: number) => (
                <option value={step} key={index}>
                  {step}
                </option>
              ))}
            </select>
          </div>
          <div className="mx-3">
            <label className="form-label-title">Working time</label>
            <div className="mt-2">
              <label className="form-label-title d-flex align-items-center">
                <input
                  type="radio"
                  className="form-check-input me-2"
                  checked={relationship.isWorkingTimeRegular}
                  onClick={() =>
                    EmploymentHandleEmployee("relationship", {
                      ...relationship,
                      isWorkingTimeRegular: true,
                      level: 10,
                    })
                  }
                />
                regular
              </label>
              <label className="form-label-title d-flex align-items-center mt-3">
                <input
                  type="radio"
                  className="form-check-input me-2"
                  checked={!relationship.isWorkingTimeRegular}
                  onClick={() =>
                    EmploymentHandleEmployee("relationship", {
                      ...relationship,
                      isWorkingTimeRegular: false,
                      level: 0,
                    })
                  }
                />
                irregular
              </label>
            </div>
          </div>
        </div>
        <div className="m-3 d-flex justify-content-start">
          <div className="mt-3 d-flex justify-content-start align-items-center w-100">
            <label className="form-label-title text-nowrap me-3">
              Employment level / workload
            </label>
            <div
              className="progress mb-1 mx-3"
              style={{ width: "100%", cursor: "pointer" }}
              onClick={(e) => {
                if (relationship.isWorkingTimeRegular) handleClick(e);
              }}
            >
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{
                  width: `${Math.max(0, relationship.level)}%`,
                }}
                aria-valuenow={relationship.level}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <div className="ms-3 w-25 d-flex align-items-center">
              <input
                type="number"
                className="form-control"
                min={0}
                max={100}
                value={relationship.level < 0 ? "" : relationship.level}
                onChange={(e) =>
                  EmploymentHandleEmployee("relationship", {
                    ...relationship,
                    level: Number(e.target.value),
                  })
                }
                disabled={!relationship.isWorkingTimeRegular}
              />
              <span>%</span>
            </div>
          </div>
        </div>
        <div className="m-3 d-flex justify-content-start">
          <label className="form-label-title mt-3">
            Effective working hours:{" "}
            {relationship.isWorkingTimeRegular && "0 h/w"}
          </label>
        </div>
      </div>
      <div className="mb-3 border-1 border rounded-3 p-2">
        <label className="form-label-title mt-3 mx-3">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={monthlyAction}
            onChange={(e) =>
              EmploymentHandleEmployee("monthlyAction", e.target.checked)
            }
          />
          <strong>Monthly wages</strong>
        </label>
        <hr className="hr" />
        <div className="m-3 d-flex justify-content-start align-items-center">
          <div className="d-flex justify-content-start align-items-center me-3">
            <input
              type="number"
              min={0}
              className="form-control"
              value={monthlyWage}
              onChange={(e) =>
                EmploymentHandleEmployee(
                  "monthlyWage",
                  Math.max(0, Number(e.target.value))
                )
              }
              disabled={!monthlyAction}
            />
            <span className="mx-2">CHF(₣)</span>
          </div>
          <label className="form-label-title mt-2 mx-3">
            Annual salary:{" "}
            {monthlyWage !== 0 || !monthlyAction ? (
              <>
                {(
                  Number(monthlyWage) *
                  12 *
                  (relationship.level < 0 ? 1 : relationship.level / 100)
                ).toLocaleString()}{" "}
                CHF
                <span
                  className="ms-1"
                  title="The yearly salary is below the BVG entry threshold (22'680.00 CHF) but BVG insurance might still be offered for the employee"
                >
                  <FaCircleInfo size={15} />
                </span>
              </>
            ) : (
              ""
            )}
          </label>
        </div>
      </div>
      <div className="my-5 border-1 border rounded-3 p-2">
        <div className="mt-3 mx-1 d-flex row">
          <div className="col-sm-6">
            <label className="form-label-title">Workplace</label>
            <select
              className="form-control"
              value={workPlace}
              onChange={(e) =>
                EmploymentHandleEmployee("workPlace", e.target.value)
              }
            >
              <option value="Head office">Head office</option>
            </select>
          </div>
          <div className="col-sm-6">
            <label className="form-label-title d-flex align-items-end">
              <div>Employee number</div>
              <span
                className="ms-1"
                title="Optional: Internal number of this employee."
              >
                <FaCircleInfo size={15} />
              </span>
            </label>
            <input
              className="form-control"
              type="number"
              value={empNumber}
              onChange={(e) =>
                EmploymentHandleEmployee(
                  "empNumber",
                  Math.max(0, Number(e.target.value)).toString()
                )
              }
            />
          </div>
        </div>
        <div className="mx-1 my-3 d-flex row">
          <div className="col-sm-6">
            <label className="form-label-title d-flex align-items-end">
              <div>Effective vacation days</div>
              <span
                className="ms-1"
                title="Enter the effective vacation days of this person for the current year. These will be displayed on the payslip if you have activated the setting in the company data."
              >
                <FaCircleInfo size={15} />
              </span>
            </label>
            <div className="d-flex justify-content-start align-items-center">
              <input
                className="form-control me-1"
                type="number"
                min={0}
                value={effectiveVacationDays}
                onChange={(e) =>
                  EmploymentHandleEmployee(
                    "effectiveVacationDays",
                    e.target.value
                  )
                }
              />
              <span className="fs-5">d</span>
            </div>
          </div>
          <div className="col-sm-6">
            <label className="form-label-title d-flex align-items-end">
              <div>Vacation days on 100% workload</div>
              <span
                className="ms-1"
                title="Only relevant if statistical data is active. Enter the vacation days of this person for a 100% position and a complete year (e.g. 25)."
              >
                <FaCircleInfo size={15} />
              </span>
            </label>
            <div className="d-flex justify-content-start align-items-center">
              <input
                className="form-control me-1"
                type="number"
                min={0}
                value={vacDaysFullLoad}
                onChange={(e) =>
                  EmploymentHandleEmployee(
                    "vacDaysFullLoad",
                    Math.max(0, Number(e.target.value))
                  )
                }
              />
              <span className="fs-5">d</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3 border-1 border rounded-3 p-2">
        <label className="form-label-title mt-3 mx-3">
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={useWorkingHoursOfWorkplace}
            onChange={(e) =>
              EmploymentHandleEmployee("workingHours", {
                hoursPerWeek: e.target.checked ? "" : hoursPerWeek,
                lessonsPerWeek: e.target.checked ? "" : lessonsPerWeek,
                action: e.target.checked,
              })
            }
          />
          <strong>Use working hours of workplace</strong>
        </label>
        <hr className="hr" />
        <div className="mx-1 my-3 d-flex row">
          <div className="col-sm-6">
            <label className="form-label-title d-flex align-items-end">
              Hours per week
            </label>
            <div className="d-flex justify-content-start align-items-center">
              <input
                className="form-control me-1"
                type="number"
                min={0}
                max={70}
                value={hoursPerWeek}
                onChange={(e) =>
                  EmploymentHandleEmployee(
                    "hoursPerWeek",
                    Math.max(0, Math.min(99, Number(e.target.value)))
                  )
                }
                disabled={useWorkingHoursOfWorkplace}
              />
              <span className="fs-5">h</span>
            </div>
          </div>
          <div className="col-sm-6">
            <label className="form-label-title d-flex align-items-end">
              Lessons per week
            </label>
            <div className="d-flex justify-content-start align-items-center">
              <input
                className="form-control me-1"
                type="number"
                min={0}
                max={70}
                value={lessonsPerWeek}
                onChange={(e) =>
                  EmploymentHandleEmployee(
                    "lessonsPerWeek",
                    Math.max(0, Math.min(99, Number(e.target.value)))
                  )
                }
                disabled={useWorkingHoursOfWorkplace}
              />
              <span className="fs-5">h</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Employment;
