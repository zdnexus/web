import request from '@/utils/request'

// car/parameter/server
export function cooperateCustomList(data) {
  return request({
    url: '/vehicle/serviceItems/list',
    method: 'get',
    params: data
  })
}

export function createCooperateCustom(data) {
  return request({
    url: '/vehicle/serviceItems',
    method: 'post',
    data,
  })
}

export function updateCooperateCustom(data) {
  return request({
    url: '/vehicle/serviceItems',
    method: 'put',
    data,
  })
}

export function deleteCooperateCustom(data) {
  return request({
    url: `/vehicle/serviceItems/${data}`,
    method: 'delete',
  })
}

export function exportCooperateCustom(data) {
  return request({
    url: `/vehicle/serviceItems/export`,
    method: 'get',
  })
}

// car/parameter/warehouse
export function cooperateWarehouseList(data) {
  return request({
    url: '/vehicle/warehouse/list',
    method: 'get',
    params: data
  })
}

export function createCooperateWarehouse(data) {
  return request({
    url: '/vehicle/warehouse',
    method: 'post',
    data,
  })
}

export function updateCooperateWarehouse(data) {
  return request({
    url: '/vehicle/warehouse',
    method: 'put',
    data,
  })
}

export function deleteCooperateWarehouse(data) {
  return request({
    url: `/vehicle/warehouse/${data}`,
    method: 'delete',
  })
}

export function exportCooperateWarehouse(data) {
  return request({
    url: `/vehicle/warehouse/export`,
    method: 'get',
  })
}

// car/parameter/car-brand
export function cooperateCarBrandList(data) {
  return request({
    url: '/vehicle/branding/list',
    method: 'get',
    params: data
  })
}

export function createCooperateCarBrand(data) {
  return request({
    url: '/vehicle/branding',
    method: 'post',
    data,
  })
}

export function updateCooperateCarBrand(data) {
  return request({
    url: '/vehicle/branding',
    method: 'put',
    data,
  })
}

export function deleteCooperateCarBrand(data) {
  return request({
    url: `/vehicle/branding/${data}`,
    method: 'delete',
  })
}

export function exportCooperateCarBrand(data) {
  return request({
    url: `/vehicle/branding/export`,
    method: 'get',
  })
}

// car/parameter/car-model
export function cooperateCarModelList(data) {
  return request({
    url: '/vehicle/vehicleModel/list',
    method: 'get',
    params: data
  })
}

export function createCooperateCarModel(data) {
  return request({
    url: '/vehicle/vehicleModel',
    method: 'post',
    data,
  })
}

export function updateCooperateCarModel(data) {
  return request({
    url: '/vehicle/vehicleModel',
    method: 'put',
    data,
  })
}

export function deleteCooperateCarModel(data) {
  return request({
    url: `/vehicle/vehicleModel/${data}`,
    method: 'delete',
  })
}

export function exportCooperateCarModel(data) {
  return request({
    url: `/vehicle/vehicleModel/export`,
    method: 'get',
  })
}
