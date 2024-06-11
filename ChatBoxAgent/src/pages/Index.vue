<template>
  <div>
    <b-modal
      ref="forward-chat-modal"
      class="forward-chat"
      id="modal-1"
      hide-footer
      title="Forward Chat"
    >
      <forwardchat
        ref="forwarChat"
        @chatForwarded="closeModalAndDeleteForwardDetails"
        :forwardChatDetails="forwardChatDetails"
      />
    </b-modal>

    <div class="mp-head" id="mpHead">
      <div class="mph-left">
        <div
          v-if="
            ($store.state.socket.customers.length > 0 && getActiveCustomer) ||
              ($store.state.socket.chatType === 'RECENT_CHAT' &&
                getActiveChatStatus !== 'ONGOING_CHAT')
          "
          class="down-tran"
        >
          <a href="javascript:void(0);" @click="downloadTranscript">
            <i class="fas fa-arrow-down"></i>
            <span class="hide_xs">Download Transcript</span>
          </a>
        </div>
        <!--end mp-head-->

        <!-- Email Transcript -->
        <div
          v-if="
            $store.state.socket.chatType === 'ONGOING_CHAT' &&
              $store.state.socket.customers.length > 0 &&
              getActiveCustomer
          "
          class="down-tran"
        >
          <a href="javascript:void(0);" @click="EmailTranscript">
            <i class="fas fa-envelope"></i>
            <span class="hide_xs">Email Transcript</span>
          </a>
        </div>

        <div
          v-if="
            $store.state.socket.chatType === 'ONGOING_CHAT' &&
              $store.state.socket.customers.length > 0 &&
              getActiveCustomer
          "
          class="down-tran"
        >
          <a href="javascript:void(0);" v-b-modal.modal-1 @click="initiateforwardChat">
            <i class="fas fa-arrow-right"></i>
            <span class="hide_xs">Forward Chat</span>
          </a>
        </div>
        <div class="down-tran">
          <a href="javascript:void(0);" v-b-toggle.find-in-chat variant="primary">
            <i class="fas fa-search"></i> Find in Chat
          </a>
        </div>
        <!--end mp-head-->
      </div>
      <div
        v-if="
          (getActiveChatStatus === 'ONGOING_CHAT' &&
            $store.state.socket.customers.length > 0 &&
            getActiveCustomer) ||
            getActiveChatStatus === 'CLOSE_CHAT'
        "
        class="mph-right"
      >
        <!-- <div class="close-chat">
          <a href="javascript:void(0);" @click="closeChat('CLOSE_CHAT')">
            <i class="fas fa-times"></i> Close
          </a>
        </div>-->
        <div class="mark-as-done">
          <a href="javascript:void(0);" @click="closeChat('DONE_CHAT')">
            <i class="fas fa-check"></i> Mark as Done
          </a>
        </div>
      </div>

      <div
        v-show="
          $store.state.socket.chatType === 'ONGOING_CHAT' &&
            $store.state.socket.customers.length > 0 &&
            getActiveCustomer &&
            loadingHistory
        "
        class="sk-circle"
      >
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
      </div>
    </div>
    <!--end mp-head-->
    <b-collapse id="find-in-chat">
      <div class="row">
        <div class="col-2 text-right">
          <label>Search</label>
        </div>
        <div class="col-6">
          <div class="input-group">
            <input type="search" class="form-control" aria-describedby="button-addon4" />
            <div class="input-group-append" id="button-addon4">
              <button class="btn btn-outline-secondary" data-search="next">&darr;</button>
              <button class="btn btn-outline-secondary" data-search="prev">&uarr;</button>
              <button class="btn btn-outline-secondary" data-search="clear">Clear</button>
              <button
                class="btn btn-outline-danger"
                data-search="clear"
                href="javascript:void(0);"
                v-b-toggle.find-in-chat
                variant="primary"
              >✖</button>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>

    <div ref="messageBody" @click="focusChatInput" class="message-body" id="Messagebody">
      <div class="message-area">
        <div
          v-if="$store.state.socket.customers.length > 0 && getActiveCustomer"
          class="chat-started-time"
        >
          Chat started {{ formatAMPM(new Date(getActiveChatStartTime)) }} on
          {{ formatDate(getActiveChatStartTime) }}
        </div>
        <div v-if="getActiveChatCustomerDetails" class="first-msg">
          <div class="prechat-form">
            <div class="pf-header">Pre-chat Form</div>
            <div class="pf-body">
              <div class="form-group">
                <small>Name :</small>
                <label>{{ getActiveChatCustomerDetails.name }}</label>
              </div>
              <div class="form-group">
                <small>Mobile No. :</small>
                <label>{{ getActiveChatCustomerDetails.mobileNumber }}</label>
              </div>
              <div class="form-group">
                <small>Email :</small>
                <label>{{ getActiveChatCustomerDetails.email }}</label>
              </div>
            </div>
          </div>
        </div>
        <!--end message resceived-->

        <div
          v-for="(itemGroup, groupIndex) in getActiveChatLog"
          :key="`chat-${groupIndex}`"
          class="content"
        >
          <div class="date-divider">
            <span>{{ groupIndex | formatDate }}</span>
          </div>
          <div class="msg" v-for="(item, index) in itemGroup" :key="`chat-${index}`">
            <div :class="item.isAgent === true ? 'inner-msg send' : 'inner-msg received'">
              <div
                v-if="item.isFile === true"
                :class="
                  chatEncryptor.decrypt(item.message) === ''
                    ? 'uploaded-file hidden'
                    : 'uploaded-file'
                "
              >
                <a target="_blank" :href="chatEncryptor.decrypt(item.message)">
                  <i v-if="isImage(item.originalName) === false" class="fas fa-file"></i>
                  <img
                    v-if="isImage(item.originalName) && chatEncryptor.decrypt(item.message) !== ''"
                    :src="
                      isImage(item.originalName) && chatEncryptor.decrypt(item.message) !== ''
                        ? chatEncryptor.decrypt(item.message)
                        : getDataUrl(item.messageId)
                    "
                  />
                  <!-- <img v-else :src="getDataUrl(item.messageId)" /> -->
                  <span>{{ item.originalName }}</span>
                </a>
                <div class="line-loader"></div>
              </div>
              <p
                v-else
                style="white-space: pre-line"
                v-html="formattedMessage(chatEncryptor.decrypt(item.message))"
              ></p>
              <div class="seened">
                {{ formatAMPM(new Date(item.timeStamp)) }}
                <i class="fas fa-check-double"></i>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="getCustomerTyping === true && this.$store.state.socket.chatType === 'ONGOING_CHAT'"
          class="typying"
        >
          <div class="typ-wrap">
            <div class="typing_loader"></div>
          </div>
        </div>
        <!--end message area-->
        <div
          v-if="
            $store.state.socket.chatType === 'ONGOING_CHAT' &&
              $store.state.socket.customers.length > 0 &&
              getActiveCustomer
          "
          class="chat-input"
          id="chatInput"
        >
          <div :class="this.showEmoji === true ? 'emo-ji-warp show' : 'emo-ji-warp'">
            <VEmojiPicker :pack="emojisNative" labelSearch @select="addEmoji" />
          </div>

          <div v-if="$store.state.socket.customers.length > 0" class="textarea">
            <textarea
              v-model="chatMessage"
              ref="chatArea"
              rows="1"
              :placeholder="
                getConnectionStatus
                  ? 'Type a message here'
                  : 'Please check your internet connection....'
              "
              class="form-control"
              name="chatMessage"
              :readonly="!getConnectionStatus"
              @keypress="typing(true)"
              @blur="typing(false)"
              @keydown.enter.exact.prevent
              @keyup.enter.exact="sendChatMessage"
              @keydown.enter.shift.exact="addNewline"
            ></textarea>
          </div>
          <a href="javascript:void(0);" @click="toogleEmoji" class="emo-link">
            <i class="far fa-surprise"></i>
          </a>

          <div v-if="$store.state.socket.customers.length > 0" class="right-area">
            <!-- <input id="fileUpload" type="file" ref="file" hidden v-on:change="handleFileUpload()" />
            <a href="javascript:void(0)" class="attachment-link" @click="selectImage">
              <i class="fas fa-paperclip"></i>
            </a> -->
            <button
              class="btn-send"
              @click="sendChatMessage"
              :disabled="getActiveChatCustomerDetails && !getCustomerStatus"
            >Send</button>
          </div>
          <div
            v-show="errors.has('chatMessage')"
            class="help is-danger"
          >{{ errors.first('chatMessage') }}</div>
        </div>
        <!--end chat area-->
      </div>
      <!--end Message body-->
    </div>
  </div>

  <!--end message panel-->
</template>

<script>
import Vue from 'vue'
//import moment from 'moment'
import VEmojiPicker from 'v-emoji-picker'
import packData from 'v-emoji-picker/data/emojis.js'
import { chatactions } from '../helpers/applicationconstants'
import axios from 'axios'
import forwardchat from '../components/ForwardChat.vue'
import constant from '../../../ChatBoxClientVue/src/shared/constant'

var chatEncryptor = require('../plugins/aes.js').default
import mainHelper from '../helpers/mainHelper.js'
import Mark from 'mark.js'

export default {
  components: {
    forwardchat,
    VEmojiPicker
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return value
        // value = new Date(value)
        // const diffTime = Math.abs(new Date().getTime() - value.getTime())
        // var days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        // if (days == 0) return 'Today'
        // else if (days == 1) return 'Yesterday'
        // else {
        //   return value
        // }
      }
    }
  },
  data() {
    return {
      showModal: false,
      forwardChatDetails: {},
      showEmoji: false,
      loadingHistory: false,
      chatEncryptor: chatEncryptor
    }
  },
  computed: {
    emojisNative() {
      return packData
    },
    getActiveCustomer() {
      var getActiveChat = this.$store.getters['socket/getActiveChat']
      return getActiveChat != null
    },
    getMessageKeyForHistory() {
      return this.$store.getters['socket/getMessageKeyForHistory']
    },
    getActiveChatLog() {
      if (this.$store.state.socket.chatType === 'RECENT_CHAT') {
        return this.$store.getters['recent/getActiveChatLog']
      } else {
        return this.$store.getters['socket/getActiveChatLog']
      }
    },
    getActiveChatStatus() {
      if (this.$store.state.socket.chatType === 'RECENT_CHAT') {
        if (this.$store.getters['recent/getActiveChat']) {
          return this.$store.getters['recent/getActiveChat'].status
        }
        return 'ONGOING_CHAT'
      } else {
        return 'ONGOING_CHAT'
      }
    },
    getCustomerStatus() {
      return this.$store.getters['socket/getCustomerOnlineStatus']
    },
    getActiveChatCustomerDetails() {
      if (this.$store.state.socket.chatType === 'RECENT_CHAT') {
        return this.$store.getters['recent/getActiveChatCustomerDetails']
      } else {
        return this.$store.getters['socket/getActiveChatCustomerDetails']
      }
    },
    getActiveChatStartTime() {
      return this.$store.getters['socket/getActiveChatStartTime']
    },
    getConnectionStatus() {
      return this.$store.getters['socket/getConnectionStatus']
    },
    getCustomerTyping() {
      return this.$store.getters['socket/getCustomerTyping']
    },
    chatMessage: {
      get() {
        return this.$store.state.socket.chat.message
      },
      set(value) {
        this.$store.commit('socket/UPDATE_CHAT_MESSAGE', value)
      }
    }
  },
  mounted() {
    var self = this
    self.$store.commit('socket/SET_NOTIFICATION_STATUS', false)
    document.addEventListener('visibilitychange', function() {
      self.$store.commit(
        'socket/SET_NOTIFICATION_STATUS',
        document.visibilityState.toLowerCase() == 'hidden'
      )
    })
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'socket/SET_FORWARD_CHATDETAILS':
          if (state.socket.forwardChatDetails) {
            this.showModal = true
            this.forwardChatDetails = state.socket.forwardChatDetails
          } else {
            this.showModal = false
            this.forwardChatDetails = {}
          }
      }
    })
    this.$store.subscribe(mutation => {
      var self = this
      switch (mutation.type) {
        case 'socket/SET_AGENT_CHAT':
        case 'socket/SET_CUSTOMER_CHAT':
        case 'socket/SET_CUSTOMER_TYPING':
        case 'socket/CHANGE_ACTIVE_CHAT':
        case 'recent/CHANGE_ACTIVE_CHAT':
        case 'socket/SET_AGENT_IMAGE_CHAT':
        case 'socket/ADD_CUSTOMER':
        case 'socket/SET_CUSTOMER_IMAGE_CHAT':
        case 'socket/SET_UNRECEIVED_CUST_MESSAGES':
          if (self.$refs.messageBody) {
            setTimeout(function() {
              self.heightCalculate()
            }, 300)
          }
          if (mutation.type == 'socket/CHANGE_ACTIVE_CHAT') {
            if (this.$store.state.socket.chatType === 'ONGOING_CHAT') {
              if (self.$refs.chatArea) self.$refs.chatArea.focus()
            }
          }
          break
        case 'socket/ACTIVE_CHAT_CHANGED':
          if (this.$store.state.socket.chatType === 'ONGOING_CHAT') {
            this.$socket.emit(constant.socketaction.FETCHUNRECEIVEDMESSAGES, {
              isAgent: true,
              messageId: this.$store.state.socket.chat.messageId,
              customerSessionId: this.$store.state.socket.chat.messageId
            })
          }
          break
        case 'socket/LOAD_MESSAGE_HISTORY':
        case 'recent/LOAD_MESSAGE_HISTORY':
          this.loadingHistory = false
          document.getElementById('Messagebody').scrollTop = 5
          break
        case 'file/SEND_CHUNK_FILE': {
          this.$socket.emit('upload', mutation.payload)
        }
      }
    })
    this.heightCalculate()
    window.addEventListener('resize', this.heightCalculate)
    var self = this
    document
      .getElementById('Messagebody')
      .addEventListener('scroll', function() {
        if (self.$store.state.socket.chatType === 'RECENT_CHAT') {
          if (
            self.$store.getters['recent/getMessageKeyForHistory'] &&
            this.scrollTop == 0
          ) {
            self.loadingHistory = true
            self.$store.dispatch('recent/fetchMessageHistory')
          }
        } else {
          if (
            self.$store.getters['socket/getMessageKeyForHistory'] &&
            this.scrollTop == 0
          ) {
            self.loadingHistory = true
            self.$store.dispatch('socket/fetchMessageHistory')
          }
        }
      })
  },

  methods: {
    focusChatInput() {
      if (
        window
          .getSelection()
          .toString()
          .trim()
      )
        return
      if (this.$refs.chatArea) this.$refs.chatArea.focus()
    },
    getFormattedUtcDate(date) {
      date = date ? date : new Date()
      var d = date.getUTCDate()
      var M = date.getUTCMonth() + 1
      var y = date.getUTCFullYear()
      var h = date.getUTCHours()
      var m = date.getUTCMinutes()
      var s = date.getUTCSeconds()
      return (
        y +
        '-' +
        M.toString().padStart(2, '0') +
        '-' +
        d.toString().padStart(2, '0') +
        ' ' +
        h.toString().padStart(2, '0') +
        ':' +
        m.toString().padStart(2, '0') +
        ':' +
        s.toString().padStart(2, '0')
      )
    },
    padValue(value) {
      return value < 10 ? '0' + value : value
    },
    formatDate(dateVal) {
      var newDate = new Date(dateVal)
      var sMonth = this.padValue(newDate.getMonth() + 1)
      var sDay = this.padValue(newDate.getDate())
      var sYear = newDate.getFullYear()
      return sDay + '/' + sMonth + '/' + sYear
    },
    getLocalDate(utcdateString) {
      var a = utcdateString.split(/[^0-9]/)
      return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5])
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
    isImage(fileName) {
      if (!fileName) return false
      var sFileExtension = fileName
        .split('.')
        [fileName.split('.').length - 1].toLowerCase()
      var imageExtensions = ['jpeg', 'jpg', 'png']
      var image = imageExtensions.filter(c => c === sFileExtension)[0]
      if (image) {
        return true
      }
      return false
    },
    selectImage() {
      document.getElementById('fileUpload').click()
    },
    getDataUrl(messageId) {
      const dataUrl = this.$store.getters['file/getImageDataUrl'](messageId)
      return dataUrl
    },
    getBase64iMage(data) {
      return new Promise(res => {
        var reader = new FileReader()
        reader.readAsDataURL(data)
        reader.onload = function() {
          res(reader.result)
        }
      })
    },
    validateFileData(fileName, fileSize) {
      var sFileExtension = fileName
        .split('.')
        [fileName.split('.').length - 1].toLowerCase()
      if (
        sFileExtension != 'jpeg' &&
        sFileExtension != 'jpg' &&
        sFileExtension != 'png' &&
        sFileExtension != 'pdf'
      )
        return 'Invalid File Type(Supported File Types : JPEG, JPG, PNG, PDF)'
      if (fileSize > 4194304) return 'Invalid File Size(Max Size: 3 MB)'
      return null
      // if (!(sFileExtension === "jpeg"
      //   || sFileExtension === "jpg"
      //   || sFileExtension === "png"
      //   || sFileExtension === "pdf"
      // ) || fileSize > 4194304) { /// 3 mb
      //   return false;
      // }
      // return true;
    },
    handleFileUpload() {
      const that = this
      that.getBase64iMage(that.$refs.file.files[0]).then(x => {
        var validationError = that.validateFileData(
          that.$refs.file.files[0].name,
          x.length
        )
        if (validationError) {
          Vue.swal('Error', validationError, 'error')
          return
        }
        var file = {
          // file: that.$refs.file.files[0],
          originalName: that.$refs.file.files[0].name,
          messageId:
            that.$store.state.socket.chat.customerSessionId +
            this.getLocalDate(this.getFormattedUtcDate()).getTime(),
          // reader: new FileReader(),
          sent: false,
          date: this.getFormattedUtcDate(),
          dataUrl: x,
          customerSessionId: that.$store.state.socket.chat.customerSessionId
        }
        that.$store.commit('file/ADD_FILES', file)
        that.uploadChunk(file)
      })
    },
    uploadChunk(file) {
      const that = this
      var filename = file.originalName
      // file.reader.onload = function(evnt) {
      //   that.$socket.emit('upload', {
      //     name: filename,
      //     isAgent: false,
      //     data: evnt.target.result,
      //     messageId: file.messageId,
      //     customerSessionId: that.$store.state.socket.chat.customerSessionId
      //   })
      // }
      const regex = /data:.+?,/
      var selectedFile = file.dataUrl.replace(regex, '')
      that.$socket.emit('startfileupload', {
        isAgent: false,
        name: filename,
        size: selectedFile.length,
        messageId: file.messageId,
        customerSessionId: that.$store.state.socket.chat.customerSessionId,
        agentSessionId: this.$store.state.socket.agentSessionId,
        timeStamp: this.getFormattedUtcDate()
      })
      that.$store.commit('socket/SET_AGENT_IMAGE_CHAT', {
        date: file.date,
        messageId: file.messageId,
        originalName: filename
      })
    },
    formattedMessage(content) {
      // eslint-disable-next-line no-useless-escape
      let exp_match = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
      var element_content = content.replace(
        exp_match,
        "<a target='_blank' href='$1'>$1</a>"
      )
      // eslint-disable-next-line no-useless-escape
      var new_exp_match = /(^|[^\/])(www\.[\S]+(\b|$))/gim
      var new_content = element_content.replace(
        new_exp_match,
        '$1<a target="_blank" href="http://$2">$2</a>'
      )
      return mainHelper.replaceText(new_content)
    },
    getUtcToLocalDate(datestring) {
      return new Date(datestring).toString()
    },
    toogleEmoji() {
      this.showEmoji = !this.showEmoji
    },
    hideEmoji() {
      this.showEmoji = false
    },
    addNewline() {
      this.$store.commit('socket/UPDATE_CHAT_MESSAGE_EMOJI', '')
    },
    addEmoji(dataEmoji) {
      this.$store.commit('socket/UPDATE_CHAT_MESSAGE_EMOJI', dataEmoji.emoji)
    },
    sendChatMessage() {
      if (this.$store.state.socket.chat.message !== '') {
        this.showEmoji = false
        var date = this.getFormattedUtcDate()
        var messageId =
          this.$store.state.socket.chat.customerSessionId +
          this.getLocalDate(this.getFormattedUtcDate()).getTime()

        this.$socket.emit(chatactions.CHATMESSAGE, {
          agentSessionId: this.$store.state.socket.agentSessionId,
          customerSessionId: this.$store.state.socket.chat.customerSessionId,
          isAgent: true,
          message: chatEncryptor.encrypt(this.$store.state.socket.chat.message),
          messageId: messageId,
          timeStamp: date
        })
        this.$store.commit('socket/SET_AGENT_CHAT', {
          date: date,
          messageId: messageId
        })
      }
    },
    closeChat(status) {
      const that = this
      var title =
        'Are you sure, You want to ' +
        (status === 'DONE_CHAT' ? 'mark the chat as done?' : 'close the chat?')
      Vue.swal
        .fire({
          title: 'Information',
          text: title,
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText:
            status === 'DONE_CHAT' ? 'Mark As Done' : 'Close Chat'
        })
        .then(result => {
          if (result.value) {
            if (that.$store.state.socket.chatType === 'ONGOING_CHAT') {
              that.$socket.emit(chatactions.CLOSECHAT, {
                agentSessionId: that.$store.state.socket.agentSessionId,
                customerSessionId:
                  that.$store.state.socket.chat.customerSessionId,
                markAsDone: status == 'DONE_CHAT'
              })
              that.$store.commit('socket/CLOSE_CUSTOMER')
            } else {
              that.$store.commit('recent/DONE_CUSTOMER')
              that.$store.dispatch('recent/markChatAsDone')
            }
          }
        })
    },
    initiateforwardChat() {
      //this.showModal=true;
      this.$socket.emit(chatactions.INITIATETRANSFERCHAT, {
        agentSessionId: this.$store.state.socket.agentSessionId
      })
    },

    typing(flag) {
      const self = this
      //this.$store.commit('socket/SET_CHAT_TYPING')
      self.$socket.emit(chatactions.TYPING, {
        agentSessionId: self.$store.state.socket.agentSessionId,
        customerSessionId: self.$store.state.socket.chat.customerSessionId,
        isTyping: flag,
        isAgent: true
      })
      if (flag === true) {
        setTimeout(function() {
          self.$socket.emit(chatactions.TYPING, {
            agentSessionId: self.$store.state.socket.agentSessionId,
            customerSessionId: self.$store.state.socket.chat.customerSessionId,
            isTyping: false,
            isAgent: true
          })
        }, 3000)
      }
    },
    closeModal() {
      this.$refs['forward-chat-modal'].hide()
      this.$store.commit('socket/SET_FORWARD_CHATDETAILS', null)
      this.$refs.forwarChat.reinitializeForwardChat()
    },
    closeModalAndDeleteForwardDetails(data) {
      this.$refs['forward-chat-modal'].hide()
      this.$store.commit('socket/SET_FORWARD_CHATDETAILS', null)
      if (data.selectedAgent) {
        this.$socket.emit(chatactions.TRANSFERCHAT, {
          agentSessionId: this.$store.state.socket.agentSessionId,
          customerSessionId: this.$store.state.socket.chat.customerSessionId,
          transferAgentId: data.selectedAgent
            ? data.selectedAgent.split('|')[0]
            : data.selectedAgent,
          userDetails: this.$store.getters['socket/getActiveChat']
        })
      } else {
        this.$socket.emit(chatactions.TRANSFERCHATTODEPARTMENT, {
          agentSessionId: this.$store.state.socket.agentSessionId,
          customerSessionId: this.$store.state.socket.chat.customerSessionId,
          selectedDepartment: data.selectedDepartment,
          userDetails: this.$store.getters['socket/getActiveChat']
        })
      }
      this.$store.commit('socket/CLOSE_CUSTOMER', 'TRANSFER_CHAT')
    },
    heightCalculate() {
      var wHeight = window.innerHeight
      var topBar = document.getElementById('agentHeader').offsetHeight
      var mpHead = document.getElementById('mpHead').offsetHeight
      var chatInput = 0
      if (document.getElementById('chatInput'))
        chatInput = document.getElementById('chatInput').offsetHeight
      var mbody = document.getElementById('Messagebody')
      var mbodyHeight = wHeight - topBar - mpHead - chatInput
      mbody.style.height = mbodyHeight + 'px'
      mbody.scrollTop = mbody.scrollHeight
    },
    downloadTranscript() {
      var that = this
      var url = '/chat/download/'
      if (that.$store.state.socket.chatType === 'ONGOING_CHAT') {
        url = url + this.$store.state.socket.chat.chatId
      } else {
        url = url + this.$store.state.recent.chat.chatId
      }
      axios({
        url: url,
        method: 'GET',
        responseType: 'blob' // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', response.headers['filename'])
        document.body.appendChild(link)
        link.click()
      })
    },
    EmailTranscript() {
      var that = this
      var url = '/chat/emailChatTranscript/'
      if (that.$store.state.socket.chatType === 'ONGOING_CHAT') {
        var chatId = this.$store.state.socket.chat.chatId
      } else {
        var chatId = this.$store.state.recent.chat.chatId
      }
      url = url + chatId
      var res = axios.get(url).then(response => {
        var fileUrl = window.location.origin + '/downloadTranscript/' + chatId

        var agentEmail = this.$store.state.auth.authUser.email
        var agentName = this.$store.state.auth.authUser.name
        agentName = agentName.charAt(0).toUpperCase() + agentName.slice(1)
        var activeChatCustomerDetails = this.getActiveChatCustomerDetails
        var customerEmail = activeChatCustomerDetails.email
        var customerName = activeChatCustomerDetails.name
        customerName = customerName.charAt(0).toUpperCase() + agentName.slice(1)
        var subject = response.data.fileName.replace('.pdf', '')
        var cc = response.data.departmentOfflineFormEmail
        document.location =
          'mailto:' +
          customerEmail +
          '?from=' +
          agentEmail +
          '&cc=' +
          cc +
          '&subject=' +
          subject +
          '&body=Hi ' +
          customerName +
          ',%0D %0DPlease find the transcript for the chat on the link below: %0D%0D' +
          fileUrl +
          '%0D%0DRegards,%0D' +
          agentName
      })
    }
  },
  directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) {
            warn += `Found in component '${compName}'`
          }

          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },

      unbind: function(el) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  }
}

var $ = require('jquery')
$(function() {
  // the input field
  var $input = $("input[type='search']"),
    // clear button
    $clearBtn = $("button[data-search='clear']"),
    // prev button
    $prevBtn = $("button[data-search='prev']"),
    // next button
    $nextBtn = $("button[data-search='next']"),
    // the context where to search
    $content = $('.content'),
    $markContent = new Mark('.content'),
    // jQue.fry object to save <mark> elements
    $results,
    // the class that will be appended to the current
    // focused element
    currentClass = 'current',
    // top offset for the jump (the search bar)
    offsetTop = 50,
    // the current index of the focused element
    currentIndex = 0,
    // current position
    currentPosition = 0

  /**
   * Jumps to the element matching the currentIndex
   */
  function jumpTo() {
    if ($results.length) {
      var position,
        $current = $results.eq(currentIndex)
      $results.removeClass(currentClass)
      if ($current.length) {
        $current.addClass(currentClass)
        var prev_div_height = 0
        $current
          .closest('.content')
          .prevAll()
          .each(function() {
            prev_div_height += $(this).height()
          })

        var curr_div_height = 0
        $current
          .closest('.msg')
          .prevAll()
          .each(function() {
            curr_div_height += $(this).height() + 25
          })

        var offset_height = prev_div_height + curr_div_height
        document.getElementById('Messagebody').scrollTop = offset_height
      }
    }
  }

  /**
   * Searches for the entered keyword in the
   * specified context on input
   */
  $input.on('input', function() {
    var searchVal = this.value
    $markContent.unmark({
      done: function() {
        $markContent.mark(searchVal, {
          separateWordSearch: true,
          done: function() {
            $content = $('.content')
            $results = $content.find('mark')
            currentIndex = 0
            jumpTo()
          }
        })
      }
    })
  })

  /**
   * Clears the search
   */
  $clearBtn.on('click', function() {
    $markContent.unmark()
    $input.val('').focus()
  })

  /**
   * Next and previous search jump to
   */
  $nextBtn.add($prevBtn).on('click', function() {
    if ($results.length) {
      currentIndex += $(this).is($prevBtn) ? -1 : 1
      if (currentIndex < 0) {
        currentIndex = $results.length - 1
      }
      if (currentIndex > $results.length - 1) {
        currentIndex = 0
      }
      jumpTo()
    }
  })
})
</script>

<style>
mark {
  background: yellow;
}

.message-body {
  z-index: 998;
}
mark.current {
  background: orange;
}

div#find-in-chat {
  background: #fff;
  padding: 15px;
  box-shadow: 0px 2px 4px #aaa;
  z-index: 999;
  position: absolute;
  margin-top: 0 !important;
  margin-top: 0 !important;
  right: 0;
  left: 281px;
}
div#find-in-chat .btn-outline-secondary,
div#find-in-chat .btn-outline-danger {
  border-color: #ddd;
}
div#find-in-chat label {
  color: #828fac;
  margin-top: 6px;
  margin-bottom: 0;
}
</style>
