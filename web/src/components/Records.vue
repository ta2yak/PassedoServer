<template>
    <v-content id="records">
      <v-layout>
        <v-flex>
          <v-card class="records-card">
            <v-toolbar flat dark fixed color="primary">
              <v-toolbar-title class="ma-1">
                <v-btn icon @click="toBack()">
                  <v-icon>arrow_back</v-icon>
                </v-btn>
                <span class="draggable">
                Task Records
                </span>
               </v-toolbar-title>
            </v-toolbar>

            <RecordInput v-bind:todo="todo"></RecordInput>

            <div style="margin-top: 180px;">

              <v-list class="records-body" subheader>

                <v-subheader>Records</v-subheader>

                <draggable v-model="records">
                  <div v-for="record in records" :key="record.id">
                    <RecordItem v-bind:todo="todo" v-bind:record="record" /> 
                  </div>
                </draggable>

              </v-list>

            </div>

          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
</template>

<script>
  import draggable from 'vuedraggable'
  import RecordInput from '../components/RecordInput.vue'
  import RecordItem from '../components/RecordItem.vue'

  export default {
    name: 'records',
    components: {
      RecordItem: RecordItem,
      RecordInput: RecordInput,
      draggable: draggable
    },
    computed: {
      todo () { return this.$store.getters.getToDo(this.$route.params.id) },
      records: {
        get: function () {
          return this.$store.getters.getRecords(this.$route.params.id)
        },
        set: function (value) {
          this.$store.commit('RESORT_TASK_RECORDS', {records: value, id: this.$route.params.id})
        }
      }
    },
    methods: {
      toBack () {
        this.$router.push({name: 'todo'})
      }
    }
  }
</script>

<style>

  /* CSS */
  #records {
    background-color: rgba(0, 0, 0, .0);
    overflow: hidden;
  }

  .draggable {
    -webkit-app-region: drag;
    -webkit-user-select: none;
  }

  .no-drag {
    -webkit-app-region: none;
    -webkit-user-select: none;
  }

  .records-card {
    height: 100vh !important;
    width: 100vw !important;
    overflow: hidden;
  }

  .records-body {
    overflow-y: auto;
    height: 500px;
    -webkit-app-region: no-drag;
  }

  .records-body::-webkit-scrollbar {
    overflow:hidden;
    width:5px;
    background:#eee;
      
    -webkit-border-radius:3px;
    border-radius:3px;
  }

  .records-body::-webkit-scrollbar:horizontal {
    height:5px;
  }

  .records-body::-webkit-scrollbar-button {
    display:none;
  }

  .records-body::-webkit-scrollbar-piece {
    background:#eee;
  }

  .records-body::-webkit-scrollbar-piece:start {
    background:#eee;
  }

  .records-body::-webkit-scrollbar-thumb {
    overflow:hidden;
    -webkit-border-radius:1px;
    border-radius:1px;
          
    background:#bbb;
  }

  .records-body::-webkit-scrollbar-corner {
    overflow:hidden;
    -webkit-border-radius:1px;
    border-radius:1px;
          
    background:#bbb;
  }

</style>
