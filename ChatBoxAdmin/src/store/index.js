import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'
import auth from './modules/auth'
import user from './modules/user'
import setting from './modules/setting'
import department from './modules/department'
import chat from './modules/chat'

const debug = process.env.NODE_ENV !== 'production'
const vuexPersist = new VuexPersistence({
  strictMode: debug, // This **MUST** be set to true
  storage: window.sessionStorage,
  reducer: state => ({
    auth: state.auth
  }) // only save navigation module
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    setting,
    department,
    chat
  },
  strict: debug,
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  plugins: [vuexPersist.plugin] // debug ? [createLogger()] : []
})
