import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { HiArrowLeft, HiPencil, HiTrash, HiMail, HiPhone, HiOfficeBuilding, HiBriefcase, HiCalendar } from "react-icons/hi";
import { toast } from "react-toastify";
import { useEmployees } from "../../hooks/useEmployees";
import { DEPARTMENT_COLORS } from "../../types/employee.types";
import { formatDate, formatMobile, getInitials } from "../../utils/formatters";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import DeleteConfirmModal from "../../components/employee/DeleteConfirmModal";
import { deleteEmployee } from "../../features/employees/employeeSlice";

export default function EmployeeDetailPage() {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    selectedEmployee, isLoading, isSubmitting,
    loadById, removeEmployee,
  } = useEmployees();
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (id) loadById(id);
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const result = await removeEmployee(id);
    if (deleteEmployee.fulfilled.match(result)) {
      toast.success("Employee deleted successfully.");
      navigate("/employees");
    } else {
      toast.error("Failed to delete employee.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!selectedEmployee) {
    return (
      <div className="text-center py-20">
        <p className="text-surface-500">Employee not found.</p>
        <Link to="/employees" className="mt-3 text-sm text-primary-600 hover:underline block">
          Back to list
        </Link>
      </div>
    );
  }

  const emp = selectedEmployee;

  const details = [
    { icon: HiMail,          label: "Email",       value: emp.email },
    { icon: HiPhone,         label: "Mobile",      value: formatMobile(emp.mobileNumber) },
    { icon: HiOfficeBuilding, label: "Department", value: emp.department },
    { icon: HiBriefcase,     label: "Designation", value: emp.designation },
    { icon: HiCalendar,      label: "Joined",      value: formatDate(emp.joiningDate) },
  ];

  return (
    <div className="space-y-5 animate-fade-in max-w-2xl">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100 transition-colors"
        >
          <HiArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold text-surface-900">Employee Details</h1>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        {/* Profile header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 flex items-center gap-5">
          <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {getInitials(emp.fullName)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white text-lg font-semibold truncate">{emp.fullName}</h2>
            <p className="text-primary-200 text-sm mt-0.5 truncate">{emp.designation}</p>
            <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${DEPARTMENT_COLORS[emp.department]}`}>
              {emp.department}
            </span>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link to={`/employees/${emp._id}/edit`}>
              <Button variant="secondary" size="sm" leftIcon={<HiPencil className="h-3.5 w-3.5" />}>
                Edit
              </Button>
            </Link>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<HiTrash className="h-3.5 w-3.5" />}
              onClick={() => setShowDelete(true)}
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-surface-100 flex items-center justify-center flex-shrink-0">
                <Icon className="h-4 w-4 text-surface-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-surface-400 uppercase tracking-wide">
                  {label}
                </p>
                <p className="text-sm font-medium text-surface-900 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-surface-100 bg-surface-50/50">
          <p className="text-xs text-surface-400">
            Added by{" "}
            <span className="font-medium text-surface-600">
              {emp.createdBy?.name || "Unknown"}
            </span>{" "}
            on {formatDate(emp.createdAt)}
          </p>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        employee={emp}
        isDeleting={isSubmitting}
      />
    </div>
  );
}