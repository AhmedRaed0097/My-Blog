<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      v-if="$vuetify.breakpoint.mdAndDown"
    >
      <v-list nav dense>
        <v-list-item v-if="isLoggedIn" to="auth/register">
          <v-list-item-title>
            <span @click="signOut"> Logout </span>
          </v-list-item-title>
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

    <v-app-bar app flat width="100vw" color="transparent">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="$vuetify.breakpoint.mdAndDown"
      >
      </v-app-bar-nav-icon>

      <v-list nav dense class="larg-screen-nav"  v-if="$vuetify.breakpoint.lgAndUp">
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
        <v-list-item v-if="isLoggedIn" to="auth/register">
          <v-list-item-title>
            <span @click="signOut"> Logout </span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-else>
          <v-list-item-title
            ><NuxtLink to="auth/register">Register</NuxtLink></v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
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
  },
}
</script>

<style lang="scss" scoped>
.larg-screen-nav{
      display: flex;
    gap: 150px;
    background: transparent;
}
</style>
