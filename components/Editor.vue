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
  <button>Save</button>
  <button>Cancle</button>
</div>
    <!-- <div v-html="content" /> -->

<br>
<br>
<br>
<br>
  </div>
 </template>
 <script>
 export default {

  data() {

    return {

      content: ''

    }

  },

  methods: {

    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      console.log('img',file)
      const formData = new FormData()

      formData.append('image', file)

      const config = {

        headers: {

            // header setting

        }

      }

      this.$axios.$post('/api_url', formData, config)

        .then((result) => {

          const url = result.data.url // Get url from response

          Editor.insertEmbed(cursorLocation, 'image', url)

          resetUploader()

        })

        .catch((err) => {

          // eslint-disable-next-line no-console

          console.log(err)

        })

    }

  }
 }
 </script>