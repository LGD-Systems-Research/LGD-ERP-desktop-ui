import { UsersService } from '@/services'
import {
  FETCH_USERS
} from './../Actions.type'
import {
  SET_APP_LOADING,
  SET_ERROR,
  SET_USERS
} from './../Mutations.type'

const state = {
  isLoading: false,
  errors: null,
  users: []
}

const getters = {
  isLoading (state) {
    return state.isLoading
  },
  errors (state) {
    return state.errors
  },
  users (state) {
    return state.users
  }
}

const actions = {
  [FETCH_USERS] ({ commit }, params) {
    commit(SET_APP_LOADING, true)

    return UsersService.query(params.params)
      .then(({ data }) => {
        console.log('USERS>MODULE>FETCH_USERS', data)
        commit(SET_USERS, data)
        commit(SET_APP_LOADING, false)
        return data
      })
      .catch((response) => {
        commit(SET_ERROR, response.data.errors)
        commit(SET_APP_LOADING, false)
      })
  }
}

const mutations = {
  [SET_APP_LOADING] (state, isLoading) {
    state.isLoading = isLoading
  },
  [SET_ERROR] (state, error) {
    state.errors = error
  },
  [SET_USERS] (state, users) {
    state.users = users
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
