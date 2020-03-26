import ApiService from '@/common/api.service'

const UsersService = {
  query (params) {
    return ApiService.query('users', {
      params: params
    })
  }
}

export default UsersService
