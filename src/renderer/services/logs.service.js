import ApiService from '@/common/api.service'

const LogsService = {
  query (params) {
    return ApiService.query('logs', {
      params: params
    })
  }
}

export default LogsService
