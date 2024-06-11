import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/store'

axios.defaults.baseURL = process.env.VUE_APP_API_URL + 'api'

Vue.use(VueAxios, axios)

axios.interceptors.request.use(
  config => {
    if (config.url !== '/checkauth') {
      store.dispatch('auth/setLoader', {
        loader: true
      })
    }
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
    return new Promise(() => {
      store.dispatch('auth/setLoader', {
        loader: false
      })
      if (err.status === 401) {
        store.commit('auth/RESET')
        window.location.href = '/login'
        return
      }

      var message = ''

      if (err.data) {
        if (err.data.error) {
          var errors = []
          err.data.error.details.forEach(element => {
            errors.push(element.message)
          })
          message = errors.join('<br/>')
        } else message = err.data.message

        Vue.swal('Error', message, 'error')
      }
      return Promise.reject(err)
    })
  }
)

export default {}
