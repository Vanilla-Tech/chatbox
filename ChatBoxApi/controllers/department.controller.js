const departmentService = require('../services/department.service')

module.exports = {
  getDepartmentByDepartmentCode,
  getActiveDepartmentByDepartmentCode,
  getDepartmentList,
  getDepartmentDataTable,
  unblockDepartment,
  blockDepartment,
  createDepartment,
  updateDepartment,
  getByIdDepartment
}

function getDepartmentByDepartmentCode(req, res, next) {
  departmentService
    .getDepartmentByDepartmentCode(req.body)
    .then(department => res.json(department))
    .catch(err => next(err))
}

function getActiveDepartmentByDepartmentCode(req, res, next) {
  departmentService
    .getActiveDepartmentByDepartmentCode(req.body)
    .then(department => res.json(department))
    .catch(err => next(err))
}

function getDepartmentList(req, res, next) {
  departmentService
    .getDepartmentList(req)
    .then(departments => {
      res.json(departments)
    })
    .catch(err => next(err))
}

function getDepartmentDataTable(req, res, next) {
  departmentService
    .getDepartmentDataTable(req)
    .then(departments => {
      res.json(departments)
    })
    .catch(err => next(err))
}

function unblockDepartment(req, res, next) {
  departmentService
    .unblockDepartment(req)
    .then(() => res.json())
    .catch(err => next(err))
}
function blockDepartment(req, res, next) {
  departmentService
    .blockDepartment(req)
    .then(() => res.json())
    .catch(err => next(err))
}
function createDepartment(req, res, next) {
  departmentService
    .createDepartment(req)
    .then(department => res.json(department))
    .catch(err => next(err))
}

function updateDepartment(req, res, next) {
  departmentService
    .updateDepartment(req)
    .then(department => res.json(department))
    .catch(err => next(err))
}

function getByIdDepartment(req, res, next) {
  departmentService
    .getByIdDepartment(req)
    .then(department => res.json(department))
    .catch(err => next(err))
}
