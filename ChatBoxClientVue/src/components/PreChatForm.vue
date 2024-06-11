<template>
  <card v-if="show">
    <template #header>
      <div class="lc-header">
        <span>{{isOffline ? "Leave A Message ! " : "Live Chat"}}</span>
        <a href="javaScript:void(0);" @click="chatToggle" class="close-chat">
          <img :src="socketUrl+'/images/chat-close.svg'" />
        </a>
      </div>
    </template>
    <template #body>
      <div class="lc-prechat" v-if="!offlineSubmittedSuccess">
        <form
          v-if="!isOffline"
          class="prechat-form pad-15 imp"
          @submit.prevent="submit"
          novalidate
          autocomplete="off"
        >
          <div class="lc-body-inner">
            <div v-if="preChatFormDetails.name" class="form-group">
              <label
                :class="(preChatNameFocused==true || vModel.Name?'up':'down')+(preChatFormDetails.isNameRequired? ' mandatory':'')"
              >Name</label>
              <input
                ref="preChatName"
                autocomplete="off"
                @focus="preChatNameFocused=true"
                @blur="preChatNameFocused=false"
                v-model="vModel.Name"
                v-validate="nameValidationRule('PreChat')"
                data-vv-as="name"
                :class="{'input': true, 'error': errors.has('preChatName') }"
                type="text"
                class="form-control"
                name="preChatName"
              />

              <div
                v-show="errors.has('preChatName')"
                class="error-field"
              >{{ errors.first('preChatName') }}</div>
            </div>

            <div v-if="preChatFormDetails.mobile" class="form-group">
              <label
                :class="(preChatMobileFocused==true||vModel.MobileNumber?'up':'down')+(preChatFormDetails.isMobileNumberRequired?' mandatory':'')"
              >Mobile Number</label>
              <input
                v-only-numeric
                autocomplete="off"
                v-model="vModel.MobileNumber"
                v-validate="mobilenumbervalidationrule('PreChat')"
                :class="{'input': true, 'error': errors.has('MobileNumber') }"
                type="text"
                class="form-control"
                name="preChatMobileNumber"
                data-vv-as="mobile number"
                @focus="preChatMobileFocused=true"
                @blur="preChatMobileFocused=false"
              />
              <div
                v-show="errors.has('preChatMobileNumber')"
                class="error-field"
              >{{ errors.first('preChatMobileNumber') }}</div>
            </div>
            <div v-if="preChatFormDetails.email" class="form-group">
              <label
                :class="(preChatEmailFocused==true|| vModel.Email?'up':'down')+(preChatFormDetails.isEmailRequired?' mandatory':'')"
              >Email</label>
              <input
                autocomplete="off"
                data-vv-as="email"
                v-model="vModel.Email"
                v-validate="emailvalidationrule('PreChat')"
                :class="{'input': true, 'error': errors.has('Email') }"
                type="text"
                class="form-control"
                name="preChatEmail"
                @focus="preChatEmailFocused=true"
                @blur="preChatEmailFocused=false"
              />
              <div
                v-show="errors.has('preChatEmail')"
                class="error-field"
              >{{ errors.first('preChatEmail') }}</div>
            </div>
            <div class="agree">
              <span>
                Your personal data is collected and used for Customer Support purposes only. Full
                policy available at
                <a
                  href="https://www.mtradeasia.com/main/privacy-policy"
                  target="_blank"
                >www.mtradeasia.com/main/privacy-policy/</a>
              </span>
              <div class="agree-checkbox">
                <input
                  class="styled-checkbox"
                  name="Agree1"
                  id="Agree1"
                  type="checkbox"
                  v-validate="'required'"
                  v-model="vModel.Agree"
                />
                <label for="Agree1">Agree</label>
                <div v-show="errors.has('Agree1')" class="error-field">Please agree to continue.</div>
              </div>
            </div>
          </div>
          <input type="submit" class="btn-block btn btn-submit" value="Start Chat" />
        </form>
        <form
          v-if="isOffline"
          class="offline-form pad-15 imp"
          @submit.prevent="submit"
          novalidate
          autocomplete="off"
        >
          <div class="lc-offlineMessage mt0b25" style="color:red">
            <span id="lc_offlineMessage">{{offlineFormText}}</span>
          </div>
          <div class="lc-body-inner">
            <!-- <div class="form-group" v-if="offlineFormDetails.name">
              <label
                :class="(vModel.Name || offlineChatNameFocused==true?'up':'down')+ (offlineFormDetails.isNameRequired?' mandatory':'')"
              >Name</label>
              <input
                autocomplete="off"
                v-model="vModel.Name"
                data-vv-as="name"
                v-validate="nameValidationRule('Offline')"
                :class="{'input': true, 'error': errors.has('offlineName') }"
                type="text"
                class="form-control"
                name="offlineName"
                @focus="offlineChatNameFocused=true"
                @blur="offlineChatNameFocused=false"
              />
              <div
                v-show="errors.has('offlineName')"
                class="error-field"
              >{{ errors.first('offlineName') }}</div>
            </div>
            <div class="form-group" v-if="offlineFormDetails.mobile">
              <label
                :class="(vModel.MobileNumber || offlineMobileFocused==true?'up':'down')+(offlineFormDetails.isMobileNumberRequired?' mandatory':'')"
              >MobileNumber</label>
              <input
                v-only-numeric
                autocomplete="off"
                data-vv-as="mobile number"
                v-model="vModel.MobileNumber"
                v-validate="mobilenumbervalidationrule('Offline')"
                :class="{'input': true, 'error': errors.has('offlineMobileNumber') }"
                type="text"
                class="form-control"
                name="offlineMobileNumber"
                @focus="offlineMobileFocused=true"
                @blur="offlineMobileFocused=false"
              />
              <div
                v-show="errors.has('offlineMobileNumber')"
                class="error-field"
              >{{ errors.first('offlineMobileNumber') }}</div>
            </div>-->

            <div class="form-group" v-if="offlineFormDetails.email">
              <label
                :class="(vModel.Email || offlineEmailFocused==true?'up':'down')+(offlineFormDetails.isEmailRequired?' mandatory':'')"
              >Email</label>
              <input
                autocomplete="off"
                v-model="vModel.Email"
                data-vv-as="email"
                v-validate="emailvalidationrule('Offline')"
                :class="{'input': true, 'error': errors.has('offlineEmail') }"
                type="text"
                class="form-control"
                name="offlineEmail"
                @focus="offlineEmailFocused=true"
                @blur="offlineEmailFocused=false"
              />
              <div
                v-show="errors.has('offlineEmail')"
                class="error-field"
              >{{ errors.first('offlineEmail') }}</div>
            </div>

            <div class="form-group">
              <label class="mandatory">Message</label>
              <textarea
                v-validate="'required|max:120'"
                v-model="vModel.Message"
                rows="3"
                name="Message"
                data-vv-as="message"
                :class="{'input': true, 'error': errors.has('Message') }"
                class="h145 form-control"
              ></textarea>
              <div v-show="errors.has('Message')" class="error-field">{{ errors.first('Message') }}</div>
            </div>
            <div class="agree">
              <span>
                Your personal data is collected and used for Customer Support purposes only. Full
                policy available at
                <a
                  href="https://www.mtradeasia.com/main/privacy-policy"
                  target="_blank"
                >www.mtradeasia.com/main/privacy-policy/</a>
              </span>
              <div class="agree-checkbox">
                <input
                  class="styled-checkbox"
                  name="Agree2"
                  id="Agree2"
                  type="checkbox"
                  v-validate="'required'"
                  v-model="vModel.Agree"
                />
                <label for="Agree2">Agree</label>
                <div v-show="errors.has('Agree2')" class="error-field">Please agree to continue</div>
              </div>
            </div>
          </div>
          <input type="submit" class="btn-block btn btn-submit" value="Submit" />
        </form>
      </div>
      <div id="lc_successSend" v-if="offlineSubmittedSuccess">
        <div class="lc-body-inner">
          <div class="lc-tm">
            <img :src="socketUrl+'/images/success.svg'" />
            <span>Thank You</span>
          </div>
        </div>
      </div>
    </template>
  </card>
</template>
<script>
import Card from "./Card.vue";
import constant from "../shared/constant";
export default {
  name: "prechartform",
  data() {
    return {
      preChatNameFocused: false,
      offlineChatNameFocused: false,
      preChatMobileFocused: false,
      offlineMobileFocused: false,
      preChatEmailFocused: false,
      offlineEmailFocused: false,

      vModel: {
        Name: null,
        Email: "",
        MobileNumber: "",
        offlineName: null,
        offlineEmail: "",
        offlineMobileNumber: "",
        Agree: false,
        Message: null
      },
      offlineSubmittedSuccess: false
    };
  },
  created() {
    this.sockets.subscribe(
      constant.socketaction.OFFLINEDATASUBMITTEDACK,
      function(data) {
        this.offlineDataSubmitCallback(data);
      }
    );
  },
  destroyed() {
    this.sockets.unsubscribe(constant.socketaction.OFFLINEDATASUBMITTEDACK);
  },
  components: {
    Card
  },
  props: [
    "isOffline",
    "options",
    "show",
    "preChatFormDetails",
    "offlineFormDetails",
    "socketUrl",
    "offlineFormText",
    "userDetails"
  ],
  methods: {
    nameValidationRule(form) {
      if (form == "PreChat") {
        if (this.preChatFormDetails)
          return this.preChatFormDetails.name
            ? this.preChatFormDetails.isNameRequired
              ? "required|max:50"
              : "max:50"
            : "";
      } else if (this.offlineFormDetails)
        return this.offlineFormDetails.name
          ? this.offlineFormDetails.isNameRequired
            ? "required|max:50"
            : "max:50"
          : "";
    },
    emailvalidationrule(form) {
      if (form == "PreChat") {
        if (this.preChatFormDetails)
          return this.preChatFormDetails.email
            ? this.preChatFormDetails.isEmailRequired
              ? "required|email|max:50"
              : "email|max:50"
            : "";
      } else if (this.offlineFormDetails)
        return this.offlineFormDetails.email
          ? this.offlineFormDetails.isEmailRequired
            ? "required|email|max:50"
            : "email|max:50"
          : "";
    },
    mobilenumbervalidationrule(form) {
      if (this.preChatFormDetails)
        if (form == "PreChat") {
          return this.preChatFormDetails.mobile
            ? this.preChatFormDetails.isMobileNumberRequired
              ? "required|max:12|min:11"
              : "max:12|min:11"
            : "";
        } else if (this.offlineFormDetails)
          return this.offlineFormDetails.mobile
            ? this.offlineFormDetails.isMobileNumberRequired
              ? "required|max:12|min:11"
              : "max:12|min:11"
            : "";
    },
    reset() {
      this.vModel.Name = this.userDetails.Name ? this.userDetails.Name : "";
      this.vModel.MobileNumber = this.userDetails.MobileNumber
        ? this.userDetails.MobileNumber
        : "";
      this.vModel.Email = this.userDetails.EmailAddress
        ? this.userDetails.EmailAddress
        : "";
      this.vModel.Agree = false;
      this.vModel.Message = null;
      this.offlineSubmittedSuccess = false;
    },
    chatToggle: function() {
      this.$emit("onChatToggle");
    },
    submit() {
      var self = this;
      self.$validator.validateAll().then(result => {
        if (result) {
          if (self.isOffline) {
            self.$socket.emit(constant.socketaction.OFFLINEDATASUBMITTED, {
              customerName: self.vModel.Name ? self.vModel.Name : "",
              customerEmail: self.vModel.Email,
              customerMobileNumber: self.vModel.MobileNumber
                ? self.vModel.MobileNumber
                : "",
              message: self.vModel.Message,
              departmentCode: self.options.departmentCode
            });
          } else {
            self.$socket.emit(constant.socketaction.ADDUSER, {
              isNewUser: true,
              name: self.vModel.Name ? self.vModel.Name : "",
              email: self.vModel.Email ? self.vModel.Email : "",
              mobileNumber: self.vModel.MobileNumber
                ? self.vModel.MobileNumber
                : "",
              departmentCode: self.options.departmentCode,
              channelCode: self.options.channelCode
            });
          }
        }
      });
    },
    offlineDataSubmitCallback() {
      let self = this;
      self.offlineSubmittedSuccess = true;
      setTimeout(() => {
        self.resetChat();
      }, 5000);
    },
    resetChat() {
      this.$emit("onResetChat", false);
    }
  },
  watch: {
    userDetails: function(userDetails) {
      if (userDetails) {
        this.vModel.Name = userDetails.Name;
        this.vModel.MobileNumber = userDetails.MobileNumber;
        this.vModel.Email = userDetails.EmailAddress;
      }
    },

    offlineFormText: function(newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
    }
  },
  computed: {}
};
</script>
