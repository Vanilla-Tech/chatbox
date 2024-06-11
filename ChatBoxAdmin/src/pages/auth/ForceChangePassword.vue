<template>
  <div class="login-box forcepasswordchange">
    <div class="lb-logo">
      <img src="/img/login-logo.png" />
    </div>
    <!--end logo-->
    <div class="login-form">
      <form @submit.prevent="login">
        <div class="form-group">
          <label class="label-abs">
            Old Password
            <span>*</span>
          </label>
          <input
            v-validate="'required'"
            data-vv-as="Old Password"
            v-model="oldPassword"
            type="password"
            name="OldPassword"
            class="form-control"
          />
          <span v-show="errors.has('OldPassword')" class="help is-danger">
            {{ errors.first('OldPassword') }}
          </span>
        </div>
        <div class="form-group">
          <label class="label-abs">
            New Password
            <span>*</span>
          </label>
          <input
            ref="password"
            v-validate="'required|min:8|verify_password'"
            data-vv-as="Password"
            v-model="password"
            type="password"
            name="password"
            class="form-control"
          />
          <span v-show="errors.has('password')" class="help is-danger">
            {{ errors.first('password') }}
          </span>
        </div>
        <!--end form-group-->
        <div class="form-group">
          <label class="label-abs">
            Confirm Password
            <span>*</span>
          </label>
          <input
            v-validate="'required|min:8|confirmed:password'"
            data-vv-as="Confirm Password"
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            class="form-control"
          />
          <span v-show="errors.has('confirmPassword')" class="help is-danger">
            {{ errors.first('confirmPassword') }}
          </span>
        </div>
        <!--end form-group-->
        <div class="form-group">
          <button type="submit" name="login" class="btn btn-login">Login</button>
        </div>
        <!--end form-group-->
      </form>
    </div>
    <!--end Login form-->
  </div>
</template>

<script>
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
            .then(() => {
              this.$router.push('/')
            })
        }
      })
    }
  }
}
</script>

<style></style>
