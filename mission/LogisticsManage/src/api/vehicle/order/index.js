/**
 * Created by zhongdong on 2023/9/2
 * Url :
 */
import request from '@/utils/request'

export function vehicleOrderList(data) {
  return request({
    url: '/vehicle/order/list',
    method: 'get',
    params: data
  })
}

export function createVehicleOrder(data) {
  return request({
    url: '/vehicle/order',
    method: 'post',
    data
  })
}

export function updateVehicleOrder(data) {
  return request({
    url: '/vehicle/order',
    method: 'put',
    data
  })
}

export function deleteVehicleOrder(data) {
  return request({
    url: `/vehicle/order/${data}`,
    method: 'delete'
  })
}

export function exportVehicleOrder(data) {
  return request({
    url: `/vehicle/order/export`,
    method: 'get'
  })
}

export function orderSmallLinkItemList(data) {
  return request({
    url: '/vehicle/serviceRecord/info',
    method: 'post',
    data
  })
}

export function orderAllocationList(data) {
  return request({
    url: '/vehicle/order/orderAllocation',
    method: 'post',
    data
  })
}

export function addDmNumberTask(data) {
  return request({
    url: '/vehicle/upcomingTask/addDmNumberTask',
    method: 'post',
    data
  })
}

export function allocateOrder(data) {
  return request({
    url: '/vehicle/upcomingTask/bindRole',
    method: 'post',
    data
  })
}

export function orderBigLinklnfo(data) {
  return request({
    url: '/vehicle/order/bigLinkInfo',
    method: 'post',
    data
  })
}

export function orderRestore(data) {
  return request({
    url: `/vehicle/order/restore/${data}`,
    method: 'post',
  })
}
