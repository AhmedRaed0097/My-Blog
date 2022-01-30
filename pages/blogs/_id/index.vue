<template>
  <div class="view-blog-wrapper">
    <v-row>
      <v-col cols="12">
        <div class="blog-image-container">
          <img
            width="100%"
            height="400px"
            src="~/assets/images/header-image.jpg"
            alt="blog image"
          />
        </div>
      </v-col>
      <v-col cols="12">
        <div class="blog-content-container">
          <h2>{{ blog.title }}</h2>
          <br />
          <br />
          <article>{{ blog.content }}</article>
        </div>
      </v-col>
    </v-row>
    <br />
    <v-row>
      <v-col cols="2">
        <div class="blog-option">
          <p class="mr-4">LIKE</p>
          <p>SHARE</p>
        </div>
      </v-col>
      <hr />
    </v-row>






    <!-- <v-row>
      <v-col>
        <client-only>
        <div>
          <center>
            <v-card width="400" height="200" style="overflow-y: scroll">
              <div v-for="item in items" :key="item">
               <p>
                {{ item }}

               </p>
              </div>
              <infinite-loading
                spinner="spiral"
                @infinite="infiniteHandler"
              ></infinite-loading>
            </v-card>
          </center>
        </div>
        </client-only>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog: {},
      items:[
        'name1',
        'name2',
        'name3',
        'name4',
        'name5',
        'name6'
      ]
    }
  },
  methods:{
    infiniteHandler($state){
      setTimeout(() => {
       if(this.items.length <15){
          this.items.push(`names${this.items.length+1}`)
          $state.loaded()
        } else {
          $state.complete()
        }
      }, 1000)
    
    }

    
  },
  created() {
    if (this.$route.params.id) {
      this.$store.state.blogs.blogs.forEach((blog) => {
        if (blog.id == this.$route.params.id) {
          this.blog = blog
        }
      })
    }
  },

}
</script>

<style lang="scss">
.view-blog-wrapper {
  min-height: 100%;
}
.blog-content-container {
  h2 {
    display: inline;
    border-bottom: 1px solid;
  }
  padding: 0 80px !important;
}
.blog-option {
  min-width: 100vw;
  border: 1px solid;
  padding: 10px 80px;
  display: flex;
  align-items: center;
  p {
    margin: 0;
  }
}
</style>