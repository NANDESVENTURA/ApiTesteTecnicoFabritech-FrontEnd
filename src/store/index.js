import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state () {
    return {
      authenticated: false,
      token: null,
      user: null
    }
  },
  getters: {
    authenticated: state => state.authenticated,
    token: state => state.token,
    userId: state => state.user.id,
    userName: state => state.user.name
  },
  mutations: {
    authenticate (state, data) {
      state.authenticated = true
      state.token = data.token
      state.userId = data.userId
      state.user = data.user
    },
    logout (state) {
      state.authenticated = false
      state.token = null
      state.userId = null
    }
  },
  actions: {
  },
  plugins: [vuexLocal.plugin]
})
