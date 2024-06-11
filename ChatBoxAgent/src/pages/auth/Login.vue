<template>
  <div class="agent-wrapper">
    <form @submit.prevent="login">
      <div class="login-box">
        <div class="login-header">
          <img src="/img/login-logo.png" />
        </div>
        <div class="form-group">
          <input
            v-validate="'required'"
            data-vv-as="Staff Id"
            v-model="staffId"
            type="text"
            name="StaffId"
            class="form-control"
          />
          <label class="label-abs">
            Staff ID
            <span>*</span>
          </label>
          <span v-show="errors.has('StaffId')" class="help is-danger">{{
            errors.first('StaffId')
          }}</span>
        </div>
        <div class="form-group">
          <input
            v-validate="'required'"
            data-vv-as="Password"
            v-model="password"
            type="password"
            name="Password"
            class="form-control"
          />
          <label class="label-abs">
            Password
            <span>*</span>
          </label>
          <span v-show="errors.has('Password')" class="help is-danger">{{
            errors.first('Password')
          }}</span>
        </div>
        <div class="form-group">
          <div class="custom-control custom-checkbox">
            <input
              v-model="rememberme"
              type="checkbox"
              class="custom-control-input"
              id="customControlInline"
            />
            <label class="custom-control-label" for="customControlInline">Remember me</label>
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-login btn-block" type="submit">Login</button>
        </div>
      </div>
    </form>
    <!--end Login form-->
  </div>
</template>

<script>
import { chatactions } from '../../helpers/applicationconstants'
export default {
  data() {
    return {
      staffId: '',
      password: '',
      rememberme: false
    }
  },
  methods: {
    login: function() {
      if (this.processing === true) {
        return
      }
      const that = this
      that.processing = true
      that.$validator.validateAll().then(valid => {
        if (valid) {
          let staffId = that.staffId
          let password = that.password
          that.$store
            .dispatch('auth/login', { staffId, password })
            .then(response => {
              that.processing = false
              if (response.data.forceChangePassword === false) {
                that.$socket.emit(chatactions.LOGINAGENT, {
                  agentId: response.data.id
                })
                that.$router.push('/')
              } else {
                that.$router.push('/forceChangePassword')
              }
            })
            .catch(() => {
              that.processing = false
            })
        }
      })
    }
  }
}
</script>

<style></style>
