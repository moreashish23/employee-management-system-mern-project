const { body } = require("express-validator");

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

const createEmployeeValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("mobileNumber")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Please enter a valid 10-digit mobile number starting with 6-9"),

  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required")
    .isIn(DEPARTMENTS)
    .withMessage(`Department must be one of: ${DEPARTMENTS.join(", ")}`),

  body("designation")
    .trim()
    .notEmpty()
    .withMessage("Designation is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Designation must be between 2 and 100 characters"),

  body("joiningDate")
    .notEmpty()
    .withMessage("Joining date is required")
    .isISO8601()
    .withMessage("Joining date must be a valid date (YYYY-MM-DD)"),
];

const updateEmployeeValidator = [
  body("fullName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("mobileNumber")
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Please enter a valid 10-digit mobile number starting with 6-9"),

  body("department")
    .optional()
    .trim()
    .isIn(DEPARTMENTS)
    .withMessage(`Department must be one of: ${DEPARTMENTS.join(", ")}`),

  body("designation")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Designation must be between 2 and 100 characters"),

  body("joiningDate")
    .optional()
    .isISO8601()
    .withMessage("Joining date must be a valid date (YYYY-MM-DD)"),
];

module.exports = { createEmployeeValidator, updateEmployeeValidator };