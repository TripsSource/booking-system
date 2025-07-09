import React, { useMemo } from "react";
import moment from "moment";
import Link from "next/link";
import { readEmployeeState } from "@/types/store/employee";

function ReadEmployees({
  employees,
  stepTab,
  handleEmployeeStatus,
}: {
  employees: readEmployeeState[];
  stepTab: number;
  handleEmployeeStatus: (
    type: string,
    id: string,
    role?: string,
    isActive?: boolean
  ) => void;
}) {
  const meMoEmployees = useMemo(() => employees, [employees]);
  return (
    <table className="user-table table table-striped">
      <thead>
        <tr>
          <th className="text-center">Employee</th>
          <th className="text-center">Date of birth</th>
          <th className="text-center">Employed since</th>
          <th className="text-center">Gross wage(₣)</th>
          <th className="text-center">Role</th>
          {stepTab !== 3 && <th className="text-center">Action</th>}
        </tr>
      </thead>
      <tbody>
        {meMoEmployees.length > 0 ? (
          meMoEmployees.map((employee, index) => (
            <tr key={index}>
              <td className="text-center">
                {employee.firstname} {employee.lastname}
              </td>
              <td className="text-center">
                {moment(employee.birthDate).format("DD.MM.YYYY")}
              </td>
              <td className="text-center">
                {moment(employee.entryDate).format("DD.MM.YYYY")}
              </td>
              <td className="text-center">
                {`${employee.monthlyWages?.toLocaleString() || "—"}`}
              </td>
              <td>
                <select
                  className="form-control"
                  value={employee.role}
                  onChange={(e) => {
                    handleEmployeeStatus(
                      "role",
                      employee._id,
                      e.target.value,
                      employee.isActive
                    );
                  }}
                  disabled={stepTab === 3}
                >
                  <option value=""></option>
                  {[
                    "Admin",
                    "Direct Client",
                    "Employee",
                    "Guide",
                    "Driver",
                    "Accountant",
                    "ContentWriter",
                    "Product Team",
                    "Operator",
                    "Travel Agent",
                    "OTA",
                    "Supplier",
                    "Hotel",
                    "Cruise Company",
                    "Tour Company",
                  ].map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </td>
              {stepTab !== 3 && (
                <td className="text-center" style={{ cursor: "pointer" }}>
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className={`me-3 btn ${
                        employee.isActive
                          ? "btn-outline-danger"
                          : "btn-outline-primary"
                      } btn-xs`}
                      onClick={() =>
                        handleEmployeeStatus(
                          "active",
                          employee._id,
                          employee.role,
                          !employee.isActive
                        )
                      }
                    >
                      {employee.isActive ? "InActive" : "Active"}
                    </div>
                    <div className="mt-1 ms-3">
                      <Link href={`/employee/information/${employee._id}`}>
                        <i className="fa fa-pencil-square-o fs-5" />
                      </Link>
                    </div>
                    <div className="ms-3">
                      <Link
                        href={""}
                        onClick={() =>
                          handleEmployeeStatus("delete", employee._id)
                        }
                      >
                        <i className="fa fa-trash-o fs-5" />
                      </Link>
                    </div>
                  </div>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>No Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ReadEmployees;
