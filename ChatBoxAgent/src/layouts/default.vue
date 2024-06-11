<template>
  <div :class="this.$store.state.auth.loader === true ? 'loader-overlay' : ''">
    <Header />
    <LeftPanel />
    <div class="message-panel">
      <div v-if="this.$store.state.auth.loader === true" class="authenticating aloader">
        <!-- <h4>loading..</h4> -->
        <div class="loader" id="loader-1"></div>
      </div>
      <slot />
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import LeftPanel from '../components/LeftPanel.vue'

export default {
  components: {
    Footer,
    Header,
    LeftPanel
  },
  data() {
    return {
      title: 'Chat Box Agent'
    }
  }
}
</script>
