const Employee = require("../models/Employee");

const createEmployee = async (employeeData, userId) => {
  const existing = await Employee.findOne({ email: employeeData.email });
  if (existing) {
    const error = new Error(
      `An employee with email '${employeeData.email}' already exists.`
    );
    error.statusCode = 409;
    throw error;
  }

  const employee = await Employee.create({
    ...employeeData,
    createdBy: userId,
  });

  return employee;
};

const getAllEmployees = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    department = "",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = queryParams;

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const filter = {};

  if (search && search.trim()) {
    filter.$or = [
      { fullName: { $regex: search.trim(), $options: "i" } },
      { email: { $regex: search.trim(), $options: "i" } },
      { designation: { $regex: search.trim(), $options: "i" } },
    ];
  }

  if (department && department.trim()) {
    filter.department = department.trim();
  }

  const allowedSortFields = [
    "fullName",
    "email",
    "department",
    "designation",
    "joiningDate",
    "createdAt",
  ];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
  const sortDirection = sortOrder === "asc" ? 1 : -1;
  const sortOptions = { [sortField]: sortDirection };

  const [employees, total] = await Promise.all([
    Employee.find(filter)
      .populate("createdBy", "name email")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Employee.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limitNum);

  return {
    employees,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  };
};

const getEmployeeById = async (id) => {
  const employee = await Employee.findById(id).populate(
    "createdBy",
    "name email"
  );
  if (!employee) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }
  return employee;
};

const updateEmployee = async (id, updateData) => {
  if (updateData.email) {
    const existing = await Employee.findOne({
      email: updateData.email,
      _id: { $ne: id },
    });
    if (existing) {
      const error = new Error(
        `Another employee with email '${updateData.email}' already exists.`
      );
      error.statusCode = 409;
      throw error;
    }
  }

  const employee = await Employee.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate("createdBy", "name email");

  if (!employee) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }

  return employee;
};

const deleteEmployee = async (id) => {
  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }
  return employee;
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};