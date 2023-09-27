/**
 * Created by zhongdong on 2023/9/28
 * Url :
 */
import request from '@/utils/request'

export function vehicleYesterdayOrder(data) {
  return request({
    url: '/vehicle/orderFee/yesterdayOrder',
    method: 'post',
    params: data
  })
}

export function vehicleMonthOrder(data) {
  return request({
    url: '/vehicle/orderFee/monthOrder',
    method: 'post',
    params: data
  })
}

export function vehicleTotalNumber(data) {
  return request({
    url: '/vehicle/storageFee/totalNumber',
    method: 'post',
    params: data
  })
}
