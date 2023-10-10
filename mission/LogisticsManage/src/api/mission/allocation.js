/**
 * Created by zhongdong on 2023/9/16
 * Url :
 */

import request from '@/utils/request'

export function upcomingTaskList(data) {
  return request({
    url: '/vehicle/upcomingTask/list',
    method: 'get',
    params: data
  })
}

export function exportUpcomingTask(data) {
  return request({
    url: `/vehicle/upcomingTask/export`,
    method: 'get',
  })
}

export function getVehicleDeclare(vin) {
  return request({
    url: `/vehicle/declare/${vin}`,
    method: 'get',
  })
}

export function uploadVehicleDeclare(data) {
  return request({
    url: `/vehicle/declare/declareUpld`,
    method: 'post',
    data
  })
}

export function uploadVehicleRecord(data) {
  return request({
    url: `/vehicle/declare/recordUpld`,
    method: 'post',
    data
  })
}

export function uploadCustomCar(data) {
  return request({
    url: `/vehicle/declare/customCarUpld`,
    method: 'post',
    data
  })
}

export function addDmFaTask(data) {
  return request({
    url: `/vehicle/upcomingTask/addDmFaTask`,
    method: 'post',
    data
  })
}

export function addFmFaTask(data) {
  return request({
    url: `/vehicle/upcomingTask/addFmFaTask`,
    method: 'post',
    data
  })
}

export function addCmFaTask(data) {
  return request({
    url: `/vehicle/upcomingTask/addCmFaTask`,
    method: 'post',
    data
  })
}
