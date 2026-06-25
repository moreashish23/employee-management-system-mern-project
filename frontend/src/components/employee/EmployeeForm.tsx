import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiUser, HiMail, HiPhone, HiOfficeBuilding, HiBriefcase, HiCalendar } from "react-icons/hi";
import Input from "../common/Input";
import Button from "../common/Button";
import { EmployeeFormData, DEPARTMENTS, Department } from "../../types/employee.types";
import { formatDateForInput } from "../../utils/formatters";

interface EmployeeFormProps {
  defaultValues?: Partial<EmployeeFormData>;
  onSubmit: (data: EmployeeFormData) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export default function EmployeeForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save Employee",
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    defaultValues: {
      fullName:     "",
      email:        "",
      mobileNumber: "",
      department:   "",
      designation:  "",
      joiningDate:  "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        joiningDate: defaultValues.joiningDate
          ? formatDateForInput(defaultValues.joiningDate)
          : "",
      });
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Full Name"
          required
          placeholder="e.g. Riya Mehta"
          leftIcon={<HiUser className="h-4 w-4" />}
          error={errors.fullName?.message}
          {...register("fullName", {
            required: "Full name is required",
            minLength: { value: 2, message: "Must be at least 2 characters" },
            maxLength: { value: 100, message: "Cannot exceed 100 characters" },
          })}
        />

        <Input
          label="Email Address"
          type="email"
          required
          placeholder="e.g. riya@company.com"
          leftIcon={<HiMail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Enter a valid email address",
            },
          })}
        />

        <Input
          label="Mobile Number"
          type="tel"
          required
          placeholder="e.g. 9876543210"
          leftIcon={<HiPhone className="h-4 w-4" />}
          hint="10-digit number starting with 6–9"
          error={errors.mobileNumber?.message}
          {...register("mobileNumber", {
            required: "Mobile number is required",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid 10-digit mobile number (starts with 6–9)",
            },
          })}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-surface-700">
            Department <span className="text-danger-500">*</span>
          </label>
          <select
            className={`
              w-full rounded-lg border bg-white px-3 py-2 text-sm text-surface-900
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
              transition-all duration-150
              ${errors.department ? "border-danger-500" : "border-surface-300"}
            `}
            {...register("department", { required: "Department is required" })}
          >
            <option value="">Select department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-xs text-danger-600">⚠ {errors.department.message}</p>
          )}
        </div>

        <Input
          label="Designation"
          required
          placeholder="e.g. Senior Engineer"
          leftIcon={<HiBriefcase className="h-4 w-4" />}
          error={errors.designation?.message}
          {...register("designation", {
            required: "Designation is required",
            minLength: { value: 2, message: "Must be at least 2 characters" },
            maxLength: { value: 100, message: "Cannot exceed 100 characters" },
          })}
        />

        <Input
          label="Joining Date"
          type="date"
          required
          leftIcon={<HiCalendar className="h-4 w-4" />}
          error={errors.joiningDate?.message}
          {...register("joiningDate", { required: "Joining date is required" })}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" isLoading={isSubmitting} size="md">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}