const customerService = require('../services/customer.service')

module.exports = {
  saveCustomer,
  addAndUpdateCustomer,
  saveCustomerByDepartment
}

function saveCustomer(req, res, next) {
  customerService
    .saveCustomer(req.body)
    .then(cust => res.json(cust))
    .catch(err => next(err))
}

function addAndUpdateCustomer(req, res, next) {
  customerService
    .addAndUpdateCustomer(req.body)
    .then(cust => res.json(cust))
    .catch(err => next(err))
}

function saveCustomerByDepartment(req, res, next) {
  customerService
    .saveCustomerByDepartment(req.body)
    .then(cust => res.json(cust))
    .catch(err => next(err))
}
