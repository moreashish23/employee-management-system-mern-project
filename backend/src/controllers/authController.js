const { validationResult } = require("express-validator");
const authService = require("../services/authService");
const ApiResponse = require("../utils/ApiResponse");

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.error(res, 422, "Validation failed", errors.array());
    }

    const { name, email, password } = req.body;
    const result = await authService.registerUser({ name, email, password });

    return ApiResponse.success(
      res,
      201,
      "Account created successfully. Welcome!",
      result
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ApiResponse.error(res, 422, "Validation failed", errors.array());
    }

    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });

    return ApiResponse.success(res, 200, "Login successful. Welcome back!", result);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user._id);
    return ApiResponse.success(res, 200, "User profile retrieved.", { user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };