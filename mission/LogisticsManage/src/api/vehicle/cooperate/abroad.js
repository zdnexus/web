/**
 * Created by zhongdong on 2023/8/30
 * Url :
 */
import request from '@/utils/request'

// vehicle/cooperate/abroad
export function cooperateAbrodList(data) {
  return request({
    url: '/vehicle/overseasFleet/list',
    method: 'get',
    params: data
  })
}

export function createCooperateAbrod(data) {
  return request({
    url: '/vehicle/overseasFleet',
    method: 'post',
    data
  })
}

export function updateCooperateAbrod(data) {
  return request({
    url: '/vehicle/overseasFleet',
    method: 'put',
    data
  })
}

export function deleteCooperateAbrod(data) {
  return request({
    url: `/vehicle/overseasFleet/${data}`,
    method: 'delete'
  })
}

export function exportCooperateAbrod(data) {
  return request({
    url: `/vehicle/overseasFleet/export`,
    method: 'get'
  })
}
