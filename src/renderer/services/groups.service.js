import ApiService from '@/common/api.service'

const GroupsService = {
  query (params) {
    return ApiService.query('groups', {
      params: params
    })
  }
}

export default GroupsService
