import axios from 'axios'
import moment from 'moment'
import Vue from 'vue'
import dateHelper from '../../helpers/helper.js'
import notificationHelper from '../../helpers/notificationHelper.js'
var chatEncryptor = require('../../plugins/aes.js').default

const state = {
  shouldShowNotification: false,
  connectionStatus: false,
  agentSessionId: null,
  isOnline: true,
  customers: [],
  searchKey: '',
  chat: {
    customerSessionId: null,
    customerId: null,
    message: '',
    lastObjectId: null,
    chatId: null,
    latestMessageId: null
  },
  forwardChatDetails: null,
  chatTypes: [
    {
      key: 'ONGOING_CHAT',
      value: 'Main Chat'
    },
    // {
    //   key: 'CLOSE_CHAT',
    //   value: 'Close Chat'
    // },
    // {
    //   key: 'DONE_CHAT',
    //   value: 'Done Chat'
    // },
    // {
    //   key: 'TRANSFER_CHAT',
    //   value: 'Transfer Chat'
    // },
    {
      key: 'RECENT_CHAT',
      value: 'Recent Chat'
    }
  ],
  chatType: 'ONGOING_CHAT'
}

// getters
const getters = {
  getMessageKeyForHistory: state => {
    //var activeCustomer= state.customers.filter(s => s.isActive === true)[0];
    return state.chat.lastObjectId // activeCustomer?activeCustomer.lastObjectId:null;
  },
  getActiveChat: state => {
    return state.customers.filter(s => s.isActive === true)[0]
  },
  getActiveChatStartTime: (state, getters) => {
    return getters.getActiveChat && getters.getActiveChat.startDateTime
  },
  getActiveChatLog: (state, getters) => {
    const chathistory = getters.getActiveChat && getters.getActiveChat.chatHistory
    if (chathistory) {
      var groupedResults = Vue._.groupBy(chathistory, chat =>
        moment(chat.timeStamp).format('DD/MM/YYYY')
      )
      return groupedResults
    }
    return chathistory

    //return getters.getActiveChat && getters.getActiveChat.chatHistory
  },
  getActiveChatCustomerDetails: (state, getters) => {
    return getters.getActiveChat && getters.getActiveChat.userDetails
  },
  getCustomerTyping: (state, getters) => {
    return getters.getActiveChat && getters.getActiveChat.isTyping
  },
  getCustomerOnlineStatus: (state, getters) => {
    return getters.getActiveChat && getters.getActiveChat.isOnline
  },
  getConnectionStatus: state => {
    return state.connectionStatus
  },
  getForwardChatDetails: state => {
    return state.forwardChatDetails
  },
  getCustomerListByChatType: state => {
    return state.customers
      .filter(
        s =>
          s.status === state.chatType &&
          (s.userDetails.email.toLowerCase().includes(state.searchKey.toLowerCase()) ||
            s.userDetails.name.toLowerCase().includes(state.searchKey.toLowerCase()))
      )
      .sort((a, b) => {
        return new Date(b.lastMessageDateTime) - new Date(a.lastMessageDateTime)
      })
  },
  getActiveCustomerId: state => {
    return state.customers
      .filter(x => x.status === 'ONGOING_CHAT')
      .map(c => {
        return c.customerId
      })
  }
}

// actions
const actions = {
  fetchMessageHistory({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/chat/chathistorybyagent`, {
          customerId: state.chat.customerId,
          lastObjectId: state.chat.lastObjectId,
          departmentCode: 'GASDGJ',
          isAgent: true,
          chatId: state.chat.chatId
        })
        .then(response => {
          commit('LOAD_MESSAGE_HISTORY', response.data)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  markChatAsDone({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/chat/markChatAsDone`, {
          chatId: state.chat.chatId
        })
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  setCustomerChat({ commit, state }, { data }) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    commit('SET_CUSTOMER_CHAT', data)
    if (customer) {
      if (state.shouldShowNotification) {
        var notification = notificationHelper.showNotification(
          `New Chat Message From ${customer.userDetails.name}`,
          chatEncryptor.decrypt(data.message)
        )
        if (notification) {
          notification.onclick = () => {
            window.focus()
            commit('CHANGE_ACTIVE_CHAT', data.customerSessionId)
          }
        }
      }
    }
  },
  setCustomerImageChat({ commit, state }, { data }) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    commit('SET_CUSTOMER_IMAGE_CHAT', data)
    if (customer) {
      if (state.shouldShowNotification) {
        var notification = notificationHelper.showNotification(
          `New Chat Message From ${customer.userDetails.name}`,
          'New File Message'
        )
        if (notification) {
          notification.onclick = () => {
            window.focus()
            commit('CHANGE_ACTIVE_CHAT', data.customerSessionId)
          }
        }
      }
    }
  },
  addCustomer({ commit, state }, { data }) {
    commit('ADD_CUSTOMER', data)

    if (state.shouldShowNotification) {
      var customerSessionId = data.customerSessionId
      var notification = notificationHelper.showNotification(
        'New Customer Online',
        `Name:${data.userDetails.name} , Email:${data.userDetails.email}, MobileNumber:${
          data.userDetails.mobileNumber
        }`
      )
      if (notification) {
        notification.onclick = () => {
          window.focus()
          commit('CHANGE_ACTIVE_CHAT', customerSessionId)
        }
      }
    }
  }
}

// mutations
const mutations = {
  RESET(state) {
    state.agentSessionId = null
    state.customers = []
    state.recentCustomers = []
    state.searchKey = ''
    state.isOnline = true
    state.chat = {
      customerSessionId: null,
      customerId: null,
      message: '',
      lastObjectId: null,
      chatId: null,
      latestMessageId: null
    }
    state.forwardChatDetails = null
    state.chatTypes = [
      {
        key: 'ONGOING_CHAT',
        value: 'Main Chat'
      },
      // {
      //   key: 'CLOSE_CHAT',
      //   value: 'Close Chat'
      // },
      // {
      //   key: 'DONE_CHAT',
      //   value: 'Done Chat'
      // },
      // {
      //   key: 'TRANSFER_CHAT',
      //   value: 'Transfer Chat'
      // },
      {
        key: 'RECENT_CHAT',
        value: 'Recent Chat'
      }
    ]
    state.chatType = 'ONGOING_CHAT'
  },
  SET_SESSION_ID(state, data) {
    state.agentSessionId = data.agentSessionId
  },
  SET_NOTIFICATION_STATUS(state, data) {
    state.shouldShowNotification = data
  },
  SET_CHAT_MESSAGE(state, data) {
    state.chat.message = data
    const customer = state.customers.filter(s => {
      return s.customerId === state.chat.customerId
    })[0]
    if (customer) {
      customer.draft = data
    }
  },
  SEARCH_CUSTOMER(state, data) {
    state.searchKey = data
  },
  SET_CUSTOMER_CHAT(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    if (customer) {
      customer.chatHistory.push({
        messageId: data.messageId,
        message: data.message,
        timeStamp: dateHelper.getLocalDate(data.timeStamp), //new Date(data.timestamp + 'Z'),
        isInAppMessage: false,
        isAgent: data.isAgent,
        isFile: false,
        originalName: ''
      })
      if (!customer.isActive) customer.unSeenMessage = true
      customer.messageSnippet = data.message
      customer.messageId = data.messageId
      customer.lastMessageDateTime = new Date()

      if (state.chat.customerId === customer.customerId) {
        state.chat.latestMessageId = data.messageId
      }
    }
  },
  SET_IN_APP_MESSAGE(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    if (customer) {
      customer.chatHistory.push({
        messageId: data.messageId,
        message: data.message,
        timeStamp: dateHelper.getLocalDate(new Date()), //new Date(data.timestamp + 'Z'),
        isInAppMessage: true,
        isAgent: false,
        isFile: false,
        originalName: ''
      })
      if (!customer.isActive) customer.unSeenMessage = true
      customer.messageSnippet = data.message
      customer.messageId = data.messageId
      customer.lastMessageDateTime = new Date()
    }
  },
  SET_CUSTOMER_ATTACHMENT(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    if (customer) {
      customer.chatHistory.push({
        messageId: data.messageId,
        message: data.message,
        timeStamp: new Date(),
        isAgent: false,
        isInAppMessage: false,
        isFile: false,
        originalName: ''
      })
      if (!customer.isActive) customer.unSeenMessage = true
      customer.messageSnippet = data.message
      customer.messageId = data.messageId
      customer.lastMessageDateTime = new Date()
    }
  },
  SET_AGENT_CHAT(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === state.chat.customerSessionId && s.isActive === true
    })[0]
    if (customer) {
      customer.chatHistory.push({
        message: chatEncryptor.encrypt(state.chat.message),
        timeStamp: dateHelper.getLocalDate(data.date), //new Date(data.date + 'Z'),
        isAgent: true,
        isInAppMessage: false,
        isFile: false,
        originalName: '',
        messageId: data.messageId
      })
      customer.messageSnippet = chatEncryptor.encrypt(state.chat.message)
      customer.lastMessageDateTime = dateHelper.getLocalDate(data.date)
      customer.messageId = data.messageId
      customer.draft = ''
      state.chat.message = ''
      state.chat.latestMessageId = data.messageId
    }
  },
  SET_CUSTOMER_IMAGE_CHAT(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    if (customer) {
      customer.chatHistory.push({
        message: data.url,
        timeStamp: dateHelper.getLocalDate(data.timeStamp), //new Date(data.timestamp + 'Z'),
        isAgent: false,
        isFile: true,
        originalName: data.originalFileName,
        messageId: data.messageId,
        isInAppMessage: false,
        sent: true
      })
      if (!customer.isActive) customer.unSeenMessage = true
      //  notificationHelper.showNotification(`New Chat Message From ${customer.userDetails.name}`, "New File Message");
      //  customer.messageSnippet = data.message
      customer.lastMessageDateTime = new Date()
    }
  },
  SET_AGENT_IMAGE_CHAT(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === state.chat.customerSessionId && s.isActive === true
    })[0]
    if (customer) {
      customer.chatHistory.push({
        message: chatEncryptor.encrypt(''),
        timeStamp: dateHelper.getLocalDate(data.date), // new Date(data.date + 'Z'),
        isAgent: true,
        isFile: true,
        isInAppMessage: false,
        originalName: data.originalName,
        messageId: data.messageId
      })
      customer.lastMessageDateTime = dateHelper.getLocalDate(data.date) // new Date(data.date + 'Z')
      customer.draft = ''
      state.chat.message = ''
      state.chat.latestMessageId = data.messageId
    }
  },
  FILE_UPLOADED(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    if (customer) {
      if (!data.isAgent) {
        var file = {
          originalName: data.originalFileName,
          messageId: data.messageId,
          // reader: new FileReader(),
          sent: true,
          date: dateHelper.getLocalDate(data.timeStamp), //new Date(data.timestamp + 'Z'),
          dataUrl: data.url,
          customerSessionId: data.customerSessionId
        }
        this.$store.commit('file/ADD_FILES', file)
        return
      }
      const message = customer.chatHistory.filter(s => {
        return s.messageId === data.messageId
      })[0]
      if (message) {
        message.message = data.url
      }
    }
  },
  ACTIVE_CHAT_CHANGED(state, data) {},
  CHANGE_ACTIVE_CHAT(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data && s.status === state.chatType
    })[0]
    if (customer) {
      customer.isActive = true
      customer.unSeenMessage = false
      state.chat.customerSessionId = data
      state.chat.lastObjectId = customer.lastObjectId
      state.chat.customerId = customer.customerId
      state.chat.latestMessageId = customer.messageId
      state.chat.message = customer.draft
      const customers = state.customers.filter(s => {
        return s.customerSessionId !== data
      })
      for (let index = 0; index < customers.length; index++) {
        const decustomer = customers[index]
        decustomer.isActive = false
      }
      const reassignCustomers = state.customers.filter(s => {
        return s.customerSessionId === data && s.status !== state.chatType
      })
      for (let index = 0; index < reassignCustomers.length; index++) {
        const decustomer = reassignCustomers[index]
        decustomer.isActive = false
      }
    }
  },
  CHANGE_CHAT_INACTIVE(state) {
    for (let index = 0; index < state.customers.length; index++) {
      const decustomer = state.customers[index]
      decustomer.isActive = false
    }
  },
  CHANGE_CHAT_TYPE(state, data) {
    state.chatType = data
    for (let index = 0; index < state.customers.length; index++) {
      const decustomer = state.customers[index]
      decustomer.isActive = false
    }
  },
  CLOSE_CUSTOMER(state) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === state.chat.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    if (customer) {
      state.customers.splice(state.customers.indexOf(customer), 1)
      state.chat = {
        customerSessionId: null,
        customerId: null,
        message: '',
        lastObjectId: null,
        chatId: null,
        latestMessageId: null
      }
      // customer.isActive = false
      // customer.isOnline = false
      // customer.isTyping = false
      // state.chat.message = ''
      // customer.status = data
    }
  },
  DONE_CUSTOMER(state) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === state.chat.customerSessionId && s.status === 'CLOSE_CHAT'
    })[0]
    if (customer) {
      state.customers.splice(state.customers.indexOf(customer), 1)
      state.chat = {
        customerSessionId: null,
        customerId: null,
        message: '',
        lastObjectId: null,
        chatId: null,
        latestMessageId: null
      }
      // customer.isActive = false
      // customer.isOnline = false
      // customer.isTyping = false
      // state.chat.message = ''
      // customer.status = 'DONE_CHAT'
    }
  },
  DISCONNECT_CUSTOMER(state, data) {
    var customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    if (customer) {
      state.customers.splice(state.customers.indexOf(customer), 1)
      state.chat = {
        customerSessionId: null,
        customerId: null,
        message: '',
        lastObjectId: null,
        chatId: null,
        latestMessageId: null
      }
      // customer.isActive = false
      // customer.isOnline = false
      // customer.isTyping = false
      // state.chat.message = ''
      // customer.status = 'CLOSE_CHAT'
    }
  },
  TRANSFER_CUSTOMER(state, data) {
    var customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    if (customer) {
      state.customers.splice(state.customers.indexOf(customer), 1)
      state.chat = {
        customerSessionId: null,
        customerId: null,
        message: '',
        lastObjectId: null,
        chatId: null,
        latestMessageId: null
      }
      // customer.isActive = false
      // customer.isOnline = false
      // customer.isTyping = false
      // state.chat.message = ''
      // customer.status = 'TRANSFER_CHAT'
    }
  },
  UPDATE_CHAT_MESSAGE(state, data) {
    state.chat.message = data
    const customer = state.customers.filter(s => {
      return s.customerId === state.chat.customerId
    })[0]
    if (customer) {
      customer.draft = data
    }
  },
  UPDATE_CHAT_MESSAGE_EMOJI(state, data) {
    state.chat.message += data
    const customer = state.customers.filter(s => {
      return s.customerId === state.chat.customerId
    })[0]
    if (customer) {
      customer.draft += data
    }
  },
  ADD_CUSTOMER(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerId === data.customerId
    })[0]
    if (customer) {
      state.customers.splice(state.customers.indexOf(customer), 1)
    }
    var chatMessages = []
    if (data.chatHistory && data.chatHistory.messages && data.chatHistory.messages.length > 0) {
      chatMessages = data.chatHistory.messages.reverse()
    }
    if (state.customers.length === 0) {
      state.chat.customerSessionId = data.customerSessionId
      state.chat.message = ''
      state.chat.customerId = data.customerId
      state.chat.lastObjectId = data.chatHistory ? data.chatHistory.lastObjectId : null
      state.chat.chatId = data.chatId
      state.chat.latestMessageId =
        chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].messageId : null
    }
    state.customers.push({
      customerSessionId: data.customerSessionId,
      userDetails: data.userDetails,
      messageSnippet: '',
      chatHistory: chatMessages,
      customerId: data.customerId,
      lastObjectId: data.chatHistory ? data.chatHistory.lastObjectId : null,
      messageId: chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].messageId : null,
      isTyping: false,
      isActive: state.customers.length === 0 ? true : false,
      isOnline: true,
      unSeenMessage: false,
      startDateTime: new Date(),
      lastMessageDateTime: new Date(),
      draft: '',
      status: 'ONGOING_CHAT',
      chatId: data.chatId
    })
  },
  SET_CUSTOMER_TYPING(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    customer.isTyping = data.isTyping
  },
  SET_CONNECTION_STATUS(state, data) {
    state.connectionStatus = data
  },
  SET_AGENT_STATUS(state, data) {
    state.isOnline = data
  },
  SET_CUSTOMER_ONLINESTATUS(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId && s.status === 'ONGOING_CHAT'
    })[0]
    if (customer) {
      customer.isOnline = data.isOnline
    }
  },

  SET_BULK_CHAT(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data.customerSessionId
    })[0]
    if (customer) {
      const messageCount = data.chats.length - 1
      for (let index = 0; index < data.chats.length; index++) {
        const chat = data.chats[index]
        customer.chatHistory.push({
          message: chat.message,
          timeStamp: new Date(),
          isAgent: false
        })
        if (index === messageCount) {
          customer.messageSnippet = chat.message
          customer.messageId = chat.messageId
          customer.lastMessageDateTime = new Date()
        }
      }
    }
  },
  SET_FORWARD_CHATDETAILS(state, data) {
    state.forwardChatDetails = data
  },
  LOAD_MESSAGE_HISTORY(state, data) {
    var activeCustomer = state.customers.filter(s => s.isActive === true)[0]
    if (activeCustomer) {
      if (data && data.messages && data.messages.length > 0) {
        data.messages.forEach(x => {
          activeCustomer.chatHistory.unshift(x)
          activeCustomer.lastObjectId = data.lastObjectId
        })
        state.chat.lastObjectId = data.lastObjectId
      }
    }
  },
  ADD_TRANSERRED_CUSTOMER(state, data) {
    var chatMessages = []
    if (data.chatHistory && data.chatHistory.messages && data.chatHistory.messages.length > 0) {
      chatMessages = data.chatHistory.messages.reverse()
    }
    if (state.customers.length === 0) {
      state.chat.customerSessionId = data.customerSessionId
      state.chat.message = ''
      state.chat.customerId = data.customerId
      state.chat.lastObjectId = data.chatHistory ? data.chatHistory.lastObjectId : null
      state.chat.chatId = data.chatId
      state.chat.latestMessageId =
        chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].messageId : null
    }
    state.customers.push({
      customerSessionId: data.customerSessionId,
      userDetails: data.userDetails.userDetails,
      messageSnippet: '',
      chatHistory: chatMessages,
      customerId: data.customerId,
      lastObjectId: data.chatHistory ? data.chatHistory.lastObjectId : null,
      messageId: chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].messageId : null,
      isTyping: false,
      isActive: state.customers.length === 0 ? true : false,
      isOnline: true,
      startDateTime: new Date(),
      lastMessageDateTime: new Date(),
      draft: '',
      status: 'ONGOING_CHAT',
      chatId: data.chatId
    })
  },
  SET_UNRECEIVED_CUST_MESSAGES(state, data) {
    var activeCustomer = state.customers.filter(
      s => s.customerSessionId == data.customerSessionId
    )[0]
    if (activeCustomer) {
      if (data && data.messages && data.messages.length > 0) {
        data.messages.forEach(x => {
          activeCustomer.chatHistory.push(x)
        })
        activeCustomer.messageId = data.messages[data.messages.length - 1].messageId
        activeCustomer.lastMessageDateTime = new Date()
        state.chat.latestMessageId = data.messages[data.messages.length - 1].messageId
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
