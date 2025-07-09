"use client";
import React, { useState, useEffect } from "react";
import Absence from "@/components/Employee/Absence";
import BankDetails from "@/components/Employee/BankDetails";
import Employment from "@/components/Employee/Employment";
import Insurance from "@/components/Employee/Insurance";
import PersonalInformation from "@/components/Employee/PersonalInformation";
import SourceTax from "@/components/Employee/SourceTax";
import { CREATEEMPLOYEESTEPS } from "@/constants/data";
import {
  EmployeeAbsenceState,
  EmployeeAddressState,
  EmployeeBankDetailsState,
  EmployeeEmployementState,
  EmployeeInfoState,
  EmployeeInsuranceState,
  EmployeeSourceTaxState,
  EmployeeState,
} from "@/types/app/employee";
import EmployeeAddress from "@/components/Employee/EmployeeAddress";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { createEmployeeAction } from "@/store/employee";
import RoleProvider from "@/providers/RoleProvider";
import { toast } from "react-toastify";
import { initialEmployee } from "@/app/(MainLayout)/employee/information/InitialEmployeeState";

function page() {
  const [stepTab, setStepTab] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const [employee, setEmployee] = useState<EmployeeState>(initialEmployee);

  const handleEmployee = (
    type: string,
    value:
      | EmployeeInsuranceState
      | EmployeeAbsenceState[]
      | EmployeeEmployementState
      | EmployeeInfoState
      | EmployeeBankDetailsState
      | EmployeeSourceTaxState
      | EmployeeAddressState
  ) => {
    setEmployee({ ...employee, [type]: value });
  };

  const saveEmployee = async () => {
    const { payload } = await dispatch(createEmployeeAction(employee));
    if (payload.message) {
      toast.success(payload.message);
      setEmployee(initialEmployee);
    } else {
      toast.error(payload.error);
    }
  };

  useEffect(() => {
    setEmployee({
      ...employee,
      sourceTax: {
        ...employee.sourceTax,
        furtherInfo: {
          ...employee.sourceTax.furtherInfo,
          isPlaceOfResidenceAbroad:
            employee.address.country !== "CH" ? true : false,
        },
      },
    });
  }, [employee.address.country]);

  return (
    <RoleProvider target="Employee">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-start">
            <ul className="nav nav-tabs mb-3 ">
              {CREATEEMPLOYEESTEPS.map((StepTab: string, index: number) => (
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
                    {StepTab}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-outline-past"
              type="button"
              onClick={saveEmployee}
            >
              Save Employee
            </button>
          </div>
        </div>
        <div className="card-body">
          {stepTab === 0 && (
            <PersonalInformation {...{ employee, handleEmployee }} />
          )}
          {stepTab === 1 && <Employment {...{ employee, handleEmployee }} />}
          {stepTab === 2 && (
            <EmployeeAddress {...{ employee, handleEmployee }} />
          )}
          {stepTab === 3 && <BankDetails {...{ employee, handleEmployee }} />}
          {stepTab === 4 && <Insurance {...{ employee, handleEmployee }} />}
          {stepTab === 5 && <Absence {...{ employee, handleEmployee }} />}
          {stepTab === 6 && <SourceTax {...{ employee, handleEmployee }} />}
        </div>
      </div>
    </RoleProvider>
  );
}

export default page;
