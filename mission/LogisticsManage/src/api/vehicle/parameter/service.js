/**
 * Created by zhongdong on 2023/8/30
 * Url :
 */
import request from '@/utils/request'

export function serviceList(data) {
  return request({
    url: '/vehicle/serviceItems/list',
    method: 'get',
    params: data
  })
}

export function createService(data) {
  return request({
    url: '/vehicle/serviceItems',
    method: 'post',
    data
  })
}

export function deleteService(data) {
  return request({
    url: `/vehicle/serviceItems/${data}`,
    method: 'delete'
  })
}

export function updateService(data) {
  return request({
    url: '/vehicle/serviceItems',
    method: 'put',
    data
  })
}

export function exportService(data) {
  return request({
    url: `/vehicle/serviceItems/export`,
    method: 'get'
  })
}
