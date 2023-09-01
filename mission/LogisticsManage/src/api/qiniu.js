import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/public/qiniu/upload/token',
    method: 'post'
  })
}
