import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store'

axios.defaults.baseURL = process.env.VUE_APP_API_URL + 'api'

Vue.use(VueAxios, axios)

axios.interceptors.request.use(
  config => {
    store.dispatch('auth/setLoader', {
      loader: true
    })
    config.headers.common['Content-Type'] = 'application/json'
    if (store.state.auth.authUser) {
      config.headers.common.Authorization = 'Bearer ' + store.state.auth.authUser.token
    }
    return config
  },
  err => Promise.reject(err)
)

axios.interceptors.response.use(
  response => {
    // Do something with response data
    store.dispatch('auth/setLoader', {
      loader: false
    })
    return response
  },
  error => {
    const err = error.response
    // Do something with response error
    return new Promise((resolve, reject) => {
      store.dispatch('auth/setLoader', {
        loader: false
      })
      if (err.status === 401) {
        window.location.href = '/login'
        return
      }
      if (err.data) {
        Vue.swal('Error', err.data.message, 'error')
      }
      return reject(err)
    })
  }
)

export default {}
