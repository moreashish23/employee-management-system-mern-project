export type Department =
  | "Engineering"
  | "Marketing"
  | "Sales"
  | "HR"
  | "Finance"
  | "Operations"
  | "Design"
  | "Support";

export const DEPARTMENTS: Department[] = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Design",
  "Support",
];

export const DEPARTMENT_COLORS: Record<Department, string> = {
  Engineering: "bg-blue-100 text-blue-700",
  Marketing:   "bg-purple-100 text-purple-700",
  Sales:       "bg-green-100 text-green-700",
  HR:          "bg-pink-100 text-pink-700",
  Finance:     "bg-yellow-100 text-yellow-700",
  Operations:  "bg-orange-100 text-orange-700",
  Design:      "bg-indigo-100 text-indigo-700",
  Support:     "bg-teal-100 text-teal-700",
};

export interface Employee {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  department: Department;
  designation: string;
  joiningDate: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  department: Department | "";
  designation: string;
  joiningDate: string;
}

export interface EmployeeMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  meta: EmployeeMeta;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  filters: EmployeeFilters;
}

export interface EmployeeFilters {
  search: string;
  department: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
}

export interface EmployeeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  sortBy?: string;
  sortOrder?: string;
}