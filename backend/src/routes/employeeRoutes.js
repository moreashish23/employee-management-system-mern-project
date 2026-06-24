const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const { protect } = require("../middleware/authMiddleware");
const {
  createEmployeeValidator,
  updateEmployeeValidator,
} = require("../validators/employeeValidator");

// All routes are protected
router.use(protect);

// @route   GET  /api/employees
// @route   POST /api/employees
router
  .route("/")
  .get(getAllEmployees)
  .post(createEmployeeValidator, createEmployee);

// @route   GET    /api/employees/:id
// @route   PUT    /api/employees/:id
// @route   DELETE /api/employees/:id
router
  .route("/:id")
  .get(getEmployeeById)
  .put(updateEmployeeValidator, updateEmployee)
  .delete(deleteEmployee);

module.exports = router;