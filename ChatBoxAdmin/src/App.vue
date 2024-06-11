<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import './plugins/veeValidate'

const defaultLayout = 'none'

export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || defaultLayout}-layout`
    }
  },
  created() {
    setInterval(() => {
      this.$store.dispatch('auth/checkAuth')
    }, 3000)
  }
}
</script>

<style>
@import './assets/css/bootstrap.css';
@import 'https://use.fontawesome.com/releases/v5.7.2/css/all.css';
@import './assets/css/main.css';
@import './assets/css/vue-multiselect.min.css';
</style>
