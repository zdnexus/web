/**
 * Created by zhongdong on 2023/8/30
 * Url :
 */
import request from '@/utils/request'

// vehicle/parameter/warehouse
export function ParameterWarehouseList(data) {
  return request({
    url: '/vehicle/warehouse/list',
    method: 'get',
    params: data
  })
}

export function createParameterWarehouse(data) {
  return request({
    url: '/vehicle/warehouse',
    method: 'post',
    data
  })
}

export function updateParameterWarehouse(data) {
  return request({
    url: '/vehicle/warehouse',
    method: 'put',
    data
  })
}

export function deleteParameterWarehouse(data) {
  return request({
    url: `/vehicle/warehouse/${data}`,
    method: 'delete'
  })
}

export function exportParameterWarehouse(data) {
  return request({
    url: `/vehicle/warehouse/export`,
    method: 'get'
  })
}
