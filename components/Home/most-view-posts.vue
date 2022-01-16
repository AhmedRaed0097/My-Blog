<template>
  <div class="most-view-posts-wrapper">
    <v-row
      v-for="(post, index) in posts"
      :key="index"
      class="most-view-post-row"
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
              ? 'post-body'
              : 'post-body-small-screen'
          "
        >
          <p>{{ post.body }}</p>
          <div class="view-post-conatiner">
            <v-btn text class="view-post-btn"
              >VIEW THE POST

              <v-icon dark right> mdi-facebook </v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col md="7" sm="12">
        <div
          :class="
            $vuetify.breakpoint.mdAndUp === true
              ? 'post-image'
              : 'post-image-small-screen'
          "
        >
          <img
            width="100%"
            src="~/assets/images/header-image.jpg"
            alt="post image"
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
      posts: [
        {
          body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore suscipit pariatur alias repellat iusto, in cupiditate. Quasi sapiente, sint id vero, sunt assumenda consequatur neque, reprehenderit dolorem distinctio aut doloremque.',
          image: '',
        },
        {
          body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore suscipit pariatur alias repellat iusto, in cupiditate. Quasi sapiente, sint id vero, sunt assumenda consequatur neque, reprehenderit dolorem distinctio aut doloremque.',
          image: '',
        },
        {
          body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore suscipit pariatur alias repellat iusto, in cupiditate. Quasi sapiente, sint id vero, sunt assumenda consequatur neque, reprehenderit dolorem distinctio aut doloremque.',
          image: '',
        },
        {
          body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore suscipit pariatur alias repellat iusto, in cupiditate. Quasi sapiente, sint id vero, sunt assumenda consequatur neque, reprehenderit dolorem distinctio aut doloremque.',
          image: '',
        },
      ],
    }
  },
}
</script>

<style lang="scss" >
.post-body {
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
    //   height: 250px;
    line-height: 2;
    margin: 0 auto;
  }
}
.view-post-conatiner {
  .view-post-btn {
    padding: 0 5px !important;
    border: 1px solid #ffc86d;
  }
}
.post-image-small-screen {
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
.post-body-small-screen {
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
.post-image {
}
</style>