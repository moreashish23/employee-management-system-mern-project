import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch, HiPlus, HiFilter, HiX } from "react-icons/hi";
import { useEmployees } from "../../hooks/useEmployees";
import { DEPARTMENTS } from "../../types/employee.types";
import EmployeeTable from "../../components/employee/EmployeeTable";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/common/Button";

export default function EmployeeListPage() {
  const navigate = useNavigate();
  const {
    employees, meta, isLoading, filters,
    loadEmployees, updateFilters, clearFilters,
  } = useEmployees();

  useEffect(() => {
    loadEmployees();
  }, [filters]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateFilters({ search: e.target.value, page: 1 });
    },
    [updateFilters]
  );

  const handleDeptFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateFilters({ department: e.target.value, page: 1 });
    },
    [updateFilters]
  );

  const hasActiveFilters = filters.search || filters.department;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-surface-900">Employees</h1>
          <p className="text-sm text-surface-500 mt-0.5">
            {meta.total > 0
              ? `${meta.total} employee${meta.total !== 1 ? "s" : ""} total`
              : "No employees yet"}
          </p>
        </div>
        <Button
          leftIcon={<HiPlus className="h-4 w-4" />}
          size="sm"
          onClick={() => navigate("/employees/add")}
        >
          Add Employee
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search by name, email or designation…"
              value={filters.search}
              onChange={handleSearch}
              className="w-full pl-9 pr-4 py-2 text-sm border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <HiFilter className="h-4 w-4 text-surface-400 flex-shrink-0" />
            <select
              value={filters.department}
              onChange={handleDeptFilter}
              className="text-sm border border-surface-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-danger-600 hover:text-danger-700 px-2 py-1.5 rounded-lg hover:bg-danger-50 transition-colors"
              >
                <HiX className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <EmployeeTable
          employees={employees}
          isLoading={isLoading}
          filters={filters}
          onFilterChange={updateFilters}
        />
      </div>

      {/* Pagination */}
      {meta.total > 0 && (
        <Pagination
          meta={meta}
          onPageChange={(page) => updateFilters({ page })}
        />
      )}
    </div>
  );
}