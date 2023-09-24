/**
 * Created by zhongdong on 2023/9/24
 * Url :
 */

const header = {
  'content-type': 'application/json'
}

export const upcomingTaskList = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://390u45d994.zicp.fun/vehicle/upcomingTask/list?taskStatus=0&pageNum=1&pageSize=20',
      data: {},
      header,
      success(res) {
        resolve(res.data)
      }
    })
  })
}