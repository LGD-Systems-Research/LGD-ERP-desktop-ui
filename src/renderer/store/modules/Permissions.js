import { PermissionsService } from '@/services'
import {
  FETCH_PERMISSIONS
} from './../Actions.type'
import {
  SET_PERMISSIONS
} from './../Mutations.type'

const state = {
  isLoading: false,
  errors: null,
  permissions: []
}

const getters = {
  permissions (state) {
    return state.permissions
  }
}

const actions = {
  [FETCH_PERMISSIONS] ({ commit }, params) {
    return PermissionsService.query(params.params)
      .then(({ data }) => {
        console.log('Permissions>MODULE>FETCH_permissions', data)
        commit(SET_PERMISSIONS, data)
        return data
      })
  }
}

const mutations = {
  [SET_PERMISSIONS] (state, permissions) {
    state.permissions = permissions
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
