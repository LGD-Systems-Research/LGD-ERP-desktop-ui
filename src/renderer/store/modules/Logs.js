import { LogsService } from '@/services'
import {
  FETCH_LOGS
} from './../Actions.type'
import {
  SET_LOGS
} from './../Mutations.type'

const state = {
  isLoading: false,
  errors: null,
  logs: []
}

const getters = {
  logs (state) {
    return state.logs
  }
}

const actions = {
  [FETCH_LOGS] ({ commit }, params) {
    return LogsService.query(params.params)
      .then(({ data }) => {
        console.log('logs>MODULE>FETCH_LOGS', data)
        commit(SET_LOGS, data)
        return data
      })
  }
}

const mutations = {
  [SET_LOGS] (state, logs) {
    state.logs = logs
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
