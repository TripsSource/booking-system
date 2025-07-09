import { api } from "@/utils/api";
import { EmployeeState } from "@/types/app/employee";
import { updateEmployeeType } from "@/types/store/employee";

export const createEmployee = async (data: EmployeeState) => {
  return await api
    .post("/api/users/employees", {
      employeeProfile: {
        ...data,
        sourceTax: {
          ...data.sourceTax,
          spouse: {
            ...data.sourceTax.spouse,
            firstname: data.sourceTax.spouse.firstname,
            lastname: data.sourceTax.spouse.lastname,
          },
        },
      },
    })
    .then((res) => res.data);
};

export const getEmployees = async ({
  page,
  perPage,
  search,
  sort,
  order,
  status,
}: {
  page: number;
  perPage: number;
  search: string;
  sort: string;
  order: string;
  status: string;
}) => {
  return await api
    .get(`/api/users/employees/status/${status}`, {
      params: { page, perPage, search, sort, order },
    })
    .then((res) => res.data);
};

export const getIdEmployee = async (id: string) => {
  return await api.get(`api/users/employees/${id}`).then((res) => res.data);
};

export const updateIdEmployee = async ({
  id,
  data,
}: {
  id: string;
  data: EmployeeState;
}) => {
  return await api
    .put(`api/users/employees/${id}`, {
      employeeProfile: {
        ...data,
        sourceTax: {
          ...data.sourceTax,
          spouse: {
            ...data.sourceTax.spouse,
            name:
              data.sourceTax.spouse.firstname +
              " " +
              data.sourceTax.spouse.lastname,
          },
        },
      },
    })
    .then((res) => res.data);
};

export const updateEmployeeStatus = async ({
  id,
  role,
  isActive,
}: updateEmployeeType) => {
  return await api
    .put(`/api/users/employees/role-status/${id}`, {
      role,
      isActive,
    })
    .then((res) => res.data);
};

export const deleteEmployee = async (id: string) => {
  return await api.delete(`/api/users/employees/${id}`).then((res) => res.data);
};

export const getEmployeesWithRole = async () => {
  return await api
    .get("/api/users/employees/role-members")
    .then((res) => res.data);
};
