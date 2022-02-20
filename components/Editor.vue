<template>
  <div class="container">
    <client-only placeholder="Loading Your Editor...">
      <p v-show="disabledEditor === true">LOADING</p>
      <vue-editor
        id="editor"
        v-model="content"
        :editor-options="editorSettings"
        useCustomImageHandler
        @image-added="handleImageAdded"
        :placeholder="placeHolder"
        v-show="disabledEditor === false"
      />
    </client-only>
  </div>
</template>
 <script>
export default {
  props:{
    placeHolder:{
      type:String,
      default: null
    },

    gettingContent:{
      type:String,
      default: null
    },

  },
  watch:{
    content(){
      this.$emit('contentChange',this.content)
    }
  },
  data() {
    return {
      content:'',
      disabledEditor: true,
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        }
      }
    }
  },
  created() {
      if(this.gettingContent){
        this.content = this.gettingContent

      }
    if (process.client) {
      setTimeout(() => {
    //     const alignLeftButton = window.document
    //       .getElementsByClassName('ql-align')
    //       .item(0)
    //     const alignRightButton = window.document
    //       .getElementsByClassName('ql-align')
    //       .item(2)
    //     const editor = window.document
    //       .getElementsByClassName('ql-editor')
    //       .item(0)
    //     let pressForFirsttime = false
    //     editor.addEventListener('click', function () {
    //       if (pressForFirsttime === false) {
    //         alignLeftButton.classList.remove('ql-active')
    //         alignRightButton.classList.add('ql-active')
    //       }
    //     })
    //     editor.classList.add('custom-ql-editor')
    //     alignLeftButton.addEventListener('click', function () {
    //       alignLeftButton.classList.toggle('ql-active')

    //       editor.classList.remove('custom-ql-editor')
    //       pressForFirsttime = true
    //     })
        this.disabledEditor = false
      }, 2000)
    }
  },
  methods: {
      async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        console.log('change');
      const formData = new FormData()

      formData.append('image', file)
      await this.$axios
        .$post('https://testing-api.sumaya369.net/v1/admin/front-end-upload-image', formData)

        .then((result) => {
          const url = result.data.image // Get url from response

          Editor.insertEmbed(cursorLocation, 'image', url)

          resetUploader()
        })

        .catch((err) => {
          // eslint-disable-next-line no-console

          console.log(err)
        })
    }
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
</style>
