<template>
  <v-content id="preview">
    <v-layout>
      <v-flex>
        <v-card class="preview-card">
          <v-toolbar flat dark color="primary">
            <v-toolbar-title class="ml-4"><v-icon>print</v-icon>　Preview</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog
              persistent
              v-model="modal"
              lazy
              full-width
              width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="selectingMonth"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker type="month" v-model="selectingMonth" scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="reflesh()">OK</v-btn>
                    <v-btn flat color="primary" @click="cancel()">Cancel</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-dialog>

            <v-btn icon @click="back()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list dense style="overflow: auto; height: calc(100vh - 60px)" class="pa-4 preview-body">

            <p class="headline">{{ targetMonth }}</p>

            <ul style="list-style-type: none;">
              <template v-for="records in todos">
                <li :class="setHolidayClass(todos.indexOf(records) + 1)">
                  <v-layout row wrap>
                    <v-flex xs1>
                      <p class="mt-1 mb-1 ml-4">{{ todos.indexOf(records) + 1 }}</p>
                    </v-flex>
                    <v-flex xs11>
                      <p class="mt-1 mb-1">{{ formattedTodo(records) }}</p>
                    </v-flex>
                  </v-layout>
                </li>
              </template>
            </ul>

          </v-list>

        </v-card>
      </v-flex>
    </v-layout>
  </v-content>

</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'

  export default {
    name: 'preview',
    data: () => ({
      modal: false,
      selectingMonth: moment().format('YYYY-MM'),
      targetMonth: moment().format('YYYY-MM')
    }),
    computed: {
      todos () {
        return this.$store.getters.getPreviewData(this.targetMonth)
      }
    },
    methods: {
      formattedTodo (records) {
        return _.join(_.uniq(records.map(record => { return record.task }), true), ' , ')
      },
      setHolidayClass (day) {
        let weekDay = moment(this.targetMonth + '-' + day, 'YYYY-MM-DD').day()
        if (weekDay === 0) return 'sunday'
        if (weekDay === 6) return 'saturday'
        return ''
      },
      reflesh () {
        this.targetMonth = this.selectingMonth
        this.modal = false
      },
      cancel () {
        this.modal = false
      },
      back () {
        this.$router.push('/')
      }
    }
  }
</script>

<style>

  #preview {
    background-color: rgba(0, 0, 0, .0);
    height: 100vh;
    max−height: 100vh;
    width: 100vw;
    max−width: 100vw;
    overflow: hidden;
  }

  .preview-body::-webkit-scrollbar {
    overflow:hidden;
    width:5px;
    background:#eee;
      
    -webkit-border-radius:3px;
    border-radius:3px;
  }

  .preview-body::-webkit-scrollbar:horizontal {
    height:5px;
  }

  .preview-body::-webkit-scrollbar-button {
    display:none;
  }

  .preview-body::-webkit-scrollbar-piece {
    background:#eee;
  }

  .preview-body::-webkit-scrollbar-piece:start {
    background:#eee;
  }

  .preview-body::-webkit-scrollbar-thumb {
    overflow:hidden;
    -webkit-border-radius:1px;
    border-radius:1px;
          
    background:#bbb;
  }

  .preview-body::-webkit-scrollbar-corner {
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
