/**
 * Created by zhongdong on 2023/11/09
 * Url :
 */
import request from '@/utils/request'

// organization/user
export function getUserList(data) {
  return request({
    url: '/system/user/list',
    method: 'get',
    params: data
  })
}

export function createUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: `/system/user/${data}`,
    method: 'delete'
  })
}

export function exportUser(data) {
  return request({
    url: `/system/user/export`,
    method: 'get'
  })
}
