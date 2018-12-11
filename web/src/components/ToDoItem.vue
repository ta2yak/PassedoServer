<template>
    <v-toolbar v-if="isEdit" flat>
        <v-text-field 
            class="ml-3 mr-3 mt-1"
            v-model="editText"
            :append-icon="editText ? 'edit' : ''"
            :append-icon-cb="edit"
            @keyup.native.enter="edit"
            ref="editText"
        ></v-text-field>
    </v-toolbar>
    <v-list-tile v-bind:class="{ 'timer-tick': isTimer, 'hover-item': true }" v-else>
        <v-list-tile-action class="mt-2">
            <v-tooltip bottom>
                <v-checkbox :input-value="this.todo.done" value @click="toggle()" slot="activator"></v-checkbox>
                <span>done at {{formatDate(this.todo.doneAt)}}</span>
            </v-tooltip>
        </v-list-tile-action>

        <v-list-tile-content class="ml-1 mr-1">
            <v-tooltip bottom>
              <v-list-tile-title @dblclick="toEdit()" slot="activator">{{this.todo.task}}</v-list-tile-title>
              <span>
              total times<br/>
              {{getTotalTime()}}<br/>
              task<br/>
              {{this.todo.task}}<br/>
              </span>
            </v-tooltip>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn v-if="!isTimer" :disabled="done" fab dark flat hover color="green accent-2" @click.native="timerStart">
              <v-icon>play_arrow</v-icon>
          </v-btn>
          <v-btn v-else :disabled="done" fab dark flat hover color="pink accent-1" @click.native="timerStop">
              <v-icon>stop</v-icon>
          </v-btn>
        </v-list-tile-action>

        <v-list-tile-action>

            <v-speed-dial v-model="showFab" direction="left">
                <v-btn slot="activator" color="primary" dark fab flat small hover v-model="showFab">
                    <v-icon style="position: absolute; top: 10px;">more_vert</v-icon>
                    <v-icon style="position: absolute; top: 10px;">close</v-icon>
                </v-btn>

                <v-btn v-if="!archived" fab dark class="ma-1"　small hover color="pink accent-1" @click.native="archive">
                    <v-icon style="position: absolute; top: 10px;">archive</v-icon>
                </v-btn>
                <v-btn v-else fab dark class="ma-1"　small hover color="teal accent-1" @click.native="unarchive">
                    <v-icon style="position: absolute; top: 10px;">unarchive</v-icon>
                </v-btn>

                <v-btn fab dark class="ma-1"　small hover color="blue accent-2" @click.native="toRecords">
                    <v-icon style="position: absolute; top: 10px;">list</v-icon>
                </v-btn>

            </v-speed-dial>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'todo-item',
    props: ['todo'],
    data: () => ({
      isEdit: false,
      editText: '',
      showFab: false,
      isTimer: false,
      startTime: null
    }),
    computed: {
      done () { return this.todo.done },
      archived () { return this.todo.archive }
    },
    methods: {
      getTotalTime () {
        let seconds = 0
        if (this.todo.records) {
          this.todo.records.forEach(record => {
            seconds += moment(record.end).diff(moment(record.start), 'seconds')
          })
        }

        let converter = new Date(null)
        converter.setSeconds(seconds)
        return converter.toISOString().substr(11, 8)
      },
      formatDate (unixtime) {
        if (unixtime) return moment(unixtime).format('YYYY/MM/DD HH:mm')
        return 'No Date'
      },
      toEdit () {
        this.editText = this.todo.task
        this.isEdit = true
        this.$nextTick(() => this.$refs.editText.focus()) // フォーカスを設定する
      },
      edit () {
        if (this.editText) {
          this.$store.dispatch('edit', {todo: this.todo, task: this.editText})
          this.isEdit = false
        }
      },
      toRecords () {
        this.$router.push({name: 'records', params: { id: this.todo.id }})
      },
      archive () {
        this.$store.dispatch('archive', this.todo)
      },
      unarchive () {
        this.$store.dispatch('unarchive', this.todo)
      },
      timerStart () {
        this.startTime = moment().valueOf()
        this.isTimer = true
      },
      timerStop () {
        if (this.startTime) {
          this.$store.dispatch('addRecord', {todo: this.todo, start: this.startTime, end: moment().valueOf()})
          this.startTime = null
          this.isTimer = false
        }
      },
      toggle () {
        this.timerStop()
        this.$store.dispatch('toggle', this.todo)
      }
    }
  }
</script>

<style>

.hover-item:hover {
  background-color: #FFDE03;
}

.timer-tick {
  animation: timer-tick-animation 2s ease-in-out 0s infinite normal;
}
@keyframes timer-tick-animation {
  50% { background-color: #3498db; }
  100% { background-color: #ffffff; }
}

</style>
