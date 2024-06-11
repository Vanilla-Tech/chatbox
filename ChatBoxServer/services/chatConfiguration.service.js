var axiosInstance = require('../helpers/apiHelper').axiosInstance

async function getInAppMessages() {
  try {
    var inAppMessagesResponse = await axiosInstance.get(
      `/chatSetting/getInAppMessages`
    )
    return inAppMessagesResponse.data
  } catch (error) {
    console.log('getInAppMessages: error', error)
    return null
  }
}

module.exports = {
  getInAppMessages
}
