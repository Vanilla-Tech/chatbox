import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

//import store from '../store'

const debug = process.env.NODE_ENV === 'development'

Vue.use(
  new VueSocketIO({
    debug: debug,
    connection: process.env.VUE_APP_API_URL
    // vuex: {
    //   store,
    //   actionPrefix: 'SOCKET_',
    //   mutationPrefix: 'SOCKET_'
    // }
  })
)

export default {}
