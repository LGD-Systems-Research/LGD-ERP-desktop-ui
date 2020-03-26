import Vue from 'vue'
import axios from 'axios'
import vuetify from './../plugins/vuetify'

import App from './App'
import router from './router'
import store from './store'

import { CHECK_AUTH } from './store/Actions.type'
import ApiService from './common/api.service'
import ErrorFilter from './common/error.filter'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// Custom Filters
Vue.filter('error', ErrorFilter)

// API Service Initialize
ApiService.init()
// Checked auth each page load
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
)

/* eslint-disable no-new */
new Vue({
  vuetify,
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
