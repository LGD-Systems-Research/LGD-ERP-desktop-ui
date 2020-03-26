import { ActivitiesService } from '@/services'
import {
  FETCH_ACTIVITIES
} from './../Actions.type'
import {
  SET_ACTIVITIES
} from './../Mutations.type'

const state = {
  isLoading: false,
  errors: null,
  activities: []
}

const getters = {
  activities (state) {
    return state.activities
  }
}

const actions = {
  [FETCH_ACTIVITIES] ({ commit }, params) {
    return ActivitiesService.query(params.params)
      .then(({ data }) => {
        console.log('activities>MODULE>FETCH_ACTIVITIES', data)
        commit(SET_ACTIVITIES, data)
        return data
      })
  }
}

const mutations = {
  [SET_ACTIVITIES] (state, activities) {
    state.activities = activities
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
