import React, { useEffect } from "react";
import { LANGUAGE, MARITAL, PERMITCATEGORY } from "@/constants/data";
import { EmployeeInfoState, EmployeeState } from "@/types/app/employee";
import { emailPattern, formatInsuranceNumber } from "@/utils/validation";
import moment from "moment";
import { FaCircleInfo } from "react-icons/fa6";
import PhoneInput from "react-phone-input-2";
import { SelectCountry } from "@/Common/SelectCountry";
import CustomDatePicker from "@/Common/CustomDatePicker";

const Information = ({
  employee,
  handleEmployee,
}: {
  employee: EmployeeState;
  handleEmployee: (type: string, value: EmployeeInfoState) => void;
}) => {
  const { personalInfo } = employee;
  const {
    lastname,
    firstname,
    gender,
    birthDate,
    nationality,
    stayPermitCategory,
    language,
    maritalStatus,
    settledDownValidFrom,
    maritalStatusValidFrom,
    retirementInsuranceNumber,
    unknown,
    email,
    phone,
  } = personalInfo;

  const PersonalInfoHandleEmployee = (type: string, value: string) => {
    handleEmployee("personalInfo", { ...personalInfo, [type]: value });
  };

  useEffect(() => {
    if (nationality === "CH") {
      PersonalInfoHandleEmployee("stayPermitCategory", "");
    }
  }, [nationality]);

  return (
    <form className="theme-form mega-form">
      <div className="d-flex row">
        <div className="col-sm-4">
          <label className="form-label-title">First name</label>
          <input
            type="text"
            className="form-control"
            value={firstname}
            onChange={(e) =>
              PersonalInfoHandleEmployee("firstname", e.target.value)
            }
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Last name</label>
          <input
            type="text"
            className="form-control"
            value={lastname}
            onChange={(e) =>
              PersonalInfoHandleEmployee("lastname", e.target.value)
            }
          />
        </div>
      </div>
      <div className="d-flex row mt-3">
        <div className="col-sm-4">
          <label className="form-label-title d-flex align-items-end">
            <div>Gender</div>
            <span
              className="ms-1"
              title="This information is necessary for calculating the daily sick pay, among other things."
            >
              <FaCircleInfo size={15} />
            </span>
          </label>
          <select
            className="form-control"
            value={gender}
            defaultValue=""
            onChange={(e) =>
              PersonalInfoHandleEmployee("gender", e.target.value)
            }
          >
            <option value="" disabled>
              please select
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="col-sm-4">
          <label className="form-label-title d-flex align-items-center">
            <div>Date of birth</div>
            <span
              className="ms-1"
              title="This information is used to determine the retirement insurance contribution obligation."
            >
              <FaCircleInfo size={15} />
            </span>
          </label>
          <div>
            <CustomDatePicker
              classes="form-control"
              date={birthDate ? moment(birthDate).toDate() : null}
              onChange={(e) =>
                PersonalInfoHandleEmployee(
                  "birthDate",
                  moment(e).format("YYYY-MM-DD")
                )
              }
              maxDate={moment(Date.now()).toDate()}
            />
          </div>
        </div>
      </div>
      <div className="d-flex row mt-3">
        <div className="col-sm-4">
          <label className="form-label-title d-flex align-items-center">
            <div>Nationality</div>
            <span
              className="ms-1"
              title="Two-digit country code according to ISO 3166 Alpha-2. (Not all countries are saved with a German name in the official standard - the English name is displayed here for help purposes.)"
            >
              <FaCircleInfo size={15} />
            </span>
          </label>
          <SelectCountry
            {...{
              param: nationality,
              handleParam: (param) =>
                PersonalInfoHandleEmployee("nationality", param),
            }}
          />
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Stay permit category</label>
          <select
            className="form-control"
            defaultValue=""
            value={stayPermitCategory}
            onChange={(e) =>
              PersonalInfoHandleEmployee("stayPermitCategory", e.target.value)
            }
            disabled={nationality === "CH"}
          >
            <option value="" disabled>
              please select
            </option>
            {PERMITCATEGORY.map((step: string, index: number) => (
              <option key={index} value={step}>
                {step}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Settled Down valid from</label>
          <div>
            <CustomDatePicker
              classes="form-control"
              onChange={(e) =>
                PersonalInfoHandleEmployee(
                  "settledDownValidFrom",
                  moment(e).format("YYYY-MM-DD")
                )
              }
              disabled={stayPermitCategory !== "Settled Down (C)"}
              date={
                !settledDownValidFrom
                  ? null
                  : moment(settledDownValidFrom).toDate()
              }
            />
          </div>
        </div>
      </div>
      <div className="d-flex row mt-3">
        <div className="col-sm-4">
          <label className="form-label-title d-flex align-items-center">
            <div>Language</div>
            <span
              className="ms-1"
              title="Language in which documents are created for the employee, if possible."
            >
              <FaCircleInfo size={15} />
            </span>
          </label>
          <select
            className="form-control"
            defaultValue="0"
            value={language}
            onChange={(e) =>
              PersonalInfoHandleEmployee("language", e.target.value)
            }
          >
            {LANGUAGE.map((step: string, index: number) => (
              <option key={index} value={step}>
                {step}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Marital status</label>
          <select
            className="form-control"
            defaultValue="single"
            value={maritalStatus}
            onChange={(e) =>
              PersonalInfoHandleEmployee("maritalStatus", e.target.value)
            }
          >
            {MARITAL.map((step: string, index: number) => (
              <option key={index} value={step}>
                {step}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Marital status valid from</label>
          <div>
            <CustomDatePicker
              classes="form-control"
              date={
                !maritalStatusValidFrom
                  ? null
                  : moment(maritalStatusValidFrom).toDate()
              }
              onChange={(e) =>
                PersonalInfoHandleEmployee(
                  "maritalStatusValidFrom",
                  moment(e).format("YYYY-MM-DD")
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="d-flex row mt-3">
        <div className="col-sm-4">
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
            placeholder="e.g. 756.1234.5678.97"
            value={retirementInsuranceNumber}
            onChange={(e) =>
              handleEmployee("personalInfo", {
                ...personalInfo,
                unknown: false,
                retirementInsuranceNumber: formatInsuranceNumber(
                  e.target.value,
                  personalInfo.retirementInsuranceNumber
                ),
              })
            }
          />
        </div>
        <div className="col-sm-4 d-flex align-items-end">
          <label className="form-label-title">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={unknown}
              onChange={(e) =>
                handleEmployee("personalInfo", {
                  ...personalInfo,
                  unknown: e.target.checked,
                  retirementInsuranceNumber:
                    e.target.checked === true
                      ? ""
                      : personalInfo.retirementInsuranceNumber,
                })
              }
            />
            Unknown
          </label>
        </div>
      </div>
      {retirementInsuranceNumber.length < 15 && !unknown && (
        <span className="text-danger">
          The retirement insurance number consists of 13 digits.
        </span>
      )}
      <div className="d-flex row mt-3">
        <div className="col-sm-4">
          <label className="form-label-title d-flex align-items-center">
            <div>Email</div>
            <span
              className="ms-1"
              title="Please define a valid address to enable e-mailing of paystubs."
            >
              <FaCircleInfo size={15} />
            </span>
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) =>
              PersonalInfoHandleEmployee("email", e.target.value)
            }
          />
          {!emailPattern.test(email) && email !== "" && (
            <span className="text-danger">Email type error</span>
          )}
        </div>
        <div className="col-sm-4">
          <label className="form-label-title">Phone number</label>
          <PhoneInput
            country={"ch"}
            inputStyle={{
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
              padding: "1.4rem 0", // Vertical padding for the input
              paddingLeft: "3.5rem",
            }}
            value={phone}
            onChange={(e) => PersonalInfoHandleEmployee("phone", e)}
            placeholder="Enter phone number"
          />
        </div>
      </div>
    </form>
  );
};

export default Information;
