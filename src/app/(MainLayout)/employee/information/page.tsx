"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { EMPLOYEESTEPS } from "@/constants/data";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  deleteEmployeeAction,
  employeeLoadingState,
  getEmployeesAction,
  updateEmployeeStatusAction,
} from "@/store/employee";
import { readEmployeeState } from "@/types/store/employee";
import ReadEmployees from "@/components/Employee/ReadEmployees";
import { toast } from "react-toastify";
import RoleProvider from "@/providers/RoleProvider";
import { permissionsState, userState } from "@/store/auth";
import { AdminPage } from "./admin";
import PageLoader from "@/layouts/PageLoader";
import PurePagination from "@/Common/PurePagination";

function page() {
  const employeeLoading = useSelector(employeeLoadingState);
  const [stepTab, setStepTab] = useState(0);
  const permissions = useSelector(permissionsState);
  const [employees, setEmployees] = useState<{
    data: readEmployeeState[];
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
    search: string;
    sort: string;
    order: string;
  }>({
    data: [],
    page: 1,
    perPage: 10,
    totalPages: 0,
    totalCount: 0,
    search: "",
    sort: "",
    order: "",
  });
  const { page, perPage, search, sort, order, totalPages } = employees;
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async (status: string) => {
    const { payload } = await dispatch(
      getEmployeesAction({ page, perPage, search, sort, order, status })
    );
    if (payload?.["data"]) {
      setEmployees((pre) => ({
        ...pre,
        ...payload,
      }));
    } else {
      setEmployees((pre) => ({
        ...pre,
        data: [],
      }));
      console.log("Unexpected payload:", payload);
    }
  };

  const handlePages = async (type: string, value: number | string) => {
    if (type === "perPage")
      setEmployees((pre) => ({ ...pre, page: 1, perPage: Number(value) }));
    else setEmployees((pre) => ({ ...pre, [type]: value }));
  };

  useEffect(() => {
    fetchData(EMPLOYEESTEPS[stepTab].value);
  }, [page, perPage, sort, order]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData(EMPLOYEESTEPS[stepTab].value);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleEmployeeStatus = async (
    type: string,
    id: string,
    role?: string,
    isActive?: boolean
  ) => {
    if (type === "delete") {
      const { payload } = await dispatch(deleteEmployeeAction(id));

      if (payload.message) {
        toast.success(payload.message);
      } else {
        toast.error(payload.error);
      }
    } else {
      const { payload } = await dispatch(
        updateEmployeeStatusAction({
          id,
          role: role || "",
          isActive: isActive ?? false,
        })
      );
      if (payload.message) {
        toast.success(payload.message);
      } else {
        toast.error(payload.error);
      }
    }
    await fetchData(EMPLOYEESTEPS[stepTab].value);
  };

  return (
    <RoleProvider target="Employee">
      <AdminPage>
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-start align-items-start">
              <ul className="nav nav-tabs mb-3">
                {EMPLOYEESTEPS.map(
                  (
                    StepTab: { label: string; value: string },
                    index: number
                  ) => (
                    <li className="nav-item" key={index}>
                      <a
                        className={`nav-link ${
                          stepTab === index ? "active bg-past text-white" : ""
                        }`}
                        href="#"
                        aria-current="page"
                        onClick={() => {
                          setStepTab(index);
                          fetchData(StepTab.value);
                        }}
                      >
                        {StepTab.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
              {permissions.some(
                (permission) =>
                  permission.target.includes("Employee") &&
                  permission.permission.includes("create")
              ) && (
                <Link href="/employee/information/create">
                  <button className="btn btn-outline-primary" type="button">
                    New employee
                  </button>
                </Link>
              )}
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label className="form-label-title mt-1">Search: </label>
              <input
                className="form-control"
                value={search}
                onChange={(e) => handlePages("search", e.target.value)}
              />
            </div>
          </div>
          <div className="card-body">
            {employeeLoading ? (
              <PageLoader />
            ) : (
              <>
                <ReadEmployees
                  {...{
                    employees: employees.data,
                    stepTab,
                    handleEmployeeStatus,
                  }}
                />
                <PurePagination
                  {...{
                    pages: { page, perPage, totalPages },
                    handlePages,
                    loading: employeeLoading,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </AdminPage>
    </RoleProvider>
  );
}

export default page;
