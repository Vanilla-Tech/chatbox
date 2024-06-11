<template>
  <div class="content-area">
    <div class="page-header">
      <div class="content">
        <div class="container pad-top15 pad-bottom15">
          <form @submit.prevent="onSubmit" novalidate autocomplete="off">
            <h3>Chat Log Filter</h3>
            <hr />
            <div class="row">
              <div class="col-md-3 col-sm-6">
                <div class="form-group">
                  <label>From Date</label>
                  <kendo-datepicker
                    name="fromDate"
                    data-vv-as="Start date"
                    class="form-control filter-fields"
                    :value="filterFileds.fromDate.boundValue"
                    v-model="filterFileds.fromDate.boundValue"
                    :format="'dd/MM/yyyy'"
                    v-validate="{
                      required:
                        filterFileds.toDate.boundValue != '' &&
                        filterFileds.toDate.boundValue != null
                    }"
                  ></kendo-datepicker>
                  <input
                    type="hidden"
                    data-vv-as="Start date"
                    ref="fromDate"
                    :value="filterFileds.fromDate.boundValue"
                  />
                </div>
                <div
                  v-show="errors.has('fromDate')"
                  class="help is-danger"
                >{{ errors.first('fromDate') }}</div>
              </div>
              <div class="col-md-3 col-sm-6">
                <div class="form-group">
                  <label>To Date</label>
                  <kendo-datepicker
                    name="toDate"
                    data-vv-as="End date"
                    class="form-control filter-fields"
                    :value="filterFileds.toDate.boundValue"
                    v-model="filterFileds.toDate.boundValue"
                    :format="'dd/MM/yyyy'"
                    v-validate="{
                      required:
                        filterFileds.fromDate.boundValue != '' &&
                        filterFileds.fromDate.boundValue != null,
                      dateGreaterThan: 'fromDate'
                    }"
                  ></kendo-datepicker>
                </div>
                <div
                  v-show="errors.has('toDate')"
                  class="help is-danger"
                >{{ errors.first('toDate') }}</div>
              </div>
              <div class="col-md-3 col-sm-6">
                <div class="form-group">
                  <label>Department</label>
                  <select
                    name="Department"
                    class="form-control"
                    :value="filterFileds.department.value"
                    v-model="filterFileds.department.value"
                    @change="changeAgent($event)"
                  >
                    <option value>Select Department</option>
                    <option
                      v-for="op in departmentList"
                      :key="op.id"
                      v-bind:value="op.id"
                    >{{ op.name }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                <div class="form-group">
                  <label>Agent</label>
                  <select
                    name="Agent"
                    class="form-control"
                    :value="filterFileds.agent.value"
                    v-model="filterFileds.agent.value"
                  >
                    <option value>Select Agent</option>
                    <option
                      v-for="op in agentListByDepartment"
                      :key="op.id"
                      v-bind:value="op.id"
                    >{{ op.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-sm-6">
                <div class="form-group">
                  <label>Channel</label>
                  <select
                    name="Channel"
                    class="form-control"
                    :value="filterFileds.channel.value"
                    v-model="filterFileds.channel.value"
                  >
                    <option value>Select Channel</option>
                    <option value="PORTAL">Commercial Website</option>
                    <option value="WEB">Web Portal</option>
                    <option value="APP">Mobile Application</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                <div class="form-group">
                  <label>Status</label>
                  <select
                    name="Status"
                    class="form-control"
                    :value="filterFileds.status.value"
                    v-model="filterFileds.status.value"
                  >
                    <option value>Select Status</option>
                    <option
                      v-for="op in $store.state.chat.chatTypes"
                      :key="op.key"
                      :value="op.key"
                    >{{ op.value }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                <div class="form-group">
                  <label>Rating</label>
                  <select
                    name="Rating"
                    class="form-control"
                    :value="filterFileds.rating.value"
                    v-model="filterFileds.rating.value"
                  >
                    <option value>Select Rating</option>
                    <option value="0">None</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <button type="submit" class="btn btn-primary mar-r15">Search Log</button>
                <button type="button" @click="clearFilters" class="btn btn-danger">Clear</button>
              </div>
            </div>
          </form>
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
                :filterable="false"
                :filter="filter"
                :sort="sort"
                :columns="columns"
                @dataStateChange="dataStateChange"
                @pagechange="pageChangeHandler"
                @sortchange="sortChangeHandler"
                @filterchange="filterChange"
              >
                <template slot="actionTemplate" slot-scope="{ props }">
                  <td class="action">
                    <router-link
                      :to="'/chatlog/' + props.dataItem.id"
                      v-b-tooltip.hover
                      title="View Chat"
                    >
                      <i class="fa fa-comments text-success"></i>
                    </router-link>
                  </td>
                </template>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
///import { VueTable } from '@enso-ui/tables/bulma'
import Base from '../../shared/base'

import axios from 'axios'
import moment from 'moment'
export default {
  extends: Base,
  computed: {
    getChatDisplayName(value) {
      return this.$store.getters[('socket/getChatDisplayName', value)]
    }
  },
  beforeRouteEnter(from, to, next) {
    axios
      .all([axios.get('department/list'), axios.get('agent/list')])
      .then(res => {
        next(m => {
          m.agentList = res[1].data
          m.departmentList = res[0].data
        })
      })
  },
  mounted() {
    this.url.list = '/chat/datatable'
    this.getData()
  },
  data() {
    return {
      agentList: [],
      agentListByDepartment: [],
      departmentList: [],
      filterFileds: {
        fromDate: {
          value: '',
          operator: 'gte',
          field: 'startTime',
          boundValue: '',
          isDate: true
        },
        toDate: {
          value: '',
          operator: 'lte',
          field: 'endTime',
          boundValue: '',
          isDate: true
        },
        agent: { value: '', operator: 'eq', field: 'agent' },
        department: { value: '', operator: 'eq', field: 'department' },
        channel: { value: '', operator: 'eq', field: 'channelCode' },
        status: { value: '', operator: 'eq', field: 'status' },
        rating: { value: '', operator: 'eq', field: 'rating' }
      },
      columns: [
        {
          title: 'Action',
          cell: 'actionTemplate',
          filterable: false,
          width: 70
        },
        { field: 'startTime', title: 'Start Time' },
        { field: 'startDate', title: 'Start Date' },
        { field: 'agentName', title: 'Agent' },
        { field: 'uniqueChatId', title: 'Unique Chat Id' },
        { field: 'customerName', title: 'Name' },
        { field: 'customerMobile', title: 'Mobile Number' },
        { field: 'customerEmail', title: 'Email Address' },
        { field: 'departmentName', title: 'Department' },
        { field: 'channelCode', title: 'Channel' },
        { field: 'status', title: 'Status' },
        { field: 'rating', title: 'Rating' }
      ]
    }
  },
  methods: {
    onSubmit() {
      const that = this
      that.$validator.validateAll().then(result => {
        if (result) {
          that.filter = {}
          var currentFilters = []
          var enumberable = Object.entries(that.filterFileds)
          enumberable.forEach(entry => {
            // eslint-disable-next-line no-unused-vars
            const [key, value] = entry
            if (value.value || value.boundValue) {
              if (value.isDate)
                value.value = this.getDateObject(value.boundValue)
              currentFilters.push(value)
            }
          })

          if (currentFilters && currentFilters.length > 0) {
            that.filter = {
              logic: 'and',
              filters: currentFilters
            }
            that.getData()
          }
        }
      })
    },

    getDateObject(value) {
      if (value) {
        var utcDate = moment.utc(value, 'DD/MM/YYYY').toDate()
        return new Date(
          utcDate.getTime() + Math.abs(new Date().getTimezoneOffset() * 60000)
        )
      }
      return null
    },
    clearFilters() {
      this.filter = {}
      this.getData()
      Object.entries(this.filterFileds).forEach(entry => {
        // eslint-disable-next-line no-unused-vars
        const [key, value] = entry
        value.value = ''
        value.boundValue = ''
      })
    },
    changeAgent(e) {
      const that = this
      that.agentListByDepartment = []
      that.agentList.filter(function(elem) {
        elem.departments.filter(function(depart) {
          if (depart === e.target.value) {
            that.agentListByDepartment.push(elem)
          }
        })
      })
    }
  }
}
</script>
