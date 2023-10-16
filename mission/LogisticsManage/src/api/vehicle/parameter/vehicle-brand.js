/**
 * Created by zhongdong on 2023/8/30
 * Url :
 */
import request from '@/utils/request'

// vehicle/parameter/vehicle-brand
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
    data
  })
}

export function updateParameterCarBrand(data) {
  return request({
    url: '/vehicle/branding',
    method: 'put',
    data
  })
}

export function deleteParameterCarBrand(data) {
  return request({
    url: `/vehicle/branding/${data}`,
    method: 'delete'
  })
}

export function exportParameterCarBrand(data) {
  return request({
    url: `/vehicle/branding/export`,
    method: 'get'
  })
}
