/**
 * Created by zhongdong on 2023/9/10
 * Url :
 */
import request from '@/utils/request'


// vehicle/cost
export function orderFeeList(data) {
  return request({
    url: '/vehicle/orderFee/list',
    method: 'get',
    params: data
  })
}

export function createOrderFee(data) {
  return request({
    url: '/vehicle/orderFee',
    method: 'post',
    data,
  })
}

export function updateOrderFee(data) {
  return request({
    url: '/vehicle/orderFee',
    method: 'put',
    data,
  })
}

export function deleteOrderFee(data) {
  return request({
    url: `/vehicle/orderFee/${data}`,
    method: 'delete'
  })
}

export function viewOrderFee(data) {
  return request({
    url: `/vehicle/orderFee/${data}`,
    method: 'get'
  })
}

export function exportOrderFee(data) {
  return request({
    url: `/vehicle/orderFee/export`,
    method: 'get'
  })
}

export function auditOrderFee(data) {
  return request({
    url: `/vehicle/orderFee/orderFeeAudit`,
    method: 'post',
    data
  })
}

export function viewOrderFeeDeatail(data) {
  return request({
    url: `/vehicle/orderFee/orderDetail/${data}`,
    method: 'get'
  })
}

export function paymentVehiclePayment(data) {
  return request({
    url: `/common/payment/vehiclePayment`,
    method: 'post',
    data
  })
}

export function invoicingVehicleInvoice(data) {
  return request({
    url: `/common/invoicing/vehicleInvoice`,
    method: 'post',
    data
  })
}
