<template>
  <nav>
    <!-- LARGE SCREEN  -->

    <v-navigation-drawer
      v-model="drawer"
      app
      v-if="$vuetify.breakpoint.mdAndDown"
      color="#fff"
    >
      <v-list nav dense class="list-small-screen">
        <v-list-item>
          <v-list-item-title>
            <NuxtLink class="nav-link" to="/blogs">
              <strong> HOME </strong>
            </NuxtLink>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <NuxtLink class="nav-link" to="/blogs">
              <strong> BLOGS </strong>
            </NuxtLink>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <NuxtLink class="nav-link" to="/create-blog">
              <strong>CREATE BLOG</strong>
            </NuxtLink>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isLoggedIn" to="auth/register">
          <v-list-item-title>
            <span @click="signOut"> Logout </span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-else>
          <v-list-item-title
            ><NuxtLink class="register-link nav-link" to="auth/register">
              <strong> SIGNIN/SIGNUP </strong>
            </NuxtLink></v-list-item-title
          >
        </v-list-item>
      </v-list>
      <!--
               -->
      <!--  -->
    </v-navigation-drawer>

    <!--//  -->

    <!-- LARGE SCREEN  -->
    <v-app-bar
      app
      flat
      width="100vw"
      :color="isScrolling === true ? '#fff' : 'transparent'"
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
          <v-list-item class="nav-item" to="/" active-class="nav-item-active">
            <v-list-item-title>
              <strong> HOME </strong>
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="nav-item" to="/blogs" active-class="nav-item-active">
            <v-list-item-title>
              <strong> BLOGS </strong>
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="nav-item" to="/create-blog" active-class="nav-item-active">
            <v-list-item-title>
              <strong> CREATE BLOG </strong>
            </v-list-item-title>
          </v-list-item>
        </div>
        <div class="right-side">
          <v-list-item
            v-if="isLoggedIn"
            to="auth/register"
            active-class="active-list-item"
          >
            <v-list-item-title>
              <span @click="signOut"> Logout </span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-else active-class="active-list-item">
            <v-list-item-title
              ><NuxtLink class="register-link nav-link" to="auth/register">
                <strong> SIGNIN/SIGNUP </strong>
              </NuxtLink></v-list-item-title
            >
          </v-list-item>
        </div>
      </v-list>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
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

<style lang="scss" >
.larg-screen-nav {
  // display: flex;
  width: 100%;
  // gap: 50px;
  padding: 0 40px !important;
  background: transparent;
  .v-list-item {
    text-align: center;
    text-transform: uppercase;
  }
}
.left-side {
  display: flex;
  width: 50%;
  float: left;
}
.right-side {
  float: right;
  .register-link {
    text-decoration: none;
    color: #000;
  }
}
.nav-link {
  text-decoration: none;
  color: #000 !important;
  transition: 0.2s ease all;
  &:hover {
    color: #fff !important;
  }
}
.list-small-screen {
  height: 256px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 10px !important;
  padding-left: 20px !important;
}
.v-list {
  background: transparent !important;
}

.nav-item-active {
  border-bottom: 2px solid #000;
  &::before {
    opacity: 0;
  }
}
.v-list-item--active {
  &::before {
    opacity: 0;
  }
}
.nav-item{
  margin: 0 20px !important;

}
</style>