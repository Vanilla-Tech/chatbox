const mongoose = require('mongoose')
const db = require('../mongo/db')
Promise = require('bluebird')
mongoose.Promise = Promise

const Customer = db.Customer
const Department = db.Department
const ChatHistory = db.ChatHistory

async function saveCustomer(req) {
  // validate
  if (await Customer.findOne({ mobileNumber: req.mobileNumber })) {
    throw 'Mobile Number is already taken'
  }

  var customer = new Customer(req)
  customer.modifiedDate = new Date()
  await customer.save()
  return { customerId: customer._id }
}

async function addAndUpdateCustomer(req) {
  var customer = await Customer.findOne({ mobileNumber: req.mobileNumber })
  if (customer) {
    // copy userParam properties to user
    Object.assign(customer, req)
  } else {
    customer = new Customer(req)
  }
  customer.modifiedDate = new Date()
  await customer.save()
  return { customerId: customer._id }
}

async function saveCustomerByDepartment(req) {
  var depart = await Department.findOne({ code: req.departmentCode })
  if (!depart) {
    throw 'Department not available'
  }
  var customer = new Customer()
  if (depart.chatSetting.uniqueIdentifier === 'EMAIL') {
    if (req.email === undefined || req.email === '') {
      throw 'Email is required'
    }
    customer = await Customer.findOne({
      email: req.email,
      department: depart._id,
    })
  } else {
    if (req.mobileNumber === undefined || req.mobileNumber === '') {
      throw 'Mobile Number is required'
    }
    customer = await Customer.findOne({
      mobileNumber: req.mobileNumber,
      department: depart._id,
    })
  }
  if (customer) {
    // copy userParam properties to user
    Object.assign(customer, req)
  } else {
    customer = new Customer(req)
  }
  customer.modifiedDate = new Date()
  customer.department = depart._id
  await customer.save()

  const history = await ChatHistory.find({
    customer: customer._id,
    departmentCode: req.departmentCode,
  })
    .limit(10)
    .sort({ _id: -1 })

  if (history.length > 0) {
    return {
      customerId: customer._id,
      history: {
        lastObjectId: history[history.length - 1]._id,
        messages: history.map((x) => {
          return {
            messageId: x.messageId,
            timeStamp: x.timeStamp,
            message: x.message,
            isAgent: x.isAgentChat,
            isChatNote: x.isChatNote,
            isFile: x.isFile,
            originalName: x.originalFileName,
            sent: true,
          }
        }),
      },
    }
  } else {
    return {
      customerId: customer._id,
      history: {
        lastObjectId: '',
        messages: [],
      },
    }
  }
}

module.exports = {
  saveCustomer,
  addAndUpdateCustomer,
  saveCustomerByDepartment,
}
