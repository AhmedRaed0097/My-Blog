<template>
  <v-app>
    <Nav />
    <v-main style="padding: 0;">
      <Nuxt style="padding-top: 64px;" />
    </v-main>
    <footer style="margin-top: 100px;">
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
