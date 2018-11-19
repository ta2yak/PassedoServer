import firebase from '@firebase/app'
import '@firebase/auth'

const config = {
  apiKey: 'AIzaSyBGHTO5u_AWb_BvtELH8TOI2KUqjzxRJ4s',
  authDomain: 'passedo-app.firebaseapp.com',
  databaseURL: 'https://passedo-app.firebaseio.com',
  projectId: 'passedo-app',
  storageBucket: 'passedo-app.appspot.com',
  messagingSenderId: '56035635449'
}

firebase.initializeApp(config)

const state = {
  currentUser: null,
  status: false
}

const mutations = {
  ON_AUTH_STATE_CHANGED (state, user) {
    state.currentUser = user
  },
  ON_USER_STATUS_CHANGED (state, status) {
    state.status = status
  }
}

const getters = {
}

const actions = {
  signUp ({ commit }, payload) {
    if (payload.email === '') {
      alert('メールアドレスを入力してください')
      return
    }

    if (payload.password === '') {
      alert('パスワードを入力してください')
      return
    }

    firebase.auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        var errorMessage = error.message
        alert(errorMessage)
      })
  },
  signIn ({ commit }, payload) {
    if (payload.email === '') {
      alert('メールアドレスを入力してください')
      return
    }

    if (payload.password === '') {
      alert('パスワードを入力してください')
      return
    }

    firebase.auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        var errorMessage = error.message
        alert(errorMessage)
      })
  },
  logout ({ commit }) {
    firebase.auth().signOut()
  },
  onAuth ({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      user = user || null
      commit('ON_AUTH_STATE_CHANGED', user)
      commit('ON_USER_STATUS_CHANGED', !!user)
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
