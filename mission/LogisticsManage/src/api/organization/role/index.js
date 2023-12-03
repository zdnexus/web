/**
 * Created by zhongdong on 2023/11/29
 * Url :
 */
import request from '@/utils/request'

export function getRoleList(data) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: data
  })
}

export function createRole(data) {
  return request({
    url: '/system/role',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/system/role',
    method: 'put',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: `/system/role/${data}`,
    method: 'delete'
  })
}

export function exportRole(data) {
  return request({
    url: `/system/role/export`,
    method: 'get'
  })
}
