<template>
  <div class="login-box">
    <div class="lb-logo">
      <img src="img/login-logo.png" />
    </div>
    <!--end logo-->
    <div class="login-form">
      <form @submit.prevent="login">
        <div class="form-group">
          <label class="label-abs">
           Staff ID  <span>*</span>
          </label>
          <input
            v-validate="'required'"
            data-vv-as="Staff ID"
            v-model="staffId"
            type="text"
            name="StaffId" 
            class="form-control"
          />
          <span v-show="errors.has('StaffId')" class="help is-danger">{{
            errors.first('StaffId')
          }}</span>
        </div>
        <!--end form-group-->
        <div class="form-group">
           <label class="label-abs">
             Password
          <span>*</span></label>
          <input
            v-validate="'required'"
            data-vv-as="Password"
            v-model="password"
            type="password"
            name="Password"
            class="form-control"
          />
          <span v-show="errors.has('Password')" class="help is-danger">{{
            errors.first('Password')
          }}</span>
        </div>
        <!--end form-group-->
        <div class="form-group">
          <div class="row">
            <div class="col-md-6">
              <div class="custom-control custom-checkbox">
                <input
                  v-model="rememberme"
                  type="checkbox"
                  class="custom-control-input"
                  id="customControlInline"
                />
                <label class="custom-control-label" for="customControlInline">Remember me</label>
              </div>
              <!--end checkbox-->
            </div>
            <div class="col-md-6 text-right">
              <!-- <a href="#" class="signup-link">Sign Up</a> -->
            </div>
          </div>
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
      staffId: '',
      password: '',
      rememberme: false
    }
  },
  methods: {
    login: function() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          let staffId = this.staffId
          let password = this.password
          this.$store.dispatch('auth/login', { staffId, password }).then(response => {
            if (response.data.forceChangePassword === false) {
              this.$router.push('/')
            } else {
              this.$router.push('/forceChangePassword')
            }
          })
        }
      })
    }
  }
}
</script>

<style></style>
