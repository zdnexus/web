import request from '@/utils/request'

// vehicle/parameter/vehicle-type
export function parameterVehicleTypeList(data) {
  return request({
    url: '/vehicle/vehicleType/list',
    method: 'get',
    params: data
  })
}

export function createParameterVehicleType(data) {
  return request({
    url: '/vehicle/vehicleType',
    method: 'post',
    data
  })
}

export function updateParameterVehicleType(data) {
  return request({
    url: '/vehicle/vehicleType',
    method: 'put',
    data
  })
}

export function deleteParameterVehicleType(data) {
  return request({
    url: `/vehicle/vehicleType/${data}`,
    method: 'delete'
  })
}

export function exportParameterVehicleType(data) {
  return request({
    url: `/vehicle/vehicleType/export`,
    method: 'get'
  })
}
