<template>
  <div class="content-area">
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h3>{{ mode == 'add' ? 'Add New' : 'Edit' }} Department</h3>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
    </div>
    <!--end page header-->
    <form @submit.prevent="onSubmit" novalidate autocomplete="off">
      <div class="content">
        <div class="container pad-top15 pad-bottom15">
          <fieldset class="scheduler-border">
            <div class="row">
              <div class="col-4">
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="departmentName"
                    class="form-control"
                    autocomplete="off"
                    v-model="departmentName"
                    v-validate="'required'"
                    data-vv-as="Name"
                    :class="{ input: true, 'is-danger': errors.has('departmentName') }"
                  />
                  <div v-show="errors.has('departmentName')" class="help is-danger">
                    {{ errors.first('departmentName') }}
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="form-group">
                  <label>Display Name</label>
                  <input
                    type="text"
                    name="departmentDisplayName"
                    class="form-control"
                    autocomplete="off"
                    v-model="departmentDisplayName"
                    v-validate="'required'"
                    data-vv-as="Display name"
                    :class="{ input: true, 'is-danger': errors.has('departmentDisplayName') }"
                  />
                  <div v-show="errors.has('departmentDisplayName')" class="help is-danger">
                    {{ errors.first('departmentDisplayName') }}
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset class="scheduler-border">
            <legend class="scheduler-border">System/Product</legend>
            <div class="row">
              <div class="col-3">
                <div class="form-check">
                  <label class="form-check-label">
                    <b>Channel</b>
                  </label>
                </div>
              </div>

              <channel-component
                v-for="(d, index) in $store.state.department.department.channels"
                :key="d.code"
                :store="store"
                :index="index"
                :channel="d"
              ></channel-component>
            </div>
          </fieldset>
          <fieldset class="scheduler-border">
            <legend class="scheduler-border">Department</legend>

            <div class="custom-control custom-switch mar-15-t-b">
              <input
                type="checkbox"
                class="custom-control-input"
                id="prechat"
                v-model="preChatForm"
                disabled="disabled"
                checked
              />
              <label class="custom-control-label" for="prechat">PreChat Form (Website Only)</label>
            </div>

            <div class="row">
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    :disabled="!preChatForm"
                    class="custom-control-input"
                    id="prechatName"
                    v-model="preChatName"
                  />
                  <label class="custom-control-label" for="prechatName">Name</label>
                </div>
              </div>
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    :disabled="!preChatForm"
                    class="custom-control-input"
                    id="prechatemail"
                    v-model="preChatEmail"
                  />
                  <label class="custom-control-label" for="prechatemail">Email</label>
                </div>
              </div>
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    disabled="disabled"
                    class="custom-control-input"
                    id="prechatMobile"
                    v-model="preChatMobile"
                  />
                  <label class="custom-control-label" for="prechatMobile">Mobile</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    :disabled="!preChatName"
                    class="custom-control-input"
                    id="preChatNameMandatory"
                    v-model="preChatNameMandatory"
                  />
                  <label class="custom-control-label" for="preChatNameMandatory">Mandatory</label>
                </div>
              </div>
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    :disabled="!preChatMobile"
                    class="custom-control-input"
                    id="preChatEmailMandatory"
                    v-model="preChatEmailMandatory"
                  />
                  <label class="custom-control-label" for="preChatEmailMandatory">Mandatory</label>
                </div>
              </div>
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    disabled="disabled"
                    class="custom-control-input"
                    id="preChatMobileMandatory"
                    v-model="preChatMobileMandatory"
                  />

                  <label class="custom-control-label" for="preChatMobileMandatory">Mandatory</label>
                </div>
              </div>
            </div>

            <div class="custom-control custom-switch mar-15-t-b">
              <input
                type="checkbox"
                class="custom-control-input"
                id="OfflineForm"
                checked
                v-model="offlineForm"
                disabled="disabled"
              />
              <label class="custom-control-label" for="OfflineForm">Offline Form</label>
            </div>

            <div class="row">
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    :disabled="!offlineForm"
                    class="custom-control-input"
                    id="offlineName"
                    v-model="offlineName"
                  />
                  <label class="custom-control-label" for="offlineName">Name</label>
                </div>
              </div>
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    disabled="disabled"
                    class="custom-control-input"
                    id="offlineEmail"
                    v-model="offlineEmail"
                  />
                  <label class="custom-control-label" for="offlineEmail">Email</label>
                </div>
              </div>
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    :disabled="!offlineForm"
                    class="custom-control-input"
                    id="offlineMobile"
                    v-model="offlineMobile"
                  />
                  <label class="custom-control-label" for="offlineMobile">Mobile</label>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    :disabled="!offlineName"
                    class="custom-control-input"
                    id="offlineNameMandatory"
                    v-model="offlineNameMandatory"
                  />
                  <label class="custom-control-label" for="offlineNameMandatory">Mandatory</label>
                </div>
              </div>
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    disabled="disabled"
                    class="custom-control-input"
                    id="offlineEmailMandatory"
                    v-model="offlineEmailMandatory"
                  />
                  <label class="custom-control-label" for="offlineEmailMandatory">Mandatory</label>
                </div>
              </div>
              <div class="col-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    :disabled="!offlineMobile"
                    class="custom-control-input"
                    id="offlineMobileMandatory"
                    v-model="offlineMobileMandatory"
                  />
                  <label class="custom-control-label" for="offlineMobileMandatory">Mandatory</label>
                </div>
              </div>
            </div>
            <div class="row mar-15-t-b">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Offline Form Email</label>
                  <input
                    type="text"
                    name="offlinFormEmail"
                    class="form-control"
                    autocomplete="off"
                    v-model="offlinFormEmail"
                    v-validate="'required'"
                    data-vv-as="Offline form email"
                    :class="{ input: true, 'is-danger': errors.has('offlinFormEmail') }"
                  />
                  <div v-show="errors.has('offlinFormEmail')" class="help is-danger">
                    {{ errors.first('offlinFormEmail') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Offline Form Message</label>
                  <textarea
                    name="offlineFormMessage"
                    class="form-control"
                    autocomplete="off"
                    v-model="offlineFormMessage"
                    v-validate="'required'"
                    data-vv-as="Offline form message"
                    :class="{ input: true, 'is-danger': errors.has('offlineFormMessage') }"
                  ></textarea>
                  <div v-show="errors.has('offlineFormMessage')" class="help is-danger">
                    {{ errors.first('offlineFormMessage') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Announcement Banner:</label>
                  <input
                    type="text"
                    name="announcementBanner"
                    class="form-control"
                    autocomplete="off"
                    v-model="announcementBanner"
                    v-validate="'required'"
                    data-vv-as="Announcement Banner"
                    :class="{ input: true, 'is-danger': errors.has('announcementBanner') }"
                  />
                  <div v-show="errors.has('announcementBanner')" class="help is-danger">
                    {{ errors.first('announcementBanner') }}
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset class="scheduler-border">
            <legend class="scheduler-border">System/Product</legend>
            <div class="row">
              <div class="col-md-6">
                <div class="row mb-3">
                  <div class="col-md-4">Chat close time</div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control"
                            v-validate="'required'"
                            v-only-numeric
                            v-model="chatCloseTime"
                            :class="{ input: true, 'is-danger': errors.has('chatCloseTime') }"
                          />
                          <div class="input-group-append">
                            <span class="input-group-text">mins</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">Unique Identifier</div>
                  <div class="col-md-6">
                    <select
                      name="uniqueIdentifier"
                      data-vv-as="Role"
                      placeholder="Select Role"
                      class="form-control"
                      v-validate="'required'"
                      v-model="uniqueIdentifier"
                      :class="{ input: true, 'is-danger': errors.has('uniqueIdentifier') }"
                    >
                      <option value="null">Select</option>
                      <option value="MOBILENUMBER">Mobile Number</option>
                      <option value="EMAIL">Email Address</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-6 timetlb">
                <operation-component
                  v-for="(day, index) in $store.state.department.department.openingDetails"
                  :key="day.day"
                  :openingDetail="day"
                  :index="index"
                  :store="$store"
                ></operation-component>
              </div>
            </div>
          </fieldset>

          <!--end row-->
          <div class="foot-wrap">
            <button class="btn btn-primary"><i class="far fa-save"></i> Save</button>
            <router-link class="btn btn-danger" to="/department">
              <i class="fas fa-times-circle"></i> Cancel
            </router-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Base from '../../shared/base'
import channelComponent from './channel'
import operationComponent from './operation'

export default {
  extends: Base,
  props: ['store', 'mode'],
  name: 'departmentComponent',
  components: { channelComponent, operationComponent },

  computed: {
    departmentName: {
      get() {
        return this.store.state.department.department.name
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'name',
          value: value
        })
      }
    },
    departmentDisplayName: {
      get() {
        return this.store.state.department.department.displayName
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'displayName',
          value: value
        })
      }
    },
    departmentCode: {
      get() {
        return this.store.state.department.department.code
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'code',
          value: value
        })
      }
    },
    channelList: {
      get() {
        return this.store.state.department.department.channels
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'channels',
          value: value
        })
      }
    },
    preChatForm: {
      get() {
        return this.store.state.department.department.preChatForm.isRequired
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'preChatForm',
          value: value,
          property: 'isRequired'
        })

        if (!value) {
          this.preChatName = false
          this.preChatNameMandatory = false
          this.preChatEmail = false
          this.preChatEmailMandatory = false
          this.preChatMobile = false
          this.preChatMobileMandatory = false
        }
      }
    },
    preChatName: {
      get() {
        return this.store.state.department.department.preChatForm.name
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'preChatForm',
          value: value,
          property: 'name'
        })

        if (!value) {
          this.preChatNameMandatory = false
        }
      }
    },
    preChatNameMandatory: {
      get() {
        return this.store.state.department.department.preChatForm.isNameRequired
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'preChatForm',
          value: value,
          property: 'isNameRequired'
        })
      }
    },
    preChatEmail: {
      get() {
        return this.store.state.department.department.preChatForm.email
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'preChatForm',
          value: value,
          property: 'email'
        })

        if (!value) {
          this.preChatEmailMandatory = false
        }
      }
    },
    preChatEmailMandatory: {
      get() {
        return this.store.state.department.department.preChatForm.isEmailRequired
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'preChatForm',
          value: value,
          property: 'isEmailRequired'
        })
      }
    },
    preChatMobile: {
      get() {
        return this.store.state.department.department.preChatForm.mobile
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'preChatForm',
          value: value,
          property: 'mobile'
        })

        if (!value) {
          this.preChatMobileMandatory = false
        }
      }
    },

    preChatMobileMandatory: {
      get() {
        return this.store.state.department.department.preChatForm.isMobileNumberRequired
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'preChatForm',
          value: value,
          property: 'isMobileNumberRequired'
        })
      }
    },
    offlineForm: {
      get() {
        return this.store.state.department.department.offlineForm.isRequired
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'offlineForm',
          value: value,
          property: 'isRequired'
        })

        if (!value) {
          this.offlineName = false
          this.offlineEmail = false
          this.offlineMobile = false
          this.offlineNameMandatory = false
          this.offlineEmailMandatory = false
          this.offlineMobileMandatory = false
        }
      }
    },
    offlineName: {
      get() {
        return this.store.state.department.department.offlineForm.name
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'offlineForm',
          value: value,
          property: 'name'
        })

        if (!value) {
          this.offlineNameMandatory = false
        }
      }
    },
    offlineNameMandatory: {
      get() {
        return this.store.state.department.department.offlineForm.isNameRequired
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'offlineForm',
          value: value,
          property: 'isNameRequired'
        })
      }
    },
    offlineEmail: {
      get() {
        return this.store.state.department.department.offlineForm.email
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'offlineForm',
          value: value,
          property: 'email'
        })

        if (!value) {
          this.offlineEmailMandatory = false
        }
      }
    },
    offlineEmailMandatory: {
      get() {
        return this.store.state.department.department.offlineForm.isEmailRequired
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'offlineForm',
          value: value,
          property: 'isEmailRequired'
        })
      }
    },
    offlineMobileMandatory: {
      get() {
        return this.store.state.department.department.offlineForm.isMobileNumberRequired
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'offlineForm',
          value: value,
          property: 'isMobileNumberRequired'
        })
      }
    },
    offlineMobile: {
      get() {
        return this.store.state.department.department.offlineForm.mobile
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'offlineForm',
          value: value,
          property: 'mobile'
        })

        if (!value) {
          this.offlineMobileMandatory = false
        }
      }
    },

    offlinFormEmail: {
      get() {
        return this.store.state.department.department.offlineFormEmail
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'offlineFormEmail',
          value: value
        })
      }
    },
    offlineFormMessage: {
      get() {
        return this.store.state.department.department.offlineFormMessage
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'offlineFormMessage',
          value: value
        })
      }
    },
    announcementBanner: {
      get() {
        return this.store.state.department.department.announcementBanner
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'announcementBanner',
          value: value
        })
      }
    },
    chatCloseTime: {
      get() {
        return this.store.state.department.department.chatSetting.closeTime
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'chatSetting',
          value: value,
          property: 'closeTime'
        })
      }
    },
    uniqueIdentifier: {
      get() {
        return this.store.state.department.department.chatSetting.uniqueIdentifier
      },
      set(value) {
        this.store.commit('department/SET_DEPARTMENT_DATA', {
          key: 'chatSetting',
          value: value,
          property: 'uniqueIdentifier'
        })
      }
    }
  },
  data() {
    return { customImageMaxSize: 3 }
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('department/saveDepartment').then(() => {
            this.$swal('Success', 'Department saved succesfully!!', 'info')

            this.$router.push('/department')
          })
        }
      })
    },
    // onFile(file) {

    // },

    onLoad(dataUri) {
      this.store.commit('department/SET_DEPARTMENT_DATA', {
        key: 'imgString',
        value: dataUri
      })
    }

    // onSizeExceeded(size) {

    // }
  }
}
</script>
