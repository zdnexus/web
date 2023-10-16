/**
 * Created by zhongdong on 2023/8/30
 * Url :
 */
import request from '@/utils/request'

export function parameterkeysPositionList(data) {
  return request({
    url: '/vehicle/keysPosition/list',
    method: 'get',
    params: data
  })
}

export function createParameterkeysPosition(data) {
  return request({
    url: '/vehicle/keysPosition',
    method: 'post',
    data
  })
}

export function updateParameterkeysPosition(data) {
  return request({
    url: '/vehicle/keysPosition',
    method: 'put',
    data
  })
}

export function deleteParameterkeysPosition(data) {
  return request({
    url: `/vehicle/keysPosition/${data}`,
    method: 'delete'
  })
}

export function exportParameterkeysPosition(data) {
  return request({
    url: `/vehicle/keysPosition/export`,
    method: 'get'
  })
}
