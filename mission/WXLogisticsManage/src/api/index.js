/**
 * Created by zhongdong on 2023/9/24
 * Url :
 */

const URL = 'https://390u45d994.zicp.fun'
const header = {
  'content-type': 'application/json'
}

export const upcomingTaskList = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: URL + '/vehicle/upcomingTask/list?taskStatus=0',
      data: {},
      header,
      success(res) {
        resolve(res.data)
      }
    })
  })
}

export const getToken = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: URL + '/public/qiniu/upload/token',
      data: {},
      header,
      method: 'POST',
      success(res) {
        resolve(res.data)
      }
    })
  })
}

export const getVehicleInfo = (data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: URL + '/vehicle/vehicleInfo/getVehicleInfo',
      data,
      header,
      method: 'POST',
      success(res) {
        resolve(res.data)
      }
    })
  })
}
