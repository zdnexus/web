/**
 * Created by zhongdong on 2024/3/9
 * Url :
 */

import request from '@/utils/request'

export function tradeDateList() {
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

export function fullUpOnlyHighest(data) {
  return request({
    url: `/result/full-up-only-highest/${data}.json`,
    method: 'get',
  })
}

export function fullUpOnlyLowest(data) {
  return request({
    url: `/result/full-up-only-lowest/${data}.json`,
    method: 'get',
  })
}

export function fullUpRestart(data) {
  return request({
    url: `/result/full-up-restart/${data}.json`,
    method: 'get',
  })
}

export function fullUpTop(data) {
  return request({
    url: `/result/full-up-top/${data}.json`,
    method: 'get',
  })
}
