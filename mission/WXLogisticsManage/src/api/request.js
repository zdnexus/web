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
        resolve(res.data)
      }
    })
  })
}

export default request