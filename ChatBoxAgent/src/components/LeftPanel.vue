<template>
  <div class="left-panel">
    <div class="panel-head">
      <div class="select">
        <select class="form-control" v-model="chatType">
          <option v-for="item in $store.state.socket.chatTypes" :key="item.key" :value="item.key">
            {{ item.value }}
          </option>
        </select>
      </div>
      <div class="search-form">
        <input
          type="text"
          name="SearchCustomer"
          class="form-control"
          placeholder="Search"
          @keyup="searchCustomer($event)"
        />
      </div>
      <div class="search-icon">
        <a href="#">
          <i class="fa fa-search"></i>
        </a>
      </div>
    </div>
    <div
      :class="
        $store.state.socket.chatType === 'ONGOING_CHAT' ? 'chat-panel' : 'chat-panel recent_chat'
      "
    >
      <div
        v-for="item in getCustomerListByChatType"
        :key="item.customerSessionId"
        :class="
          item.isActive === true
            ? 'chat-list current-chat'
            : item.unSeenMessage
            ? 'chat-list new-msg'
            : 'chat-list'
        "
      >
        <a href="javascript:void(0)" @click="changeAciveChat(item.customerSessionId)">
          <div v-if="item.status === 'ONGOING_CHAT'" class="indicator">
            <span :class="item.isOnline === true ? 'indi active' : 'indi inactive'"></span>
          </div>
          <div class="name-msg">
            <div v-if="item.userDetails && item.userDetails.name" class="name">
              {{ item.userDetails.name }}
            </div>
            <div v-else-if="item.userDetails && item.userDetails.email" class="name">
              {{ item.userDetails.email }}
            </div>
            <div v-else-if="item.userDetails && item.userDetails.mobileNumber" class="name">
              {{ item.userDetails.mobileNumber }}
            </div>
            <div v-else class="name">Anonymous user</div>
            <div class="msg">{{ chatEncryptor.decrypt(item.messageSnippet) }}</div>
          </div>
          <div class="time">
            <span
              v-if="item.status !== 'ONGOING_CHAT'"
              :class="
                item.status === 'ONGOING_CHAT' ? 'chat-lbl' : 'chat-lbl ' + getStatus(item.status)
              "
              >{{ getStatus(item.status) }}</span
            >
            <span>{{ formatAMPM(new Date(item.lastMessageDateTime)) }}</span>
          </div>
        </a>
      </div>
      <button
        v-if="$store.state.recent.showMore && $store.state.socket.chatType === 'RECENT_CHAT'"
        @click="loadMoreCustomer"
      >
        Show More
      </button>
      <!--end Chat list-->
    </div>
    <!--end Chat panel-->
  </div>
  <!--end chat panel-->
</template>

<script>
var chatEncryptor = require('../plugins/aes.js').default
export default {
  data() {
    return { chatEncryptor: chatEncryptor }
  },
  computed: {
    getCustomerListByChatType() {
      if (this.$store.state.socket.chatType === 'RECENT_CHAT') {
        return this.$store.getters['recent/getCustomerList'](this.$store.state.socket.searchKey)
      } else {
        return this.$store.getters['socket/getCustomerListByChatType']
      }
    },
    chatType: {
      get() {
        return this.$store.state.socket.chatType
      },
      set(val) {
        var chatType = val
        var that = this
        that.$store.commit('socket/CHANGE_CHAT_TYPE', val)
        if (chatType === 'RECENT_CHAT') {
          var activeCustomer = that.$store.getters['socket/getActiveCustomerId']
          if (!activeCustomer) activeCustomer = []
          that.$store.dispatch('recent/fetchRecentCustomer', {
            agentId: that.$store.state.auth.authUser.id,
            searchKey: that.$store.state.socket.searchKey,
            resetPageNo: true,
            activeCustomerList: activeCustomer
          })
        }
      }
    }
  },
  methods: {
    getStatus(status) {
      if (status === 'CLOSE_CHAT') return 'Close'
      if (status === 'DONE_CHAT') return 'Done'
      else return 'Transfer'
    },
    formatAMPM(date) {
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'

      minutes = minutes < 10 ? '0' + minutes : minutes
      var strTime = hours + ':' + minutes + ' ' + ampm
      return strTime
    },
    changeAciveChat(customerSessionId) {
      const that = this
      const chatType = that.$store.state.socket.chatType
      if (chatType === 'RECENT_CHAT') {
        //that.$store.commit('socket/CHANGE_CHAT_INACTIVE')
        that.$store.commit('recent/CHANGE_ACTIVE_CHAT', customerSessionId)
        that.$store.dispatch('recent/fetchMessageHistory')
      } else {
        //that.$store.commit('recent/CHANGE_CHAT_INACTIVE')
        that.$store.commit('socket/CHANGE_ACTIVE_CHAT', customerSessionId)
        that.$store.commit('socket/ACTIVE_CHAT_CHANGED', customerSessionId)
      }
    },
    searchCustomer: function(event) {
      this.$store.commit('socket/SEARCH_CUSTOMER', event.target.value)
    },
    loadMoreCustomer: function() {
      const that = this
      var activeCustomer = that.$store.getters['socket/getActiveCustomerId']
      if (!activeCustomer) activeCustomer = []
      that.$store.dispatch('recent/fetchRecentCustomer', {
        agentId: that.$store.state.auth.authUser.id,
        searchKey: '',
        resetPageNo: false,
        activeCustomerList: activeCustomer
      })
    }
  }
}
</script>

<style></style>
