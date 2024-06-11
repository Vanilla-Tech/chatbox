const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chat.controller')

const SchemaValidator = require('../middlewares/validation')

// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = SchemaValidator(true)

module.exports = function(app) {
  app.get(
    '/api/chatforcustomer/:id',
    validateRequest,
    chatController.getChatHistoryFromLastMessageIdForCustomer
  )
  app.get(
    '/api/chatforagent/:id',
    validateRequest,
    chatController.getChatHistoryFromLastMessageIdForAgent
  )
  app.post(
    '/api/chat/chathistorybycustomer',
    validateRequest,
    chatController.getChatHistory
  )
  app.post(
    '/api/chat/chathistorybyagent',
    validateRequest,
    chatController.getChatHistoryByAgent
  )
  app.post(
    '/api/chat/customerListByAgent',
    validateRequest,
    chatController.getCustomerListByAgent
  )
  app.post(
    '/api/chat/customerchathistorybyagent',
    validateRequest,
    chatController.getCustomerChatHistoryByAgent
  )
  app.get(
    '/api/chat/:id',
    validateRequest,
    chatController.getChatHistoryByChatId
  )
  app.get(
    '/api/chat/download/:id',
    validateRequest,
    chatController.downloadChatHistoryByChatId
  )
  app.get(
    '/api/chat/emailChatTranscript/:id',
    validateRequest,
    chatController.emailChatTranscript
  )
  app.get(
    '/api/chat/downloadChatTranscript/:id',
    validateRequest,
    chatController.downloadChatTranscript
  )
  app.post('/api/chat/saveChat', validateRequest, chatController.saveChat)
  app.post('/api/chat/updateChat', validateRequest, chatController.updateChat)
  app.post('/api/chat/rateChat', validateRequest, chatController.rateChat)
  app.post(
    '/api/chat/saveBulkChatHistory',
    validateRequest,
    chatController.saveBulkChatHistory
  )
  app.post(
    '/api/chat/saveChatHistory',
    validateRequest,
    chatController.saveChatHistory
  )
  app.post(
    '/api/chat/datatable',
    validateRequest,
    chatController.getChatDataTable
  )
  app.post(
    '/api/chat/markChatAsDone',
    validateRequest,
    chatController.markChatAsDone
  )
}
