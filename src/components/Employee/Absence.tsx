import CustomDatePicker from "@/Common/CustomDatePicker";
import { ABSENCEREASON } from "@/constants/data";
import { EmployeeAbsenceState, EmployeeState } from "@/types/app/employee";
import moment from "moment";
import React, { useState } from "react";
import { Trash2 } from "react-feather";
import { FaCircleInfo } from "react-icons/fa6";

function Absence({
  employee,
  handleEmployee,
}: {
  employee: EmployeeState;
  handleEmployee: (type: string, value: EmployeeAbsenceState[]) => void;
}) {
  const { absence } = employee;
  const [stepTab, setStepTab] = useState<string | number>(0);

  const AbsenceHandleEmployee = (value: EmployeeAbsenceState) => {
    handleEmployee(
      "absence",
      absence.map((abs: EmployeeAbsenceState, i: number) => {
        if (i === stepTab) return value;
        else return abs;
      })
    );
  };

  return (
    <form className="theme-form mega-form">
      <div className="d-flex row">
        <div className="col-sm-3">
          <ul className="nav mb-3 flex-column">
            {absence.map((abs: EmployeeAbsenceState, index: number) => (
              <li className="nav-item" key={index}>
                <a
                  className={`nav-link ${
                    stepTab === index
                      ? "active bg-danger text-white border-1"
                      : ""
                  }`}
                  href="#"
                  aria-current="page"
                  onClick={() => setStepTab(index)}
                >
                  {abs.isOpen
                    ? `${abs.reason} from ${moment(
                        abs.startDate === "" ? Date.now() : abs.startDate
                      ).format("DD.MM.YYYY")}`
                    : `${abs.reason} ${moment(
                        abs.startDate === "" ? Date.now() : abs.startDate
                      ).format("DD.MM.YYYY")} until ${moment(
                        abs.endDate === "" ? Date.now() : abs.endDate
                      ).format("DD.MM.YYYY")}`}
                </a>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-outline-past"
              onClick={() => {
                handleEmployee("absence", [
                  ...absence,
                  {
                    reason: "Illness",
                    isOpen: true,
                    isHalfDay: false,
                    startDate: "",
                    endDate: "",
                    continuedPay: "100",
                    disability: "100",
                  },
                ]);
                setStepTab(absence.length);
              }}
            >
              Add
            </button>
            <button className="bg-transparent border-0" type="button">
              <Trash2
                color={"#dc3545"}
                size={20}
                onClick={() => {
                  setStepTab(absence.length - 2 < 0 ? "" : absence.length - 2);
                  handleEmployee(
                    "absence",
                    absence.filter((_, index) => index !== stepTab)
                  );
                }}
              />
            </button>
          </div>
        </div>
        <div className="col-sm-9">
          {typeof stepTab === "number" && (
            <div className="mx-3">
              <div className="d-flex justify-content-start">
                <div className="me-2">
                  <label className="form-label-title">Reason</label>
                  <select
                    className="form-control"
                    value={absence[stepTab]?.reason}
                    onChange={(e) =>
                      AbsenceHandleEmployee({
                        ...absence[stepTab],
                        reason: e.target.value,
                        continuedPay:
                          e.target.value === "Interruption of work"
                            ? "false"
                            : absence[stepTab]?.continuedPay,
                        disability:
                          e.target.value === "Interruption of work"
                            ? "false"
                            : absence[stepTab]?.disability,
                      })
                    }
                  >
                    {ABSENCEREASON.map((step: string, index: number) => (
                      <option value={step} key={index}>
                        {step}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mx-5">
                  <label className="form-label-title">Until</label>
                  <div className="d-flex justify-content-start mt-1">
                    <label
                      className="form-label-title d-flex align-items-center me-3"
                      onClick={() =>
                        AbsenceHandleEmployee({
                          ...absence[stepTab],
                          isOpen: true,
                          isHalfDay: false,
                        })
                      }
                    >
                      <input
                        type="radio"
                        className="form-check-input me-2 mb-1"
                        checked={absence[stepTab]?.isOpen}
                      />
                      Open
                    </label>
                    <label
                      className="form-label-title d-flex align-items-center mx-1"
                      onClick={() =>
                        AbsenceHandleEmployee({
                          ...absence[stepTab],
                          isOpen: false,
                        })
                      }
                    >
                      <input
                        type="radio"
                        className="form-check-input me-2 mb-1"
                        defaultChecked
                        checked={!absence[stepTab]?.isOpen}
                      />
                      Ends on
                    </label>
                  </div>
                </div>
                {absence[stepTab]?.reason !== "Interruption of work" && (
                  <div className="mx-2 d-flex align-items-end">
                    <label className="form-label-title">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={absence[stepTab]?.isHalfDay}
                        onChange={(e) =>
                          AbsenceHandleEmployee({
                            ...absence[stepTab],
                            isOpen: false,
                            endDate: absence[stepTab]?.startDate,
                            isHalfDay: e.target.checked,
                          })
                        }
                      />
                      Half day
                    </label>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-start mt-3">
                <div className="mx-2">
                  <label className="form-label-title">Start date</label>
                  <div>
                    <CustomDatePicker
                      classes="form-control"
                      date={
                        !absence[stepTab].startDate
                          ? null
                          : moment(absence[stepTab].startDate).toDate()
                      }
                      onChange={(e) =>
                        AbsenceHandleEmployee({
                          ...absence[stepTab],
                          startDate: moment(e).format("YYYY-MM-DD"),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mx-2">
                  <label className="form-label-title">End date</label>
                  <div>
                    <CustomDatePicker
                      classes="form-control"
                      date={
                        !absence[stepTab].endDate
                          ? null
                          : moment(absence[stepTab].endDate).toDate()
                      }
                      onChange={(e) =>
                        AbsenceHandleEmployee({
                          ...absence[stepTab],
                          endDate: moment(e).format("YYYY-MM-DD"),
                          isHalfDay: false,
                        })
                      }
                      disabled={absence[stepTab]?.isOpen}
                    />
                  </div>
                </div>
                {absence[stepTab]?.reason !== "Vacation" &&
                  (absence[stepTab]?.reason !== "Interruption of work" ? (
                    <>
                      <div className="mx-2">
                        <label className="form-label-title">
                          Continued pay
                        </label>
                        <div className="d-flex justify-content-start align-items-center">
                          <input
                            className="form-control me-1"
                            type="number"
                            min={0}
                            max={100}
                            value={absence[stepTab]?.continuedPay}
                            onChange={(e) => {
                              const value = Math.max(
                                0,
                                Math.min(100, Number(e.target.value))
                              );
                              AbsenceHandleEmployee({
                                ...absence[stepTab],
                                continuedPay: `${value}`,
                              });
                            }}
                          />
                          <span className="fs-6">%</span>
                        </div>
                      </div>
                      <div className="mx-2">
                        <label className="form-label-title">Disability</label>
                        <div className="d-flex justify-content-start align-items-center">
                          <input
                            className="form-control me-1"
                            type="number"
                            min={0}
                            max={100}
                            value={absence[stepTab]?.disability}
                            onChange={(e) => {
                              const value = Math.max(
                                0,
                                Math.min(100, Number(e.target.value))
                              );
                              AbsenceHandleEmployee({
                                ...absence[stepTab],
                                disability: `${value}`,
                              });
                            }}
                          />
                          <span className="fs-6">%</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="form-check form-switch d-flex align-items-center mx-3 mt-4">
                        <input
                          type="checkbox"
                          role="switch"
                          className="form-check-input me-2 mb-1"
                          id="payed_interruption"
                          checked={absence[stepTab]?.continuedPay === "true"}
                          onChange={(e) =>
                            AbsenceHandleEmployee({
                              ...absence[stepTab],
                              continuedPay: `${e.target.checked}`,
                            })
                          }
                        />
                        <label
                          className="form-check-label mt-2"
                          htmlFor="payed_interruption"
                        >
                          <strong>Payed Interruption</strong>
                        </label>
                        <span
                          className="ms-1"
                          title="Depending on the setting for the insurance solution, the contributions may be split between the employer and the employee (50% each) or made only by the employee (100%)."
                        >
                          <FaCircleInfo size={15} />
                        </span>
                      </div>
                      <div className="form-check form-switch d-flex align-items-center mx-3 mt-4">
                        <input
                          type="checkbox"
                          role="switch"
                          className="form-check-input me-2 mb-1"
                          id="pp_contribution"
                          checked={absence[stepTab]?.disability === "true"}
                          onChange={(e) =>
                            AbsenceHandleEmployee({
                              ...absence[stepTab],
                              disability: `${e.target.checked}`,
                            })
                          }
                        />
                        <label
                          className="form-check-label mt-2"
                          htmlFor="pp_contribution"
                        >
                          <strong>PP contribution</strong>
                        </label>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default Absence;
