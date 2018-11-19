<template>
    <v-toolbar flat dark fixed color="primary" style="top: 54px;">
      <v-text-field 
          label="Press Shift + Enter to add"
          class="ma-2"
          v-model="text"
          :append-icon="text ? 'add' : ''"
          :append-icon-cb="add"
          @keyup.native="handleKeyup"
      ></v-text-field>
    </v-toolbar>

  </template>

<script>
  export default {
    name: 'todo-input',
    data: () => ({
      text: ''
    }),
    methods: {
      handleKeyup (e) {
        if (e.shiftKey && e.key === 'Enter') {
          this.add()
        }
      },
      add () {
        if (this.text) {
          this.$store.dispatch('add', this.text)
          this.text = ''
        }
      }
    }
  }
</script>

<style>
</style>
