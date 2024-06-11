<template>
  <div class="content-area">
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="add-button-wrap">
              <router-link to="/user/add" class="btn add-button" v-if="mode === undefined">
                <i class="fa fa-plus"></i> Add User
              </router-link>
              <router-link to="/user" class="btn add-button" v-if="mode !== undefined">
                <i class="fa fa-plus"></i> Cancel
              </router-link>
            </div>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
    </div>
    <!--end page header-->

    <div class="content">
      <div class="container pad-top15 pad-bottom15">
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <Grid
                ref="grid"
                :style="{ height: '520px' }"
                :data-items="data"
                :resizable="true"
                :sortable="true"
                :pageable="true"
                :take="take"
                :skip="skip"
                :filterable="true"
                :filter="filter"
                :sort="sort"
                :columns="columns"
                @dataStateChange="dataStateChange"
                @pagechange="pageChangeHandler"
                @sortchange="sortChangeHandler"
                @filterchange="filterChange"
              >
                <!-- <template slot="departmentTemplate" slot-scope="{ props }">
                  <span v-for="depart in props.dataItem.departments" :key="depart">
                    {{ depart }}
                  </span>
                </template>-->
                <template slot="actionTemplate" slot-scope="{ props }">
                  <td class="action">
                    <router-link
                      :to="'/user/edit/' + props.dataItem.id"
                      v-b-tooltip.hover
                      title="Edit user"
                    >
                      <i class="fa fa-user-edit text-success"></i>
                    </router-link>

                    <a
                      @click="openPopup(props.dataItem.id)"
                      v-b-tooltip.hover
                      title="Reset password"
                    >
                      <i class="fa fa-key text-sucess"></i>
                    </a>
                    <a
                      @click="blockUnblock(props.dataItem)"
                      v-b-tooltip.hover
                      :title="props.dataItem.isBlocked ? 'Unblock user' : 'Block user'"
                    >
                      <i
                        :class="{
                          'fa fa-lock text-danger': !props.dataItem.isBlocked,
                          'fa fa-unlock text-success': props.dataItem.isBlocked
                        }"
                      ></i>
                    </a>
                    <a
                      v-if="props.dataItem.status === 'VERIFIED'"
                      @click="approveUser(props.dataItem)"
                      v-b-tooltip.hover
                      title="Approve user"
                    >
                      <i class="fa fa-check text-success"></i>
                    </a>
                  </td>
                </template>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="show" title="Reset Password" @ok="handleOk" id="RestPassword">
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input
          name="resetPassword"
          v-model="password"
          v-validate="'required|min:4'"
          data-vv-as="Password"
          :class="{ input: true, 'is-danger': errors.has('resetPassword') }"
          placeholder="Enter password"
        ></b-form-input>
        <div v-show="errors.has('resetPassword')" class="help is-danger">
          {{ errors.first('resetPassword') }}
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
///import { VueTable } from '@enso-ui/tables/bulma'
import Base from '../../shared/base'

import Vue from 'vue'
import axios from 'axios'
export default {
  extends: Base,
  //components: { VueTable },

  beforeRouteEnter(from, to, next) {
    next()
  },
  mounted() {
    this.url.list = '/users/datatable'
    this.$store.dispatch('user/resetUser')
    this.getData()
  },
  data() {
    return {
      password: null,
      userid: null,
      show: false,
      columns: [
        { field: 'name', title: 'Name' },
        { field: 'staffId', title: 'Staff ID' },
        { field: 'email', title: 'Email Address' },
        { field: 'type', title: 'Type' },
        { field: 'departments', title: 'Department' },
        // {
        //   title: 'Deparments',
        //   cell: 'departmentTemplate',
        //   filterable: false,
        //   width: '200px'
        // },
        {
          title: 'Action',
          cell: 'actionTemplate',
          filterable: false,
          width: '200px'
        }
      ]
    }
  },
  methods: {
    openPopup(userid) {
      this.show = true
      this.userid = userid
      this.password = null
      this.errors.clear()
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          axios
            .post('resetPassword', {
              userId: this.userid,
              password: this.password
            })
            .then(() => {
              this.show = false
              this.password = null
              this.userid = null
              Vue.swal.fire('Success!', 'Password reset successfully', 'success')
            })
        }
      })
    },
    edit() {},

    statusUpdate() {},

    onChange(value) {
      this.value = value
      if (value.indexOf('Reset me!') !== -1) this.value = []
    },
    onSelect(option) {
      if (option === 'Disable me!') this.isDisabled = true
    },
    onTouch() {
      this.isTouched = true
    },
    approveUser(dataItem) {
      var title = 'Are you sure, you want to approve user ?'
      Vue.swal
        .fire({
          title: 'Information',
          text: title,
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Approve User'
        })
        .then(result => {
          if (result.value) {
            var url = 'users/approveuser'
            axios
              .post(url, {
                userId: dataItem.id
              })
              .then(() => {
                this.getData()
                Vue.swal.fire('Success!', 'User approved successfully', 'success')
              })
          }
        })
    },
    blockUnblock(dataItem) {
      var title =
        'Are you sure, you want to ' + (dataItem.isBlocked ? 'unblock' : 'block') + ' user ?'
      Vue.swal
        .fire({
          title: 'Information',
          text: title,
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: dataItem.isBlocked ? 'Unblock User' : 'Block User'
        })
        .then(result => {
          if (result.value) {
            var url = dataItem.isBlocked ? 'users/unblock' : 'users/block'
            axios
              .post(url, {
                userId: dataItem.id
              })
              .then(() => {
                this.getData()

                Vue.swal.fire(
                  'Success!',
                  'User ' + (dataItem.isBlocked ? 'unblocked' : 'blocked') + ' successfully',
                  'success'
                )
              })
          }
        })
    },

    resetPassword() {
      Vue.swal
        .fire({
          title: 'Reset Password',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Look up',
          showLoaderOnConfirm: true,
          allowOutsideClick: () => !Vue.swal.isLoading()
        })
        .then(result => {
          if (result.value) {
            Vue.swal.fire({
              title: `${result.value.login}'s avatar`,
              imageUrl: result.value.avatar_url
            })
          }
        })
    }
  }
}
</script>
