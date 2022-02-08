<template>
  <div class="menu-dialog-wrapper">
    <v-menu
      class="delete-article-dialog"
      transition="scale-transition"
      origin="center center"
      style="border-radius: 22px !important"
      light
    >
      <template #activator="{ on, attrs }">
        <span
          text
          color="#000"
          v-bind="attrs"
          v-on="on"
          style="text-transform: capitalize"
        >
          {{ activateText }}
        </span>
      </template>
      <v-card
        style="
          width: 266px;
          height: 179.9px;
          border-radius: 22px;
          background-color: #fff;
          padding-top: 10px;
        "
      >
        <center>
          <h3>{{ dialogTitle }}</h3>
          <div
            class="delete-dialog-content-container"
            style="padding: 10px 49px"
          >
            <p>{{ dialogBody }}</p>
          </div>
        </center>
        <div
          class="btn-container"
          style="padding: 5px 13.5px; margin-top: 13px; margin-right: 6px"
        >
          <v-row>
            <v-btn
              text
              style="
                width: 52px;
                height: 42px;
                padding: 8px 14px 8px 14px;
                object-fit: contain;
                border-radius: 13px;
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
                background-color: #ebebeb;
                margin-left: 5px;
              "
            >
              <span
                style="
                  font-size: 14px;
                  font-weight: bold;
                  font-stretch: normal;
                  font-style: normal;
                  line-height: 1.86;
                  letter-spacing: normal;
                  text-align: center;
                  color: #1d1d1d;
                "
              >
                No
              </span>
            </v-btn>

            <v-btn
              width="100%"
              text
              style="
                width: 177.1px;
                height: 42px;
                object-fit: contain;
                border-radius: 13px;
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
                background-color: rgb(70, 70, 136);
                margin-left: 5px;
              "
              @click="triggerConfirm"
            >
              <span
                style="
                  width: 62px;
                  height: 26px;
                  -webkit-backdrop-filter: blur(10px);
                  backdrop-filter: blur(10px);
                  text-shadow: 0 3px 16px rgba(0, 0, 0, 0.2);
                  font-size: 14px;
                  font-weight: bold;
                  font-stretch: normal;
                  font-style: normal;
                  line-height: 1.86;
                  letter-spacing: normal;
                  text-align: center;
                  color: #fff;
                "
              >
                Yes
              </span>
            </v-btn>
          </v-row>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    activateText: {
      type: String,
      defalut: () => 'Defalut',
    },
    dialogTitle: {
      type: String,
      defalut: () => 'Defalut Title',
    },
    dialogBody: {
      type: String,
      defalut: () => 'Defalut Body',
    },
  },
  methods:{
    triggerConfirm(){
      this.$emit('confirmTriggerd')
    }
  }
}
</script>

<style lang="scss" scpoed>
  .v-menu__content {
    border-radius: 22px !important;
}
</style>