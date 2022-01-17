<template>
  <div>
    <br />
    <br />
    <v-row style="position: relative; bottom: 112px">
      <v-col cols="12">
        <div class="home-header">
          <div class="header-text">
            <h1>WELCOME TO MY BLOG</h1>
            <h2>Do what you want, not what people want</h2>
            <div class="action-button">
              <v-btn> Action </v-btn>
            </div>
          </div>
        </div>
        <v-col cols="12">
          <most-view-blogs></most-view-blogs>
        </v-col>

        <v-col cols="12" style="padding: 97px 70px !important;background: #dfdfdf;">
          <more-recent-blogs></more-recent-blogs>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import carousel from '~/components/Home/carousel.vue'
import MostViewBlogs from '~/components/Home/most-view-blogs.vue'
import MoreRecentBlogs from '~/components/Home/more-recent-blogs.vue'
export default {
  components: { carousel, MostViewBlogs, MoreRecentBlogs },
  name: 'IndexPage',

  methods: {},
}
</script>
<style lang="scss">
.home-header {
  height: 700px;
  background-image: url('~/assets/images/header-image.jpg');
  background-position: center;
  background-size: cover;
}
.header-text {
  width: 326px;
  position: relative;
  top: 298px;
  left: 60px;
  h1  ,h2{
    text-transform: uppercase;
    color: #fff;
  }
}
.action-button{
  .v-btn{
    padding: 0 16px !important;
  }
  }

</style>
