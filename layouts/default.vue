<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      v-if="$vuetify.breakpoint.mdAndDown"
      :color="isScrolling === true ? '#ffc86d' : 'transparent'"
    >
      <v-list nav dense>
        <v-list-item v-if="isLoggedIn" to="auth/register">
          <v-list-item-title> </v-list-item-title>
          <v-speacer></v-speacer>
          <span @click="signOut"> Logout </span>
        </v-list-item>

        <v-list-item v-else>
          <v-list-item-title
            ><NuxtLink to="auth/register">Register</NuxtLink></v-list-item-title
          >
        </v-list-item>
      </v-list>
      <!--
               -->
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar
      app
      flat
      width="100vw"
      :color="isScrolling === true ? '#ffc86d' : 'transparent'"
    >
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="$vuetify.breakpoint.mdAndDown"
      >
      </v-app-bar-nav-icon>

      <v-list
        nav
        dense
        class="larg-screen-nav"
        v-if="$vuetify.breakpoint.lgAndUp"
      >
        <div class="left-side">
          <v-list-item>
            <v-list-item-title>
              <span @click="signOut"> Home </span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <span @click="signOut"> About </span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <span @click="signOut"> Last Posts </span>
            </v-list-item-title>
          </v-list-item>
        </div>
        <div class="right-side">
          <v-list-item v-if="isLoggedIn" to="auth/register">
            <v-list-item-title>
              <span @click="signOut"> Logout </span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-else>
            <v-list-item-title
              ><NuxtLink class="register-link" to="auth/register"
                >Register</NuxtLink
              ></v-list-item-title
            >
          </v-list-item>
        </div>
      </v-list>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
    <footer>
      <Footer />
    </footer>
  </v-app>
</template>
<script>
import Footer from '~/components/footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Footer,
  },
  data() {
    return {
      isScrolling: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.loggedIn
    },
    user() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('auth/signOut')
      this.$router.replace('/auth/register')
    },
    handleScroll(event) {
      if (window.scrollY > 0) {
        this.isScrolling = true
      } else {
        this.isScrolling = false
      }
      // Any code to be executed when the window is scrolled
    },
  },
  created() {
    if (process.browser) {
      if (window.scrollY > 0) {
        this.handleScroll()
      }
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="scss" scoped>

.larg-screen-nav {
  // display: flex;
  width: 100%;
  // gap: 50px;
  padding: 0 40px !important;
  background: transparent;
}
.left-side{
  display: flex; width: 50%;float:left
}
.right-side{
  float: right;
.register-link{
  text-decoration: none; color:#000
}
}
</style>
