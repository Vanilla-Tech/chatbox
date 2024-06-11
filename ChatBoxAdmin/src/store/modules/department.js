import axios from 'axios'
import Vue from 'vue'

const defaultState = () => ({
  department: {
    _id: null,
    name: null,
    displayName: null,
    code: null,
    channels: [
      { code: 'PORTAL', label: 'Commercial Website', isChecked: true },
      { code: 'WEB', label: 'Web Portal', isChecked: true },
      { code: 'APP', label: 'Mobile Application', isChecked: true }
    ],
    preChatForm: {
      isRequired: true,
      name: true,
      email: true,
      mobile: true,
      isNameRequired: true,
      isMobileNumberRequired: true,
      isEmailRequired: true
    },
    offlineForm: {
      isRequired: true,
      name: true,
      email: true,
      mobile: true,
      isNameRequired: true,
      isMobileNumberRequired: true,
      isEmailRequired: true
    },
    offlineFormMessage: null,
    offlineFormEmail: null,
    announcementBanner: null,
    chatSetting: {
      closeTime: null,
      uniqueIdentifier: null
    },
    openingDetails: [
      {
        day: 'Monday',
        openingTime: '0',
        closingTime: '0',
        openingTimeStr: '00:00',
        closingTimeStr: '00:00',
        isActive: true
      },
      {
        day: 'Tuesday',
        openingTime: '0',
        closingTime: '0',
        openingTimeStr: '00:00',
        closingTimeStr: '00:00',
        isActive: true
      },
      {
        day: 'Wednesday',
        openingTime: '0',
        closingTime: '0',
        openingTimeStr: '00:00',
        closingTimeStr: '00:00',
        isActive: true
      },
      {
        day: 'Thursday',
        openingTime: '0',
        closingTime: '0',
        openingTimeStr: '00:00',
        closingTimeStr: '00:00',
        isActive: true
      },
      {
        day: 'Friday',
        openingTime: '0',
        closingTime: '0',
        openingTimeStr: '00:00',
        closingTimeStr: '00:00',
        isActive: true
      },
      {
        day: 'Saturday',
        openingTime: '0',
        closingTime: '0',
        openingTimeStr: '00:00',
        closingTimeStr: '00:00',
        isActive: false
      },
      {
        day: 'Sunday',
        openingTime: '0',
        closingTime: '0',
        openingTimeStr: '00:00',
        closingTimeStr: '00:00',
        isActive: false
      }
    ]
  },
  title: 'Department',
  loader: false
})

// state
const state = defaultState()

const mapJson = (obj, json) => {
  for (var i in obj) {
    if (obj[i] != null && typeof obj[i] == 'object') mapJson(obj[i], json[i])
    else obj[i] = json.hasOwnProperty(i) ? json[i] : obj[i]
  }
}

const hhmm = data => {
  var minutes = data % 60
  var hours = (data - minutes) / 60

  if (hours == 0) hours = '00'
  else if (hours > 0 && hours < 10) hours = '0' + hours

  if (minutes == 0) minutes = '00'
  else if (minutes > 0 && minutes < 10) minutes = '0' + minutes

  return hours + ':' + minutes
}

// getters
const getters = {}

// actions
const actions = {
  setDepartment({ commit }, { id }) {
    return new Promise(resolve => {
      axios.get('/department/getbyid/' + id).then(response => {
        if (response.data) {
          commit('SET_DEPARTMENT', response.data)
        } else {
          commit('SET_DEPARTMENT', null)
        }
        resolve(response)
      })
    })
  },
  saveDepartment({ state }) {
    var channelList = []

    var checkeds = state.department.channels.filter(m => {
      return m.isChecked
    })

    checkeds.forEach(element => {
      channelList.push({ code: element.code })
    })

    var url = state.department._id == null ? '/department/create' : '/department/update'
    var params = {
      id: state.department._id,
      name: state.department.name,
      displayName: state.department.displayName,
      code: state.department.code,
      channels: channelList,
      preChatForm: state.department.preChatForm,
      offlineForm: state.department.offlineForm,
      offlineFormMessage: state.department.offlineFormMessage,
      offlineFormEmail: state.department.offlineFormEmail,
      announcementBanner: state.department.announcementBanner,
      chatSetting: state.department.chatSetting,
      openingDetails: state.department.openingDetails
    }

    return new Promise(resolve => {
      axios.post(url, params).then(response => {
        resolve(response)
      })
    })
  },
  setTitle({ commit }, { title }) {
    commit('SET_TITLE', title)
  },
  setLoader({ commit }, { loader }) {
    commit('SET_LOADER', loader)
  },
  resetDepartment({ commit }) {
    commit('REST_DEPARTMENT')
  }
}

// mutations
const mutations = {
  REST_DEPARTMENT(state) {
    Object.assign(state, defaultState())
  },
  SET_DEPARTMENT(state, department) {
    var channels = department.channels
    delete department.channels

    department['channels'] = [
      { code: 'PORTAL', label: 'Commercial Website', isChecked: false },
      { code: 'WEB', label: 'Web Portal', isChecked: false },
      { code: 'APP', label: 'Mobile Application', isChecked: false }
    ]

    department.channels.forEach(s => {
      var channel = channels.filter(m => {
        return m.code == s.code
      })
      if (channel.length != 0) {
        s.isChecked = true
      }
    })

    department.openingDetails.forEach(s => {
      if (s.isActive) {
        s['openingTimeStr'] = hhmm(s.openingTime)
        s['closingTimeStr'] = hhmm(s.closingTime)
      }
    })

    mapJson(state.department, department)
  },
  SET_GRID_DEPARTMENT(state, gridData) {
    state.kendo.gridData = gridData
  },
  SET_SOURCE_GRID_USER(state, productList) {
    state.productList = productList
  },
  SET_DEPARTMENT_DATA(state, data) {
    if (Object.prototype.toString.call(state.department[data.key]) === '[object Array]') {
      state.department[data.key][data.index][data.property] = data.value
    } else if (Object.prototype.toString.call(state.department[data.key]) === '[object Object]') {
      state.department[data.key][data.property] = data.value
    } else state.department[data.key] = data.value
  },
  SET_KENDO_DATA(state, data) {
    Vue.lodash.each(data, (value, key) => {
      state.kendo[key] = value
    })
  },
  SET_TITLE(state, title) {
    state.title = title
  },
  SET_LOADER(state, loader) {
    state.loader = loader
  },
  SET_Filter(state, filter) {
    state.kendo.filter = filter
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
