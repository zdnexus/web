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

export function yth(data) {
  return request({
    url: `/result/sh.600096-云天化/${data}.json`,
    method: 'get',
  })
}

export function sjzg(data) {
  return request({
    url: `/result/sz.000681-视觉中国/${data}.json`,
    method: 'get',
  })
}

export function yggf(data) {
  return request({
    url: `/result/sz.000833-粤桂股份/${data}.json`,
    method: 'get',
  })
}

export function tcg(data) {
  return request({
    url: `/result/sz.300570-太辰光/${data}.json`,
    method: 'get',
  })
}

export function stq(data) {
  return request({
    url: `/result/sz.300608-思特奇/${data}.json`,
    method: 'get',
  })
}

export function kcxx(data) {
  return request({
    url: `/result/sz.300730-科创信息/${data}.json`,
    method: 'get',
  })
}

export function hczb(data) {
  return request({
    url: `/result/sz.300809-华辰装备/${data}.json`,
    method: 'get',
  })
}
