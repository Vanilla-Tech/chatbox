<template>
  <div class="mm-liveChat">
    <div class="live-chat" :class="chatCollapse?'hide':''">
      <pre-chat-form
        ref="prechatform"
        :userDetails="userDetails"
        :isOffline="offlineFormActive"
        :options="options"
        v-on:onChatToggle="chatToggle"
        v-on:onResetChat="resetChat"
        :preChatFormDetails="preChatFormDetails"
        :offlineFormDetails="offlineFormDetails"
        :show="preChatFormActive || offlineFormActive"
        :socketUrl="socketUrl"
        :offlineFormText="offlineFormText"
      ></pre-chat-form>
      <card v-if="onlineFormActive" :showModal="endChatOpen" class="chatformwrapper">
        <template #header>
          <div class="lc-header">
            <span>Live Chat</span>
            <a href="javaScript:void(0);" @click="initiateDismissChat" class="close-chat">
              <img :src="socketUrl+'/images/chat-close.svg'" />
            </a>
          </div>
        </template>
        <template #afterheader>
          <div class="notic" id="announcementBanner">{{announcementBannerText}}</div>
          <message :errormessage="errormessage"></message>
        </template>
        <template #body>
          <div class="pad-b84" id="lc_conversation">
            <div
              class="lc-body-inner"
              ref="scrollBody"
              id="lc_conversationDiv"
              v-on:scroll.passive="onScroll"
            >
              <div v-show="
            loadingHistory
        " class="sk-circle">
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
              <div class="chat_end">
                <div class="ce_body">
                  <h3>End Chat</h3>
                  <p>Are you sure you would like to end this chat?</p>
                </div>
                <div class="ce_footer">
                  <a href="javascript:void(0);" @click="dismissChat">Dismiss</a>
                  <a href="javascript:void(0);" @click="endChat">End Chat</a>
                  <a href="javascript:void(0);" @click="back">Close</a>
                </div>
              </div>
              <div
                v-for="(itemGroup, groupIndex) in getGroupedMessages()"
                :key="`chat-${groupIndex}`"
                class
              >
                <div class="date-divider">
                  <span>{{groupIndex}}</span>
                </div>

                <div v-for="(item, index) in itemGroup" :key="`chat-${index}`">
                  <div
                    v-if="item.isInAppMessage"
                    class="chat-starte"
                  >{{chatEncryptor.decrypt(item.message)}}</div>
                  <div class="msg" v-if="!item.isInAppMessage">
                    <div :class="item.isAgent ? 'inner-msg received' : 'inner-msg send'">
                      <div v-if="item.isFile">
                        <div class="uploaded-file" :class="!item.sent?'hidden':''">
                          <a target="_blank" :href="chatEncryptor.decrypt(item.message)">
                            <img
                              v-if="isImage(item.originalName)"
                              :src="item.sent?chatEncryptor.decrypt(item.message):getDataUrl(item.messageId)"
                            />
                            <i v-else class="fa fa-file"></i>
                            <span>{{item.originalName}}</span>
                          </a>
                          <div class="line-loader"></div>
                        </div>
                        <div class="seened">{{item.formattedTime}}</div>
                      </div>
                      <div v-if="!item.isFile">
                        <p v-html="chatEncryptor.decrypt(item.message)"></p>
                        <div class="seened">{{item.formattedTime}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <rate
                v-if="enableRating"
                :customerSessionId="chatVariables.customerSessionId"
                v-on:onResetChat="resetChat"
              ></rate>
              <div v-if="showTyping" class="typying" id="lc_typing">
                <div class="typ-wrap">
                  <div class="typing_loader"></div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="chat-input" id="chatInput">
            <div class="textarea">
              <textarea
                ref="chatMessageInput"
                id="chatTextArea"
                :disabled="disableTyping"
                v-on:keyup="chatmessagefocus"
                @keydown.enter.exact.prevent
                @keyup.enter.exact="sendMessage"
                @keydown.enter.shift.exact="addNewline"
                v-model="chatMessage"
                name="message"
                :placeholder="typingPlaceHolder"
                class="form-control"
                rows="1"
              ></textarea>
            </div>
            <div class="right-area">
              <VEmojiPicker v-show="showEmoji" :pack="emojisNative" labelSearch @select="addEmoji" />
              <a href="javascript:void(0);" class="emoji-icon" @click="toggleEmoji">
                <i class="fa fa-surprise"></i>
              </a>
              <!-- <input
                id="fileUpload"
                type="file"
                ref="file"
                hidden
                v-on:change="handleFileUpload()"
                class="right-area"
              />
              <a
                href="javascript:void(0)"
                id="sendAttachmentLink"
                @click="selectImage"
                class="attachment-link"
              >
                <i class="fa fa-attach"></i>
              </a> -->
              <button class="btn-send" id="lc_sendMsgButton" @click="sendMessage">Send</button>
            </div>
          </div>
        </template>
      </card>
    </div>
    <div class="chat-icon">
      <div
        class="chat-badge bounce"
        id="lc_chatBadge"
        v-if="notificationCount>0"
      >{{notificationCount}}</div>
      <a href="javaScript:void(0);" @click="chatToggle" id="chatIcon" class="active">
        <img :src="socketUrl+'/images/chaticon.svg'" />
      </a>
    </div>
  </div>
</template>

<script>
import VEmojiPicker from "v-emoji-picker";
import packData from "v-emoji-picker/data/emojis.js";
import constant from "./shared/constant";
import commonservice from "./shared/common.service";
import fileService from "./shared/file.service";
import "./shared/directive";
import PreChatForm from "./components/PreChatForm.vue";
import Card from "./components/Card.vue";
import Rate from "./components/Rate.vue";
import Message from "./components/Message.vue";
import { setTimeout } from "timers";
var chatEncryptor = require("./shared/chatEncryptor.service").default;
import modal from "./components/Modal.vue";
export default {
  name: "app",
  components: {
    PreChatForm,
    Card,
    Rate,
    Message,
    modal,
    VEmojiPicker
  },
  created() {
    this.options = Object.assign(this.options, window.mtaChatOptions);
    this.options.requiresPrechat =
      !this.options.mobileNumber && !this.options.emailAddress;

    if (!this.options.departmentCode) {
      commonservice.consoleError(
        constant.error.DEPARTMENTCODEMISSING +
          " in \rgclientcode = " +
          JSON.stringify(window.mtaChatOptions)
      );
      return;
    }
    if (!this.options.channelCode) {
      commonservice.consoleError(
        "\x1b[31m%s\x1b[0m",
        constant.error.CHANNELCODEMISSING +
          " in \r\ngrahaksewaoptions = " +
          JSON.stringify(window.grahaksewaoptions)
      );
      return;
    }
    let active = commonservice.getStorage(constant.appconstant.ACTIVEFORM);
    if (active) {
      this.chatVariables.activeForm = active;
    }
    this.chatVariables.customerSessionId = commonservice.getStorage(
      constant.appconstant.CUSTOMERSESSIONID
    );
    this.chatVariables.announcementBannerText = commonservice.getStorage(
      constant.appconstant.ANNOUNCEMENTBANNERTEXT
    );
    this.chatVariables.offlineFormText = this.chatVariables.offlineFormText
      ? this.chatVariables.offlineFormText
      : commonservice.getStorage(constant.appconstant.OFFLINEFORMTEXT);
    if (this.chatVariables.customerSessionId != null) {
      this.chatCollapse = false;
      let chats = commonservice.getStorage(
        this.chatVariables.customerSessionId
      );
      if (chats) {
        this.chatInfo = JSON.parse(chats);
        this.scroll();
      }
      let chatclosed = commonservice.getStorage(
        constant.appconstant.CHATCLOSED
      );
      if (chatclosed) this.closeChat();
    }
    if (this.preChatFormActive) {
      this.$socket.disconnect();
    }
    this.showEmoji = false;
    this.bindSubscriber();
  },
  destroyed() {
    this.unbindSubscriber();
  },
  mounted() {
    if (!this.options.requiresPreChat) {
      this.userDetails = {
        Name: this.options.name,
        MobileNumber: this.options.mobileNumber,
        EmailAddress: this.options.emailAddress
      };
    }
    var self = this;
    window.addEventListener("offline", function(event) {
      if (self.onlineFormActive) {
        self.disableTyping = true;
        self.typingPlaceHolder = constant.error.INTERNETCONNECTION;
      }
    });
  },
  data() {
    return {
      userDetails: null,
      loadingHistory: false,
      endChatOpen: false,
      isModalVisible: false,
      chatCollapse: true,
      typingPlaceHolder: constant.message.typingPlaceHolder,
      socketUrl: process.env.VUE_APP_API_URL,
      connecting: false,
      disableTyping: false,
      showTyping: false,
      enableRating: false,
      clientTyping: false,
      errormessage: null,
      chatMessage: null,
      notificationCount: 0,
      showEmoji: false,
      options: {
        departmentCode: null,
        channelCode: null,
        requiresPrechat: true
      },
      preChatFormDetails: {},
      offlineFormDetails: {},
      chatVariables: {
        customerSessionId: null,
        activeForm: null,
        announcementBannerText: null,
        offlineFormText: null
      },
      chatInfo: {
        startDate: null,
        startTime: null,
        lastObjectId: null,
        messages: []
      },
      chatEncryptor: chatEncryptor
    };
  },
  methods: {
    onScroll(e) {
      var self = this;
      if (
        e.srcElement.scrollTop == 0 &&
        this.loadingHistory == false &&
        this.chatInfo.lastObjectId
      ) {
        this.loadingHistory = true;
        this.fetchHistory();

        setTimeout(function() {
          if (self.loadingHistory) self.loadingHistory = false;
          self.$refs.scrollBody.scrollTop = 10;
        }, 2000);
      }
    },
    fetchHistory() {
      if (this.chatInfo.lastObjectId) {
        this.$socket.emit(constant.socketaction.FETCHCHATHISTORY, {
          isAgent: false,
          customerSessionId: this.chatVariables.customerSessionId,
          lastObjectId: this.chatInfo.lastObjectId
        });
      }
    },
    selectImage() {
      document.getElementById("fileUpload").click();
    },
    showErrorMessage(message) {
      this.errormessage = message;

      setTimeout(() => {
        this.errormessage = null;
      }, 3000);
    },
    handleFileUpload() {
      const that = this;
      fileService.getBase64iMage(that.$refs.file.files[0]).then(x => {
        var validationError = fileService.validateFileData(
          that.$refs.file.files[0].name,
          x.length
        );
        if (validationError) {
          // that.errormessage = validationError;
          this.showErrorMessage(validationError);
          return;
        }
        var time = new Date();
        var messageKey =
          this.chatVariables.customerSessionId +
          new Date(commonservice.getUtcFormattedDate(time)).getTime();
        var file = {
          originalFileName: that.$refs.file.files[0].name,
          messageId: messageKey,
          sent: false,
          // date: commonservice.getFormattedUtcDate(),
          dataUrl: x,
          customerSessionId: that.chatVariables.customerSessionId
        };
        fileService.addFile(file);
        that.uploadChunk(file);
      });
    },
    uploadChunk(file) {
      const that = this;
      var filename = file.originalFileName;
      const regex = /data:.+?,/;
      var selectedFile = file.dataUrl.replace(regex, "");
      var time = new Date();
      var timeStamp = commonservice.getUtcFormattedDate(time);
      that.$socket.emit("startfileupload", {
        isAgent: false,
        name: filename,
        size: selectedFile.length,
        messageId: file.messageId,
        customerSessionId: that.chatVariables.customerSessionId,
        timeStamp: timeStamp
      });
      this.addChatHistory(
        "",
        time,
        false,
        false,
        true,
        filename,
        file.messageId
      );
      that.scroll();
    },
    initiateDismissChat() {
      this.endChatOpen = true;
    },
    dismissChat() {
      this.endChatOpen = false;
    },
    back() {
      this.endChatOpen = false;
      this.chatCollapse = true;
    },
    endChat() {
      this.$socket.emit("endchatcustomer", {
        customerSessionId: this.chatVariables.customerSessionId
      });
    },
    chatToggle() {
      if (this.chatCollapse) {
        var self = this;
        this.notificationCount = 0;
        if (!this.chatVariables.customerSessionId && this.offlineFormActive) {
          //if (!this.$socket.connected) this.$socket.connect();
          this.resetChat();
          // this.initChat();
          // setTimeout(function() {
          //   self.chatCollapse = false;
          // }, 300);
          // return;
        }
        if (!this.$socket.connected) this.$socket.connect();
        this.chatCollapse = false;
      } else {
        if (this.preChatFormActive) {
          if (this.$socket.connected) this.$socket.disconnect();
        }
        this.chatCollapse = true;
      }
    },
    initChat() {
      let self = this;
      // if (!this.offlineFormActive) {
      if (!self.chatVariables.customerSessionId) {
        self.$socket.emit(constant.socketaction.INITIALIZECHATBOX, {
          departmentCode: self.options.departmentCode,
          channelCode: self.options.channelCode
        });
      } else {
        self.$socket.emit(constant.socketaction.UPDATEUSER, {
          isNewUser: false,
          customerSessionId: self.chatVariables.customerSessionId
        });
      }
      //}
    },

    getLastMessage() {
      if (this.chatInfo.messages.length > 0) {
        return this.chatInfo.messages[this.chatInfo.messages.length - 1];
      }
    },
    resetChat(reinit) {
      commonservice.clearStorage();
      this.chatInfo = {
        startDate: null,
        startTime: null,
        messages: []
      };
      this.endChatOpen = false;
      this.showTyping = false;
      this.connecting = false;
      this.disableTyping = false;
      this.enableRating = false;
      this.errormessage = null;
      this.chatMessage = null;
      this.showEmoji = false;
      this.clientTyping = false;
      this.$refs.prechatform.reset();
      // this.chatVariables = {
      //   customerSessionId: null,
      //   activeForm: null
      // };
      this.chatVariables.customerSessionId = null;
      this.chatVariables.activeForm = null;
      this.$socket.disconnect();
      this.chatCollapse = true;
      if (!reinit) {
        //
        return;
      }
      this.$socket.connect();
    },
    addNewline() {
      if (this.disableTyping || this.chatMessage == null) return;
    },
    sendMessage() {
      if (this.disableTyping || this.chatMessage == null) return;
      this.showEmoji = false;
      let message = this.chatMessage
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;");
      if (message != null && message != "") {
        var formattedmessage = this.formatMessage(message);
        var encryptedMessage = chatEncryptor.encrypt(message);
        var formattedEncrypteMessage = chatEncryptor.encrypt(formattedmessage);
        var time = new Date();
        var messageKey =
          this.chatVariables.customerSessionId +
          new Date(commonservice.getUtcFormattedDate(time)).getTime();
        this.$socket.emit(constant.socketaction.CHATMESSAGE, {
          customerSessionId: this.chatVariables.customerSessionId,
          isAgent: false,
          message: encryptedMessage,
          timeStamp: commonservice.getUtcFormattedDate(time),
          messageId: messageKey
        });
        this.addChatHistory(
          formattedEncrypteMessage,
          time,
          false,
          false,
          false,
          null,
          messageKey
        );
      }
      this.chatMessage = null;
    },
    initializeChatBoxCallback(data) {
      this.offlineFormDetails = data.offlineForm;
      commonservice.setStorage(
        constant.appconstant.ANNOUNCEMENTBANNERTEXT,
        data.announcementBanner
      );
      this.chatVariables.announcementBannerText = data.announcementBanner;
      commonservice.setStorage(
        constant.appconstant.OFFLINEFORMTEXT,
        data.offlineForm ? data.offlineForm.offlineMessage : ""
      );
      this.chatVariables.offlineFormText = data.offlineForm
        ? data.offlineForm.offlineMessage
        : "";
      if (this.options.requiresPrechat) {
        this.chatVariables.activeForm = constant.appconstant.PRECHATFORM;

        this.preChatFormDetails = data.preChatForm;
      } else {
        this.$socket.emit(constant.socketaction.ADDUSER, {
          name: this.options.name,
          email: this.options.emailAddress,
          mobileNumber: this.options.mobileNumber,
          departmentCode: this.options.departmentCode,
          channelCode: this.options.channelCode
        });
      }
      // }
    },
    addUserCallback(data) {
      commonservice.setStorage(
        constant.appconstant.CUSTOMERSESSIONID,
        data.customerSessionId
      );
      this.chatVariables.customerSessionId = data.customerSessionId;
    },

    addFetchedMessageHistory(data) {
      if (data && data.messages) {
        this.chatInfo.lastObjectId = data.lastObjectId;
        var reversedMessages = data.messages.reverse();
        this.chatInfo.messages = reversedMessages.concat(
          this.chatInfo.messages
        );
        commonservice.setStorage(
          this.chatVariables.customerSessionId,
          JSON.stringify(this.chatInfo)
        );
      }
    },
    agentDisconnectedCallback() {
      this.resetChat(true);
    },
    changeMessageDeliveryStatus(messageId) {
      if (messageId) {
        var message = this.chatInfo.messages.filter(
          x => x.messageId == messageId
        );
        if (message) {
          message.sent = true;
          commonservice.setStorage(
            this.chatVariables.customerSessionId,
            JSON.stringify(this.chatInfo)
          );
        }
      }
    },
    addChatHistory(
      message,
      timeStamp,
      isAgent,
      isInAppMessage,
      isFile,
      originalFileName,
      messageId,
      sent
    ) {
      var currentMessage = {
        message: message,
        isFile: isFile,
        originalName: originalFileName,
        timeStamp: timeStamp,
        isAgent: isAgent,
        formattedTime: commonservice.formatTime(timeStamp),
        isInAppMessage: isInAppMessage,
        sent: sent ? sent : false,
        messageId: messageId
      };
      this.chatInfo.messages.push(currentMessage);
      commonservice.setStorage(
        this.chatVariables.customerSessionId,
        JSON.stringify(this.chatInfo)
      );
      setTimeout(() => this.scroll(), 300);
    },
    bindSubscriber() {
      this.sockets.subscribe(
        constant.socketaction.POSTINITIALIZECHATBOX,
        data => {
          this.initializeChatBoxCallback(data);
        }
      );
      this.sockets.subscribe(
        constant.socketaction.ENDCHATCUSTOMERACK,
        function() {
          this.resetChat();
        }
      );
      this.sockets.subscribe(constant.socketaction.AGENTDISCONNECTED, function(
        data
      ) {
        this.agentDisconnectedCallback(data);
      });
      this.sockets.subscribe(constant.socketaction.RECONNECTING, function() {
        this.connecting = true;
        this.disableTyping = true;
        this.typingPlaceHolder = constant.error.INTERNETCONNECTION;
      });
      this.sockets.subscribe(constant.socketaction.DISCONNECT, function() {
        this.connecting = true;
        this.disableTyping = true;
        this.typingPlaceHolder = constant.error.INTERNETCONNECTION;
      });
      this.sockets.subscribe(constant.socketaction.UNRECEIVEDMESSAGES, function(
        data
      ) {
        var self = this;
        if (data && data.messages) {
          data.messages.forEach(function(element) {
            var localDate = new Date(element.timeStamp);
            var message = chatEncryptor.decrypt(element.message);
            var formattedMessage = self.formatMessage(message);
            self.addChatHistory(
              chatEncryptor.encrypt(formattedMessage),
              localDate,
              true,
              element.isChatNote,
              element.isFile,
              element.originalFileName,
              element.messageId,
              true
            );
          });
          this.scroll();
        }
      });
      //this.sockets.subscribe(constant.socketaction.UPDATEUSERACK, function(data) {})
      this.sockets.subscribe(constant.socketaction.RECONNECT, function() {
        this.initChat();

        this.errormessage = null;
        this.connecting = false;
        this.disableTyping = false;
        this.typingPlaceHolder = constant.message.INPUTPLACEHOLDER;
      });
      this.sockets.subscribe(constant.socketaction.TYPING, function(data) {
        this.showTyping = data.isTyping;
      });
      this.sockets.subscribe(constant.socketaction.AGENTONLINESTATUS, function(
        data
      ) {});
      this.sockets.subscribe(constant.socketaction.AGENTAVAILABLE, function(
        data
      ) {
        this.chatVariables.activeForm = constant.appconstant.ONLINEFORM;
        this.disableTyping = false;
        this.typingPlaceHolder = constant.message.INPUTPLACEHOLDER;
        let time = new Date();
        var startMessage = "Chat started "
          .concat(commonservice.formatTime(time), " on ")
          .concat(commonservice.formatDate(time));
        this.addFetchedMessageHistory(data.chatHistory);
        this.addChatHistory(
          chatEncryptor.encrypt(startMessage),
          time,
          true,
          true,
          false,
          null,
          null
        );
        this.addChatHistory(data.message, time, true, false, false, null, null);
      });
      this.sockets.subscribe(
        constant.socketaction.DEPARTMENTOFFLINE,
        function() {
          this.chatVariables.activeForm = constant.appconstant.OFFLINEFORM;
        }
      );
      this.sockets.subscribe(constant.socketaction.CLOSECHAT, function(data) {
        this.addChatHistory(
          data.message,
          new Date(),
          true,
          true,
          false,
          null,
          null
        );
        this.closeChat();
      });
      this.sockets.subscribe(constant.socketaction.LOGOFF, function() {
        this.resetChat(true);
      });
      this.sockets.subscribe(constant.socketaction.CHATMESSAGE, function(data) {
        //var date = new Date();
        if (this.chatCollapse) {
          this.notificationCount += 1;
        }
        var localDate = commonservice.getUtcToLocalTime(data.timeStamp);
        var message = chatEncryptor.decrypt(data.message);
        var formattedMessage = this.formatMessage(message);
        this.addChatHistory(
          chatEncryptor.encrypt(formattedMessage),
          localDate,
          true,
          false,
          false,
          null,
          data.messageId
        );
      });
      this.sockets.subscribe(constant.socketaction.CONNECT, function() {
        this.initChat();
        if (this.onlineFormActive) {
          var message = this.getLastMessage();
          if (message) {
            this.$socket.emit(constant.socketaction.FETCHUNRECEIVEDMESSAGES, {
              isAgent: false,
              messageId: message.messageId
            });
          }
        }
        this.connecting = false;
        this.typingPlaceHolder = constant.message.INPUTPLACEHOLDER;
      });
      this.sockets.subscribe(constant.socketaction.CONFIRMADDUSER, data => {
        this.addUserCallback(data);
      });
      this.sockets.subscribe(constant.socketaction.MOREDATA, data => {
        var selectedFileData = fileService.getFile(data.messageId);
        if (selectedFileData) {
          var Place = data["place"] * 409600;
          var NewFile;
          const regex = /data:.+?,/;
          var selectedFile = selectedFileData.dataUrl.replace(regex, "");

          if (selectedFile.webkitSlice)
            NewFile = selectedFile.webkitSlice(
              Place,
              Place + Math.min(409600, selectedFile.length - Place)
            );
          else if (selectedFile.mozSlice)
            NewFile = selectedFile.mozSlice(
              Place,
              Place + Math.min(409600, selectedFile.length - Place)
            );
          else
            NewFile = selectedFile.slice(
              Place,
              Place + Math.min(409600, selectedFile.length - Place)
            );
          this.$socket.emit(constant.socketaction.UPLOAD, {
            name: selectedFileData.originalName,
            isAgent: false,
            data: NewFile,
            messageId: selectedFileData.messageId,
            customerSessionId: this.chatVariables.customerSessionId
          });
        }
      });
      this.sockets.subscribe(constant.socketaction.FILEUPLOADED, data => {
        if (data.isAgent) {
          var localDate = commonservice.getUtcToLocalTime(data.timeStamp);
          this.addChatHistory(
            data.url,
            localDate,
            true,
            false,
            true,
            data.originalFileName,
            data.messageId,
            true
          );
          this.scroll();
          return;
        }
        var message = this.chatInfo.messages.filter(
          x => x.messageId == data.messageId
        )[0];
        if (message) {
          this.scroll();
          message.sent = true;
          message.message = data.url;
          commonservice.setStorage(
            this.chatVariables.customerSessionId,
            JSON.stringify(this.chatInfo)
          );
          fileService.deleteFile(data.messageId);
        }
      });

      this.sockets.subscribe(constant.socketaction.CHATHISTORY, data => {
        this.addFetchedMessageHistory(data.history);
        this.$refs.scrollBody.scrollTop = 10;
      });
    },
    unbindSubscriber() {
      this.sockets.unsubscribe(constant.socketaction.POSTINITIALIZECHATBOX);
      this.sockets.unsubscribe(constant.socketaction.AGENTDISCONNECTED);
      this.sockets.unsubscribe(constant.socketaction.RECONNECTING);
      this.sockets.unsubscribe(constant.socketaction.DISCONNECT);
      // this.sockets.unsubscribe(constant.socketaction.UPDATEUSERACK);
      this.sockets.unsubscribe(constant.socketaction.RECONNECT);
      this.sockets.unsubscribe(constant.socketaction.TYPING);
      this.sockets.unsubscribe(constant.socketaction.AGENTONLINESTATUS);
      this.sockets.unsubscribe(constant.socketaction.AGENTAVAILABLE);
      this.sockets.unsubscribe(constant.socketaction.DEPARTMENTOFFLINE);
      this.sockets.unsubscribe(constant.socketaction.CLOSECHAT);
      this.sockets.unsubscribe(constant.socketaction.LOGOFF);
      this.sockets.unsubscribe(constant.socketaction.CHATMESSAGE);
      this.sockets.unsubscribe(constant.socketaction.CONNECT);
      this.sockets.unsubscribe(constant.socketaction.CONFIRMADDUSER);

      this.sockets.unsubscribe(constant.socketaction.MOREDATA);
      this.sockets.unsubscribe(constant.socketaction.FILEUPLOADED);
      this.sockets.unsubscribe(constant.socketaction.ENDCHATCUSTOMERACK);
      this.sockets.unsubscribe(constant.socketaction.FETCHCHATHISTORY);
    },
    toggleEmoji() {
      this.showEmoji = !this.showEmoji;
    },
    addEmoji(emoji) {
      //chatMessageInput
      const textarea = this.$refs.chatMessageInput;
      const cursorPosition = textarea.selectionEnd;
      if (this.chatMessage == null) this.chatMessage = "";
      const start = this.chatMessage.substring(0, textarea.selectionStart);
      const end = this.chatMessage.substring(textarea.selectionStart);
      this.chatMessage = start + emoji.emoji + end;
      textarea.focus();
      setTimeout(() => {
        textarea.selectionEnd = cursorPosition + emoji.emoji.length;
      }, 200);
      /* if(this.chatMessage == null)
        this.chatMessage = emoji.native;
      else
        this.chatMessage += emoji.native; */
    },
    closeChat() {
      this.disableTyping = true;
      this.enableRating = true;
      this.showTyping = false;
      commonservice.setStorage(constant.appconstant.CHATCLOSED, true);
      this.scroll();
    },
    closeErrorAlert() {
      this.errormessage = null;
    },
    chatmessagefocus(event) {
      if (event.which !== 13) {
        if (!this.clientTyping) {
          this.clientTyping = true;
          this.$socket.emit(constant.socketaction.TYPING, {
            isTyping: true,
            customerSessionId: this.chatVariables.customerSessionId,
            isAgent: false
          });
          clearTimeout(window.timeout);
          window.timeout = setTimeout(() => {
            this.clientTyping = false;
            this.$socket.emit(constant.socketaction.TYPING, {
              isTyping: false,
              customerSessionId: this.chatVariables.customerSessionId,
              isAgent: false
            });
          }, 3000);
        }
      }
    },
    scroll() {
      setTimeout(() => {
        let container = document.getElementById("lc_conversationDiv");
        container.scrollTop = container.scrollHeight;
      }, 100);
    },
    formatMessage(content) {
      let exp_match = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      var element_content = content.replace(
        exp_match,
        "<a target='_blank' href='$1'>$1</a>"
      );

      var new_exp_match = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      var new_content = element_content.replace(
        new_exp_match,
        '$1<a target="_blank" href="http://$2">$2</a>'
      );
      return new_content;
    },
    isImage(fileName) {
      var sFileExtension = fileName
        .split(".")
        [fileName.split(".").length - 1].toLowerCase();
      var imageExtensions = ["jpeg", "jpg", "png"];
      var image = imageExtensions.filter(c => c === sFileExtension)[0];
      if (image) {
        return true;
      }
      return false;
    },
    getDataUrl(messageId) {
      return fileService.getDataUri(messageId);
    },
    getGroupedMessages() {
      var result = this.chatInfo.messages.reduce(function(r, a) {
        r[commonservice.formatUTCDateString(a.timeStamp)] =
          r[commonservice.formatUTCDateString(a.timeStamp)] || [];
        r[commonservice.formatUTCDateString(a.timeStamp)].push(a);
        return r;
      }, Object.create(null));
      return result;
    }
  },
  computed: {
    emojisNative() {
      return packData;
    },
    preChatFormActive() {
      return this.chatVariables.activeForm == constant.appconstant.PRECHATFORM;
    },
    onlineFormActive() {
      return this.chatVariables.activeForm == constant.appconstant.ONLINEFORM;
    },
    offlineFormActive() {
      return this.chatVariables.activeForm == constant.appconstant.OFFLINEFORM;
    },
    isFormActive() {
      return this.chatVariables.activeForm != null;
    },
    announcementBannerText() {
      return this.chatVariables.announcementBannerText;
    },
    offlineFormText() {
      return this.chatVariables.offlineFormText;
    }
  },
  watch: {
    "chatVariables.activeForm": function(val) {
      commonservice.setStorage(constant.appconstant.ACTIVEFORM, val);
    },
    "chatVariables.announcementBannerText": function(val) {
      commonservice.setStorage(
        constant.appconstant.ANNOUNCEMENTBANNERTEXT,
        val
      );
    },
    "chatVariables.offlineFormText": function(val) {
      commonservice.setStorage(constant.appconstant.OFFLINEFORMTEXT, val);
    }
    // chatCollapse: function(val) {
    //   if (val) document.body.classList.remove("grahaksewa-noscroll");
    //   else document.body.classList.add("grahaksewa-noscroll");
    // }
  }
};
</script>

<style>
@import "./assets/css/bootstrap.custom.min.css";
@import "./assets/css/font-awesome.custom.min.css";
@import "./assets/css/main.css";
</style>