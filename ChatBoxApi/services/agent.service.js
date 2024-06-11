var moment = require('moment')
const mongoose = require('mongoose')
const db = require('../mongo/db')
Promise = require('bluebird')
mongoose.Promise = Promise

const User = db.User

module.exports = {
  getAgentByEmail,
  getAgentById
}

async function getAgentByEmail(payload) {
  const agent = await User.findOne({
    email: payload.email
  }).populate('departments')
  if (agent) {
    const today = moment().format('dddd')
    var departments = []
    agent.departments.forEach(depart => {
      var operationHrs = depart.openingDetails.filter(
        c => c.day === today && c.isActive === true
      )
      if (operationHrs.length > 0) {
        var department = {
          code: depart.code,
          name: depart.name,
          displayName: depart.displayName,
          openingTime: operationHrs[0].openingTime,
          closingTime: operationHrs[0].closingTime
        }
        departments.push(department)
      }
    })
    if (departments.length === 0) {
      throw 'No departments available'
    }
    return {
      agentId: agent._id,
      name: agent.name,
      staffId: agent.staffId,
      email: agent.email,
      chatThreshold: agent.chatThreshold,
      departments: departments
    }
  } else {
    throw 'No agents found'
  }
}

async function getAgentById(payload) {
  const agent = await User.findById(payload.agentId).populate('departments')
  if (agent) {

    let agentName = agent.name
    if (agent && agent.displayName) {
      agentName = agent.displayName
    }
    const today = moment().format('dddd')
    var departments = []
    agent.departments.forEach(depart => {
      var operationHrs = depart.openingDetails.filter(
        c => c.day === today && c.isActive === true
      )
      if (operationHrs.length > 0) {
        var department = {
          code: depart.code,
          name: depart.name,
          displayName: depart.displayName,
          openingTime: operationHrs[0].openingTime,
          closingTime: operationHrs[0].closingTime
        }
        departments.push(department)
      }
    })
    if (departments.length === 0) {
      throw 'No departments available'
    }
    return {
      agentId: agent._id,
      name: agentName,
      staffId: agent.staffId,
      email: agent.email,
      chatThreshold: agent.chatThreshold,
      departments: departments
    }
  } else {
    throw 'No agents found'
  }
}
