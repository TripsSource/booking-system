import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { initialStateType, readEmployeeState } from "@/types/store/employee";
import { EmployeeState } from "@/types/app/employee";
import errorHandler from "@/utils/errorHandler";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  getEmployeesWithRole,
  getIdEmployee,
  updateEmployeeStatus,
  updateIdEmployee,
} from "@/store/employee/index.api";

const initialState: initialStateType = {
  employees: [] as readEmployeeState[],
  employee: {} as EmployeeState,
  loading: false,
};

export const createEmployeeAction = createAsyncThunk(
  "/employee/create",
  errorHandler(createEmployee)
);

export const getEmployeesAction = createAsyncThunk(
  "/employee/read/all",
  errorHandler(getEmployees)
);

export const getIdEmployeeAction = createAsyncThunk(
  "/employee/trsf/id",
  errorHandler(getIdEmployee)
);

export const updateEmployeeAction = createAsyncThunk(
  "/employee/update/id",
  errorHandler(updateIdEmployee)
);

export const updateEmployeeStatusAction = createAsyncThunk(
  "/employee/update/status/id",
  errorHandler(updateEmployeeStatus)
);

export const deleteEmployeeAction = createAsyncThunk(
  "/employee/delete/id",
  errorHandler(deleteEmployee)
);

export const getEmployeesWithRoleAction = createAsyncThunk(
  "/employees/role-members",
  errorHandler(getEmployeesWithRole)
);

const EmployeeReducers = createSlice({
  name: "EmployeeReducers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createEmployeeAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployeeAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createEmployeeAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getEmployeesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeesAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getEmployeesAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateEmployeeStatusAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployeeStatusAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateEmployeeStatusAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteEmployeeAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployeeAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteEmployeeAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getEmployeesWithRoleAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeesWithRoleAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getEmployeesWithRoleAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const employeeLoadingState = (state: RootState) =>
  state.EmployeeReducers.loading;

export default EmployeeReducers.reducer;
