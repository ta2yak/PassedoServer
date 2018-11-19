import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todo',
      component: require('@/components/ToDo').default
    },
    {
      path: '/preview',
      name: 'preview',
      component: require('@/components/Preview').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/Settings').default
    },
    {
      path: '/tasks/:id/record/edit',
      name: 'records',
      component: require('@/components/Records').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
