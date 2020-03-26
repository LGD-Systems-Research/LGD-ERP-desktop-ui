import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/views/Layouts/Admin').default,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: require('@/views/Dashboard').default
        },
        {
          path: 'activities',
          name: 'activities',
          component: require('@/views/Activities').default
        },
        {
          path: 'announcements',
          name: 'announcements',
          component: require('@/views/Announcements').default
        },
        {
          path: 'users',
          name: 'users',
          component: require('@/views/Users').default
        },
        {
          path: 'permissions',
          name: 'permissions',
          component: require('@/views/Users/Permissions').default
        },
        {
          path: 'groups',
          name: 'groups',
          component: require('@/views/Users/Groups').default
        },
        {
          path: 'system-settings',
          name: 'settings',
          component: require('@/views/System/Settings').default
        },
        {
          path: 'system-logs',
          name: 'logs',
          component: require('@/views/System/Logs').default
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/views/Layouts/Login').default
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
