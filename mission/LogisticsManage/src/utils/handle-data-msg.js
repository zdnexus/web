/**
 * Created by zhongdong on 2023/9/17
 * Url :
 */
import Vue from 'vue'
import { Message, Notification } from 'element-ui'

import {
  TEMP_TYPE,
  TEMP_TYPE_CREATE,
  TEMP_TYPE_DELETE,
  TEMP_TYPE_UPDATE,
  TEMP_TYPE_UPLOAD,
  TEMP_TYPE_HANDLE,
  TEMP_TYPE_APPROVE,
  SUCCESS,
  WARNING,
  DURATION,
} from '@/constant'

Vue.prototype.$msgNotify = (message) => {
  Message({
    type: WARNING,
    message,
    duration: DURATION
  })
}

Vue.prototype.$checkTable = () => {
  Message({
    type: WARNING,
    message: '请勾选列表',
    duration: DURATION
  })
}

Vue.prototype.$uploadImageNotify = () => {
  Message({
    type: SUCCESS,
    message: `${TEMP_TYPE[TEMP_TYPE_UPLOAD]}图片成功`,
    duration: DURATION
  })
}

Vue.prototype.$isCreateTemp = (type) => {
  return type === TEMP_TYPE_CREATE
}

Vue.prototype.$createTempNotify = () => {
  Notification({
    type: SUCCESS,
    title: `${TEMP_TYPE[TEMP_TYPE_CREATE]}成功`,
    duration: DURATION
  })
}

Vue.prototype.$deleteTempNotify = () => {
  Notification({
    type: SUCCESS,
    title: `${TEMP_TYPE[TEMP_TYPE_DELETE]}成功`,
    duration: DURATION
  })
}

Vue.prototype.$updateTempNotify = () => {
  Notification({
    type: SUCCESS,
    title: `${TEMP_TYPE[TEMP_TYPE_UPDATE]}成功`,
    duration: DURATION
  })
}

Vue.prototype.$handleTempNotify = () => {
  Notification({
    type: SUCCESS,
    title: `${TEMP_TYPE[TEMP_TYPE_HANDLE]}成功`,
    duration: DURATION
  })
}

Vue.prototype.$approveTempNotify = () => {
  Notification({
    type: SUCCESS,
    title: `发起${TEMP_TYPE[TEMP_TYPE_APPROVE]}成功`,
    duration: DURATION
  })
}
