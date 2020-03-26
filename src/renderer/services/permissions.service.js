import ApiService from '@/common/api.service'

const PermissionsService = {
  query (params) {
    return ApiService.query('permissions', {
      params: params
    })
  }
}

export default PermissionsService
