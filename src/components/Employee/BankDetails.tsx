import { EmployeeBankDetailsState, EmployeeState } from "@/types/app/employee";
import React from "react";

function BankDetails({
  employee,
  handleEmployee,
}: {
  employee: EmployeeState;
  handleEmployee: (type: string, value: EmployeeBankDetailsState) => void;
}) {
  const { bankDetails } = employee;
  const { institutionName, IBAN, BIC } = bankDetails;
  const EmploymentHandleEmployee = (type: string, value: string) => {
    handleEmployee("bankDetails", { ...bankDetails, [type]: value });
  };

  return (
    <form className="theme-form mega-form">
      <div className="d-flex row">
        <div className="col-sm-6">
          <label className="form-label-title">Name of the institution</label>
          <input
            type="text"
            className="form-control"
            value={institutionName}
            onChange={(e) =>
              EmploymentHandleEmployee("institutionName", e.target.value)
            }
          />
        </div>
      </div>
      <div className="d-flex row mt-3">
        <div className="col-sm-6">
          <label className="form-label-title">IBAN</label>
          <input
            type="text"
            className="form-control"
            value={IBAN}
            onChange={(e) => EmploymentHandleEmployee("IBAN", e.target.value)}
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label-title">BIC</label>
          <input
            type="text"
            className="form-control"
            value={BIC}
            onChange={(e) => EmploymentHandleEmployee("BIC", e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}

export default BankDetails;
