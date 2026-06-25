import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiPencil, HiTrash, HiEye,
  HiChevronUp, HiChevronDown, HiSelector,
} from "react-icons/hi";
import { Employee, DEPARTMENT_COLORS, EmployeeFilters } from "../../types/employee.types";
import { formatDate, formatMobile, getInitials } from "../../utils/formatters";
import Button from "../common/Button";
import { TableSkeleton } from "../common/SkeletonLoader";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useEmployees } from "../../hooks/useEmployees";
import { toast } from "react-toastify";

interface EmployeeTableProps {
  employees: Employee[];
  isLoading: boolean;
  filters: EmployeeFilters;
  onFilterChange: (filters: Partial<EmployeeFilters>) => void;
}

type SortField = "fullName" | "department" | "designation" | "joiningDate" | "createdAt";

const columns: { key: SortField; label: string }[] = [
  { key: "fullName",    label: "Employee"    },
  { key: "department",  label: "Department"  },
  { key: "designation", label: "Designation" },
  { key: "joiningDate", label: "Joined"      },
];

export default function EmployeeTable({
  employees,
  isLoading,
  filters,
  onFilterChange,
}: EmployeeTableProps) {
  const navigate = useNavigate();
  const { removeEmployee, isSubmitting } = useEmployees();
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  const handleSort = (field: SortField) => {
    if (filters.sortBy === field) {
      onFilterChange({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc", page: 1 });
    } else {
      onFilterChange({ sortBy: field, sortOrder: "asc", page: 1 });
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (filters.sortBy !== field) return <HiSelector className="h-3.5 w-3.5 text-surface-300" />;
    return filters.sortOrder === "asc"
      ? <HiChevronUp className="h-3.5 w-3.5 text-primary-600" />
      : <HiChevronDown className="h-3.5 w-3.5 text-primary-600" />;
  };

  const handleDelete = async () => {
  if (!deleteTarget) return;

  try {
    await removeEmployee(deleteTarget._id).unwrap();

    toast.success(
      `${deleteTarget.fullName} deleted successfully.`
    );

    setDeleteTarget(null);
  } catch (error) {
    toast.error("Failed to delete employee.");
  }
};

  if (!isLoading && employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-14 w-14 rounded-full bg-surface-100 flex items-center justify-center mb-4">
          <span className="text-2xl">👤</span>
        </div>
        <p className="text-surface-700 font-medium">No employees found</p>
        <p className="text-surface-400 text-sm mt-1">
          Try adjusting your search or filters, or add a new employee.
        </p>
        <Button
          className="mt-4"
          size="sm"
          onClick={() => navigate("/employees/add")}
        >
          Add Employee
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-100">
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wide cursor-pointer select-none hover:text-surface-900 transition-colors"
                  onClick={() => handleSort(key)}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {label}
                    <SortIcon field={key} />
                  </span>
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-semibold text-surface-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-50">
            {isLoading ? (
              <tr>
                <td colSpan={5}>
                  <TableSkeleton rows={5} />
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="hover:bg-surface-50/60 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-semibold flex-shrink-0">
                        {getInitials(emp.fullName)}
                      </div>
                      <div>
                        <p className="font-medium text-surface-900">{emp.fullName}</p>
                        <p className="text-xs text-surface-400">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${DEPARTMENT_COLORS[emp.department]}`}
                    >
                      {emp.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-surface-600">{emp.designation}</td>
                  <td className="px-6 py-4 text-surface-500">
                    {formatDate(emp.joiningDate)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate(`/employees/${emp._id}`)}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        title="View details"
                      >
                        <HiEye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/employees/${emp._id}/edit`)}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-warning-600 hover:bg-warning-50 transition-colors"
                        title="Edit employee"
                      >
                        <HiPencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(emp)}
                        className="p-1.5 rounded-lg text-surface-400 hover:text-danger-600 hover:bg-danger-50 transition-colors"
                        title="Delete employee"
                      >
                        <HiTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        employee={deleteTarget}
        isDeleting={isSubmitting}
      />
    </>
  );
}