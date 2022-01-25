<template>
  <div class="container">
    <no-ssr placeholder="Loading Your Editor...">
      <vue-editor
        id="editor"
        v-model="content"
        useCustomImageHandler
        @imageAdded="handleImageAdded"
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
  data() {
    return {
      content: '',
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