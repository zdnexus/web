/**
 * Created by zhongdong on 2023/8/30
 * Url :
 */
import request from '@/utils/request'

// vehicle/cooperate/custom
export function cooperateCustomList(data) {
  return request({
    url: '/vehicle/client/list',
    method: 'get',
    params: data
  })
}

export function createCooperateCustom(data) {
  return request({
    url: '/vehicle/client',
    method: 'post',
    data
  })
}

export function updateCooperateCustom(data) {
  return request({
    url: '/vehicle/client',
    method: 'put',
    data
  })
}

export function deleteCooperateCustom(data) {
  return request({
    url: `/vehicle/client/${data}`,
    method: 'delete'
  })
}

export function exportCooperateCustom(data) {
  return request({
    url: `/vehicle/client/export`,
    method: 'get'
  })
}
