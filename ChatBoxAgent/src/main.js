import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2'
import BootstrapVue from 'bootstrap-vue'
import VueLodash from 'vue-lodash'

import App from './App.vue'
import router from './router'
import axios from './plugins/axios'
import store from './store'
import socket from './plugins/socket'
import './registerServiceWorker'
import vSelect from 'vue-select'
import Default from './layouts/default.vue'
import None from './layouts/none.vue'

import { chatactions } from './helpers/applicationconstants'

Vue.component('default-layout', Default)
Vue.component('none-layout', None)
Vue.component('v-select', vSelect)

Vue.use(VeeValidate)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(VueLodash)
Vue.use(require('vue-moment'))
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import notificationHelper from './helpers/notificationHelper'

Vue.config.productionTip = false

new Vue({
  sockets: {
    connect: function() {
      if (this.$store.state.socket.agentSessionId) {
        this.$socket.emit(chatactions.UPDATEAGENT, {
          agentSessionId: this.$store.state.socket.agentSessionId
        })
      }
      if (this.$store.state.socket.chat.latestMessageId) {
        this.$socket.emit(chatactions.FETCHUNRECEIVEDMESSAGES, {
          isAgent: true,
          messageId: this.$store.state.socket.chat.latestMessageId,
          customerSessionId: this.$store.state.socket.chat.customerSessionId
        })
      }
      this.$store.commit('socket/SET_CONNECTION_STATUS', true)
    },
    loginsuccess: function(data) {
      this.$store.commit('socket/SET_SESSION_ID', data)
    },
    agentsessionexists: function() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$store.commit('socket/RESET')
        this.$router.push('/login')
      })
    },
    disconnect: function() {
      this.$store.commit('socket/SET_CONNECTION_STATUS', false)
    },
    reconnecting: function() {
      this.$store.commit('socket/SET_CONNECTION_STATUS', false)
    },
    reconnect: function() {
      if (this.$store.state.socket.agentSessionId) {
        this.$socket.emit(chatactions.UPDATEAGENT, {
          agentSessionId: this.$store.state.socket.agentSessionId
        })
      }
      this.$store.commit('socket/SET_CONNECTION_STATUS', true)
      // if(this.$store.state.chat.latestMessageId)
      // {
      //   this.$socket.emit(chatactions.FETCHUNRECEIVEDMESSAGES,{isAgent:true,messageId:this.$store.state.chat.latestMessageId})
      // }
    },
    chatmessage: function(data) {
      //notificationHelper.showNotification("test","test");
      //var notification=new Notification("test",{body:"new"});
      //  this.$store.commit('socket/SET_CUSTOMER_CHAT', data)
      this.$store.dispatch('socket/setCustomerChat', { data })
    },
    imagemessage: function(data) {
      this.$store.commit('socket/SET_CUSTOMER_ATTACHMENT', data)
    },
    bulkchatmessage: function(data) {
      this.$store.commit('socket/SET_BULK_CHAT', data)
    },
    confirmclosechat: function() {
      //this.$store.commit('socket/CLOSE_CUSTOMER', 'CLOSE_CHAT')
    },
    customerdisconnected: function(data) {
      this.$store.commit('socket/DISCONNECT_CUSTOMER', data)
    },
    useradded: function(data) {
      //  this.$store.commit('socket/ADD_CUSTOMER', data)
      this.$store.dispatch('socket/addCustomer', { data })
    },
    typing: function(data) {
      this.$store.commit('socket/SET_CUSTOMER_TYPING', data)
    },
    customeronlinestatus: function(data) {
      this.$store.commit('socket/SET_CUSTOMER_ONLINESTATUS', data)
    },
    initiatetransferchatack: function(data) {
      this.$store.commit('socket/SET_FORWARD_CHATDETAILS', data)
    },
    newusertransferred: function(data) {
      this.$store.commit('socket/ADD_TRANSERRED_CUSTOMER', data)
    },
    transfersuccesful: function(data) {
      this.$store.commit('socket/TRANSFER_CUSTOMER', data)
    },
    moredata: function(data) {
      this.$store.dispatch('file/sendChunkFile', { data })
    },
    inappmessage: function(data) {
      this.$store.commit('socket/SET_IN_APP_MESSAGE', data)
    },
    fileuploaded: function(data) {
      if (!data.isAgent) {
        //this.$store.commit('socket/SET_CUSTOMER_IMAGE_CHAT', data)
        this.$store.dispatch('socket/setCustomerImageChat', { data })
      } else {
        this.$store.commit('socket/FILE_UPLOADED', data)
        this.$store.commit('file/DELETE_FILES', data.messageId)
      }
    },
    unreceivedmessages: function(data) {
      this.$store.commit('socket/SET_UNRECEIVED_CUST_MESSAGES', data)
    }
  },
  socket,
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
