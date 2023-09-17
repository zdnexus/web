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
  SUCCESS,
  WARNING,
  DURATION,
} from '@/constant'

Vue.prototype.$checkTable = () => {
  Message({
    type: WARNING,
    message: '请勾选列表',
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
