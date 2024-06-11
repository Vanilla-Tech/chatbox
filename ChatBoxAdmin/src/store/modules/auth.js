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
    departmentIds: '',
    id: '',
    forceChangePassword: false
  },
  title: 'ChatBox Admin',
  loader: false
}

// getters
const getters = {}

// actions
const actions = {
  login({ commit }, { staffId, password }) {
    return new Promise(resolve => {
      axios
        .post('/login', {
          staffId: staffId,
          password: password,
          sourcePortal: 'ADMIN'
        })
        .then(response => {
          if (response.data.token) {
            commit('SET_USER', response.data)
          } else {
            commit('SET_USER', null)
          }
          resolve(response)
        })
    })
  },
  forceChangePassword({ commit }, { oldPassword, password, confirmPassword }) {
    return new Promise(resolve => {
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
    })
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit('RESET')
      resolve()
    })
  },
  checkAuth({ commit, state }) {
    const env = process.env.NODE_ENV
    if (state.authUser.token !== '' && env !== 'development') {
      var promises = [axios.get('/checkauth')]
      return new Promise(resolve => {
        axios.all(promises).then(response => {
          resolve(response)
        })
      })
    }
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
      departmentIds: '',
      id: '',
      forceChangePassword: false
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
