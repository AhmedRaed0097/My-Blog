<template>
  <div>
    <v-row class="blogs-options-row-wrapper">
      <v-col cols="8">
        <div class="categories">
          <ul class="categories-list">
            <v-list-item
              :class="{
                'active-list-item': selectedCategory === 'programming',
              }"
              @click="onSelectCategory('programming')"
            >
              <v-list-item-title> Programming </v-list-item-title>
            </v-list-item>
            <v-list-item
              :class="{ 'active-list-item': selectedCategory === 'design' }"
              @click="onSelectCategory('design')"
            >
              <v-list-item-title> Design </v-list-item-title>
            </v-list-item>
            <v-list-item
              :class="{ 'active-list-item': selectedCategory === 'managment' }"
              @click="onSelectCategory('managment')"
            >
              <v-list-item-title> Managment </v-list-item-title>
            </v-list-item>
            <v-list-item
              :class="{ 'active-list-item': selectedCategory === 'healthy' }"
              @click="onSelectCategory('healthy')"
            >
              <v-list-item-title> Healthy </v-list-item-title>
            </v-list-item>
            <v-list-item
              :class="{ 'active-list-item': selectedCategory === 'sport' }"
              @click="onSelectCategory('sport')"
            >
              <v-list-item-title> Sport </v-list-item-title>
            </v-list-item>
            <v-list-item
              :class="{ 'active-list-item': selectedCategory === 'all' }"
              @click="onSelectCategory('all')"
            >
              <v-list-item-title> All </v-list-item-title>
            </v-list-item>
          </ul>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="search">
          <img src="~/assets/SVG/search.svg" />
          <input
            v-model="search_text"
            placeholder="search"
            type="text"
            style="border: none; outline: none; width: 100%; margin: 0 10px"
            @input="searchForBlog"
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="blogs-list-wrapper">
      <v-col
        v-for="blog in blogs"
        :key="blog.id"
        xs="12"
        sm="6"
        md="6"
        lg="4"
        class="card-col"
        style="height: 500px; margin-bottom: 50px"
      >
        <v-card width="400" class="blog-card">
          <div class="blog-image" style="height: 280px; position: relative">
            <img
              v-if="$nuxt.isOnline"
              :class="
                $vuetify.breakpoint.mdAndUp === true
                  ? 'blog-image'
                  : 'blog-image-small-screen'
              "
              width="100%"
              height="100%"
              :src="`https://picsum.photos/id/${
                Math.floor(Math.random() * 400) + 50
              }/800/700`"
              alt="blog image"
            />
            <img
              v-if="$nuxt.isOffline"
              width="100%"
              height="100%"
              :src="blog.cover"
              alt="blog image"
            />
          </div>
          <img
            width="25"
            src="~/assets/SVG/pencil-1214304.svg"
            alt="Edit-icon"
            style="float: right; cursor: pointer; margin: 7px 2px"
            @click="editBlog(blog.id)"
          />
          <img
            width="25"
            src="~/assets/SVG/delete2.svg"
            alt="Edit-icon"
            style="float: right; cursor: pointer; margin: 7px 2px"
          />
          <div class="blog-title">
            <h3>{{ blog.title }}</h3>
          </div>
          <br />
          <div class="blog-category">
            <p><strong>Category</strong> : {{ blog.category }}</p>
          </div>
          <div class="view-blog-conatiner">
            <v-btn text class="view-blog-btn" :to="`blogs/${blog.id}`"
              >VIEW THE blog</v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: 'all',
      search_text: '',
      blogs: [],
    }
  },
  computed: {
    blogsList() {
      return this.$store.state.blogs.blogs
    },
  },
  methods: {
    onSelectCategory(category) {
      this.selectedCategory = category
      this.blogs = []
      if (category !== 'all') {
        this.$store.state.blogs.blogs.forEach((blog) => {
          if (blog.category === category) this.blogs.push(blog)
        })
      } else {
        this.blogs = this.$store.state.blogs.blogs
      }
    },
    searchForBlog(e) {
      this.blogs = []
      this.$store.state.blogs.blogs.forEach((blog) => {
        if (blog.title.toUpperCase().includes(e.target.value.toUpperCase()))
          this.blogs.push(blog)
      })
    },

    editBlog(blogId) {
      this.$router.push({
        path: '/create-blog',
        query: { selected_blog_id: blogId },
      })
    },
  },
  created() {
    this.blogsList.forEach((blog) => {
      this.blogs.push({ ...blog })
    })
    this.blogs.reverse()
  },
}
</script>

<style lang="scss">
.blogs-options-row-wrapper {
  max-height: 100px;
  //   border: 1px solid;
  margin: 10px 20px;
  .search {
    display: flex;
    align-items: center;
    height: 39px;
    margin: 23px 33px 0 51px;
    border-radius: 13px;
    background-color: #f7f7f7;
    font-weight: bold;
    img {
      margin-left: 10px;
    }
  }
  .categories-list {
    display: flex;
    gap: 30px;
    list-style: none;
    position: relative;
    top: 13px;
    .v-list-item {
      text-align: center;
      text-transform: uppercase;
    }
  }
}
.blogs-list-wrapper {
  margin: 10px 20px;
  width: 77vw;
  height: 80vh;
  margin: 0 auto;
  margin-bottom: 100px;
  overflow-y: auto;
  overflow-x: hidden;
}
.active-list-item {
  border-bottom: 2px solid darkorange;
}
.blog-title {
  height: 50px !important;
  padding: 5px 8px !important;
}
.blog-category {
  padding: 0 10px;
}
</style>
