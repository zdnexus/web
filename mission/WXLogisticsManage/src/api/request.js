/**
 * Created by zhongdong on 2023/10/14
 * Url :
 */

import { DOMAIN, getToken } from '@/constant'

const request = (url = '', method = 'GET', data = {}) => {
  const token = getToken()
  
  return new Promise((resolve) => {
    wx.request({
      url: `${DOMAIN}${url}`,
      method,
      data,
      header: {
        'content-type': 'application/json',
        'Authorization': token
      },
      success(res) {
        if (res.statusCode === 200 && res.data.code === 200) {
          resolve(res.data)
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail(res) {
        uni.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    })
  })
}

export default request