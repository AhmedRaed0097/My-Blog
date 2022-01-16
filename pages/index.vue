<template>
  <div>
    <br />
    <br />
    <v-row style="position: relative; bottom: 112px">
      <v-col cols="12">
        <div class="home-header">
          <div class="header-text">
            <h1>Do What You Want Not People Want</h1>
            <div class="action-button">
              <v-btn> Action </v-btn>
            </div>
          </div>
        </div>
        <v-col cols="12">
          <most-view-posts></most-view-posts>
        </v-col>

        <v-col cols="12" style="padding: 97px 70px !important;background: #dfdfdf;">
          <more-recent-posts></more-recent-posts>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import carousel from '~/components/Home/carousel.vue'
import MostViewPosts from '~/components/Home/most-view-posts.vue'
import MoreRecentPosts from '~/components/Home/more-recent-posts.vue'
export default {
  components: { carousel, MostViewPosts, MoreRecentPosts },
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
  width: 276px;
  position: relative;
  top: 298px;
  left: 60px;
  h1 {
    color: #fff;
  }
}
.action-button{
  .v-btn{
    padding: 0 16px !important;
  }
  }

</style>
