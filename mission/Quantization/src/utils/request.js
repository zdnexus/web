// import { message } from 'antd'
import axios from 'axios'

import { BaseURL } from '../constant'

// const [messageApi] = message.useMessage()

// create an axios instance
const service = axios.create({
  baseURL: BaseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['Authorization'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response
    // const res = response.data
    //
    // // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 200) {
    //   // messageApi.info(res.msg)
    //   return Promise.reject(new Error(res.msg || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    // messageApi.info(error.msg)
    return Promise.reject(error)
  }
)

export default service
