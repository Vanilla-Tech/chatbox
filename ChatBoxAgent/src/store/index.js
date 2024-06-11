import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'
import auth from './modules/auth'
import socket from './modules/socket'
import recent from './modules/recent'
import file from './modules/file'

const debug = process.env.NODE_ENV !== 'production'

// const vuexPersist = new VuexPersistence({
//   strictMode: debug, // This **MUST** be set to true
//   storage: window.localStorage,
//   reducer: state => ({ auth: state.auth }) // only save navigation module
// })
const vuexPersistSession = new VuexPersistence({
  strictMode: debug, // This **MUST** be set to true
  storage: window.sessionStorage,
  reducer: state => ({
    auth: state.auth,
    socket: state.socket
  }) // only save navigation module
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    socket,
    recent,
    file
  },
  strict: debug,
  mutations: {
    RESTORE_MUTATION: vuexPersistSession.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  plugins: [vuexPersistSession.plugin] // debug ? [createLogger()] : []
})
