<template>
  <div :class="'' + (this.$store.state.auth.loader === true ? 'loader-overlay' : '')">
    <Header />
    <Nav />
    <div class="inner-container">
      <div class="loader" v-if="this.$store.state.auth.loader">
        <div class="ball-rotate">
          <div></div>
        </div>
      </div>

      <slot />
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Nav from '../components/Nav.vue'

export default {
  components: {
    Header,
    Nav,
    Footer
  }
}
</script>
