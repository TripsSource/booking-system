import { EmployeeState } from "@/types/app/employee";

export interface initialStateType {
  employees: readEmployeeState[];
  employee: EmployeeState;
  loading: boolean;
}

export interface readEmployeeState {
  _id: string;
  firstname: string;
  lastname: string;
  role: string;
  birthDate: string;
  isActive: boolean;
  entryDate: string;
  monthlyWages: number;
}

export interface updateEmployeeType {
  id: string;
  role: string;
  isActive: boolean;
}
