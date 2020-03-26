import { GroupsService } from '@/services'
import {
  FETCH_GROUPS
} from './../Actions.type'
import {
  SET_GROUPS
} from './../Mutations.type'

const state = {
  isLoading: false,
  errors: null,
  groups: []
}

const getters = {
  groups (state) {
    return state.groups
  }
}

const actions = {
  [FETCH_GROUPS] ({ commit }, params) {
    return GroupsService.query(params.params)
      .then(({ data }) => {
        console.log('groups>MODULE>FETCH_GROUPS', data)
        commit(SET_GROUPS, data)
        return data
      })
  }
}

const mutations = {
  [SET_GROUPS] (state, groups) {
    state.groups = groups
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
