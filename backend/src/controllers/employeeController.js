const { validationResult } = require("express-validator");
const employeeService = require("../services/employeeService");
const ApiResponse = require("../utils/ApiResponse");

const createEmployee = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.error(res, 422, "Validation failed", errors.array());
    }

    const employee = await employeeService.createEmployee(
      req.body,
      req.user._id
    );
    return ApiResponse.success(
      res,
      201,
      "Employee created successfully.",
      { employee }
    );
  } catch (error) {
    next(error);
  }
};

const getAllEmployees = async (req, res, next) => {
  try {
    const { employees, meta } = await employeeService.getAllEmployees(req.query);
    return ApiResponse.success(
      res,
      200,
      "Employees retrieved successfully.",
      { employees },
      meta
    );
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    return ApiResponse.success(
      res,
      200,
      "Employee retrieved successfully.",
      { employee }
    );
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.error(res, 422, "Validation failed", errors.array());
    }

    const employee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );
    return ApiResponse.success(
      res,
      200,
      "Employee updated successfully.",
      { employee }
    );
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    return ApiResponse.success(res, 200, "Employee deleted successfully.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};