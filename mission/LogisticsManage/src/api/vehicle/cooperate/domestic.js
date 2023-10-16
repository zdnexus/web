/**
 * Created by zhongdong on 2023/8/30
 * Url :
 */
import request from '@/utils/request'

// vehicle/cooperate/domestic
export function cooperateDomesticList(data) {
  return request({
    url: '/vehicle/demesticFleet/list',
    method: 'get',
    params: data
  })
}

export function createCooperateDomestic(data) {
  return request({
    url: '/vehicle/demesticFleet',
    method: 'post',
    data
  })
}

export function updateCooperateDomestic(data) {
  return request({
    url: '/vehicle/demesticFleet',
    method: 'put',
    data
  })
}

export function deleteCooperateDomestic(data) {
  return request({
    url: `/vehicle/demesticFleet/${data}`,
    method: 'delete'
  })
}

export function exportCooperateDomestic(data) {
  return request({
    url: `/vehicle/demesticFleet/export`,
    method: 'get'
  })
}
