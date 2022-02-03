<template>
  <!--  -->
 <v-container>
    <v-row >
    <v-col cols="12" style="margin-top: 50px !important;text-align: center;">
      <h1>CREATE NEW BLOG</h1>
    </v-col>
    <v-col cols="12" style="margin-top: 50px !important;">
      <v-card class="wrapper" width="400">
        <div class="upload-poster-wrapper">
          
        </div>
      <div style="height: 500px;">
        <Editor :content="contentEditorBody" />
      </div>
      </v-card>
    </v-col>
  </v-row>
 </v-container>
</template>

<script>
import '~/components/Editor.vue'
export default {
  data(){
    return{
      contentEditorBody:''
    }
  }
}
</script>

<style>
</style>