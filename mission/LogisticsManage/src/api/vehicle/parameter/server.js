/**
 * Created by zhongdong on 2023/8/30
 * Url :
 */
import request from '@/utils/request'

export function parameterServiceList(data) {
  return request({
    url: '/vehicle/serviceItems/list',
    method: 'get',
    params: data
  })
}

export function createParameterService(data) {
  return request({
    url: '/vehicle/serviceItems',
    method: 'post',
    data
  })
}

export function deleteParameterService(data) {
  return request({
    url: `/vehicle/serviceItems/${data}`,
    method: 'delete'
  })
}

export function updateParameterService(data) {
  return request({
    url: '/vehicle/serviceItems',
    method: 'put',
    data
  })
}

export function exportParameterService(data) {
  return request({
    url: `/vehicle/serviceItems/export`,
    method: 'get'
  })
}
