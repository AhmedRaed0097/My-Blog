<template>
  <v-row>
    <v-col cols="12" style="padding: 20px !important">
      <h2 style="text-align: center">More Recent Blogs</h2>
    </v-col>
    <v-col
      v-for="(blog, index) in blogs.slice(0, 4)"
      :key="index"
      xs="12"
      sm="6"
      md="6"
      lg="3"
      class="card-col"
    >
      <v-card width="400" height="440" class="blog-card">
        <div class="blog-image" style="height: 260px; margin-bottom: 10px;">
          <img
          v-if="$nuxt.isOnline"
          :class="
            $vuetify.breakpoint.mdAndUp === true
              ? 'blog-image'
              : 'blog-image-small-screen'
          "
            width="100%"
            height="100%"
            :src="`https://picsum.photos/id/${Math.floor(Math.random() *400) + 50}/800/700`"
            alt="blog image"
          />

          <img
          v-if="$nuxt.isOffline"

          :class="
            $vuetify.breakpoint.mdAndUp === true
              ? 'blog-image'
              : 'blog-image-small-screen'
          "
            width="100%"
            height="100%"
            src="~/assets/images/red-image.jpg"
            alt="blog image"
          />

        </div>
        <div class="blog-title">{{blog.title}}</div>
        <div class="view-blog-conatiner">
          <v-btn text class="view-blog-btn">VIEW THE blog</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    blogs() {
      return this.$store.state.blogs.blogs
    },
  },
}
</script>

<style lang="scss" >
.card-col {
  padding: 20px !important;
  display: flex;
  justify-content: center;
  transition: .5s ease all;
  &:hover {
    transform: rotate(2deg) scale(1.02);
  }
}

.blog-card {
  border-radius: 10px !important;
  .blog-image {
    img {
      border-radius: 10px 10px 0 0;
    }
  }
  .blog-title {
    min-height: 80px;
    max-height: 120px;
    padding: 5px 8px !important;
    margin-bottom: 20px;
  }
  .view-blog-conatiner {
    padding: 8px !important;
  }
}
</style>
