/**
 * Created by zhongdong on 2024/3/9
 * Url :
 */

import request from '../utils/request'

export function tradeDateList(data) {
  return request({
    url: `/trade-date-list.json`,
    method: 'get',
  })
}

export function fullUp(data) {
  return request({
    url: `/result/full-up/${data}.json`,
    method: 'get',
  })
}