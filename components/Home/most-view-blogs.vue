<template>
  <div class="most-view-blogs-wrapper">
    <v-row
      v-for="(blog, index) in blogs.slice(0,4)"
      :key="index"
      class="most-view-blog-row"
      no-gutters
    >
    
      <v-col
        md="5"
        sm="12"
        :order="
          $vuetify.breakpoint.mdAndUp === true && index % 2 === 0
            ? 'first'
            : 'last'
        "
      >
        <div
          :class="
            $vuetify.breakpoint.mdAndUp === true
              ? 'blog-body'
              : 'blog-body-small-screen'
          "
        >
          <p>{{ blog.title }}</p>
          <div class="view-blog-conatiner">
            <v-btn text class="view-blog-btn"
              >VIEW THE BLOG
              <img width="20" src="~/assets/icons/right-arrow.png" alt="right-arrow" style="margin-left: 10px;">

            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col md="7" sm="12">
        <div
          :class="
            $vuetify.breakpoint.mdAndUp === true
              ? 'blog-image'
              : 'blog-image-small-screen'
          "
        >
          <img
            width="100%"
            src="~/assets/images/header-image.jpg"
            alt="blog image"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    }
  },
  computed:{
    blogs(){
      return this.$store.state.blogs.blogs
    }
  }
}
</script>

<style lang="scss" >
.blog-body {
  height: 100%;
  //   background: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  p {
    //   background: blue;
    width: 350px;
    text-align: center;
    //   height: 250px;
    line-height: 2;
    margin: 0 auto;
  }
}
.view-blog-conatiner {
  .view-blog-btn {
    padding: 0 5px !important;
      border: 1px solid #ffc86d;
      transition: .3s ease all;
    &:hover{
      background: #ffc86d;
      border: 1px solid rgb(252, 185, 3);
    }
  }
}
.blog-image-small-screen {
  @media (max-width: 1263px) and (min-width: 750px) {
    img {
      width: 50vw;
      height: 100%;

      margin: 20px 0 !important;
    }
  }
  @media (max-width: 749px) {
    // width: 70vw;
    img {
      width: 60vw;

      height: 100%;
    }
  }
  width: 100vw;
  margin-top: 70px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.blog-body-small-screen {
  @media (max-width: 1263px) and (min-width: 750px) {
    gap: 20px;
    p {
      width: 45vw;
    }
  }

  @media (max-width: 749px) {
    gap: 20px;
    p {
      width: 55vw;
    }
  }

  //   background: red;
  width: 100vw;
  height: 100%;
  margin: 15px 0 !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  p {
    // background: blue;
    font-size: 1rem;
  }
}
.blog-image {
}
</style>
