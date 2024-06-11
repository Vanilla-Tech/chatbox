<template>
  <div class="top-navbar">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="logo">
            <img src="/img/logo.png" />
          </div>
        </div>
        <div class="col-md-6 text-right">
          <div class="user-avatar dropdown">
            <b-dropdown id="dropdown-1" text="Admin" class="m-md-2 ddheader" variant="default">
              <template slot="button-content">
                <i class="fa fa-user"></i>
                <span>{{ this.$store.state.auth.authUser.name }}</span>
              </template>

              <b-dropdown-item @click="showModal">Change Password</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="onLogout">Logout</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="changePassword"
      v-model="showChangePassword"
      title="Change Password"
      @ok="handleOk"
      no-close-on-backdrop
      no-close-on-esc
      @cancel="handleCancel"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-group>
          <b-form-input
            name="oldPassword"
            type="password"
            v-model="oldPassword"
            v-validate="'required'"
            data-vv-as="Old password"
            :class="{ input: true, 'is-danger': errors.has('oldPassword') }"
            placeholder="Enter old password"
          ></b-form-input>

          <div v-show="errors.has('oldPassword')" class="help is-danger">
            {{ errors.first('oldPassword') }}
          </div>
        </b-form-group>
        <b-form-group>
          <b-form-input
            ref="newPassword"
            type="password"
            name="newPassword"
            v-model="newPassword"
            v-validate="'required|min:7|verify_password'"
            data-vv-as="New password"
            :class="{ input: true, 'is-danger': errors.has('newPassword') }"
            placeholder="Enter new password"
          ></b-form-input>

          <div v-show="errors.has('newPassword')" class="help is-danger">
            {{ errors.first('newPassword') }}
          </div>
        </b-form-group>

        <b-form-group>
          <b-form-input
            name="confirmPassword"
            type="password"
            v-model="confirmPassword"
            v-validate="'required|min:7|confirmed:newPassword'"
            data-vv-as="Confirm password"
            :class="{ input: true, 'is-danger': errors.has('confirmPassword') }"
            placeholder="Enter confirm password"
          ></b-form-input>

          <div v-show="errors.has('confirmPassword')" class="help is-danger">
            {{ errors.first('confirmPassword') }}
          </div>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data() {
    return {
      showChangePassword: false,
      oldPassword: null,
      newPassword: null,
      confirmPassword: null
    }
  },
  computed: {
    getTitle() {
      return this.$store.state.auth ? this.$store.state.auth.title : 'Chat Box'
    }
  },
  methods: {
    showModal() {
      this.oldPassword = null
      this.newPassword = null
      this.confirmPassword = null
      this.errors.clear()
      this.showChangePassword = true
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleCancel(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.showChangePassword = false
    },
    handleSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          axios
            .post('changePassword', {
              userId: this.$store.state.auth.authUser.id,
              oldPassword: this.oldPassword,
              password: this.newPassword
            })
            .then(() => {
              this.showChangePassword = false

              Vue.swal.fire('Success!', 'Password reset successfully', 'success')
            })
        }
      })
    },

    onLogout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
