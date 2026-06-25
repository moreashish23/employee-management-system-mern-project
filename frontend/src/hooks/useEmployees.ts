import { useCallback } from "react";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  fetchEmployeeById,
  setFilters,
  resetFilters,
} from "../features/employees/employeeSlice";
import { EmployeeFormData, EmployeeFilters } from "../types/employee.types";

export const useEmployees = () => {
  const dispatch = useAppDispatch();
  const state    = useAppSelector((s) => s.employees);

  const loadEmployees = useCallback(() => {
    const { search, department, sortBy, sortOrder, page, limit } = state.filters;
    dispatch(fetchEmployees({ search, department, sortBy, sortOrder, page, limit }));
  }, [dispatch, state.filters]);

  const loadById = useCallback((id: string) => dispatch(fetchEmployeeById(id)), [dispatch]);

  const addEmployee = useCallback(
    (payload: EmployeeFormData) => dispatch(createEmployee(payload)),
    [dispatch]
  );

  const editEmployee = useCallback(
    (id: string, payload: Partial<EmployeeFormData>) => dispatch(updateEmployee({ id, payload })),
    [dispatch]
  );

  const removeEmployee = useCallback(
    (id: string) => dispatch(deleteEmployee(id)),
    [dispatch]
  );

  const updateFilters = useCallback(
    (filters: Partial<EmployeeFilters>) => dispatch(setFilters(filters)),
    [dispatch]
  );

  const clearFilters = useCallback(() => dispatch(resetFilters()), [dispatch]);

  return {
    ...state,
    loadEmployees,
    loadById,
    addEmployee,
    editEmployee,
    removeEmployee,
    updateFilters,
    clearFilters,
  };
};