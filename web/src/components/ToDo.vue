<template>
    <v-content id="todo">
      <v-layout>
        <v-flex>
          <v-card class="todo-card">
            <v-toolbar flat dark fixed color="primary">
              <v-toolbar-title class="draggable ml-3"><v-icon>done_all</v-icon>　ToDo</v-toolbar-title>
              <v-spacer class="draggable"></v-spacer>
              <v-btn icon @click="toPreview()">
                <v-icon>print</v-icon>
              </v-btn>
              <v-btn icon @click="toSettings()">
                <v-icon>settings</v-icon>
              </v-btn>
            </v-toolbar>

            <ToDoInput></ToDoInput>

            <div style="margin-top: 110px;">

              <v-list class="todo-body" subheader>

                <v-subheader>Tasks</v-subheader>

                <draggable v-model="todos">
                  <div v-for="todo in todos" :key="todo.id">
                    <ToDoItem v-if="isVisible(todo)" v-bind:todo="todo" /> 
                  </div>
                </draggable>

                <v-bottom-nav :value="true" :active.sync="filter" fixed color="white" height="28">
                  <v-btn flat color="primary" value="ALL">
                    <span>ALL</span>
                  </v-btn>
                  <v-btn flat color="primary" value="DONE">
                    <span>DONE</span>
                  </v-btn>
                  <v-btn flat color="primary" value="UNDONE">
                    <span>UNDONE</span>
                  </v-btn>
                  <v-btn flat color="primary" value="ARCHIVE">
                    <span>ARCHIVE</span>
                  </v-btn>
                </v-bottom-nav>
              </v-list>

            </div>

          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
</template>

<script>
  import draggable from 'vuedraggable'
  import ToDoInput from '../components/ToDoInput.vue'
  import ToDoItem from '../components/ToDoItem.vue'

  export default {
    name: 'todo',
    components: {
      ToDoItem: ToDoItem,
      ToDoInput: ToDoInput,
      draggable: draggable
    },
    computed: {
      filter: {
        get: function () {
          return this.$store.state.ToDo.filter
        },
        set: function (newValue) {
          this.$store.dispatch('setFilter', newValue)
        }
      },
      todos: {
        get: function () {
          return this.$store.state.ToDo.tasks
        },
        set: function (value) {
          this.$store.commit('RESORT_TASKS', value)
        }
      }
    },
    methods: {
      isVisible (task) {
        switch (this.filter) {
          case 'ALL':
            return !task.archive
          case 'DONE':
            return (task.done && !task.archive)
          case 'UNDONE':
            return (!task.done && !task.archive)
          case 'ARCHIVE':
            return task.archive
        }
      },
      toPreview () {
        this.$router.push('/preview')
      },
      toSettings () {
        this.$router.push('/settings')
      }
    }
  }
</script>

<style>

  /* CSS */
  #todo {
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

  .todo-card {
    height: 100vh !important;
    width: 100vw !important;
    overflow: hidden;
  }

.todo-body {
  overflow-y: auto;
  height: 500px;
  -webkit-app-region: no-drag;
}

.todo-body::-webkit-scrollbar {
  overflow:hidden;
  width:5px;
  background:#eee;
    
  -webkit-border-radius:3px;
  border-radius:3px;
}

.todo-body::-webkit-scrollbar:horizontal {
  height:5px;
}

.todo-body::-webkit-scrollbar-button {
  display:none;
}

.todo-body::-webkit-scrollbar-piece {
  background:#eee;
}

.todo-body::-webkit-scrollbar-piece:start {
  background:#eee;
}

.todo-body::-webkit-scrollbar-thumb {
  overflow:hidden;
  -webkit-border-radius:1px;
  border-radius:1px;
         
  background:#bbb;
}

.todo-body::-webkit-scrollbar-corner {
  overflow:hidden;
  -webkit-border-radius:1px;
  border-radius:1px;
         
  background:#bbb;
}

</style>
