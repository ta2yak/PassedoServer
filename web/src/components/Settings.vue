<template>
  <v-content id="settings">
    <v-layout>
      <v-flex>
        <v-card class="settings-card">
          <v-toolbar flat dark color="primary">
            <v-toolbar-title class="ml-4"><v-icon>settings</v-icon>　Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="back()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-container fluid class="ma-3">

            <p class="headline">タスクの同期機能を利用する (β版) <v-icon>lock</v-icon></p>
            <div v-if="currentUser">
              <v-btn @click="sync()" primary>
                <v-icon>cloud</v-icon>　同期する
              </v-btn>
              <v-btn  @click="logout()" secondry>
                <v-icon>close</v-icon>　連携を解除する
              </v-btn>
            </div>
            <div v-else>
              <v-flex xs12 sm6 md3>
                <v-text-field label="メールアドレス" type="text" box v-model="email" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-text-field label="パスワード" type="password" box v-model="password" ></v-text-field>
              </v-flex>
              <v-btn @click="signIn()" primary>
                <v-icon>cloud</v-icon>　ログイン
              </v-btn>
              <v-btn @click="signUp()" primary>
                <v-icon>cloud</v-icon>　新規登録
              </v-btn>
            </div>

            <v-spacer class="ma-4"/>

            <p class="headline">常に前面に表示する</p>
            <v-checkbox label="する" v-model="alwaysOnTop"></v-checkbox>

          </v-container>

        </v-card>
      </v-flex>
    </v-layout>
  </v-content>

</template>

<script>
  export default {
    name: 'settings',
    data: () => ({
      email: '',
      password: ''
    }),
    computed: {
      currentUser: {
        get: function () {
          return this.$store.state.Auth.currentUser
        },
        set: function (value) { }
      },
      alwaysOnTop: {
        get: function () {
          return this.$store.state.Settings.alwaysOnTop
        },
        set: function (value) {
          this.$store.dispatch('setAlwaysOnTop', value)
        }
      }
    },
    methods: {
      back () {
        this.$router.push('/')
      },
      sync () {
        this.$store.dispatch('sync', this.$store.state)
      },
      signIn () {
        this.$store.dispatch('signIn', {email: this.email, password: this.password})
      },
      signUp () {
        this.$store.dispatch('signUp', {email: this.email, password: this.password})
      },
      logout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>

  #settings {
    background-color: rgba(0, 0, 0, .0);
    height: 100vh;
    max−height: 100vh;
    width: 100vw;
    max−width: 100vw;
    overflow: hidden;
  }

  .settings-body::-webkit-scrollbar {
    overflow:hidden;
    width:5px;
    background:#eee;
      
    -webkit-border-radius:3px;
    border-radius:3px;
  }

  .settings-body::-webkit-scrollbar:horizontal {
    height:5px;
  }

  .settings-body::-webkit-scrollbar-button {
    display:none;
  }

  .settings-body::-webkit-scrollbar-piece {
    background:#eee;
  }

  .settings-body::-webkit-scrollbar-piece:start {
    background:#eee;
  }

  .settings-body::-webkit-scrollbar-thumb {
    overflow:hidden;
    -webkit-border-radius:1px;
    border-radius:1px;
          
    background:#bbb;
  }

  .settings-body::-webkit-scrollbar-corner {
    overflow:hidden;
    -webkit-border-radius:1px;
    border-radius:1px;
          
    background:#bbb;
  }

  .sunday {
    background-color: #FCE4EC;
  }

  .saturday {
    background-color: #E3F2FD;
  }

</style>
