import ApiService from '@/common/api.service'

const ActivitiesService = {
  query (params) {
    return ApiService.query('activities', {
      params: params
    })
  }
}

export default ActivitiesService
