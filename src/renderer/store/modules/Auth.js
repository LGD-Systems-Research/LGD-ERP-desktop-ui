import ApiService from '@/common/api.service'
import JwtService from '@/common/jwt.service'
import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH
} from './../Actions.type'
import { SET_AUTH_LOADING, SET_AUTH, PURGE_AUTH, SET_ERROR } from './../Mutations.type'

const state = {
  isLoading: false,
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
}

const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  }
}

const actions = {
  [LOGIN] (context, credentials) {
    console.log('AUTH>LOGIN::Post', credentials)

    context.commit(SET_AUTH_LOADING, true)
    // TESTING MIMIK LAODING REQUEST
    // setTimeout(() => {
    //   context.commit(SET_AUTH, 'testing')
    //   context.commit(SET_AUTH_LOADING, false)
    // }, 3000)

    // UNCOMMENT THIS FOR REAL API REQUEST
    return new Promise(resolve => {
      ApiService.post('auth', { email: credentials.payload.email, password: credentials.payload.password, remember: credentials.payload.remember })
        .then(({ data }) => {
          console.log('AUTH>Login::Data', data)
          context.commit(SET_AUTH, 'data.user')
          resolve(data)
          context.commit(SET_AUTH_LOADING, false)
        })
        .catch(({ response }) => {
          console.log('AOUTH>Login::Catch', response)
          context.commit(SET_ERROR, response.data.errors)
          context.commit(SET_AUTH_LOADING, false)
        })
    })
  },
  [LOGOUT] (context) {
    context.commit(PURGE_AUTH)
  },
  [CHECK_AUTH] (context) {
    if (JwtService.getToken()) {
      // TESTING MIMIK LAODING REQUEST
      context.commit(SET_AUTH_LOADING, true)
      setTimeout(() => {
        context.commit(SET_AUTH, 'testing')
        context.commit(SET_AUTH_LOADING, false)
      }, 3000)

      // ApiService.setHeader()
      // ApiService.get('user')
      //   .then(({ data }) => {
      //     context.commit(SET_AUTH, data.user)
      //   })
      //   .catch(({ response }) => {
      //     context.commit(SET_ERROR, response.data.errors)
      //   })
    } else {
      context.commit(PURGE_AUTH)
    }
  }
}

const mutations = {
  [SET_AUTH_LOADING] (state, isLoading) {
    state.isLoading = isLoading
  },
  [SET_ERROR] (state, error) {
    state.errors = error
  },
  [SET_AUTH] (state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
    JwtService.saveToken(state.user.token)
  },
  [PURGE_AUTH] (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    JwtService.destroyToken()
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
