var moment = require('moment')
const cryptoRandomString = require('crypto-random-string')
const mongoose = require('mongoose')
const db = require('../mongo/db')
const mapper = require('../helpers/mapper')
Promise = require('bluebird')
mongoose.Promise = Promise

const Department = db.Department

async function getActiveDepartmentByDepartmentCode(req) {
  const department = await Department.findOne({
    code: req.code,
  })

  if (department) {
    const today = moment().format('dddd')
    var operationHrs = department.openingDetails.filter(
      (c) => c.day === today && c.isActive === true
    )
    if (operationHrs.length > 0) {
      var m = moment(new Date())
      var minutes = m.hour() * 60 + m.minute()
      if (
        minutes >= operationHrs[0].openingTime &&
        minutes <= operationHrs[0].closingTime
      ) {
        if (req.channelCode !== 'PORTAL') {
          department.preChatForm.email = true
          department.preChatForm.isEmailRequired = false
          department.preChatForm.mobile = true
          department.preChatForm.isMobileNumberRequired = false
          department.preChatForm.name = true
          department.preChatForm.isNameRequired = false
        }
        return {
          name: department.name,
          code: department.code,
          displayName: department.displayName,
          openingTime: operationHrs[0].openingTime,
          closingTime: operationHrs[0].closingTime,
          preChatForm: department.preChatForm,
          offlineForm: department.offlineForm,
          offlineFormMessage: department.offlineFormMessage,
          announcementBanner: department.announcementBanner,
        }
      } else {
        throw 'No active Departments'
      }
    } else {
      throw 'No active Departments'
    }
  } else {
    throw 'No active Departments'
  }
}

async function getDepartmentByDepartmentCode(req) {
  const department = await Department.findOne({
    code: req.code,
  })

  if (department) {
    const today = moment().format('dddd')
    var operationHrs = department.openingDetails.filter((c) => c.day === today)
    if (operationHrs.length > 0) {
      if (req.channelCode !== 'PORTAL') {
        department.preChatForm.email = true
        department.preChatForm.isEmailRequired = false
        department.preChatForm.mobile = true
        department.preChatForm.isMobileNumberRequired = false
        department.preChatForm.name = true
        department.preChatForm.isNameRequired = false
      }
      return {
        name: department.name,
        code: department.code,
        displayName: department.displayName,
        openingTime: operationHrs[0].openingTime,
        closingTime: operationHrs[0].closingTime,
        preChatForm: department.preChatForm,
        offlineForm: department.offlineForm,
        offlineFormMessage: department.offlineFormMessage,
        announcementBanner: department.announcementBanner,
      }
    } else {
      throw 'No active Departments'
    }
  } else {
    throw 'No active Departments'
  }
}

async function getDepartmentList(req) {
  const departments = []
  var filter = {}
  if (req.auth.departmentIds !== '') {
    const departmentList = req.auth.departmentIds.split('|')
    if (departmentList.length > 0) {
      filter['_id'] = departmentList
    }
  }
  const data = await Department.find(filter)
  data.forEach((depart) => {
    departments.push({ name: depart.name, id: depart._id })
  })
  return departments
}

async function getDepartmentDataTable(req) {
  var body = mapper.kendoMapper(req.body)
  var query = {}
  query.skip = body.skip
  query.limit = body.take

  var totalCount = await Department.estimatedDocumentCount({})

  if (req.auth.departmentIds !== '') {
    const departmentList = req.auth.departmentIds.split('|')
    if (departmentList.length > 0) {
      body.filter['_id'] = departmentList
    }
  }
  var data = await Department.find(body.filter, {}, query).sort(body.sort)
  var list = []
  for (let index = 0; index < data.length; index++) {
    const department = data[index]
    var response = {
      name: department.name,
      id: department._id,
      code: department.code,
      displayName: department.displayName,
      isBlocked: department.isBlocked,
      status: department.status,
    }
    list.push(response)
  }
  return {
    data: list,
    total: totalCount,
  }
}

async function blockDepartment(req) {
  const body = req.body
  const department = await Department.findById(body.departmentId)
  if (department) {
    department.isBlocked = true
    department.modifiedDate = new Date()
    department.modifiedBy = req.auth.sub
    await department.save()
  } else {
    throw 'Invalid Department!'
  }
}

async function unblockDepartment(req) {
  const body = req.body
  const department = await Department.findById(body.departmentId)
  if (department) {
    department.isBlocked = false
    department.modifiedDate = new Date()
    department.modifiedBy = req.auth.sub
    await department.save()
  } else {
    throw 'Invalid Department!'
  }
}

async function uniqueCode() {
  const random = cryptoRandomString(10)

  const existingDepartment = await Department.find({ code: random })
  if (existingDepartment.length > 0) {
    return uniqueCode()
  }
  return random.toUpperCase()
}

async function createDepartment(req) {
  const body = req.body
  const department = new Department(body)
  const code = await uniqueCode()
  department.code = code
  department.modifiedDate = new Date()
  department.modifiedBy = req.auth.sub
  department.status = 'ACTIVE'
  department.isBlocked = false
  if (body.chatSetting.uniqueIdentifier === 'EMAIL') {
    if (body.preChatForm.isEmailRequired === false) {
      throw 'Email is required'
    }
  } else {
    if (body.preChatForm.isMobileNumberRequired === false) {
      throw 'Mobile Number is required'
    }
  }
  await department.save()
  return department._id
}

async function updateDepartment(req) {
  const body = req.body
  const department = await Department.findById(body.id)
  Object.assign(department, body)
  department.modifiedDate = new Date()
  department.modifiedBy = req.auth.sub
  if (body.chatSetting.uniqueIdentifier === 'EMAIL') {
    if (body.preChatForm.isEmailRequired === false) {
      throw 'Email is required'
    }
  } else {
    if (body.preChatForm.isMobileNumberRequired === false) {
      throw 'Mobile Number is required'
    }
  }
  await department.save()
  return department._id
}

async function getByIdDepartment(req) {
  const department = await Department.findById(req.params.id)
  if (!department) {
    throw 'Department not found'
  }
  return department
}

module.exports = {
  getDepartmentByDepartmentCode,
  getActiveDepartmentByDepartmentCode,
  getDepartmentList,
  getDepartmentDataTable,
  blockDepartment,
  unblockDepartment,
  createDepartment,
  updateDepartment,
  getByIdDepartment,
}
