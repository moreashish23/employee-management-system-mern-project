import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HiArrowLeft } from "react-icons/hi";
import { useEmployees } from "../../hooks/useEmployees";
import { EmployeeFormData } from "../../types/employee.types";
import EmployeeForm from "../../components/employee/EmployeeForm";
import Spinner from "../../components/common/Spinner";
import { updateEmployee } from "../../features/employees/employeeSlice";

export default function EditEmployeePage() {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    selectedEmployee, isLoading, isSubmitting,
    loadById, editEmployee,
  } = useEmployees();

  useEffect(() => {
    if (id) loadById(id);
  }, [id]);

  const handleSubmit = async (data: EmployeeFormData) => {
    if (!id) return;
    const result = await editEmployee(id, data);
    if (updateEmployee.fulfilled.match(result)) {
      toast.success("Employee updated successfully.");
      navigate(`/employees/${id}`);
    } else {
      toast.error((result.payload as string) || "Failed to update employee.");
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
        <button
          onClick={() => navigate("/employees")}
          className="mt-3 text-sm text-primary-600 hover:underline"
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in max-w-2xl">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100 transition-colors"
        >
          <HiArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-surface-900">Edit Employee</h1>
          <p className="text-sm text-surface-500">{selectedEmployee.fullName}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        <EmployeeForm
          defaultValues={{
            fullName:     selectedEmployee.fullName,
            email:        selectedEmployee.email,
            mobileNumber: selectedEmployee.mobileNumber,
            department:   selectedEmployee.department,
            designation:  selectedEmployee.designation,
            joiningDate:  selectedEmployee.joiningDate,
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}