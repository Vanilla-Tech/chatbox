import axios from 'axios'
// state
const state = {
  chatTypes: [
    {
      key: 'ONGOING_CHAT',
      value: 'Main Chat'
    },
    {
      key: 'CLOSE_CHAT',
      value: 'Close Chat'
    },
    {
      key: 'DONE_CHAT',
      value: 'Done Chat'
    },
    {
      key: 'TRANSFER_CHAT',
      value: 'Transfer Chat'
    }
  ]
}

// getters
const getters = {
  getChatDisplayName: (state, value) => {
    return state.chatTypes.filter(s => s.key === value)[0]
  }
}

// actions
const actions = {
  // eslint-disable-next-line no-unused-vars
  getChatLog({ commit }, { id }) {
    var promises = [axios.get('chat/' + id)]
    return new Promise(resolve => {
      axios.all(promises).then(response => {
        resolve(response)
      })
    })
  },
  downloadChatLog({ commit }, { id }) {
    var promises = [axios.get('chat/download/' + id)]
    return new Promise(resolve => {
      axios.all(promises).then(response => {
        resolve(response)
      })
    })
  }
}

// mutations
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
