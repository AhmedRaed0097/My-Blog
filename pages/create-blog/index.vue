<template>
  <!--  -->
  <div class="create-blog-wrapper">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col
          cols="12"
          style="margin-top: 50px !important; text-align: center"
        >
          <h1>CREATE NEW BLOG</h1>
        </v-col>
        <v-col cols="12" style="margin-top: 50px !important">
          <v-card class="form-wrapper">
            <v-row>
              <v-col cols="12" class="title-column">
                <h3>Blog Cover :</h3>
              </v-col>
              <v-col cols="12">
                <section v-if="form.cover" class="show-cover">
                  <div class="delete-icon" @click="deleteCover">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        fill="#fff"
                        d="M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z"
                      />
                    </svg>
                  </div>
                  <img
                    style="width: 100%; min-height: 300px; max-height: 500px"
                    :src="form.cover"
                    alt="Blog-Cover"
                  />
                </section>
                <div v-else class="upload-poster-wrapper">
                  <section class="uplaod-section">
                    <label
                      class="custom-file"
                      for="blogCover"
                      style="cursor: pointer"
                    >
                      Upload Cover

                      <input
                        style="display: none"
                        id="blogCover"
                        ref="blogCover"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        @change="selectBlogCover"
                      />
                    </label>
                  </section>
                  <div
                    class="v-messages theme--light error--text"
                    style=""
                    role="alert"
                  >
                    <div
                      class="v-messages__wrapper"
                      v-show="errors.cover.show === true"
                    >
                      <div
                        class="v-messages__message"
                        style="text-align: center; margin: 5px 0"
                      >
                        {{ errors.cover.message }}
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>

              <div class="hr" style="margin-top: 40px" />

              <v-col cols="12" class="title-column">
                <h3>Blog Title :</h3>
              </v-col>
              <v-col cols="12">
                <div class="blog-name-container">
                  <v-text-field
                    :rules="titleRules"
                    label="Blog Title"
                    type="text"
                    v-model="form.title"
                    color="#000"
                    outlined
                  />
                </div>
              </v-col>

              <div class="hr" />

              <v-col cols="12" class="title-column">
                <h3>Blog Category :</h3>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col
                    lg="4"
                    sm="6"
                    v-for="(category, index) in categories"
                    :key="index"
                    class="category-col"
                  >
                    <div class="material-category-container">
                      <label :for="category.name">{{ category.name }}</label>
                      <input
                        :id="category.name"
                        :checked="form.category === category.name"
                        type="checkbox"
                        class="custom-checkbox"
                        @click="selectedCategory(category.name)"
                      />
                    </div>
                  </v-col>
                </v-row>
                <div
                  class="v-messages theme--light error--text"
                  style=""
                  role="alert"
                >
                  <div
                    class="v-messages__wrapper"
                    v-show="errors.category.show === true"
                  >
                    <div
                      class="v-messages__message"
                      style="text-align: center; margin: 15px 0"
                    >
                      {{ errors.category.message }}
                    </div>
                  </div>
                </div>
              </v-col>
              <!-- <div class="hr" />
              <v-col cols="12" class="title-column">
                <h3>Blog Options :</h3>
              </v-col>
              <v-col cols="12">
                <div class="blog-options">
                  <label for="option1">Commentable</label>
                  <input id="option1" type="checkbox" class="custom-checkbox" />
                  <label for="option2">Likeable</label>
                  <input id="option2" type="checkbox" class="custom-checkbox" />
                </div>
              </v-col> -->
              <div class="hr" />
              <v-col cols="12" class="title-column">
                <h3>Blog Content :</h3>
              </v-col>
              <v-col cols="12">
                <section style="width: 100%; height: 500px">
                  <Editor
                    :getting-content="form.content"
                    @contentChange="onContentChange"
                    :place-holder="'Enter Blog Content Here'"
                  />
                </section>
                <div
                  class="v-messages theme--light error--text"
                  style="position: relative; bottom: 70px"
                  role="alert"
                >
                  <div
                    class="v-messages__wrapper"
                    v-show="errors.content.show === true"
                  >
                    <div
                      class="v-messages__message"
                      style="text-align: center; margin: 15px 0"
                    >
                      {{ errors.content.message }}
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="blog-actions">
                  <v-btn text @click="createNewBlog">CREATE</v-btn>
                  <v-btn text>CANCLE</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import '~/components/Editor.vue'

export default {
  data() {
    return {
      contentEditorBody: '',
      form: {
        cover: '',
        title: '',
        category: '',
        content: '',
        comments: [],
      },
      categories: [
        {
          id: 1,
          name: 'Programming',
        },
        {
          id: 2,
          name: 'Design',
        },
        {
          id: 3,
          name: 'Managment',
        },
        {
          id: 4,
          name: 'Healthy',
        },
        {
          id: 5,
          name: 'Sport',
        },
      ],
      valid: true,
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) =>
          (v && v.length > 5) || 'Title shoult not be less than 5 characters',
      ],
      errors: {
        cover: {
          show: false,
          message: 'Blog cover is required',
        },
        category: {
          show: false,
          message: 'Blog category is required',
        },
        content: {
          show: false,
          message: 'Blog content is required',
        },
      },
    }
  },
  watch: {
    'form.cover'() {
      if (this.form.cover !== null) {
        this.errors.cover.show = false
      }
    },
    'form.category'() {
      if (this.form.category !== null) {
        this.errors.category.show = false
      }
    },
    'form.content'() {
      if (this.form.content !== null) {
        this.errors.content.show = false
      }
    },
  },
  methods: {
    createNewBlog() {
      if (!this.form.cover) {
        this.errors.cover.show = true
      }
      if (!this.form.category) {
        this.errors.category.show = true
      }
      if (!this.form.content) {
        this.errors.content.show = true
      }
      if (this.$refs.form.validate() === true) {
        if (this.$route.selected_blog_id) {
          this.$store.dispatch('blogs/updateBlog', this.form).then(() => {
            this.$$router.push('/blogs')
          })
        } else {
          this.$store.dispatch('blogs/createNewBlog', this.form).then(() => {
            this.$router.push('/blogs')
          })
        }
      }
    },
    selectBlogCover() {
      if (this.$refs.blogCover.files[0]) {
        this.form.cover = URL.createObjectURL(this.$refs.blogCover.files[0])
      }
    },
    deleteCover() {
      this.form.cover = ''
      this.$refs.blogCover = null
    },
    selectedCategory(categoryName) {
      this.form.category = categoryName
    },
    onContentChange(newContent) {
      this.form.content = newContent
    },
  },
  created() {
    if (this.$route.query.selected_blog_id !== undefined) {
    }
    console.log('form ', this.$route.query.selected_blog_id)
    this.$store.state.blogs.blogs.forEach((blog) => {
      if (blog.id == this.$route.query.selected_blog_id) {
        this.form = { ...blog }
      }
    })
  },
  mounted() {
    console.log('AWS_ACCESS_KEY_ID', process.env.AWS_ACCESS_KEY_ID)
  },
}
</script>

<style lang="scss" scoped>
.create-blog-wrapper {
  background-image: url('~/assets/images/healthy/healthy-image12.jpg');
  background-size: cover;
  min-height: 100vh !important;
  padding-bottom: 100px;
}
.form-wrapper {
  width: 70vw !important ;
  height: auto;
  margin: 0 auto;
  padding-top: 40px;
  margin-bottom: 60px;
  .uplaod-section {
    width: 80%;
    height: 250px;
    border: 5px dashed #eee;
    margin: 10px auto;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    label {
      color: #adacac;
      font-size: 20px;
    }
  }
}

.material-category-container,
.blog-options {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 34px;
  padding: 28px 100px;
}

.custom-checkbox {
  --active: #ececec;
  --active-inner: #080808;
  --focus: 2px #f6f8ff;
  --border: #bbc1e1;
  --border-hover: #bbc1e1;
  --background: #fff;
  --disabled: #f6f8ff;
  --disabled-inner: #e1e6f9;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 24px;
  padding: 0 10px;
  outline: none;
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin: 0;
  cursor: pointer;
  border: 1px solid var(--bc, var(--border));
  background: var(--b, var(--background));
  transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
  &:after {
    content: '';
    display: block;
    left: 0;
    top: 0;
    position: absolute;
    transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
      opacity var(--d-o, 0.2s);
  }
  &:checked {
    --b: var(--active);
    --bc: var(--active);
    --d-o: 0.3s;
    --d-t: 0.6s;
    --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
  }
  &:disabled {
    --b: var(--disabled);
    cursor: not-allowed;
    opacity: 0.9;
    &:checked {
      --b: var(--disabled-inner);
      --bc: var(--border);
    }
    & + label {
      cursor: not-allowed;
    }
  }
  &:hover {
    &:not(:checked) {
      &:not(:disabled) {
        --bc: var(--border-hover);
      }
    }
  }
  &:focus {
    box-shadow: 0 0 0 var(--focus);
  }
  &:not(.switch) {
    width: 21px;
    &:after {
      opacity: var(--o, 0);
    }
    &:checked {
      --o: 1;
    }
  }
  & + label {
    font-size: 14px;
    line-height: 21px;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    margin-left: 4px;
  }
}
.custom-checkbox {
  &:not(.switch) {
    border-radius: 7px;
    &:after {
      width: 9px;
      height: 14px;
      border: 3px solid var(--active-inner);
      border-radius: 0px 0px 4px 0px;
      border-top: 0;
      border-left: 0;
      left: 5px;
      top: 2px;
      transform: rotate(var(--r, 20deg));
    }
    &:checked {
      border: 2px solid #6e6e6e;
      --r: 43deg;
    }
  }
  &.switch {
    width: 38px;
    border-radius: 11px;
    &:after {
      left: 2px;
      top: 2px;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      background: var(--ab, var(--border));
      transform: translateX(var(--x, 0));
    }
    &:checked {
      --ab: var(--active-inner);
      --x: 17px;
    }
    &:disabled {
      &:not(:checked) {
        &:after {
          opacity: 0.6;
        }
      }
    }
  }
}
.title-column {
  padding-left: 70px;
  padding-bottom: 0;
}

.blog-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  height: 70px;
  .v-btn {
    border: 1px solid rgb(65, 65, 65);
    color: #000;
    font-weight: bold;
  }
}
.blog-name-container {
  padding: 12px 100px;
}
.show-cover {
  width: 80%;
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px dashed #eee;
}
.delete-icon {
  position: absolute;
  right: 0;
  top: 0;
  background: rgb(68, 68, 68);
  border-radius: 50px;
  height: 25px;
  cursor: pointer;
  svg {
    width: 25px;
  }
}
.category-col {
  .material-category-container {
    label {
      min-width: 120px;
    }
  }
}
</style>
