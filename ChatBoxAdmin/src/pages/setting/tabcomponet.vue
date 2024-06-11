<template>
  <form @submit.prevent="onSubmit" novalidate autocomplete="off">
    <div class="content">
      <div class="container pad-top25 pad-bottom15">
        <fieldset class="scheduler-border">
          <legend class="scheduler-border">Account</legend>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group row">
                <label for="example-text-input" class="col-10 col-form-label"
                  >Maxium Login Failure:</label
                >
                <div class="col-2">
                  <input
                    class="form-control"
                    type="text"
                    name="maxiumLoginFailure"
                    v-model="maxiumLoginFailure"
                    v-validate="'required'"
                    v-only-numeric
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="example-search-input" class="col-10 col-form-label"
                  >Force Logout Client Instance</label
                >
                <div class="col-2 padding-checkbox">
                  <input type="checkbox" v-model="forceLogoutClientInstance" />
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group row">
                <label for="example-text-input" class="col-9 col-form-label"
                  >Client Application Timer[HH:MM]</label
                >
                <div class="col-3">
                  <input
                    class="form-control"
                    type="text"
                    v-model="clientApplicationTimer"
                    v-validate="'required'"
                    v-mask="'##:##'"
                    placeholder="HH:MM"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="example-search-input" class="col-4 col-form-label">Lock Screen</label>
                <div class="col-2 padding-checkbox">
                  <input type="checkbox" v-model="lockScreen" />
                </div>
                <label for="example-search-input" class="col-4 col-form-label"
                  >Log off Application</label
                >
                <div class="col-2 padding-checkbox">
                  <input type="checkbox" v-model="logOffApplication" />
                </div>
              </div>
              <div class="form-group row">
                <label for="example-email-input" class="col-10 col-form-label"
                  >Disallowed Change Timer</label
                >
                <div class="col-2 padding-checkbox">
                  <input type="checkbox" v-model="disallowedChangeTimer" />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset class="scheduler-border">
          <legend class="scheduler-border">Password</legend>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label"
                  >Minimum Password Length:</label
                >
                <div class="col-4">
                  <input
                    class="form-control"
                    type="text"
                    value
                    id="example-text-input"
                    v-model="minimumPasswordLength"
                    v-validate="'required'"
                    v-only-numeric
                  />
                </div>
                <div class="col-2 padding-checkbox">char(s)</div>
              </div>
              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label"
                  >Maximum Password Length:</label
                >
                <div class="col-4">
                  <input
                    class="form-control"
                    type="text"
                    v-model="maximumPasswordLength"
                    v-validate="'required'"
                    v-only-numeric
                  />
                </div>
                <div class="col-2 padding-checkbox">char(s)</div>
              </div>
              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label"
                  >Passowrd Expire on Every:</label
                >
                <div class="col-4">
                  <input
                    class="form-control"
                    type="text"
                    v-model="passwordExpireOnEvery"
                    v-validate="'required'"
                    v-only-numeric
                  />
                </div>
                <div class="col-2 padding-checkbox">day(s)</div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label"
                  >Minium Password Age:</label
                >
                <div class="col-4">
                  <input
                    class="form-control"
                    type="text"
                    v-model="maximumPasswordAge"
                    v-validate="'required'"
                    v-only-numeric
                  />
                </div>
                <div class="col-2 padding-checkbox">day(s)</div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label"
                  >Disallowed Password History:</label
                >
                <div class="col-4">
                  <input
                    class="form-control"
                    type="text"
                    v-model="disallowedPasswordHistory"
                    v-validate="'required'"
                    v-only-numeric
                  />
                </div>
                <div class="col-2 padding-checkbox">time(s)</div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group row">
                <label for="example-email-input" class="col-10 col-form-label"
                  >User Must Change Password On Next Login</label
                >
                <div class="col-2 padding-checkbox">
                  <input type="checkbox" v-model="userMushChangePasswordOnNextLogin" />
                </div>
              </div>
              <div class="form-group row">
                <label for="example-search-input" class="col-4 col-form-label">AlphaNumeric</label>
                <div class="col-2 padding-checkbox">
                  <input type="checkbox" v-model="alphaNumeric" />
                </div>
                <label for="example-search-input" class="col-4 col-form-label"
                  >Password Complex</label
                >
                <div class="col-2 padding-checkbox">
                  <input type="checkbox" v-model="passwordComplex" />
                </div>
              </div>
              <div class="form-group row">
                <label for="example-email-input" class="col-10 col-form-label"
                  >Disallowed Sequential Number/ Alphabet</label
                >
                <div class="col-2 padding-checkbox">
                  <input type="checkbox" v-model="disallowedSequentialNumberAlphabet" />
                </div>
              </div>
              <div class="form-group row">
                <label for="example-email-input" class="col-10 col-form-label"
                  >Disallowed Character Repetition</label
                >
                <div class="col-2 padding-checkbox">
                  <input type="checkbox" v-model="disallowedCharacterRepetition" />
                </div>
              </div>

              <div class="form-group row">
                <label for="example-email-input" class="col-10 col-form-label"
                  >Disallowed UserID in Password</label
                >
                <div class="col-2 padding-checkbox">
                  <input type="checkbox" v-model="disallowedUserIdInPassword" />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset class="scheduler-border">
          <legend class="scheduler-border">Dormat</legend>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group row">
                <label for="example-text-input" class="col-10 col-form-label"
                  >Suspend Account After</label
                >
                <div class="col-2">
                  <input
                    class="form-control"
                    type="text"
                    v-model="suspendAccountAfter"
                    v-validate="'required'"
                    v-only-numeric
                  />
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group row">
                <label for="example-text-input" class="col-10 col-form-label"
                  >Delete Account After</label
                >
                <div class="col-2">
                  <input
                    class="form-control"
                    type="text"
                    v-model="deleteAccountAfter"
                    v-validate="'required'"
                    v-only-numeric
                  />
                </div>
              </div>
            </div>
          </div>
        </fieldset>
        <button class="btn btn-primary">Save</button>
      </div>
    </div>
  </form>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'TabComponent',
  inject: ['$validator'],
  props: ['state', 'store', 'control'],
  created() {},
  computed: {
    maxiumLoginFailure: {
      get() {
        return this.state.maxiumLoginFailure
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'maxiumLoginFailure',
          value: value
        })
      }
    },
    forceLogoutClientInstance: {
      get() {
        return this.state.forceLogoutClientInstance
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'forceLogoutClientInstance',
          value: value
        })
      }
    },
    clientApplicationTimer: {
      get() {
        return this.state.clientApplicationTimer
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'clientApplicationTimer',
          value: value
        })
      }
    },
    lockScreen: {
      get() {
        return this.state.lockScreen
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'lockScreen',
          value: value
        })
      }
    },
    logOffApplication: {
      get() {
        return this.state.logOffApplication
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'logOffApplication',
          value: value
        })
      }
    },
    disallowedChangeTimer: {
      get() {
        return this.state.disallowedChangeTimer
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'disallowedChangeTimer',
          value: value
        })
      }
    },
    minimumPasswordLength: {
      get() {
        return this.state.minimumPasswordLength
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'minimumPasswordLength',
          value: value
        })
      }
    },
    maximumPasswordLength: {
      get() {
        return this.state.maximumPasswordLength
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'maximumPasswordLength',
          value: value
        })
      }
    },
    passwordExpireOnEvery: {
      get() {
        return this.state.passwordExpireOnEvery
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'passwordExpireOnEvery',
          value: value
        })
      }
    },
    maximumPasswordAge: {
      get() {
        return this.state.maximumPasswordAge
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'maximumPasswordAge',
          value: value
        })
      }
    },
    disallowedPasswordHistory: {
      get() {
        return this.state.disallowedPasswordHistory
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'disallowedPasswordHistory',
          value: value
        })
      }
    },
    userMushChangePasswordOnNextLogin: {
      get() {
        return this.state.userMushChangePasswordOnNextLogin
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'userMushChangePasswordOnNextLogin',
          value: value
        })
      }
    },
    alphaNumeric: {
      get() {
        return this.state.alphaNumeric
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'alphaNumeric',
          value: value
        })
      }
    },
    passwordComplex: {
      get() {
        return this.state.passwordComplex
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'passwordComplex',
          value: value
        })
      }
    },
    disallowedSequentialNumberAlphabet: {
      get() {
        return this.state.disallowedSequentialNumberAlphabet
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'disallowedSequentialNumberAlphabet',
          value: value
        })
      }
    },
    disallowedCharacterRepetition: {
      get() {
        return this.state.disallowedCharacterRepetition
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'disallowedCharacterRepetition',
          value: value
        })
      }
    },
    disallowedUserIdInPassword: {
      get() {
        return this.state.disallowedUserIdInPassword
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'disallowedUserIdInPassword',
          value: value
        })
      }
    },
    deleteAccountAfter: {
      get() {
        return this.state.deleteAccountAfter
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'deleteAccountAfter',
          value: value
        })
      }
    },
    suspendAccountAfter: {
      get() {
        return this.state.suspendAccountAfter
      },
      set(value) {
        this.store.commit('setting/' + this.control, {
          key: 'suspendAccountAfter',
          value: value
        })
      }
    }
  },

  methods: {
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.store.dispatch('setting/saveSetting', this.state).then(response => {
            Vue.swal.fire('Success', response.Message, 'success')
          })
        }
      })
    }
  }
}
</script>
