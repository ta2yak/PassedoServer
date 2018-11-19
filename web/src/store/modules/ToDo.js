import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/functions'
import uuidv4 from 'uuid/v4'
import moment from 'moment'

const state = {
  lastSynced: null,
  tasks: [],
  filter: 'ALL'
}

const mutations = {
  STARTUP (state) { // for Version up data maintenance
    console.log('Welcome to Passedo')
    // Add Records ID
    state.tasks.forEach(task => {
      task.records.forEach(record => {
        if (!record.id) {
          record.id = uuidv4()
        }
      })
    })
  },
  READY_SYNC_TODO (state) {
    state.lastSynced = moment().valueOf()
  },
  ON_SYNC_TODO (state, payload) {
    if (!state.lastSynced || state.lastSynced < payload.lastSynced) {
      state.lastSynced = payload.lastSynced
      state.tasks = payload.tasks
      state.filter = payload.filter
    }
  },
  ADD_TODO (state, payload) {
    state.tasks.push({id: uuidv4(), task: payload, done: false, records: [], archive: false, createdAt: moment().valueOf()})
  },
  EDIT_TODO (state, payload) {
    let index = state.tasks.findIndex(task => task.id === payload.todo.id)
    state.tasks.splice(index, 1, Object.assign({}, payload.todo, {task: payload.task, updatedAt: moment().valueOf()}))
  },
  ARCHIVE_TODO (state, payload) {
    let index = state.tasks.findIndex(task => task.id === payload.id)
    state.tasks.splice(index, 1, Object.assign({}, payload, {archive: true, archivedAt: moment().valueOf()}))
  },
  UNARCHIVE_TODO (state, payload) {
    let index = state.tasks.findIndex(task => task.id === payload.id)
    state.tasks.splice(index, 1, Object.assign({}, payload, {archive: false, archivedAt: null}))
  },
  DONE_TODO (state, payload) {
    let index = state.tasks.findIndex(task => task.id === payload.id)
    state.tasks.splice(index, 1, Object.assign({}, payload, {done: true, doneAt: moment().valueOf()}))
  },
  UNDONE_TODO (state, payload) {
    let index = state.tasks.findIndex(task => task.id === payload.id)
    state.tasks.splice(index, 1, Object.assign({}, payload, {done: false, doneAt: null}))
  },
  ADD_TODO_RECORD (state, payload) {
    let index = state.tasks.findIndex(task => task.id === payload.todo.id)
    let todo = payload.todo
    todo.records.push({id: uuidv4(), start: payload.start, end: payload.end})
    state.tasks.splice(index, 1, todo)
  },
  REMOVE_TODO_RECORD (state, payload) {
    let todoIndex = state.tasks.findIndex(task => task.id === payload.todo.id)
    let recordIndex = state.tasks[todoIndex].records.findIndex(record => (record.id === payload.record.id))
    state.tasks[todoIndex].records.splice(recordIndex, 1)
  },
  SET_FILTER (state, filter) {
    state.filter = filter
  },
  RESORT_TASKS (state, tasks) {
    state.tasks = tasks
  },
  RESORT_TASK_RECORDS (state, payload) {
    let index = state.tasks.findIndex(task => task.id === payload.id)
    let task = state.tasks[index]
    task.records = payload.records
    state.tasks.splice(index, 1, task)
  }
}

const getters = {
  getPreviewData: (state) => (yyyymm) => {
    /***
    Generate preview data
    - Format -
    [ element count = target month day count
      [{task: task A}, {task: task B}, {task: task C}], 1 day tasks
      [{task: task B}, {task: task C}], 2 day tasks
      [{task: task A}], 3 day tasks
      and more ...
    ]
    ***/
    let data = []
    let targetMonth = moment(yyyymm, 'YYYY-MM')
    for (let i = 1; i <= targetMonth.daysInMonth(); i++) {
      let tasks = []
      state.tasks.forEach(task => {
        let from = targetMonth.clone().date(i).valueOf()
        let to = targetMonth.clone().date(i + 1).valueOf()
        let filteredRecords = task.records.filter(record => from <= record.start && record.start <= to)
        filteredRecords.forEach(record => {
          tasks.push({task: task.task})
        })
      })
      data.push(tasks)
    }
    return data
  },
  getToDo: (state) => (id) => {
    let todo = state.tasks.filter(task => task.id === id)
    if (todo.length !== 1) return null
    return todo[0]
  },
  getRecords: (state) => (id) => {
    let todo = state.tasks.filter(task => task.id === id)
    if (todo.length !== 1) return []
    return todo[0].records
  }
}

const actions = {
  add ({dispatch, commit, state}, text) {
    commit('ADD_TODO', text)
    dispatch('sync')
  },
  edit ({dispatch, commit, state}, payload /* {todo:xxx, task:xxx} */) {
    commit('EDIT_TODO', payload)
    dispatch('sync')
  },
  toggle ({dispatch, commit, state}, todo) {
    if (todo.done) {
      commit('UNDONE_TODO', todo)
    } else {
      commit('DONE_TODO', todo)
    }
    dispatch('sync')
  },
  addRecord ({dispatch, commit, state}, payload /* {todo:xxx, start:xxx, end:xxx} */) {
    commit('ADD_TODO_RECORD', payload)
    dispatch('sync')
  },
  removeRecord ({dispatch, commit, state}, payload /* {todo:xxx, record:xxx} */) {
    commit('REMOVE_TODO_RECORD', payload)
    dispatch('sync')
  },
  archive ({dispatch, commit, state}, todo) {
    commit('ARCHIVE_TODO', todo)
    dispatch('sync')
  },
  unarchive ({dispatch, commit, state}, todo) {
    commit('UNARCHIVE_TODO', todo)
    dispatch('sync')
  },
  setFilter ({dispatch, commit, state}, filter) {
    commit('SET_FILTER', filter)
    dispatch('sync')
  },
  sync ({dispatch, commit, state}) {
    let syncFunction = firebase.functions().httpsCallable('Sync')
    syncFunction(state).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
  },
  onSync ({dispatch, commit, state}) {
    let currentUser = firebase.auth().currentUser
    if (currentUser) {
      firebase.database().ref('users/' + currentUser.uid).on('value', (snapshot) => {
        commit('ON_SYNC_TODO', snapshot.val())
      }).catch((error) => {
        let errorMessage = error.message
        alert(errorMessage)
      })
    } else {
      firebase.database().ref('users').off()
    }
  }

}

export default {
  state,
  mutations,
  getters,
  actions
}
