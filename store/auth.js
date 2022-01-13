export const state = () => ({
  user: {},
  loggedIn: false,
})

export const mutations = {
  SETUSER(state, payload) {
    console.log('commit');
    state.user.email = payload
    state.loggedIn = true
  },
}
export const actions = {
  async signUp({ commit }, payload) {
    console.log('pay ', payload)

    const response = await this.$fire.auth.createUserWithEmailAndPassword(
      payload.email,
      payload.password
    )
    commit('SETUSER', response.user._delegate.email)
    return response
  },
  async signIn({ commit }, payload) {
      const response = await this.$fire.auth
        .signInWithEmailAndPassword(
          payload.email,
          payload.password
        )
        commit('SETUSER', response.user._delegate.email)
        return response
  },
  async signOut({ commit }) {
    await this.$fire.auth.signOut()
    this.$router.replace('/auth/register')
  },
}
