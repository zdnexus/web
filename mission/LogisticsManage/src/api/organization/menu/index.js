/**
 * Created by zhongdong on 2023/11/30
 * Url :
 */
import request from '@/utils/request'

export function getMenuList(data) {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params: data
  })
}

export function roleMenuTreeselect(data) {
  return request({
    url: `system/menu/roleMenuTreeselect/${data}`,
    method: 'get',
    data
  })
}
