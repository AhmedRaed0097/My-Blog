<template>
  <div class="register-wrapper">
    <v-card class="register-card">
      <v-row>
        <v-col cols="12">
          <center>
            <h1 v-if="isSignUp === true">SIGNUP</h1>
            <h1 v-else>SIGNIN</h1>
          </center>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                  ></v-text-field>
                  <small style="color: red">{{ errorMessage }}</small>
                </v-col>

                <v-col cols="12" md="12" v-if="isSignUp === false">
                  <center>
                    <v-btn @click="SignIn" text :loading="loading"
                      >SignIn</v-btn
                    >
                  </center>
                </v-col>
                <v-col cols="12" md="12" v-else>
                  <center>
                    <v-btn @click="SignUp" text :loading="loading"
                      >SignUp</v-btn
                    >
                  </center>
                </v-col>
                <v-col cols="12" md="12" v-if="isSignUp === true">
                  <center>
                    <v-btn text @click="isSignUp = !isSignUp">
                      <small> I have an account </small>
                    </v-btn>
                  </center>
                </v-col>
                <v-col cols="12" md="12" v-else>
                  <center>
                    <v-btn text @click="isSignUp = !isSignUp">
                      <small> I have not an account </small>
                    </v-btn>
                  </center>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  layout: 'register-layout',
  data() {
    return {
      isSignUp: false,
      valid: false,
      errorMessage: '',
      loading: false,
      password: '',
      passwordRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 10 || 'password must be more than 8 characters',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    SignUp() {
      this.loading = true
      this.$store
        .dispatch('auth/signUp', { email: this.email, password: this.password })
        .then((response) => {
          this.loading = false
          console.log('response ', response)
          this.$router.replace('/')
        })
        .catch((error) => {
          this.loading = false
          this.errorMessage = error
        })
    },
    SignIn() {
      this.loading = true
      this.$store
        .dispatch('auth/signIn', {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.loading = false
          console.log('response ', response)
          this.$router.replace('/')
        })
        .catch((error) => {
          this.loading = false
          this.errorMessage = error
        })
    },
  },
}
</script>

<style lang="scss">
.register-wrapper {
  min-height: 100vh;
  background: #dfdfdd;
  display: flex;
  justify-content: center;
  align-items: center;
  .register-card {
    height: 500px;
    width: 500px;
    border-radius: 25px;
    padding: 20px 40px;
  }
}
</style>
