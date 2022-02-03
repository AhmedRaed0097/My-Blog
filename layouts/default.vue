<template>
  <v-app>
    <Nav />
    <v-main>
      <Nuxt />
    </v-main>
    <footer>
      <Footer />
    </footer>
  </v-app>
</template>
<script>
import Footer from '~/components/FooterComponent.vue'
import Nav from '~/components/nav-bar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Footer,
    Nav,
  },



}
</script>

<style lang="scss" >
</style>
