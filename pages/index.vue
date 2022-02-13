<template>
  <div>
    <br />
    <br />
    <v-row style="position: relative; bottom: 112px">
      <v-col cols="12">
        <div class="home-header">
          <div class="header-text">
            <p :style="$vuetify.breakpoint.mdAndUp?'font-size: 2em;font-weight: bold;':'font-size: 18px;colo:#000;font-weight: bold;'">WELCOME TO MY BLOG</p>
            <p :style="$vuetify.breakpoint.mdAndUp?'font-size: 1em;font-weight: bold;':'font-size: 15px;colo:#000;font-weight: bold;'">Do what you want, not what people want</p>
            <div class="action-button">
              <v-btn text> Let's Go </v-btn>
            </div>
          </div>
        </div>
        <v-col cols="12" style="padding: 0;">
          <most-view-blogs></most-view-blogs>
        </v-col>

        <v-col cols="12" style="padding: 97px 70px !important;background: #dfdfdf;">
          <more-recent-blogs></more-recent-blogs>
        </v-col>

        <v-col cols="12">
          <never-miss></never-miss>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import carousel from '~/components/Home/carousel.vue'
import MostViewBlogs from '~/components/Home/most-view-blogs.vue'
import MoreRecentBlogs from '~/components/Home/more-recent-blogs.vue'
import NeverMiss from '~/components/Home/never-miss.vue'
export default {
  components: { carousel, MostViewBlogs, MoreRecentBlogs, NeverMiss },
  name: 'IndexPage',

  methods: {},
}
</script>
<style lang="scss">
.home-header {
  height: 700px;
  background-image: url('~assets/images/design/image1.jpg');
  background-position: center;
  background-size: cover;
}
.header-text {
  position: relative;
  top: 298px;
  text-align: center;
    font-family: 'Raleway-Italic' ;
  p{
    text-transform: uppercase;
    color: #fff;
  }
}
.action-button{
  .v-btn{
    margin-top: 10px !important;
    padding: 0 16px !important;
    border:1px solid #000;
    transition: 0.8s ease all;
      color:#fff;
    &:hover{
      background: #fff;
      color:#000;
    border:1px solid #ffc86d;

    }
  }
  }

</style>
