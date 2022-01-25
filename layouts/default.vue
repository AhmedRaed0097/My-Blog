<template>
  <v-app>
    <Nav />
    <v-main>
      <Nuxt />
    </v-main>
    <br>
    <br>
    <br>
    <br>
    <br>
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
