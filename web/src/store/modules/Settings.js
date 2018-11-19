const state = {
  alwaysOnTop: false,
  mainColor: 'primary'
}

const mutations = {
  SET_ALWAYS_ON_TOP (state, value) {
    state.alwaysOnTop = value
  },
  SET_MAIN_COLOR (state, value) {
    state.mainColor = value
  }
}

const getters = {
}

const actions = {
  setAlwaysOnTop ({ commit }, value) {
    commit('SET_ALWAYS_ON_TOP', value)
  },
  setMainColor ({ commit }, value) {
    commit('SET_MAIN_COLOR', value)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
