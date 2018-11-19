<template>
    <v-list-tile>
        <v-list-tile-content class="ml-1 mr-1">
          <v-list-tile-title>{{formatDate(this.record.start)}}　-　{{formatDate(this.record.end)}}　　{{getTime(this.record)}}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn fab dark flat hover color="red accent-1" @click.native="remove">
              <v-icon>delete_forever</v-icon>
          </v-btn>
        </v-list-tile-action>

    </v-list-tile>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'record-item',
    props: ['todo', 'record'],
    methods: {
      formatDate (unixtime) {
        if (unixtime) return moment(unixtime).format('YYYY/MM/DD HH:mm')
        return 'No Date'
      },
      getTime (record) {
        let seconds = 0
        seconds += moment(record.end).diff(moment(record.start), 'seconds')
        let converter = new Date(null)
        converter.setSeconds(seconds)
        return converter.toISOString().substr(11, 8)
      },
      remove () {
        this.$store.dispatch('removeRecord', {todo: this.todo, record: this.record})
      }
    }
  }
</script>

<style>

</style>
