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
      <v-card width="400" class="blog-card">
        <div class="blog-image">
          <img
            width="100%"
            src="~/assets/images/header-image.jpg"
            alt="blog image"
          />
        </div>
        <div class="blog-title">{{blog.title}}</div>
        <br>
        <br>
        <br>
        <br>
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
  transition: 1.2s ease all;
  &:hover {
    transform: rotate(2deg);
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
    padding: 5px 8px !important;
  }
  .view-blog-conatiner {
    padding: 8px !important;
  }
}
</style>