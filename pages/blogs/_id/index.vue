<template>
  <div class="view-blog-wrapper">
    <v-row>
      <v-col cols="12">
        <div class="blog-image-container">
          <img
            width="100%"
            height="400px"
            :src="require(`~/assets/images/for-all-blogs/${blog.cover}`)"
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
              <v-btn @click="setBlogCommentLike" icon class="blog-like-btn">
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
            <v-btn @click="setBlogCommentDisLike" icon class="blog-dislike-btn">
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
            <small
              ><strong>
                {{ blog.dislikes_no }}
              </strong>
            </small>
            <div class="ml-2 mt-2">
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
          </div>

          <div class="hr"></div>
          <div
            style="
              display: flex;
              gap: 15px;
              margin-top: 10px;
              padding-right: 15px;
            "
          >
            <img
              width="35"
              height="35"
              src="~/assets/images/avatar.png"
              class="avatar"
            />
            <v-textarea
              v-model="commentContent"
              auto-grow
              color="#000"
              outlined
              label="Leave your comment"
            />
          </div>
          <center>
            <v-btn text outlined @click="addNewComment"> ADD COMMENT</v-btn>

            <v-btn text outlined @click="clearComment"> CLEAR </v-btn>
          </center>
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
                  <strong v-if="editingCommentId !== comment.id">
                    {{ comment.content }}
                  </strong>
                  <div v-else class="edit-comment-container">
                    <div class="field-container" style="width: 80%">
                      <v-text-field
                        color="#000"
                        v-model="editingCommentContent"
                        @keydown.enter="editComment(comment)"
                      />
                    </div>
                    <div class="actions">
                      <span @click="editComment(comment)">Edit</span>
                      <span @click="cancelEdit">Cancel</span>
                    </div>
                  </div>
                </div>
                <!-- If the this comment is written by current user  -->
                <div class="comment-option" v-if="index === 0">
                  <span @click="makeCommentReplyble(comment)">Reply</span>
                  <span @click="makeCommentEditable(comment)">Edit</span>
                  <menuDialog
                    @confirmTriggerd="deleteComment(index)"
                    activateText="Remove"
                    dialogTitle="ALERT"
                    dialogBody="Are you sure to delete this comment?"
                  />
                </div>
                <div class="comment-option" v-else>
                  <span @click="makeCommentReplyble(comment)">Reply</span>
                  <img
                    v-if="comment.isLiked"
                    @click="setCommentLike(index)"
                    width="20"
                    src="~/assets/SVG/like-active.svg"
                    alt="like icon"
                  />
                  <img
                    v-else
                    @click="setCommentLike(index)"
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
                    @click="setCommentDisLike(index)"
                    width="20"
                    src="~/assets/SVG/dislike-active.svg"
                    alt="dislike icon"
                  />
                  <img
                    v-else
                    @click="setCommentDisLike(index)"
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
                <div
                  class="reply-container"
                  v-if="replyCommentId === comment.id"
                >
                  <img
                    width="25"
                    height="25"
                    src="~/assets/images/avatar.png"
                    class="avatar"
                  />
                  <div class="reply-field-container">
                    <v-text-field
                      color="#000"
                      v-model="replyContent"
                      label="Enter your reply"
                      style="font-size: 12px"
                    />
                  </div>
                  <div class="actions">
                    <span @click="addReply(comment)" style="font-size: 13px"
                      >Reply</span
                    >
                    <span @click="cancelReply" style="font-size: 13px"
                      >Cancel</span
                    >
                  </div>
                </div>
                <div
                  class="replies-list-container"
                  v-if="comment.replies.length > 0"
                >
                  <span
                    @click="showRepliesList(comment.id)"
                    class="replies-no"
                    v-if="comment.replies.length === 1"
                    >{{ comment.replies.length + ' reply' }}</span
                  >
                  <span
                    @click="showRepliesList(comment.id)"
                    class="replies-no"
                    v-else
                    >{{ comment.replies.length + ' replies' }}</span
                  >
                </div>
                <div
                  class="replies-list"
                  v-if="showRepliesListId === comment.id"
                >
                  <v-row v-for="(reply,i) in comment.replies" :key="reply.id">
                    <v-col cols="1">
                      <img
                        width="25"
                        height="25"
                        src="~/assets/images/avatar.png"
                        class="avatar"
                      />
                    </v-col>
                    <v-col cols="11">
                      <div class="reply-container">
                        <div class="user-name">
                          <strong style="color: #346f99">User Name</strong>
                          <span
                            style="
                              margin-left: 10px;
                              font-size: 12px;
                              color: #6d6d6d;
                            "
                            >{{ comment.date }}</span
                          >
                        </div>
                        <span
                          >Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Tempore, blanditiis?</span
                        >
                      </div>
                      <div class="reply-option">
                        <img
                          v-if="reply.isLiked"
                          @click="setReplyLike(comment,i)"
                          width="15"
                          src="~/assets/SVG/like-active.svg"
                          alt="like icon"
                        />
                        <img
                          v-else
                          @click="setReplyLike(comment,i)"
                          width="15"
                          src="~/assets/SVG/like.svg"
                          alt="like icon"
                        />

                        <span
                          v-if="
                            reply.likes_no !== 0 && reply.likes_no < 1000000
                          "
                          style="margin-left: -12px"
                        >
                          {{
                            reply.likes_no > 999
                              ? reply.likes_no + 'k'
                              : reply.likes_no
                          }}</span
                        >
                        <span
                          v-if="reply.likes_no !== 0 && reply.likes_no > 999999"
                          style="margin-left: -12px"
                        >
                          {{ reply.likes_no + 'm' }}</span
                        >

                        <img
                          v-if="reply.isDisLiked"
                          @click="setReplyDisLike(comment,i)"
                          width="15"
                          src="~/assets/SVG/dislike-active.svg"
                          alt="dislike icon"
                        />
                        <img
                          v-else
                          @click="setReplyDisLike(comment,i)"
                          width="15"
                          src="~/assets/SVG/dislike.svg"
                          alt="dislike icon"
                        />
                        <span
                          v-if="
                            reply.disLikes_no !== 0 &&
                            reply.disLikes_no < 1000000
                          "
                          style="margin-left: -12px"
                        >
                          {{
                            reply.disLikes_no > 999
                              ? reply.disLikes_no + 'k'
                              : reply.disLikes_no
                          }}</span
                        >
                        <span
                          v-if="
                            reply.disLikes_no !== 0 &&
                            reply.disLikes_no > 999999
                          "
                          style="margin-left: -12px"
                        >
                          {{ reply.disLikes_no + 'm' }}</span
                        >
                      </div>
                    </v-col>
                  </v-row>
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
      editingCommentContent: '',
      showRepliesListId: null,
      editingCommentId: null,
      replyCommentId: null,
      commentContent: '',
      replyContent: '',
      commentsData: [
        {
          id: 1,
          userId: 55,
          content:
            ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, debitis!',
          date: 'just now',
          isLiked: true,
          isDisLiked: false,
          likes_no: 0,
          disLikes_no: 0,
          replies: [],
        },
        {
          id: 2,
          userId: 1,
          content:
            ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, debitis!',
          date: '3 minutes ago',
          isLiked: false,
          isDisLiked: false,
          likes_no: 0,
          disLikes_no: 0,
          replies: [],
        },
        {
          id: 3,
          userId: 66,
          content:
            ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, debitis!',
          date: '20 hours ago',
          isLiked: false,
          isDisLiked: true,
          likes_no: 2,
          disLikes_no: 1,
          replies: [],
        },
        {
          id: 4,
          userId: 102,
          content:
            ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, debitis!',
          date: '10 weeks ago',
          isLiked: true,
          isDisLiked: false,
          likes_no: 10,
          disLikes_no: 0,
          replies: [],
        },
        {
          id: 5,
          userId: 547,
          content:
            ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, debitis!',
          date: '10 days',
          isLiked: true,
          isDisLiked: false,
          likes_no: 1100,
          disLikes_no: 5,
          replies: [
            {
              id: 1,
              userId: 2,
              content: 'I agree with you',
              data: this.$moment('2020-04-04 11:45:26.123').fromNow(),
              likes_no: 0,
              disLikes_no: 0,
              isLiked: false,
              isDisLiked: false,
            },
            {
              id: 2,
              userId: 44,
              content: 'I do not understand you!',
              data: this.$moment('2020-04-04 11:45:26.123').fromNow(),
              likes_no: 0,
              disLikes_no: 0,
              isLiked: false,
              isDisLiked: false,
            },
          ],
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
    makeCommentEditable(comment) {
      this.editingCommentId = comment.id
      this.editingCommentContent = comment.content
    },
    cancelEdit() {
      this.editingCommentId = null
      this.editingCommentContent = ''
    },
    setBlogCommentLike() {
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
    setBlogCommentDisLike() {
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
    setCommentLike(commentIndex) {
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
    setCommentDisLike(commentIndex) {
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
    addNewComment() {
      console.log('here')
      let date = this.$moment()._d
      console.log('current ', this.$moment(date).fromNow())
      this.commentsData.unshift({
        id: this.commentsData.length + 1,
        content: this.commentContent,
        date: this.$moment(date).fromNow(),
        isLiked: false,
        isDisLiked: false,
        likes_no: 0,
        disLikes_no: 0,
      })
      this.commentContent = ''
    },
    editComment(comment) {
      console.log('comment ', comment)
      let index = this.commentsData.indexOf(comment)
      this.commentsData[index].content = this.editingCommentContent
      this.editingCommentId = null
      this.editingCommentContent = ''
    },
    makeCommentReplyble(comment) {
      this.replyCommentId = comment.id
    },
    addReply(comment) {
      let date = this.$moment()._d
      let index = this.commentsData.indexOf(comment)
      this.commentsData[index].replies.unshift({
        id: this.commentsData[index].replies.length + 1,
        userId: Math.floor(Math.random() * 400),
        content: this.replyContent,
        data: this.$moment(date).fromNow(),
        likes_no: 0,
        disLikes_no: 0,
        isLiked: false,
        isDisLiked: false,
      })
      this.replyContent = ''
    },
    showRepliesList(commentId) {
      if (this.showRepliesListId === commentId) {
        this.showRepliesListId = null
      } else {
        this.showRepliesListId = commentId
      }
    },
    cancelReply() {
      this.replyCommentId = null
    },
     setReplyLike(comment,replyIndex) {
       console.log('comment ',comment);
       console.log('replyIndex ',replyIndex);
      if (comment.replies[replyIndex].isDisLiked === true) {
        comment.replies[replyIndex].isDisLiked = false
        comment.replies[replyIndex].disLikes_no--
        comment.replies[replyIndex].isLiked =
          !comment.replies[replyIndex].isLiked
        comment.replies[replyIndex].likes_no++
      } else if (comment.replies[replyIndex].isLiked === true) {
        comment.replies[replyIndex].likes_no--
        comment.replies[replyIndex].isLiked =
          !comment.replies[replyIndex].isLiked
      } else {
        comment.replies[replyIndex].likes_no++
        comment.replies[replyIndex].isLiked =
          !comment.replies[replyIndex].isLiked
      }
    },
     setReplyDisLike(comment,replyIndex) {
      if (comment.replies[replyIndex].isLiked === true) {
        comment.replies[replyIndex].isLiked = false
        comment.replies[replyIndex].likes_no--
        comment.replies[replyIndex].isDisLiked =
          !comment.replies[replyIndex].isDisLiked
        comment.replies[replyIndex].disLikes_no++

      } else if (comment.replies[replyIndex].isDisLiked === true) {
        console.log('ddsfg 22020');
        comment.replies[replyIndex].isDisLiked =
          !comment.replies[replyIndex].isDisLiked

        comment.replies[replyIndex].disLikes_no--


      } else {
        comment.replies[replyIndex].disLikes_no++
        comment.replies[replyIndex].isDisLiked =
          !comment.replies[replyIndex].isDisLiked
      }
    },
    clearComment() {},
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
    line-height: 1.5;
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
    height: 54px;
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
.reply-option {
  margin-top: 10px;
  display: flex;
  gap: 20px;
}
.edit-comment-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.actions {
  display: flex;
  justify-content: space-between;
  min-width: 130px;
  padding: 10px 15px;

  span {
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
}
.reply-container {
  display: flex;
  align-items: center;
  gap: 20px;
  .reply-field-container {
    width: 500px;
    * {
      margin: 0 !important;
    }
    .v-label {
      font-size: 12px !important;
    }
  }
}
.replies-list-container {
  .replies-no {
    margin-top: 10px;
    font-size: 12px;
    font-weight: bold;
    color: #2385ff;
    cursor: pointer;
  }
}
.replies-list {
  margin-top: 20px;
  .reply-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding-right: 15px;
    font-size: 13px;
    font-weight: bold;
  }
}
</style>
