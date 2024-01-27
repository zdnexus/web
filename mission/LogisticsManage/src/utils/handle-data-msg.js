/**
 * Created by zhongdong on 2023/9/17
 * Url :
 */
import Vue from 'vue'
import { Message, Notification } from 'element-ui'

import {
  OPERATE_TYPE,
  OPERATE_CREATE,
  OPERATE_DELETE,
  OPERATE_UPDATE,
  OPERATE_UPLOAD,
  OPERATE_HANDLE,
  OPERATE_APPROVE,
  OPERATE_RESTORE,
  SUCCESS,
  WARNING,
  DURATION
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
    message: `${OPERATE_TYPE[OPERATE_UPLOAD]}图片成功`,
    duration: DURATION
  })
}

Vue.prototype.$isCreateTemp = (type) => {
  return type === OPERATE_CREATE
}

Vue.prototype.$createTempNotify = () => {
  Notification({
    type: SUCCESS,
    title: `${OPERATE_TYPE[OPERATE_CREATE]}成功`,
    duration: DURATION
  })
}

Vue.prototype.$deleteTempNotify = () => {
  Notification({
    type: SUCCESS,
    title: `${OPERATE_TYPE[OPERATE_DELETE]}成功`,
    duration: DURATION
  })
}

Vue.prototype.$updateTempNotify = () => {
  Notification({
    type: SUCCESS,
    title: `${OPERATE_TYPE[OPERATE_UPDATE]}成功`,
    duration: DURATION
  })
}

Vue.prototype.$handleTempNotify = () => {
  Notification({
    type: SUCCESS,
    title: `${OPERATE_TYPE[OPERATE_HANDLE]}成功`,
    duration: DURATION
  })
}

Vue.prototype.$approveTempNotify = () => {
  Notification({
    type: SUCCESS,
    title: `发起${OPERATE_TYPE[OPERATE_APPROVE]}成功`,
    duration: DURATION
  })
}

Vue.prototype.$restoreTempNotify = () => {
  Notification({
    type: SUCCESS,
    title: `${OPERATE_TYPE[OPERATE_RESTORE]}成功`,
    duration: DURATION
  })
}
