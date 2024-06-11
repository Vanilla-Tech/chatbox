<template>
  <div class="agent-wrapper">
    <form @submit.prevent="login">
      <div class="login-box ForceChnagePasword">
        <div class="login-header">
          <img src="/img/login-logo.png" />
        </div>
        <div class="form-group">
          <input
            v-validate="'required'"
            data-vv-as="Old Password"
            v-model="oldPassword"
            type="password"
            name="OldPassword"
            class="form-control"
          />
          <label class="label-abs">
            Old Password
            <span>*</span>
          </label>
          <span v-show="errors.has('OldPassword')" class="help is-danger">{{
            errors.first('OldPassword')
          }}</span>
        </div>
        <div class="form-group">
          <input
            ref="password"
            v-validate="'required|min:8|verify_password'"
            data-vv-as="Password"
            v-model="password"
            type="password"
            name="password"
            class="form-control"
          />
          <label class="label-abs">
            Password
            <span>*</span>
          </label>
          <span v-show="errors.has('password')" class="help is-danger">{{
            errors.first('password')
          }}</span>
        </div>
        <div class="form-group">
          <input
            v-validate="'required|min:8|confirmed:password'"
            data-vv-as="Confirm Password"
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            class="form-control"
          />
          <label class="label-abs">
            Confirm Password
            <span>*</span>
          </label>
          <span v-show="errors.has('confirmPassword')" class="help is-danger">{{
            errors.first('confirmPassword')
          }}</span>
        </div>
        <div class="form-group">
          <button class="btn btn-login btn-block" type="submit">Change Password</button>
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
      oldPassword: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    login: function() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          let password = this.password
          let confirmPassword = this.confirmPassword
          let oldPassword = this.oldPassword
          this.$store
            .dispatch('auth/forceChangePassword', {
              oldPassword,
              password,
              confirmPassword
            })
            .then(response => {
              this.$socket.emit(chatactions.LOGINAGENT, {
                agentId: response.data.id
              })
              this.$router.push('/')
            })
        }
      })
    }
  }
}
</script>

<style></style>
