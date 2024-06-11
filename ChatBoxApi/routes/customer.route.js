const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customer.controller')

const SchemaValidator = require('../middlewares/validation')

// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = SchemaValidator(true)

module.exports = function(app) {
  app.post(
    '/api/customer/save',
    validateRequest,
    customerController.saveCustomer
  )
  app.post(
    '/api/customer/addupdate',
    validateRequest,
    customerController.addAndUpdateCustomer
  )
  app.post(
    '/api/customer/departmentsave',
    validateRequest,
    customerController.saveCustomerByDepartment
  )
}
