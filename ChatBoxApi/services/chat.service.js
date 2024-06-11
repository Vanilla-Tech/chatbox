const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const db = require('../mongo/db')
var moment = require('moment')
var _ = require('underscore')
const mapper = require('../helpers/mapper')
var aesWrapper = require('../helpers/aesWrapper')
var fs = require('fs')
var pdf = require('dynamic-html-pdf')
let ejs = require("ejs");
let htmlpdf = require("html-pdf");
let path = require("path");

Promise = require('bluebird')
mongoose.Promise = Promise

const Chat = db.Chat
const ChatHistory = db.ChatHistory
const Customer = db.Customer
const Department = db.Department
const User = db.User
const RunningNumber = db.RunningNumber

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
  getCustomerListByAgent,
  getCustomerChatHistoryByAgent,
  markChatAsDone,
  getChatHistoryFromLastMessageIdForCustomer,
  getChatHistoryFromLastMessageIdForAgent
}

async function getChatHistoryFromLastMessageIdForCustomer(req) {
  try {
    const id = req.params.id
    const history = await ChatHistory.findOne({ messageId: id })
    if (history) {
      const chatHistory = await ChatHistory.find({
        customer: history.customer,
        agent: history.agent,
        departmentCode: history.departmentCode,
        isAgentChat: true,
        _id: { $gt: history._id }
      }).sort({ _id: 1 })
      if (chatHistory.length > 0) {
        return chatHistory.map(element => {
          return {
            messageId: element.messageId,
            timeStamp: element.timeStamp,
            message: element.message,
            status: element.status,
            isAgent: element.isAgentChat,
            isChatNote: element.isChatNote,
            isFile: element.isFile,
            originalName: element.originalFileName,
            sent: true
          }
        })
      }
    }
    return []
  } catch (error) {
    return []
  }
}

async function getChatHistoryFromLastMessageIdForAgent(req) {
  const id = req.params.id
  const history = await ChatHistory.findOne({ messageId: id })
  if (history) {
    const chatHistory = await ChatHistory.find({
      customer: history.customer,
      agent: history.agent,
      departmentCode: history.departmentCode,
      isAgentChat: false,
      _id: { $gt: history._id }
    }).sort({ _id: 1 })

    if (chatHistory.length > 0) {
      return chatHistory.map(element => {
        return {
          messageId: element.messageId,
          timeStamp: element.timeStamp,
          message: element.message,
          status: element.status,
          isAgent: element.isAgentChat,
          isChatNote: element.isChatNote,
          isFile: element.isFile,
          originalName: element.originalFileName,
          sent: true
        }
      })
    }
  }
  return []
}

async function getCustomerListByAgent(req) {
  const body = req.body
  var pageNo = parseInt(body.pageNo)
  var size = 20 //parseInt(req.size)
  if (pageNo < 0 || pageNo === 0) {
    throw 'invalid page number, should start with 1'
  }
  const skip = size * (pageNo - 1)
  const limit = size

  var chatCustomerLog = await Chat.aggregate([
    {
      $match: {
        agent: ObjectId(body.agentId),
        status: { $ne: 'ONGOING_CHAT' }
      }
    },
    {
      $group: {
        _id: {
          customer: '$customer'
        },
        endTime: { $max: '$endTime' },
        status: { $max: '$status' },
        maxChatId: { $max: '$_id' },
        customerName: { $max: '$customerName' },
        customerEmail: { $max: '$customerEmail' },
        customerMobileNumber: { $max: '$customerMobileNumber' }
      }
    },
    {
      $sort: { endTime: -1 }
    },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }]
      }
    }
  ])

  for (let index = 0; index < chatCustomerLog[0].data.length; index++) {
    const element = chatCustomerLog[0].data[index]
    var custMessage = await ChatHistory.find({
      customer: element._id.customer,
      agent: body.agentId
    })
      .sort({ _id: -1 })
      .limit(1)
    if (custMessage.length > 0) {
      element['message'] = custMessage[0].message
    } else {
      element['message'] = aesWrapper.createAesMessage('')
    }
  }
  return chatCustomerLog
}

async function getChatHistory(req) {
  var pageNo = parseInt(req.pageNo)
  var size = 10 //parseInt(req.size)
  var query = {}
  if (pageNo < 0 || pageNo === 0) {
    throw 'invalid page number, should start with 1'
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  return await ChatHistory.find(
    { customerId: req.customerId, departmentCode: req.departmentCode },
    {
      message: 1,
      isAgentChat: 1,
      customerName: 1,
      agentName: 1,
      messageId: 1,
      timeStamp: 1,
      status: 1,
      originalFileName: 1,
      isFile: 1,
      _id: 0
    },
    query
  ).sort({ _id: -1 })
}

async function getChatHistoryByAgent(req) {
  var size = 10 // parseInt(req.size)
  var filter = {}
  if (req.lastObjectId) {
    if (req.isAgent) {
      filter = {
        _id: { $lt: req.lastObjectId },
        customer: req.customerId
        //departmentCode: req.departmentCode
      }
    } else {
      filter = {
        _id: { $lt: req.lastObjectId },
        customer: req.customerId,
        chat: req.chatId
        //departmentCode: req.departmentCode
      }
    }
  } else {
    filter = {
      customer: req.customerId,
      chat: req.chatId
      //departmentCode: req.departmentCode
    }
  }

  const history = await ChatHistory.find(filter)
    .limit(size)
    .sort({ _id: -1 })
  if (history.length > 0) {
    var lastObjId = history[history.length - 1]._id
    return {
      lastObjectId:
        lastObjId === req.lastObjectId ? '' : history[history.length - 1]._id,
      messages: history.map(element => {
        return {
          messageId: element.messageId,
          timeStamp: element.timeStamp,
          message: element.message,
          status: element.status,
          isAgent: element.isAgentChat,
          isChatNote: element.isChatNote,
          isFile: element.isFile,
          originalName: element.originalFileName,
          sent: true
        }
      })
    }
  } else {
    return {
      lastObjectId: '',
      messages: []
    }
  }
}

async function getCustomerChatHistoryByAgent(req) {
  const body = req.body
  var size = 10 // parseInt(req.size)
  var filter = {}
  if (body.lastObjectId) {
    filter = {
      _id: { $lt: body.lastObjectId },
      chat: { $lte: body.chatId },
      customer: body.customerId,
      agent: req.auth.sub
    }
  } else {
    filter = {
      chat: { $lte: body.chatId },
      customer: body.customerId,
      agent: req.auth.sub
    }
  }
  const history = await ChatHistory.find(filter)
    .limit(size)
    .sort({ _id: -1 })
  if (history.length > 0) {
    return {
      lastObjectId: history[history.length - 1]._id,
      messages: history.map(element => {
        return {
          messageId: element.messageId,
          timeStamp: element.timeStamp,
          message: element.message,
          status: element.status,
          isAgent: element.isAgentChat,
          isChatNote: element.isChatNote,
          isFile: element.isFile,
          originalName: element.originalFileName,
          sent: true
        }
      })
    }
  } else {
    return {
      lastObjectId: '',
      messages: []
    }
  }
}

async function getChatHistoryByChatId(req) {
  const id = req.params.id
  const history = await ChatHistory.find({ chat: id }).sort({
    _id: 1
  })
  if (history.length > 0) {
    return history.map(element => {
      return {
        messageId: element.messageId,
        timeStamp: element.timeStamp,
        message: element.message,
        status: element.status,
        isAgent: element.isAgentChat,
        isChatNote: element.isChatNote,
        customerName: element.customerName,
        agentName: element.agentName,
        isFile: element.isFile,
        originalName: element.originalFileName
      }
    })
  } else {
    return {
      messages: []
    }
  }
}

async function downloadChatHistoryOldByChatId(req, res) {
  res.contentType('text/plain')
  res.setHeader('Access-Control-Expose-Headers', 'filename')
  const id = req.params.id
  const history = await ChatHistory.find({ chat: id }).sort({
    _id: 1
  })
  const chat = await Chat.findOne({ _id: ObjectId(id) })
  res.setHeader(
    'filename',
    chat.customerName + chat.uniqueChatId.toString() + '.pdf'
  )
  var messages = []
  if (history.length > 0) {
    messages = history.map(element => {
      return {
        //messageId: element.messageId,
        timeStamp: element.timeStamp,
        message: aesWrapper.decrypt(element.message).replace(/\r?\n|\r/g, ' '),
        //status: element.status,
        isAgent: element.isAgentChat,
        isChatNote: element.isChatNote,
        customerName: element.customerName,
        agentName: element.agentName,
        isFile: element.isFile,
        originalFileName: element.originalFileName
      }
    })

    var data = {
      agentName: chat.agentName,
      customerName: chat.customerName,
      messages: messages,
      startTime: messages[0].timeStamp,
      endTime: messages[messages.length - 1].timeStamp
    }
    pdf.registerHelper('ifCond', function(v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this)
      }
      return options.inverse(this)
    })
    var filename = appRoot + '/templates/chatlog.html'
    var html = fs.readFileSync(filename, 'utf8')
    var options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm'
    }
    var document = {
      type: 'buffer',
      template: html,
      context: {
        data: data
      }
    }
    pdf
      .create(document, options)
      .then(result => {
        res.send(Buffer.from(result))
      })
      .catch(error => {
        console.error(error)
      })
  } else {
    res.send(Buffer.from(''))
  }
}

async function downloadChatHistoryByChatId(req, res) {
  res.contentType('text/plain')
  res.setHeader('Access-Control-Expose-Headers', 'filename')
  const id = req.params.id
  const history = await ChatHistory.find({ chat: id }).sort({
    _id: 1
  })
  const chat = await Chat.findOne({ _id: ObjectId(id) })
  res.setHeader(
     'filename',
     chat.customerName + chat.uniqueChatId.toString() + '.pdf'
  )
  var messages = []
  if (history.length > 0) {
    messages = history.map(element => {
      return {
        //messageId: element.messageId,
        timeStamp: element.timeStamp,
        message: aesWrapper.decrypt(element.message).replace(/\r?\n|\r/g, ' '),
        //status: element.status,
        isAgent: element.isAgentChat,
        isChatNote: element.isChatNote,
        customerName: element.customerName,
        agentName: element.agentName,
        isFile: element.isFile,
        originalFileName: element.originalFileName
      }
    })

    var dataReport = {
      agentName: chat.agentName,
      customerName: chat.customerName,
      messages: messages,
      startTime: messages[0].timeStamp,
      endTime: messages[messages.length - 1].timeStamp
    }

    var html = "";
    ejs.renderFile(path.join(__dirname, '../templates/', "chatlog.ejs"), dataReport, (err, data) => {
      if (err) {
            res.send(err);
      }
      html = data;
    });    
      
    let options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm'
    }

    var document = {
      type: 'buffer',
      template: html,
      context: {
      }
    }
    pdf
      .create(document, options)
      .then(result => {
        res.send(Buffer.from(result))
      })
      .catch(error => {
        console.error(error)
      })
    // htmlpdf.create(html, options).toBuffer(function(err, buffer){
    //   res.send(Buffer.from(buffer));
    // });

   } else {
     res.send("")
   }
}

async function emailChatTranscript(req) {
  const id = req.params.id
  const chat = await Chat.findOne({ _id: ObjectId(id) })
  const department = await Department.findOne({ _id: chat.department })
  console
  if (chat) {
    var data = {
      agentName: chat.agentName,
      customerName: chat.customerName,
      fileName: chat.customerName + chat.uniqueChatId.toString() + '.pdf',
      departmentOfflineFormEmail: department.offlineFormEmail
    }

    return data
  } else {
    return null
  }
}

async function saveChat(req) {
  const customer = await Customer.findById(req.customerId)
  const agent = await User.findById(req.agentId)
  const department = await Department.findOne({
    code: req.departmentCode
  })
  if (department && customer && agent) {
    var chatUniqueId = await createUniqueChatId()
    const chat = new Chat(req)
    chat.rating = 0
    chat.uniqueChatId = chatUniqueId
    chat.status = 'ONGOING_CHAT'
    chat.department = department._id
    chat.departmentName = department.name
    chat.agent = agent._id
    chat.agentName = agent.staffId
    chat.customer = customer._id
    chat.customerEmail = customer.email
    chat.customerName = customer.name
    chat.customerMobileNumber = customer.mobileNumber
    await chat.save()
    return {
      chatId: chat._id,
      idleTimeout: department.chatSetting.closeTime,
      chatUniqueId: chat.chatUniqueId
    }
  } else {
    throw 'Department/Agent/Customer not found'
  }
}

async function updateChat(req) {
  const chat = await Chat.findById(req.chatId)
  if (chat) {
    // copy userParam properties to user
    Object.assign(chat, req)
  } else {
    throw 'invalid chatId!'
  }
  await chat.save()
}

async function markChatAsDone(req) {
  const chat = await Chat.findById(req.body.chatId)
  if (chat) {
    // copy userParam properties to user
    chat.status = 'DONE_CHAT'
  } else {
    throw 'invalid chatId!'
  }
  await chat.save()
}

async function saveBulkChatHistory(req) {
  var bulkMessages = []
  //const firstMessage = req.messages[0]
  //const customer = await Customer.findById(firstMessage.customerId)
  //const agent = await User.findById(firstMessage.agentId)
  const chat = await Chat.findById(req.chatId)

  // const department = await Department.findOne({
  //   code: firstMessage.departmentCode
  // })
  if (customer && agent && chat && department) {
    req.messages.forEach(function(message) {
      bulkMessages.push({
        agentName: chat.agentName,
        customerName: chat.customerName,
        status: message.status,
        isAgentChat: message.isAgentChat,
        timeStamp: message.timeStamp,
        message: message.message,
        agent: chat.agent,
        customer: chat.customer,
        chatId: chat._id,
        department: chat.department,
        departmentCode: chat.departmentCode,
        messageId: message.messageId,
        isChatNote: message.isChatNote,
        isFile: message.isFile,
        originalFileName: message.originalFileName
      })
      if (bulkMessages.length === 1000) {
        ChatHistory.collection.insertMany(bulkMessages, (err, res) => {
          if (err) {
            throw 'Error while inserting data. Please retry!'
          } else {
            bulkMessages = []
          }
        })
      }
    })
    if (bulkMessages.length > 0)
      ChatHistory.collection.insertMany(bulkMessages, (err, res) => {
        if (err) {
          throw 'Error while inserting data. Please retry!'
        }
      })
  } else {
    throw 'Invalid customerId or agentId or chatId'
  }
}

async function saveChatHistory(req) {
  const chat = await Chat.findById(req.chatId)
  if (chat) {
    const chatHistory = new ChatHistory()
    chatHistory.messageId = req.messageId
    chatHistory.chat = chat._id
    chatHistory.timeStamp = new Date(req.timeStamp)
    chatHistory.agent = chat.agent
    chatHistory.agentName = chat.agentName
    chatHistory.customer = chat.customer
    chatHistory.customerName = chat.customerName
    chatHistory.message = req.message
    chatHistory.status = req.status
    chatHistory.isAgentChat = req.isAgentChat
    chatHistory.department = chat.department
    chatHistory.departmentCode = chat.departmentCode
    chatHistory.isChatNote = req.isChatNote
    chatHistory.isFile = req.isFile
    chatHistory.originalFileName = req.originalFileName
    await chatHistory.save()
    return {
      lastObjectId: chatHistory._id
    }
  } else {
    throw 'Invalid chatId'
  }
}

async function getChatDataTable(req) {
  var body = mapper.kendoMapper(req.body)
  var query = {}
  query.skip = body.skip
  query.limit = body.take
  var totalCount = await Chat.count(body.filter)
  if (body.filter.startTime) {
    var startDate =
      body.filter.startTime['$gte'].split('T')[0] + 'T00:00:00.000Z'
    var endDate = body.filter.endTime['$lte'].split('T')[0] + 'T23:59:59.999Z'
    body.filter.startTime['$gte'] = startDate
    body.filter.endTime['$lte'] = endDate
    body.filter.startTime = extend(
      {},
      body.filter.startTime,
      body.filter.endTime
    )
  }
  delete body.filter.endTime
  if (req.auth.departmentIds !== '') {
    const departmentList = req.auth.departmentIds.split('|')
    if (departmentList.length > 0) {
      body.filter['department'] = departmentList
    }
  }

  var data = await Chat.find(body.filter, {}, query).sort(body.sort)
  var list = []

  for (let index = 0; index < data.length; index++) {
    const chat = data[index]
    var response = {
      startTime: moment(chat.startTime).format('hh:mm A'),
      startDate: moment(chat.startTime).format('DD/MM/YYYY'),
      id: chat._id,
      rating: chat.rating,
      status: chat.status,
      channelCode: chat.channelCode,
      customerName: chat.customerName,
      customerEmail: chat.customerEmail,
      customerMobile: chat.customerMobileNumber,
      agentName: chat.agentName,
      departmentName: chat.departmentName,
      uniqueChatId: chat.uniqueChatId
    }
    list.push(response)
  }
  return {
    data: list,
    total: totalCount
  }
}

function extend(target) {
  var sources = [].slice.call(arguments, 1)
  sources.forEach(function(source) {
    for (var prop in source) {
      target[prop] = source[prop]
    }
  })
  return target
}

async function createUniqueChatId() {
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth()
  var number = await RunningNumber.findOne({ year: year, month: month })
  if (number) {
    number.runningNumber += 1
  } else {
    number = new RunningNumber({
      year: year,
      month: month,
      runningNumber: 1
    })
  }
  await number.save()
  const chatId =
    year.toString() +
    month.toString().padStart(2, '0') +
    number.runningNumber.toString().padStart(6, '0')

  const existingChat = await Chat.find({ uniqueChatId: chatId })
  if (existingChat.length > 0) {
    return createUniqueChatId()
  }
  return chatId
}
