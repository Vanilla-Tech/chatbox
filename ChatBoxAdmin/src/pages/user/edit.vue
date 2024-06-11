<template>
  <div class="content-area">
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h3>Add New User</h3>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
    </div>
    <!--end page header-->
    <form @submit.prevent="onSubmit" novalidate autocomplete="off">
      <div class="content">
        <div class="container pad-top15 pad-bottom15">
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <label>Icon</label>
                <div class="custom-file">
                  <vue-base64-file-upload
                    class="v1"
                    accept="image/png, image/jpeg"
                    disable-preview
                    input-class="v1-input"
                    :max-size="customImageMaxSize"
                    @load="onLoad"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <div class="img-preview">
                  <img :src="$store.state.user.user.customerImage" />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>User Type</label>
                <select
                  v-validate="'required'"
                  :value="this.$store.state.user.user.type"
                  name="UserType"
                  data-vv-as="UserType"
                  class="form-control"
                  placeholder="Select UserType"
                  @change="updateUserType"
                >
                  <option value>Select UserType</option>
                  <option
                    v-for="item in $store.state.user.userTypesList"
                    :key="item"
                    :value="item"
                  >{{ item }}
                  </option
                  >
                </select>

                <div v-show="errors.has('UserType')" class="help is-danger">
                  {{ errors.first("UserType") }}
                </div>
              </div>
            </div>
          </div>
          <!--end row-->

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  autocomplete="off"
                  v-model="name"
                  v-validate="'required'"
                  data-vv-as="Name"
                  :class="{ input: true, 'is-danger': errors.has('name') }"
                />
                <div v-show="errors.has('name')" class="help is-danger">
                  {{ errors.first("name") }}
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  class="form-control"
                  autocomplete="off"
                  v-model="displayName"
                  v-validate="'required'"
                  data-vv-as="DisplayName"
                  :class="{ input: true, 'is-danger': errors.has('displayName') }"
                />
                <div v-show="errors.has('displayName')" class="help is-danger">
                  {{ errors.first("displayName") }}
                </div>
              </div>
            </div>
          </div>
          <!--end row-->
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Staff ID</label>
                <input
                  type="text"
                  name="staffId"
                  class="form-control"
                  autocomplete="off"
                  v-model="staffId"
                  v-validate="'required'"
                  data-vv-as="Staff Id is"
                  :class="{ input: true, 'is-danger': errors.has('staffId') }"
                />
                <div v-show="errors.has('staffId')" class="help is-danger">
                  {{ errors.first("staffId") }}
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>IC Number</label>
                <input
                  type="text"
                  name="icNumber"
                  class="form-control"
                  autocomplete="off"
                  v-model="icNumber"
                  v-validate="'required'"
                  data-vv-as="IC number is"
                  :class="{ input: true, 'is-danger': errors.has('icNumber') }"
                />
                <div v-show="errors.has('icNumber')" class="help is-danger">
                  {{ errors.first("icNumber") }}
                </div>
              </div>
            </div>
          </div>
          <!--end row-->
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  class="form-control"
                  autocomplete="off"
                  v-model="email"
                  v-validate="'required'"
                  data-vv-as="Email address is"
                  :class="{ input: true, 'is-danger': errors.has('email') }"
                />
                <div v-show="errors.has('email')" class="help is-danger">
                  {{ errors.first("email") }}
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Department</label>
                <multiselect
                  placeholder="Pick at least one"
                  name="departments"
                  select-label="Enter doesn’t work here!"
                  :value="$store.state.user.user.departments"
                  v-validate="$store.state.user.user.type !== 'ADMIN' ? 'required' : ''"
                  :options="$store.state.user.departmentsList"
                  :multiple="true"
                  :searchable="true"
                  :allow-empty="true"
                  :hide-selected="true"
                  :max-height="150"
                  :max="0"
                  :block-keys="['Tab', 'Enter']"
                  @input="updateDepartment"
                  @close="onTouch"
                  @select="onSelect"
                  label="name"
                  track-by="id"
                ></multiselect>

                <div v-show="errors.has('departments')" class="help is-danger">
                  {{ errors.first("departments") }}
                </div>
              </div>
            </div>
          </div>
          <!--end row-->
          <div class="row">
            <!-- <div class="col-md-6">
              <div class="form-group">
                <label>Role</label>

                <select
                  v-validate="'required'"
                  :value="this.$store.state.user.user.roleId"
                  name="roleId"
                  data-vv-as="Role"
                  class="form-control"
                  placeholder="Select Role"
                  @change="updateRole"
                >
                  <option value>Select Role</option>
                  <option v-for="item in optionRoles" :key="item.Id" :value="item.id">{{
                    item.text
                  }}</option>
                </select>

                <div v-show="errors.has('roleId')" class="help is-danger">
                  {{ errors.first('roleId') }}
                </div>
              </div>
            </div>-->
            <div class="col-md-6">
              <div class="form-group">
                <label>Set Concurrent chat limit</label>
                <input
                  type="text"
                  name="chatThreshold"
                  class="form-control"
                  autocomplete="off"
                  v-model="chatThreshold"
                  v-validate="this.$store.state.user.user.type === 'AGENT' ? 'required' : ''"
                  data-vv-as="chatThreshold is"
                  :class="{ input: true, 'is-danger': errors.has('') }"
                />
                <div v-show="errors.has('chatThreshold')" class="help is-danger">
                  {{ errors.first("chatThreshold") }}
                </div>
              </div>
            </div>
          </div>
          <!--end row-->
          <div class="foot-wrap">
            <button class="btn btn-primary"><i class="far fa-save"></i> Save</button>
            <router-link class="btn btn-danger" to="/user">
              <i class="fas fa-times-circle"></i> Cancel
            </router-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Base from "../../shared/base";

import VueBase64FileUpload from "vue-base64-file-upload";

export default {
  extends: Base,
  components: { VueBase64FileUpload },

  beforeRouteEnter(from, to, next) {
    next(p => {
      p.$store.dispatch("user/initUserAdd", { id: from.params.id });
    });
  },
  computed: {
    password: {
      get() {
        return this.$store.state.user.user.password;
      },
      set(value) {
        this.$store.commit("user/SET_USER_DATA", {
          key: "password",
          value: value
        });
      }
    },
    name: {
      get() {
        return this.$store.state.user.user.name;
      },
      set(value) {
        this.$store.commit("user/SET_USER_DATA", {
          key: "name",
          value: value
        });
      }
    },
    displayName: {
      get() {
        return this.$store.state.user.user.displayName;
      },
      set(value) {
        this.$store.commit("user/SET_USER_DATA", {
          key: "displayName",
          value: value
        });
      }
    },
    staffId: {
      get() {
        return this.$store.state.user.user.staffId;
      },
      set(value) {
        this.$store.commit("user/SET_USER_DATA", {
          key: "staffId",
          value: value
        });
      }
    },
    icNumber: {
      get() {
        return this.$store.state.user.user.icNumber;
      },
      set(value) {
        this.$store.commit("user/SET_USER_DATA", {
          key: "icNumber",
          value: value
        });
      }
    },
    email: {
      get() {
        return this.$store.state.user.user.email;
      },
      set(value) {
        this.$store.commit("user/SET_USER_DATA", { key: "email", value: value });
      }
    },
    departments: {
      get() {
        return this.$store.state.user.user.departments;
      },
      set(value) {
        this.$store.commit("user/SET_USER_DATA", {
          key: "departments",
          value: value
        });
      }
    },
    // roleId: {
    //   get() {
    //     return this.$store.state.user.user.roleId
    //   },
    //   set(value) {
    //     this.$store.commit('user/SET_USER_DATA', {
    //       key: 'roleId',
    //       value: value
    //     })
    //   }
    // },
    chatThreshold: {
      get() {
        return this.$store.state.user.user.chatThreshold;
      },
      set(value) {
        this.$store.commit("user/SET_USER_DATA", {
          key: "chatThreshold",
          value: value
        });
      }
    }
  },
  data() {
    return {
      customImageMaxSize: 3,
      value: []
    };
  },
  methods: {
    updateDepartment: function(e) {
      this.$store.commit("user/SET_USER_DATA", {
        key: "departments",
        value: e
      });
    },

    updateUserType: function(e) {
      this.$store.commit("user/SET_USER_DATA", {
        key: "type",
        value: e.target.value
      });
    },
    onChange(value) {
      this.value = value;
    },
    onSelect() {
    },
    onTouch() {
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch("user/saveUser").then(() => {
            //this.$store.dispatch('user/reset')
            this.$swal("Success", "User saved succesfully!!", "info");
            this.$router.push("/user/");
          });
        }
      });
    },
    // onFile(file) {
    // },

    onLoad(dataUri) {
      this.$store.commit("user/SET_USER_DATA", {
        key: "customerImage",
        value: dataUri
      });
    }
  }
};
</script>
