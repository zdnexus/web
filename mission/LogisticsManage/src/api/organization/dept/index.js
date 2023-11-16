/**
 * Created by zhongdong on 2023/11/10
 * Url :
 */
import request from '@/utils/request'

// organization/dept
export function getDeptList(data) {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: data
  })
}

export function createDept(data) {
  return request({
    url: '/system/dept',
    method: 'post',
    data
  })
}

export function updateDept(data) {
  return request({
    url: '/system/dept',
    method: 'put',
    data
  })
}

export function deleteDept(data) {
  return request({
    url: `/system/dept/${data}`,
    method: 'delete'
  })
}

export function exportDept(data) {
  return request({
    url: `/system/dept/export`,
    method: 'get'
  })
}
