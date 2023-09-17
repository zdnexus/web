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

export function createUpcomingTask(data) {
  return request({
    url: '/vehicle/upcomingTask',
    method: 'post',
    data,
  })
}

export function updateUpcomingTask(data) {
  return request({
    url: '/vehicle/upcomingTask',
    method: 'put',
    data,
  })
}

export function deleteUpcomingTask(data) {
  return request({
    url: `/vehicle/upcomingTask/${data}`,
    method: 'delete',
  })
}

export function exportUpcomingTask(data) {
  return request({
    url: `/vehicle/upcomingTask/export`,
    method: 'get',
  })
}
