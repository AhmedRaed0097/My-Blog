<template>
  <div>
    <br />
    <br />
    <v-row style="position: relative; bottom: 112px">
      <v-col cols="12">
        <div class="header">
          <!-- <img
            style="width: 100%; height: 700px"
            src="~/assets/images/header-image.jpg"
            alt=""
          /> -->
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import carousel from '~/components/Home/carousel.vue'
export default {
  components: { carousel },
  name: 'IndexPage',

  methods: {},
}
</script>
<style lang="scss">
.header {
  height: 700px;
  background-image: url('~/assets/images/header-image.jpg');
  background-position: center;
  background-size: cover;
}
</style>
