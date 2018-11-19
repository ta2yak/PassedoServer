<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    name: 'passedo',
    computed: {
      alwaysOnTop: {
        get: function () {
          return this.$store.state.Settings.alwaysOnTop
        }
      }
    },
    methods: {
    },
    created: function () {
      // 起動時から認証の状況を監視するようにする
      this.$store.dispatch('onAuth')

      // 起動時からToDoの状況を監視するようにする
      this.$store.dispatch('onSync')
    },
    mounted () {
      // 起動時に保存されている設定情報をアプリケーションに反映する
      // alwaysOnTopはIPCが必要なため、ここで特別に処理する
      this.$store.dispatch('setAlwaysOnTop', this.alwaysOnTop)
    }
  }
</script>

<style>

</style>
