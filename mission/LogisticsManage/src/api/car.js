/**
 * Created by zhongdong on 2023/8/26
 * Url :
 */
import request from '@/utils/request'

// car/parameter/server
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

// car/parameter/warehouse
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
    data,
  })
}

export function updateParameterWarehouse(data) {
  return request({
    url: '/vehicle/warehouse',
    method: 'put',
    data,
  })
}

export function deleteParameterWarehouse(data) {
  return request({
    url: `/vehicle/warehouse/${data}`,
    method: 'delete',
  })
}

export function exportParameterWarehouse(data) {
  return request({
    url: `/vehicle/warehouse/export`,
    method: 'get',
  })
}

// car/parameter/car-brand
export function parameterCarBrandList(data) {
  return request({
    url: '/vehicle/branding/list',
    method: 'get',
    params: data
  })
}

export function createParameterCarBrand(data) {
  return request({
    url: '/vehicle/branding',
    method: 'post',
    data,
  })
}

export function updateParameterCarBrand(data) {
  return request({
    url: '/vehicle/branding',
    method: 'put',
    data,
  })
}

export function deleteParameterCarBrand(data) {
  return request({
    url: `/vehicle/branding/${data}`,
    method: 'delete',
  })
}

export function exportParameterCarBrand(data) {
  return request({
    url: `/vehicle/branding/export`,
    method: 'get',
  })
}

// car/parameter/car-model
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
    data,
  })
}

export function updateParameterCarModel(data) {
  return request({
    url: '/vehicle/vehicleModel',
    method: 'put',
    data,
  })
}

export function deleteParameterCarModel(data) {
  return request({
    url: `/vehicle/vehicleModel/${data}`,
    method: 'delete',
  })
}

export function exportParameterCarModel(data) {
  return request({
    url: `/vehicle/vehicleModel/export`,
    method: 'get',
  })
}

// car/cooperate/custom
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
    data,
  })
}

export function updateCooperateCustom(data) {
  return request({
    url: '/vehicle/client',
    method: 'put',
    data,
  })
}

export function deleteCooperateCustom(data) {
  return request({
    url: `/vehicle/client/${data}`,
    method: 'delete',
  })
}

export function exportCooperateCustom(data) {
  return request({
    url: `/vehicle/client/export`,
    method: 'get',
  })
}

// car/cooperate/domestic
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
    data,
  })
}

export function updateCooperateDomestic(data) {
  return request({
    url: '/vehicle/demesticFleet',
    method: 'put',
    data,
  })
}

export function deleteCooperateDomestic(data) {
  return request({
    url: `/vehicle/demesticFleet/${data}`,
    method: 'delete',
  })
}

export function exportCooperateDomestic(data) {
  return request({
    url: `/vehicle/demesticFleet/export`,
    method: 'get',
  })
}

// car/cooperate/abroad
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
    data,
  })
}

export function updateCooperateAbrod(data) {
  return request({
    url: '/vehicle/overseasFleet',
    method: 'put',
    data,
  })
}

export function deleteCooperateAbrod(data) {
  return request({
    url: `/vehicle/overseasFleet/${data}`,
    method: 'delete',
  })
}

export function exportCooperateAbrod(data) {
  return request({
    url: `/vehicle/overseasFleet/export`,
    method: 'get',
  })
}
