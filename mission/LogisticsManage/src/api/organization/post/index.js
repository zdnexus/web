/**
 * Created by zhongdong on 2023/11/10
 * Url :
 */
import request from '@/utils/request'

// organization/post
export function getPostList(data) {
  return request({
    url: '/system/post/list',
    method: 'get',
    params: data
  })
}

export function createPost(data) {
  return request({
    url: '/system/post',
    method: 'post',
    data
  })
}

export function updatePost(data) {
  return request({
    url: '/system/post',
    method: 'put',
    data
  })
}

export function deletePost(data) {
  return request({
    url: `/system/post/${data}`,
    method: 'delete'
  })
}

export function exportPost(data) {
  return request({
    url: `/system/post/export`,
    method: 'get'
  })
}
