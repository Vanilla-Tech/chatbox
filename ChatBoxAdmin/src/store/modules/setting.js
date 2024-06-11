import axios from 'axios'

// state
const state = {
  setting: {
    customer: {
      id: 0,
      maxiumLoginFailure: null,
      forceLogoutClientInstance: false,
      clientApplicationTimer: null,
      lockScreen: false,
      logOffApplication: false,
      disallowedChangeTimer: null,
      minimumPasswordLength: null,
      maximumPasswordLength: null,
      passwordExpireOnEvery: null,
      maximumPasswordAge: null,
      disallowedPasswordHistory: null,
      userMushChangePasswordOnNextLogin: false,
      alphaNumeric: false,
      passwordComplex: false,
      disallowedSequentialNumberAlphabet: false,
      disallowedCharacterRepetition: false,
      disallowedUserIdInPassword: false,
      suspendAccountAfter: null,
      deleteAccountAfter: null
    },
    agent: {
      id: 0,
      maxiumLoginFailure: null,
      forceLogoutClientInstance: false,
      clientApplicationTimer: null,
      lockScreen: false,
      logOffApplication: false,
      disallowedChangeTimer: null,
      minimumPasswordLength: null,
      maximumPasswordLength: null,
      passwordExpireOnEvery: null,
      maximumPasswordAge: null,
      disallowedPasswordHistory: null,
      userMushChangePasswordOnNextLogin: false,
      alphaNumeric: false,
      passwordComplex: false,
      disallowedSequentialNumberAlphabet: false,
      disallowedCharacterRepetition: false,
      disallowedUserIdInPassword: false,
      suspendAccountAfter: null,
      deleteAccountAfter: null
    }
  },
  title: 'Setting',
  loader: false
}

// getters
const getters = {}

// actions
const actions = {
  setSetting({ commit }) {
    return new Promise(resolve => {
      let result = {
        data: {
          customer: {
            id: 1,
            maxiumLoginFailure: 10,
            forceLogoutClientInstance: false,
            clientApplicationTimer: '20:00',
            lockScreen: false,
            logOffApplication: false,
            disallowedChangeTimer: 20,
            minimumPasswordLength: null,
            maximumPasswordLength: null,
            passwordExpireOnEvery: null,
            maximumPasswordAge: null,
            disallowedPasswordHistory: null,
            userMushChangePasswordOnNextLogin: false,
            alphaNumeric: false,
            passwordComplex: false,
            disallowedSequentialNumberAlphabet: false,
            disallowedCharacterRepetition: false,
            disallowedUserIdInPassword: false,
            suspendAccountAfter: null,
            deleteAccountAfter: null
          },
          agent: {
            id: 2,
            maxiumLoginFailure: 40,
            forceLogoutClientInstance: false,
            clientApplicationTimer: '10:00',
            lockScreen: false,
            logOffApplication: false,
            disallowedChangeTimer: null,
            minimumPasswordLength: null,
            maximumPasswordLength: null,
            passwordExpireOnEvery: null,
            maximumPasswordAge: null,
            disallowedPasswordHistory: null,
            userMushChangePasswordOnNextLogin: false,
            alphaNumeric: false,
            passwordComplex: false,
            disallowedSequentialNumberAlphabet: false,
            disallowedCharacterRepetition: false,
            disallowedUserIdInPassword: false,
            suspendAccountAfter: null,
            deleteAccountAfter: null
          }
        }
      }
      commit('SET_SETTING', result.data)
      resolve(result)
    })

    /*return new Promise(resolve => {
      axios.get('/setting/get').then(response => {
        if (response.data) {
          commit('SET_SETTING', response.data)
        } else {
          commit('SET_SETTING', null)
        }
        resolve(response)
      })
    })*/
  },
  saveSetting(
    { commit },
    {
      id,
      maxiumLoginFailure,
      forceLogoutClientInstance,
      clientApplicationTimer,
      lockScreen,
      logOffApplication,
      disallowedChangeTimer,
      minimumPasswordLength,
      maximumPasswordLength,
      passwordExpireOnEvery,
      maximumPasswordAge,
      disallowedPasswordHistory,
      userMushChangePasswordOnNextLogin,
      alphaNumeric,
      passwordComplex,
      disallowedSequentialNumberAlphabet,
      disallowedCharacterRepetition,
      disallowedUserIdInPassword,
      suspendAccountAfter,
      deleteAccountAfter
    }
  ) {
    return new Promise(resolve => {
      axios
        .post('/setting/save', {
          id: id,
          maxiumLoginFailure: maxiumLoginFailure,
          forceLogoutClientInstance: forceLogoutClientInstance,
          clientApplicationTimer: clientApplicationTimer,
          lockScreen: lockScreen,
          logOffApplication: logOffApplication,
          disallowedChangeTimer: disallowedChangeTimer,
          minimumPasswordLength: minimumPasswordLength,
          maximumPasswordLength: maximumPasswordLength,
          passwordExpireOnEvery: passwordExpireOnEvery,
          maximumPasswordAge: maximumPasswordAge,
          disallowedPasswordHistory: disallowedPasswordHistory,
          userMushChangePasswordOnNextLogin: userMushChangePasswordOnNextLogin,
          alphaNumeric: alphaNumeric,
          passwordComplex: passwordComplex,
          disallowedSequentialNumberAlphabet: disallowedSequentialNumberAlphabet,
          disallowedCharacterRepetition: disallowedCharacterRepetition,
          disallowedUserIdInPassword: disallowedUserIdInPassword,
          suspendAccountAfter: suspendAccountAfter,
          deleteAccountAfter: deleteAccountAfter
        })
        .then(response => {
          if (response.data) {
            commit('SET_USER', response.data)
          } else {
            commit('SET_USER', null)
          }
          resolve(response)
        })
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
  SET_SETTING(state, setting) {
    state.setting.agent = setting.agent
    state.setting.customer = setting.customer
  },

  SET_AGENT_DATA(state, data) {
    state.setting.agent[data.key] = data.value
  },
  SET_CUSTOMER_DATA(state, data) {
    state.setting.customer[data.key] = data.value
  },
  SET_TITLE(state, title) {
    state.title = title
  },
  SET_LOADER(state, loader) {
    state.loader = loader
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
