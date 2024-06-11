import axios from 'axios'

// state
const state = {
  authUser: {
    name: '',
    status: '',
    email: '',
    picture: '',
    type: '',
    token: '',
    departmentName: '',
    id: '',
    forceChangePassword: false,
    staffId: ''
  },
  title: 'ChatBox Agent',
  loader: false
}

// getters
const getters = {}

// actions
const actions = {
  login({ commit }, { staffId, password }) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/login?staffId=${staffId}&sourcePortal=AGENT`, {
          staffId: staffId,
          password: password,
          sourcePortal: 'AGENT'
        })
        .then(response => {
          if (response.data.token) {
            commit('SET_USER', response.data)
          } else {
            commit('SET_USER', null)
          }
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  forceChangePassword({ commit }, { oldPassword, password, confirmPassword }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/forceChangePassword', {
          oldPassword: oldPassword,
          password: password,
          confirmPassword: confirmPassword
        })
        .then(response => {
          if (response.data.token) {
            commit('SET_USER', response.data)
          } else {
            commit('SET_USER', null)
          }
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit('RESET')
      resolve()
    })
  },
  setTitle({ commit }, { title }) {
    commit('SET_TITLE', title)
  },
  setLoader({ commit }, { loader }) {
    commit('SET_LOADER', loader)
  }
}

// mutations
const mutations = {
  SET_USER(state, user) {
    state.authUser = user
  },
  SET_TITLE(state, title) {
    state.title = title
  },
  SET_LOADER(state, loader) {
    state.loader = loader
  },
  RESET(state) {
    state.authUser = {
      name: '',
      status: '',
      email: '',
      picture: '',
      type: '',
      token: '',
      departmentName: '',
      id: '',
      forceChangePassword: false,
      staffId: ''
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
