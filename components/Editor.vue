<template>
  <div class="container">
    <no-ssr placeholder="Loading Your Editor...">
      <p v-show="disabledEditor === true">LOADING</p>
      <vue-editor
        id="editor"
        v-model="content"
        useCustomImageHandler
        @imageAdded="handleImageAdded"
        placeholder="أدخل محتوى المقال هنا"
        v-show="disabledEditor === false"
      />
    </no-ssr>
    <div class="blog-actions">
      <v-btn text>CREATE</v-btn>
      <v-btn text>CANCLE</v-btn>
    </div>
  </div>
</template>
 <script>
export default {
  props:{
    content:{
      type:String,
      default: null
    }
  },
  data() {
    return {
      
      disabledEditor: true,
    }
  },
  created() {
    if (process.client) {
      setTimeout(() => {
        const alignLeftButton = window.document
          .getElementsByClassName('ql-align')
          .item(0)
        const alignRightButton = window.document
          .getElementsByClassName('ql-align')
          .item(2)
        const editor = window.document
          .getElementsByClassName('ql-editor')
          .item(0)
        let pressForFirsttime = false
        console.log('editor ', editor)
        editor.addEventListener('click', function () {
          if (pressForFirsttime === false) {
            alignLeftButton.classList.remove('ql-active')
            alignRightButton.classList.add('ql-active')
          }
        })
        editor.classList.add('custom-ql-editor')
        console.log('editor', editor)

        console.log('alignLeftButton.classList', alignLeftButton.classList)
        alignLeftButton.addEventListener('click', function () {
          alignLeftButton.classList.toggle('ql-active')

          editor.classList.remove('custom-ql-editor')
          pressForFirsttime = true
        })
        this.disabledEditor = false
      }, 2000)
    }
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      console.log('img', file)
      const formData = new FormData()

      formData.append('image', file)

      const config = {
        headers: {
          // header setting
        },
      }

      this.$axios
        .$post('/api_url', formData, config)

        .then((result) => {
          const url = result.data.url // Get url from response

          Editor.insertEmbed(cursorLocation, 'image', url)

          resetUploader()
        })

        .catch((err) => {
          // eslint-disable-next-line no-console

          console.log(err)
        })
    },
  },
}
</script>
 <style lang="scss">
.container {
  height: 100%;
}
.ql-toolbar {
  padding: 10px 30px !important;
}

.ql-editor {
  min-height: 350px !important;
  height: 350px !important;
  overflow-y: scroll;
  font-size: 16px;
  padding: 30px !important;
}
.custom-ql-editor {
  text-align: right !important;
}
.blog-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  height: 70px;
  .v-btn {
    border: 1px solid darkorange;
    color: #000;
    font-weight: bold;
  }
}
</style>