var moment = require('moment')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../mongo/db')
const emailService = require('./email.service')
const mapper = require('../helpers/mapper')

const User = db.User
const Department = db.Department
module.exports = {
  authenticate,
  getById,
  resetPassword,
  changePassword,
  forceChangePassword,
  approveUser,
  blockUser,
  unblockUser,
  createUser,
  updateUser,
  getUserDataTable,
  getUserListByType
}

async function authenticate(req) {
  const secret = process.env.JWT_KEY
  const body = req.body
  const user = await User.findOne({
    staffId: body.staffId,
    type: body.sourcePortal
  }).populate('departments')
  if (user && bcrypt.compareSync(body.password, user.password)) {
    if (user.status !== 'APPROVED') {
      throw 'Your account is inactive'
    }
    if (user.isBlocked) {
      throw 'Your account is blocked'
    }
    var departmentName = ''
    var departmentIds = ''
    const today = moment().format('dddd')
    var m = moment(new Date())
    var minutes = m.hour() * 60 + m.minute()
    var blockUser = true
    user.departments.forEach(function(department) {
      var operationHrs = department.openingDetails.filter(
        c => c.day === today && c.isActive === true
      )
      if (operationHrs.length > 0) {
        if (
          minutes >= operationHrs[0].openingTime &&
          minutes <= operationHrs[0].closingTime
        ) {
          blockUser = false
          departmentName += '|' + department.name
          departmentIds += '|' + department._id
        }
      }
    })
    if (blockUser && user.type === 'Agent') {
      throw 'You cannot login at the moment. Please check the opening/closing time of your department '
    }
    departmentName = departmentName.slice(1)
    departmentIds = departmentIds.slice(1)
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        departmentIds: departmentIds
      },
      secret,
      {
        expiresIn: '24h'
      }
    )
    user.currentJwtToken = token
    await user.save()
    return {
      name: user.name,
      staffId: user.staffId,
      email: user.email,
      picture: user.picture,
      token: token,
      id: user._id,
      departmentName: departmentName,
      departmentIds: departmentIds,
      forceChangePassword:
        user.forceChangePassword === undefined
          ? false
          : user.forceChangePassword
    }
  } else {
    throw 'StaffId or password is incorrect'
  }
}

async function getById(id) {
  const user = await User.findById(id)
  return {
    name: user.name,
    staffId: user.staffId,
    email: user.email,
    picture: user.picture,
    type: user.type,
    icNumber: user.icNumber,
    departments: user.departments,
    chatThreshold: user.chatThreshold,
    id: user._id,
    status: user.status,
    isBlocked: user.isBlocked,
    currentJwtToken: user.currentJwtToken,
    displayName: user && user.displayName ? user.displayName : ''
  }
}

async function resetPassword(req) {
  const body = req.body
  const user = await User.findById(body.userId)
  if (user) {
    user.password = bcrypt.hashSync(body.password, 10)
    user.forceChangePassword = true
    user.modifiedDate = new Date()
    user.modifiedBy = req.auth.sub
    await user.save()
    emailService.resetPassword({
      customerName: user.name,
      staffId: user.staffId,
      password: body.password,
      email: user.email
    })
  } else {
    throw 'Invalid User!'
  }
}

async function changePassword(req) {
  const body = req.body
  if (body.oldPassword === body.password) {
    throw 'Head’s Up! Old and new password cant be reuse again.'
  }
  const user = await User.findById(req.auth.sub)
  if (user && bcrypt.compareSync(body.oldPassword, user.password)) {
    user.password = bcrypt.hashSync(body.password, 10)
    user.forceChangePassword = false
    await user.save()
    emailService.resetPasswordSuccess({
      customerName: user.name,
      email: user.email
    })
  } else {
    throw 'Invalid Old Password!'
  }
}

async function forceChangePassword(req) {
  const body = req.body
  const secret = process.env.JWT_KEY
  if (body.oldPassword === body.password) {
    throw 'Head’s Up! Old and new password cant be reuse again.'
  }
  const user = await User.findById(req.auth.sub).populate('departments')
  if (user && bcrypt.compareSync(body.oldPassword, user.password)) {
    var departmentName = ''
    var departmentIds = ''
    user.departments.forEach(function(department) {
      departmentName += '|' + department.name
      departmentIds += '|' + department._id
    })
    departmentName = departmentName.slice(1)
    departmentIds = departmentIds.slice(1)

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        departmentIds: departmentIds
      },
      secret,
      {
        expiresIn: '24h'
      }
    )
    user.password = bcrypt.hashSync(body.password, 10)
    user.forceChangePassword = false
    user.currentJwtToken = token
    await user.save()
    emailService.resetPasswordSuccess({
      customerName: user.name,
      email: user.email
    })

    return {
      name: user.name,
      staffId: user.staffId,
      email: user.email,
      picture: user.picture,
      token: token,
      id: user._id,
      departmentName: departmentName,
      departmentIds: departmentIds,
      forceChangePassword: user.forceChangePassword
    }
  } else {
    throw 'Invalid Old Password!'
  }
}

async function blockUser(req) {
  const body = req.body
  const user = await User.findById(body.userId)
  if (user) {
    user.isBlocked = true
    user.modifiedDate = new Date()
    user.modifiedBy = req.auth.sub
    await user.save()
  } else {
    throw 'Invalid User!'
  }
}

async function unblockUser(req) {
  const body = req.body
  const user = await User.findById(body.userId)
  if (user) {
    user.isBlocked = false
    user.modifiedDate = new Date()
    user.modifiedBy = req.auth.sub
    await user.save()
  } else {
    throw 'Invalid User!'
  }
}

async function approveUser(req) {
  const body = req.body
  const user = await User.findById(body.userId)
  if (user) {
    if (user.modifiedBy.equals(req.auth.sub)) {
      throw 'You cannot approve this user!'
    }
    user.isBlocked = false
    user.status = 'APPROVED'
    user.modifiedDate = new Date()
    user.modifiedBy = req.auth.sub
    await user.save()
  } else {
    throw 'Invalid User!'
  }
}

async function createUser(req) {
  const body = req.body
  const existingUser = await User.find().or([
    { email: body.email },
    { staffId: body.staffId }
  ])
  if (existingUser.length > 0) {
    throw 'Dublicate email or staff Id'
  }
  var departments = []
  body.departments.forEach(c => {
    departments.push({ _id: c })
  })
  const user = new User({
    name: body.name,
    staffId: body.staffId,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    type: body.type,
    status: 'VERIFIED',
    forceChangePassword: true,
    modifiedDate: new Date(),
    modifiedBy: req.auth.sub,
    isBlocked: false,
    icNumber: body.icNumber,
    chatThreshold: body.chatThreshold,
    departments: departments,
    displayName: body.displayName
  })
  if (body.customerImage) {
    user.picture = body.customerImage
  }
  await user.save()
  await emailService.createAccountEmail({
    customerName: body.name,
    staffId: body.staffId,
    password: body.password,
    email: body.email
  })
}

async function updateUser(req) {
  const body = req.body
  const existingUser = await User.find({
    _id: { $ne: body.id },
    $or: [{ email: body.email }, { staffId: body.staffId }]
  })
  if (existingUser.length > 0) {
    throw 'Dublicate email or staff Id'
  }
  var departments = []
  body.departments.forEach(c => {
    departments.push({ _id: c })
  })
  const user = await User.findById(body.id)
  if (!user) {
    throw 'Invalid user'
  }
  user.name = body.name
  user.staffId = body.staffId
  user.email = body.email
  user.type = body.type
  user.modifiedDate = new Date()
  user.modifiedBy = req.auth.sub
  user.icNumber = body.icNumber
  user.chatThreshold = body.chatThreshold
  user.departments = departments
  user.displayName = body.displayName
  if (body.customerImage) {
    user.picture = body.customerImage
  }
  await user.save()
}

async function getUserDataTable(req) {
  var body = mapper.kendoMapper(req.body)
  var query = {}
  query.skip = body.skip
  query.limit = body.take
  var departmentsList = []
  if (body.filter.hasOwnProperty('departments')) {
    departmentsList = await Department.find({ name: body.filter.departments }, [
      'id'
    ])
    body.filter.departments = { $in: departmentsList }
  }
  var totalCount = await User.estimatedDocumentCount({})
  if (req.auth.departmentIds !== '') {
    const departmentList = req.auth.departmentIds.split('|')
    if (departmentList.length > 0) {
      body.filter['departments'] = departmentList
    }
  }
  var data = await User.find(body.filter, {}, query)
    .sort(body.sort)
    .populate('departments')
  var list = []

  for (let index = 0; index < data.length; index++) {
    const user = data[index]
    var departments = []
    user.departments.forEach(function(itemd) {
      departments.push(itemd.name)
    })
    var response = {
      name: user.name,
      id: user._id,
      email: user.email,
      departments: departments,
      isBlocked: user.isBlocked,
      status: user.status,
      staffId: user.staffId,
      type: user.type
    }
    list.push(response)
  }

  return {
    data: list,
    total: totalCount
  }
}

async function getUserListByType(type) {
  const agents = []
  const data = await User.find({ type: type })
  data.forEach(agent => {
    agents.push({
      name: agent.name,
      id: agent._id,
      departments: agent.departments
    })
  })
  return agents
}
