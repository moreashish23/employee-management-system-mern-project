const { verifyToken } = require("../utils/generateToken");
const User = require("../models/User");
const ApiResponse = require("../utils/ApiResponse");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return ApiResponse.error(
        res,
        401,
        "Access denied. No token provided. Please log in."
      );
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return ApiResponse.error(
          res,
          401,
          "Token has expired. Please log in again."
        );
      }
      return ApiResponse.error(res, 401, "Invalid token. Please log in again.");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return ApiResponse.error(
        res,
        401,
        "User associated with this token no longer exists."
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return ApiResponse.error(res, 500, "Authentication error", error.message);
  }
};

module.exports = { protect };