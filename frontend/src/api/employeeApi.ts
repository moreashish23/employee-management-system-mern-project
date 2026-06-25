import axiosInstance from "./axiosInstance";
import {
  Employee,
  EmployeeFormData,
  EmployeeMeta,
  EmployeeQueryParams,
} from "../types/employee.types";

interface ApiSuccess<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: EmployeeMeta;
}

export interface EmployeeListResponse {
  employees: Employee[];
  meta: EmployeeMeta;
}

export const employeeApi = {
  getAll: async (params: EmployeeQueryParams): Promise<EmployeeListResponse> => {
    const res = await axiosInstance.get<ApiSuccess<{ employees: Employee[] }>>(
      "/employees",
      { params }
    );
    return {
      employees: res.data.data.employees,
      meta: res.data.meta!,
    };
  },

  getById: async (id: string): Promise<Employee> => {
    const res = await axiosInstance.get<ApiSuccess<{ employee: Employee }>>(
      `/employees/${id}`
    );
    return res.data.data.employee;
  },

  create: async (payload: EmployeeFormData): Promise<Employee> => {
    const res = await axiosInstance.post<ApiSuccess<{ employee: Employee }>>(
      "/employees",
      payload
    );
    return res.data.data.employee;
  },

  update: async (id: string, payload: Partial<EmployeeFormData>): Promise<Employee> => {
    const res = await axiosInstance.put<ApiSuccess<{ employee: Employee }>>(
      `/employees/${id}`,
      payload
    );
    return res.data.data.employee;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/employees/${id}`);
  },
};