/**
 * Created by zhongdong on 2023/8/30
 * Url :
 */
import request from '@/utils/request'

export function vehicleList(data) {
  return request({
    url: '/vehicle/vehicleInfo/list',
    method: 'get',
    params: data
  })
}

export function getVehiclePhoto(data) {
  return request({
    url: '/vehicle/vehiclePhoto/info',
    method: 'post',
    data,
  })
}

export function createVehicletoBeStored(data) {
  return request({
    url: '/vehicle/vehicleInfo',
    method: 'post',
    data,
  })
}

export function updateVehicletoBeStored(data) {
  return request({
    url: '/vehicle/vehicleInfo',
    method: 'put',
    data,
  })
}

export function deleteVehicletoBeStored(data) {
  return request({
    url: `/vehicle/vehicleInfo/${data}`,
    method: 'delete',
  })
}

export function exportVehicletoBeStored(data) {
  return request({
    url: `/vehicle/vehicleInfo/export`,
    method: 'get',
  })
} 
