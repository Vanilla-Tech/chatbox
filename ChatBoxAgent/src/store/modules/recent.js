import axios from 'axios'
import moment from 'moment'
import Vue from 'vue'

//var chatEncryptor = require('../../plugins/aes.js').default

const state = {
  customers: [],
  pageNo: 1,
  showMore: false,
  chat: {
    customerSessionId: null,
    customerId: null,
    message: '',
    lastObjectId: null,
    chatId: null
  }
}

// getters
const getters = {
  getActiveChatCustomerDetails: (state, getters) => {
    return getters.getActiveChat && getters.getActiveChat.userDetails
  },
  getMessageKeyForHistory: state => {
    //var activeCustomer= state.customers.filter(s => s.isActive === true)[0];
    return state.chat.lastObjectId // activeCustomer?activeCustomer.lastObjectId:null;
  },
  getCustomerList: state => searchKey => {
    return state.customers
      .filter(
        s => s.userDetails.email.includes(searchKey) || s.userDetails.name.includes(searchKey)
      )
      .sort((a, b) => {
        return new Date(b.lastMessageDateTime) - new Date(a.lastMessageDateTime)
      })
  },
  getActiveChat: state => {
    return state.customers.filter(s => s.isActive === true)[0]
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
  }
}

// actions
const actions = {
  fetchRecentCustomer({ commit, state }, { agentId, searchKey, resetPageNo, activeCustomerList }) {
    return new Promise((resolve, reject) => {
      if (resetPageNo) {
        commit('RESET')
      }
      axios
        .post(`/chat/customerListByAgent`, {
          agentId: agentId,
          pageNo: state.pageNo,
          searchKey: searchKey
        })
        .then(response => {
          commit('LOAD_RECENT_CUSTOMER', {
            data: response.data,
            activeCustomerList: activeCustomerList
          })
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  fetchMessageHistory({ commit, state }) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/chat/customerchathistorybyagent`, {
          customerId: state.chat.customerId,
          lastObjectId: state.chat.lastObjectId,
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
  }
}

// mutations
const mutations = {
  RESET(state) {
    state.pageNo = 1
    state.customers = []
    state.chat = {
      customerSessionId: null,
      customerId: null,
      message: '',
      lastObjectId: null,
      chatId: null
    }
  },
  LOAD_RECENT_CUSTOMER(state, { data, activeCustomerList }) {
    data.forEach(x => {
      state.showMore = x.data.length === 1
      x.data
        .filter(v => !activeCustomerList.includes(v._id.customer))
        .forEach(c => {
          const cust = {
            userDetails: {
              email: c.customerEmail.length === 0 ? '' : c.customerEmail,
              mobileNumber: c.customerMobileNumber.length === 0 ? '' : c.customerMobileNumber,
              name: c.customerName.length === 0 ? '' : c.customerName
            },
            lastMessageDateTime: c.endTime,
            lastObjectId: '',
            customerId: c._id.customer,
            chatHistory: [],
            messageSnippet: c.message,
            unSeenMessage: false,
            isActive: false,
            customerSessionId: c._id.customer,
            isOnline: false,
            chatId: c.maxChatId,
            status: c.status
          }
          state.customers.push(cust)
        })
    })
    state.pageNo += state.pageNo
  },
  CHANGE_ACTIVE_CHAT(state, data) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === data
    })[0]
    if (customer) {
      customer.isActive = true
      customer.unSeenMessage = false
      customer.chatHistory = []
      state.chat.customerSessionId = data
      state.chat.lastObjectId = ''
      state.chat.customerId = customer.customerId
      state.chat.chatId = customer.chatId
      state.chat.message = ''
    }
    const customers = state.customers.filter(s => {
      return s.customerSessionId !== data
    })
    for (let index = 0; index < customers.length; index++) {
      const decustomer = customers[index]
      decustomer.isActive = false
    }
  },
  LOAD_MESSAGE_HISTORY(state, data) {
    var activeCustomer = state.customers.filter(s => s.isActive === true)[0]
    data.messages.forEach(x => {
      activeCustomer.chatHistory.unshift(x)
      activeCustomer.lastObjectId = data.lastObjectId
    })
    state.chat.lastObjectId = data.lastObjectId
  },
  DONE_CUSTOMER(state) {
    const customer = state.customers.filter(s => {
      return s.customerSessionId === state.chat.customerSessionId
    })[0]
    if (customer) {
      customer.status = 'DONE_CHAT'
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
