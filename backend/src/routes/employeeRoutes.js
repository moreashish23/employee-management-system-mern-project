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


router.use(protect);

router
  .route("/")
  .get(getAllEmployees)
  .post(createEmployeeValidator, createEmployee);

router
  .route("/:id")
  .get(getEmployeeById)
  .put(updateEmployeeValidator, updateEmployee)
  .delete(deleteEmployee);

module.exports = router;