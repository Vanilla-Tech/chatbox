const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");

const SchemaValidator = require("../middlewares/validation");

// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = SchemaValidator(true);

module.exports = function(app) {
  app.post(
    "/api/department/findbydepartmentcode",
    validateRequest,
    departmentController.getDepartmentByDepartmentCode
  );
  app.post(
    "/api/department/findactivebydepartmentcode",
    validateRequest,
    departmentController.getActiveDepartmentByDepartmentCode
  );
  app.get(
    "/api/department/list",
    validateRequest,
    departmentController.getDepartmentList
  );
  app.post(
    "/api/department/datatable",
    validateRequest,
    departmentController.getDepartmentDataTable
  );
  app.post(
    "/api/department/block",
    validateRequest,
    departmentController.blockDepartment
  );
  app.post(
    "/api/department/unblock",
    validateRequest,
    departmentController.unblockDepartment
  );
  app.post(
    "/api/department/create",
    validateRequest,
    departmentController.createDepartment
  );
  app.post(
    "/api/department/update",
    validateRequest,
    departmentController.updateDepartment
  );
  app.get(
    "/api/department/getbyid/:id",
    validateRequest,
    departmentController.getByIdDepartment
  );
};
