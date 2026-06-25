import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiArrowLeft } from "react-icons/hi";
import { useEmployees } from "../../hooks/useEmployees";
import { EmployeeFormData } from "../../types/employee.types";
import EmployeeForm from "../../components/employee/EmployeeForm";
import { createEmployee } from "../../features/employees/employeeSlice";

export default function AddEmployeePage() {
  const navigate = useNavigate();
  const { addEmployee, isSubmitting } = useEmployees();

  const handleSubmit = async (data: EmployeeFormData) => {
    const result = await addEmployee(data);
    if (createEmployee.fulfilled.match(result)) {
      toast.success(`${data.fullName} added successfully!`);
      navigate("/employees");
    } else {
      toast.error((result.payload as string) || "Failed to add employee.");
    }
  };

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
          <h1 className="text-xl font-semibold text-surface-900">Add Employee</h1>
          <p className="text-sm text-surface-500">
            Fill in the details below to add a new employee.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        <EmployeeForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Add Employee"
        />
      </div>
    </div>
  );
}