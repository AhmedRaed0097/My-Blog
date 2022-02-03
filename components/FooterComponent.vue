<template>
  <div class="footer-wrapper-row">
    <v-row>
      <v-col cols="12">
        <div class="footer-content">
          <div class="accounts">
            <div class="icons-wrapper">
              <img
                width="30"
                height="30"
                style="background: #fff; border-radius: 20px; padding: 5px"
                src="~/assets/icons/accounts/facebook.png"
                alt="faceook-icon"
              />
              <img
                width="30"
                height="30"
                style="background: #fff; border-radius: 20px; padding: 5px"
                src="~/assets/icons/accounts/twitter.png"
                alt="twitter-icon"
              />
              <img
                width="30"
                height="30"
                style="background: #fff; border-radius: 20px; padding: 5px"
                src="~/assets/icons/accounts/github.png"
                alt="github-icon"
              />
            </div>
          </div>
          <div class="pages-wrapper">
            <a class="footer-link" href="">HOME</a>
            <a class="footer-link" href="">BLOGS</a>
            <a class="footer-link" href="">CREATE BLOG</a>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <div class="copy-right-container">
          <center>
            <p>Copyright &copy; Reserves | Designed By Ahmed Raed</p>
          </center>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.footer-wrapper-row {
  display: flex;
  flex-direction: column;
  min-height: 260px;
  background: rgb(46, 45, 45);
  color: #fff;
}
.copy-right-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.footer-content {
  width: 50%;
  height: 100%;
  margin: 0 auto;
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .pages-wrapper {
    .footer-link {
      color: #fff;
      text-decoration: none;
      &:hover {
        color: #000;
      }
    }
  }
}
.icons-wrapper,
.pages-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 109px;
}
</style>