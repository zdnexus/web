import request from '@/utils/request'

// vehicle/parameter/vehicle-model
export function parameterCarModelList(data) {
  return request({
    url: '/vehicle/vehicleModel/list',
    method: 'get',
    params: data
  })
}

export function createParameterCarModel(data) {
  return request({
    url: '/vehicle/vehicleModel',
    method: 'post',
    data
  })
}

export function updateParameterCarModel(data) {
  return request({
    url: '/vehicle/vehicleModel',
    method: 'put',
    data
  })
}

export function deleteParameterCarModel(data) {
  return request({
    url: `/vehicle/vehicleModel/${data}`,
    method: 'delete'
  })
}

export function exportParameterCarModel(data) {
  return request({
    url: `/vehicle/vehicleModel/export`,
    method: 'get'
  })
}
