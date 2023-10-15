/**
 * Created by zhongdong on 2023/10/14
 * Url :
 */

const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://390u45d994.zicp.fun' + url,
      method,
      data,
      header: {
        'content-type': 'application/json'
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