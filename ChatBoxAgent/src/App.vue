<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import './plugins/veeValidate'
import notificationHelper from './helpers/notificationHelper'

const defaultLayout = 'none'

export default {
 
  computed: {
    layout() {
      return `${this.$route.meta.layout || defaultLayout}-layout`
    }
  },
  mounted() {
    notificationHelper.askNotificationPermission();
   
  }
}
</script>

<style>
@import 'https://use.fontawesome.com/releases/v5.7.2/css/all.css';
@import './assets/css/main.css';
</style>
