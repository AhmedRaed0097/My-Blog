<template>
  <v-row class="never-miss-row">
    <v-col cols="9">
      <div class="text-wrapper">
        <p>
          NEVER MISS A BLOGS. REGISTER FOR YOUR FREE ACCOUT <br />
          TODAY!
        </p>
      </div>
    </v-col>
    <v-col cols="3">
      <div class="register-container">
        <v-btn rounded dark elevation="0" class="register-btn">
          <span> REGISTER FOR MY BLOG </span>
        </v-btn>
          <v-icon small>mdi-up-arrow</v-icon>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.never-miss-row {
//   background: red;
}
.text-wrapper {
  height: 100%;
  display: flex;
  p {
    margin: 70px 0 50px 150px;
    width: 290px;
    font-size: 25px;
  }
}

.register-container {
//   background: #080;
  height: 100%;
  display: flex;
  align-items: center;
  register-btn {
  }
}
</style>