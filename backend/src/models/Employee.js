const mongoose = require("mongoose");

const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Design",
  "Support",
];

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: DEPARTMENTS,
        message: `Department must be one of: ${DEPARTMENTS.join(", ")}`,
      },
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      minlength: [2, "Designation must be at least 2 characters"],
      maxlength: [100, "Designation cannot exceed 100 characters"],
    },
    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.index({ fullName: "text", email: "text", designation: "text" });
employeeSchema.index({ department: 1 });
employeeSchema.index({ createdBy: 1 });

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;