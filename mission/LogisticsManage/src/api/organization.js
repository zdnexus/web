/**
 * Created by zhongdong on 2023/8/29
 * Url :
 */
import request from '@/utils/request'

export function organizationList(data) {
  return request({
    url: '/system/user/seletPmUserList',
    method: 'post',
    data
  })
}
