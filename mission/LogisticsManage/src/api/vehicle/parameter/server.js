/**
 * Created by zhongdong on 2023/8/30
 * Url :
 */
import request from '@/utils/request'

export function parameterCustomList(data) {
  return request({
    url: '/vehicle/serviceItems/list',
    method: 'get',
    params: data
  })
}

export function createParameterCustom(data) {
  return request({
    url: '/vehicle/serviceItems',
    method: 'post',
    data,
  })
}

export function updateParameterCustom(data) {
  return request({
    url: '/vehicle/serviceItems',
    method: 'put',
    data,
  })
}

export function deleteParameterCustom(data) {
  return request({
    url: `/vehicle/serviceItems/${data}`,
    method: 'delete',
  })
}

export function exportParameterCustom(data) {
  return request({
    url: `/vehicle/serviceItems/export`,
    method: 'get',
  })
}
