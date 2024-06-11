const chatService = require('../services/chat.service')

module.exports = {
  getChatHistory,
  saveChat,
  updateChat,
  saveBulkChatHistory,
  saveChatHistory,
  getChatDataTable,
  getChatHistoryByAgent,
  getChatHistoryByChatId,
  downloadChatHistoryByChatId,
  emailChatTranscript,
  downloadChatTranscript,
  getCustomerListByAgent,
  getCustomerChatHistoryByAgent,
  markChatAsDone,
  rateChat,
  getChatHistoryFromLastMessageIdForCustomer,
  getChatHistoryFromLastMessageIdForAgent
}

function getChatHistoryFromLastMessageIdForCustomer(req, res, next) {
  chatService
    .getChatHistoryFromLastMessageIdForCustomer(req)
    .then(chat => res.json(chat))
    .catch(err => next(err))
}

function getChatHistoryFromLastMessageIdForAgent(req, res, next) {
  chatService
    .getChatHistoryFromLastMessageIdForAgent(req)
    .then(chat => res.json(chat))
    .catch(err => next(err))
}

function getCustomerListByAgent(req, res, next) {
  chatService
    .getCustomerListByAgent(req)
    .then(chat => res.json(chat))
    .catch(err => next(err))
}

function markChatAsDone(req, res, next) {
  chatService
    .markChatAsDone(req)
    .then(chat => res.json(chat))
    .catch(err => next(err))
}

function getCustomerChatHistoryByAgent(req, res, next) {
  chatService
    .getCustomerChatHistoryByAgent(req)
    .then(chat => res.json(chat))
    .catch(err => next(err))
}

function getChatHistory(req, res, next) {
  chatService
    .getChatHistory(req.body)
    .then(chat => res.json(chat))
    .catch(err => next(err))
}

function getChatHistoryByAgent(req, res, next) {
  chatService
    .getChatHistoryByAgent(req.body)
    .then(chat => res.json(chat))
    .catch(err => next(err))
}

function getChatHistoryByChatId(req, res, next) {
  chatService
    .getChatHistoryByChatId(req)
    .then(chat => res.json(chat))
    .catch(err => next(err))
}

function downloadChatHistoryByChatId(req, res, next) {
  return chatService.downloadChatHistoryByChatId(req, res)
}

function emailChatTranscript(req, res, next) {
  chatService
    .emailChatTranscript(req)
    .then(chat => res.json(chat))
    .catch(err => next(err))
}

function downloadChatTranscript(req, res, next) {
  return chatService.downloadChatHistoryByChatId(req, res)
}

function saveChat(req, res, next) {
  chatService
    .saveChat(req.body)
    .then(chat => (chat ? res.json(chat) : res.sendStatus(500)))
    .catch(err => next(err))
}

function updateChat(req, res, next) {
  chatService
    .updateChat(req.body)
    .then(() => res.json())
    .catch(err => next(err))
}

function rateChat(req, res, next) {
  chatService
    .updateChat(req.body)
    .then(() => res.json())
    .catch(err => next(err))
}

function saveBulkChatHistory(req, res, next) {
  chatService
    .saveBulkChatHistory(req.body)
    .then(() => res.json())
    .catch(err => next(err))
}

function saveChatHistory(req, res, next) {
  chatService
    .saveChatHistory(req.body)
    .then(chat => res.json(chat))
    .catch(err => next(err))
}

function getChatDataTable(req, res, next) {
  chatService
    .getChatDataTable(req)
    .then(chats => {
      res.json(chats)
    })
    .catch(err => next(err))
}
