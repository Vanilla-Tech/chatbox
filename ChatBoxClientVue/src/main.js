import Vue from "vue";
import App from "./App.vue";

import VeeValidate from "vee-validate";

Vue.use(VeeValidate, { events: "change|blur" });

import VueSocketIO from "vue-socket.io";
const debug = process.env.NODE_ENV === "development";

Vue.use(
  new VueSocketIO({
    debug: debug,
    connection: process.env.VUE_APP_API_URL
  })
);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#mta_chat");
