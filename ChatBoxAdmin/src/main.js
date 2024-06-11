import Vue from 'vue'

import VeeValidate from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2'
import BootstrapVue from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
import VueTheMask from 'vue-the-mask'

import App from './App.vue'
import router from './router'
import axios from './plugins/axios'
import store from './store'
import './registerServiceWorker'

import Default from './layouts/default.vue'
import None from './layouts/none.vue'

import VueLodash from 'vue-lodash'
import '@progress/kendo-ui'
import { Grid } from '@progress/kendo-vue-grid'
import { DateinputsInstaller, DatePicker } from '@progress/kendo-dateinputs-vue-wrapper'

//
// thirdly, register components to Vue
//

Vue.use(VueTheMask)
Vue.use(DateinputsInstaller)
Vue.use(require('vue-moment'))
// register globally
Vue.component('multiselect', Multiselect)
Vue.component('kendo-datepicker', DatePicker)

Vue.component('default-layout', Default)
Vue.component('none-layout', None)
import '@progress/kendo-theme-default/dist/all.css'

Vue.component('Grid', Grid)

Vue.use(VeeValidate)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
const options = { name: 'lodash' } // customize the way you want to call it

Vue.use(VueLodash, options) // options is optional

Vue.component('default-layout', Default)
Vue.component('none-layout', None)

Vue.config.productionTip = false

new Vue({
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
