/**
 * Created by zhongdong on 2024/1/28
 * Url :
 */

export const DOMAIN = 'https://390u45d994.zicp.fun'
// export const DOMAIN = 'https://www.horgosstkj.com/api'

export const getToken = () => {
  const app = getApp()
  
  return app.globalData.token
}