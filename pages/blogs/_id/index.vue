<template>
  <div class="view-blog-wrapper">
    <v-row>
      <v-col cols="12">
        <div class="blog-image-container">
          <img
            width="100%"
            height="400px"
            src="~/assets/images/design/image2.jpg"
            alt="blog image"
          />
        </div>
      </v-col>
      <v-col cols="12">
        <div class="blog-content-container">
          <h2>{{ blog.title }}</h2>
          <article v-html="blog.content"></article>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <section class="comments-section">
          <div class="options-wrapper">
            <div>
              <v-btn @click="addLike" icon class="blog-like-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  style="width: 25px"
                >
                  <path
                    :fill="liked ? 'blue' : 'black'"
                    d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"
                  />
                </svg>
              </v-btn>
              <small
                ><strong>
                  {{ blog.likes_no }}
                </strong>
              </small>
            </div>
            <v-btn @click="addDisLike" icon class="blog-dislike-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style="transform: rotate(180deg); width: 25px; margin-top: 10px"
              >
                <path
                  :fill="disliked ? 'blue' : 'black'"
                  d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"
                />
              </svg>
            </v-btn>
            <!-- <small
                ><strong>
                  {{ blog.dislikes_no }}
                </strong>
              </small> -->
          </div>

          <div class="ml-12">
            <v-rating
              v-model="rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$ratingFull"
              half-increments
              hover
              size="20"
            ></v-rating>
          </div>

          <div class="hr"></div>
          <div style="display: flex; gap: 15px; margin-top: 10px">
            <img
              width="35"
              height="35"
              src="~/assets/images/avatar.png"
              class="avatar"
            />
            <v-textarea
              auto-grow
              color="#000"
              outlined
              label="Leave your comment"
            />
          </div>
          <v-btn
            text
            outlined
            style="width: 100px; position: relative; left: 73px; bottom: 30px;padding: 12px;"
          >
            ADD COMMENT</v-btn
          >
          <div>
            <h3 class="ml-4">{{ commentsData.length }} Comments</h3>
          </div>
          <div class="hr" />
          <v-card
            v-for="(comment, index) in commentsData"
            :key="index"
            color="#fff"
            elevation="0"
            class="comment-card pl-2 pt-4 pb-4 mb-2 ml-2 mr-2"
          >
            <v-row>
              <v-col cols="1" class="avatar-col" style="padding: 12px 0">
                <img
                  width="60"
                  src="~/assets/images/avatar.png"
                  class="avatar"
                />
              </v-col>
              <v-col cols="11">
                <div class="user-name">
                  <strong style="color: #346f99">User Name</strong>
                  <span
                    style="margin-left: 10px; font-size: 12px; color: #6d6d6d"
                    >{{ comment.date }}</span
                  >
                </div>
                <div class="comment-content mt-2 mb-2">
                  <strong>
                    {{ comment.content }}
                  </strong>
                </div>
                <!-- If the this comment is written by current user  -->
                <div class="comment-option" v-if="index === 0">
                  <span text>Reply</span>
                  <span text>Edit</span>
                  <menuDialog
                    @confirmTriggerd="deleteComment(index)"
                    activateText="Remove"
                    dialogTitle="ALERT"
                    dialogBody="Are you sure to delete this comment?"
                  />
                </div>
                <div class="comment-option" v-else>
                  <span text>Reply</span>
                  <img
                    v-if="comment.isLiked"
                    @click="setLike(index)"
                    width="20"
                    src="~/assets/SVG/like-active.svg"
                    alt="like icon"
                  />
                  <img
                    v-else
                    @click="setLike(index)"
                    width="20"
                    src="~/assets/SVG/like.svg"
                    alt="like icon"
                  />

                  <span
                    v-if="comment.likes_no !== 0 && comment.likes_no < 1000000"
                    style="margin-left: -12px"
                  >
                    {{
                      comment.likes_no > 999
                        ? comment.likes_no + 'k'
                        : comment.likes_no
                    }}</span
                  >
                  <span
                    v-if="comment.likes_no !== 0 && comment.likes_no > 999999"
                    style="margin-left: -12px"
                  >
                    {{ comment.likes_no + 'm' }}</span
                  >

                  <img
                    v-if="comment.isDisLiked"
                    @click="setDisLike(index)"
                    width="20"
                    src="~/assets/SVG/dislike-active.svg"
                    alt="dislike icon"
                  />
                  <img
                    v-else
                    @click="setDisLike(index)"
                    width="20"
                    src="~/assets/SVG/dislike.svg"
                    alt="dislike icon"
                  />
                  <span
                    v-if="
                      comment.disLikes_no !== 0 && comment.disLikes_no < 1000000
                    "
                    style="margin-left: -12px"
                  >
                    {{
                      comment.disLikes_no > 999
                        ? comment.disLikes_no + 'k'
                        : comment.disLikes_no
                    }}</span
                  >
                  <span
                    v-if="
                      comment.disLikes_no !== 0 && comment.disLikes_no > 999999
                    "
                    style="margin-left: -12px"
                  >
                    {{ comment.disLikes_no + 'm' }}</span
                  >
                </div>
              </v-col>
            </v-row>
          </v-card>
        </section>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import menuDialog from '@/components/menuDialog.vue'
export default {
  components: {
    menuDialog,
  },
  data() {
    return {
      blog: {},
      commentsData: [
        {
          content:
            ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, debitis!',
          date: 'just now',
          isLiked: true,
          isDisLiked: false,
          likes_no: 0,
          disLikes_no: 0,
        },
        {
          content:
            ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, debitis!',
          date: '3 minutes ago',
          isLiked: false,
          isDisLiked: false,
          likes_no: 0,
          disLikes_no: 0,
        },
        {
          content:
            ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, debitis!',
          date: '20 hours ago',
          isLiked: false,
          isDisLiked: true,
          likes_no: 2,
          disLikes_no: 1,
        },
        {
          content:
            ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, debitis!',
          date: '10 weeks ago',
          isLiked: true,
          isDisLiked: false,
          likes_no: 10,
          disLikes_no: 0,
        },
        {
          content:
            ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, debitis!',
          date: '10 days',
          isLiked: true,
          isDisLiked: false,
          likes_no: 1100,
          disLikes_no: 5,
        },
      ],
      liked: false,
      disliked: false,
      rating: 4.5,
      items: ['name1', 'name2', 'name3', 'name4', 'name5', 'name6'],
    }
  },
  methods: {
    infiniteHandler($state) {
      setTimeout(() => {
        if (this.items.length < 15) {
          this.items.push(`names${this.items.length + 1}`)
          $state.loaded()
        } else {
          $state.complete()
        }
      }, 1000)
    },
    addLike() {
      if (this.liked === true) {
        this.liked = false
        this.blog.likes_no--
      } else if (this.disliked === true) {
        this.disliked = false
        this.liked = true
        this.blog.dislikes_no--
        this.blog.likes_no++
      } else {
        this.liked = true
        this.blog.likes_no++
      }
    },
    addDisLike() {
      if (this.disliked === true) {
        this.disliked = false
        this.blog.dislikes_no--
      } else if (this.liked === true) {
        this.liked = false
        this.disliked = true
        this.blog.dislikes_no++
        this.blog.likes_no--
      } else {
        this.disliked = true
        this.blog.dislikes_no++
      }
    },
    setLike(commentIndex) {
      if (this.commentsData[commentIndex].isDisLiked === true) {
        this.commentsData[commentIndex].likes_no++
        this.commentsData[commentIndex].disLikes_no--
        this.commentsData[commentIndex].isDisLiked = false
        this.commentsData[commentIndex].isLiked =
          !this.commentsData[commentIndex].isLiked
      } else if (this.commentsData[commentIndex].isLiked === true) {
        this.commentsData[commentIndex].likes_no--
        this.commentsData[commentIndex].isLiked =
          !this.commentsData[commentIndex].isLiked
      } else {
        this.commentsData[commentIndex].likes_no++
        this.commentsData[commentIndex].isLiked =
          !this.commentsData[commentIndex].isLiked
      }
    },
    setDisLike(commentIndex) {
      if (this.commentsData[commentIndex].isLiked === true) {
        this.commentsData[commentIndex].likes_no--
        this.commentsData[commentIndex].disLikes_no++

        this.commentsData[commentIndex].isLiked = false
        this.commentsData[commentIndex].isDisLiked =
          !this.commentsData[commentIndex].isDisLiked
      } else if (this.commentsData[commentIndex].isDisLiked === true) {
        this.commentsData[commentIndex].disLikes_no -= 1
        this.commentsData[commentIndex].isDisLiked =
          !this.commentsData[commentIndex].isDisLiked
      } else {
        this.commentsData[commentIndex].disLikes_no++
        this.commentsData[commentIndex].isDisLiked =
          !this.commentsData[commentIndex].isDisLiked
      }
    },
    deleteComment(commentIndex) {
      this.commentsData.splice(commentIndex, 1)
    },
  },
  created() {
    if (this.$route.params.id) {
      this.$store.state.blogs.blogs.forEach((blog) => {
        if (blog.id == this.$route.params.id) {
          this.blog = { ...blog }
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 80px !important;
  h2 {
    display: inline;
    border-bottom: 1px solid;
  }
  article {
    width: 75%;
    // text-align: center;
    margin-top: 20px;
  }
}
.comments-section {
  width: 66%;
  min-height: 547px;
  background: rgb(247, 245, 245);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-bottom: 160px;
  padding-bottom: 100px;

  .options-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    p {
      margin: 0;
    }
  }
}
.comment-field {
  width: 58%;
  border: 1px solid #b1b1b1;
  border-radius: 9px;
  padding: 7px 5px;
  outline: none;
}
.avatar {
  margin: 0 0 0 15px;
  padding: 2px;
  border: 1px solid rgb(90, 90, 90);
  border-radius: 50px;
}
.comment-option {
  display: flex;
  gap: 25px;
  cursor: pointer;
  span {
    &:hover {
      font-weight: bold;
    }
  }
}
</style>
