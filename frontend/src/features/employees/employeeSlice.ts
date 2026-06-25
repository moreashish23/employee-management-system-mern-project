import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { employeeApi } from "../../api/employeeApi";
import {
  EmployeeState,
  Employee,
  EmployeeFormData,
  EmployeeFilters,
  EmployeeQueryParams,
} from "../../types/employee.types";

const defaultMeta = {
  total: 0, page: 1, limit: 10,
  totalPages: 0, hasNextPage: false, hasPrevPage: false,
};

const defaultFilters: EmployeeFilters = {
  search: "", department: "",
  sortBy: "createdAt", sortOrder: "desc",
  page: 1, limit: 10,
};

const initialState: EmployeeState = {
  employees:        [],
  selectedEmployee: null,
  meta:             defaultMeta,
  isLoading:        false,
  isSubmitting:     false,
  error:            null,
  filters:          defaultFilters,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (params: EmployeeQueryParams, { rejectWithValue }) => {
    try {
      return await employeeApi.getAll(params);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to fetch employees.");
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await employeeApi.getById(id);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to fetch employee.");
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (payload: EmployeeFormData, { rejectWithValue }) => {
    try {
      return await employeeApi.create(payload);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to create employee.");
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async (
    { id, payload }: { id: string; payload: Partial<EmployeeFormData> },
    { rejectWithValue }
  ) => {
    try {
      return await employeeApi.update(id, payload);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to update employee.");
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await employeeApi.delete(id);
      return id;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to delete employee.");
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<EmployeeFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = defaultFilters;
    },
    clearSelectedEmployee(state) {
      state.selectedEmployee = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload.employees;
        state.meta      = action.payload.meta;
      })
      .addCase(fetchEmployees.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; });

    builder
      .addCase(fetchEmployeeById.pending, (state) => { state.isLoading = true; state.selectedEmployee = null; })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => { state.isLoading = false; state.selectedEmployee = action.payload; })
      .addCase(fetchEmployeeById.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; });

    builder
      .addCase(createEmployee.pending, (state) => { state.isSubmitting = true; state.error = null; })
      .addCase(createEmployee.fulfilled, (state) => { state.isSubmitting = false; })
      .addCase(createEmployee.rejected, (state, action) => { state.isSubmitting = false; state.error = action.payload as string; });

    builder
      .addCase(updateEmployee.pending, (state) => { state.isSubmitting = true; state.error = null; })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.selectedEmployee = action.payload;
        const idx = state.employees.findIndex((e) => e._id === action.payload._id);
        if (idx !== -1) state.employees[idx] = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => { state.isSubmitting = false; state.error = action.payload as string; });

    builder
      .addCase(deleteEmployee.pending, (state) => { state.isSubmitting = true; })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.employees    = state.employees.filter((e) => e._id !== action.payload);
        state.meta.total   = Math.max(0, state.meta.total - 1);
      })
      .addCase(deleteEmployee.rejected, (state, action) => { state.isSubmitting = false; state.error = action.payload as string; });
  },
});

export const { setFilters, resetFilters, clearSelectedEmployee, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;