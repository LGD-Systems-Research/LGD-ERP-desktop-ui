import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'

const ApiService = {
  init () {
    console.log('API INIT')
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader () {
    Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${JwtService.getToken()}`
  },

  query (resource, params) {
    console.log('API::QUERY>>>', resource, params)
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[LGD] ApiService ${error}`)
    })
  },

  get (resource, slug = '') {
    let url = (resource) ? `${resource}/${slug}` : `${slug}`
    console.log('API::GET>>>', url)
    return Vue.axios.get(url).catch(error => {
      throw new Error(`[LGD] ApiService ${error}`)
    })
  },

  post (resource, params) {
    console.log('API::POST>>>', resource)
    return Vue.axios.post(`${resource}`, params)
  },

  update (resource, slug, params) {
    console.log('API::UPDATE>>>', resource, slug, params)
    return Vue.axios.put(`${resource}/${slug}`, params)
  },

  put (resource, params) {
    console.log('API::PUT>>>', resource, params)
    return Vue.axios.put(`${resource}`, params)
  },

  delete (resource) {
    console.log('API::DELETE>>>', resource)
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  }
}

export default ApiService
