var apiHelper = require('../helpers/apiHelper')
var axiosInstance = apiHelper.axiosInstance

async function getAgentByEmail(email) {
  try {
    var response = await axiosInstance.post(`/agents/findbyemail`, {
      email: email
    })
    return response.data
  } catch (error) {
    return null
  }
}

async function getAgentById(agentId) {
  try {
    var response = await axiosInstance.post(`/agents/findById`, {
      agentId: agentId
    })
    return response.data
  } catch (error) {
    return null
  }
}
module.exports = {
  getAgentById,
  getAgentByEmail
}
