<template>
  <div>
    <v-toolbar flat dark fixed color="primary" style="top: 54px;">
      <span class="ma-2">Start&nbsp;&nbsp;</span>
      <v-menu
          lazy
          :close-on-content-click="false"
          v-model="fromDateMenu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
          class="ma-2"
        >
        <v-text-field 
            slot="activator"
            label="Date"
            v-model="fromDate"
            readonly
        ></v-text-field>
        <v-date-picker v-model="fromDate" no-title scrollable></v-date-picker>
      </v-menu>

      <v-menu
          lazy
          :close-on-content-click="false"
          v-model="fromTimeMenu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
          class="ma-2"
        >
        <v-text-field 
            slot="activator"
            label="Time"
            v-model="fromTime"
            readonly
        ></v-text-field>
        <v-time-picker v-model="fromTime" format="24hr" no-title scrollable></v-time-picker>
      </v-menu>
      
    </v-toolbar>
    <v-toolbar flat dark fixed color="primary" style="top: 108px;">

      <span class="ma-2">End　</span>
      <v-menu
          lazy
          :close-on-content-click="false"
          v-model="toDateMenu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
          class="ma-2"
        >
        <v-text-field 
            slot="activator"
            label="Date"
            v-model="toDate"
            readonly
        ></v-text-field>
        <v-date-picker v-model="toDate" no-title scrollable></v-date-picker>
      </v-menu>

      <v-menu
          lazy
          :close-on-content-click="false"
          v-model="toTimeMenu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
          class="ma-2"
        >
        <v-text-field 
            slot="activator"
            label="Time"
            v-model="toTime"
            readonly
        ></v-text-field>
        <v-time-picker v-model="toTime" format="24hr" no-title scrollable></v-time-picker>
      </v-menu>

      <v-btn fab dark flat hover color="blue accent-1" @click.native="add">
        <v-icon>add</v-icon>
      </v-btn>

    </v-toolbar>

  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'record-input',
    props: ['todo'],
    data: () => ({
      fromDateMenu: false,
      fromTimeMenu: false,
      toDateMenu: false,
      toTimeMenu: false,
      fromDate: moment().format('YYYY-MM-DD'),
      fromTime: moment().format('HH:mm'),
      toDate: moment().format('YYYY-MM-DD'),
      toTime: moment().format('HH:mm')
    }),
    methods: {
      add () {
        if (this.fromDate && this.fromTime && this.toDate && this.toTime) {
          let start = moment(this.fromDate + ' ' + this.fromTime, 'YYYY-MM-DD HH:mm')
          let end = moment(this.toDate + ' ' + this.toTime, 'YYYY-MM-DD HH:mm')
          this.$store.dispatch('addRecord', {todo: this.todo, start: start.valueOf(), end: end.valueOf()})
        }
      }
    }
  }
</script>

<style>
</style>
