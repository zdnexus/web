/**
 * Created by zhongdong on 2023/11/10
 * Url :
 */

import { listToObj } from '@/utils'

export const SEX_LIST = [
  {
    label: '男',
    value: '0'
  },
  {
    label: '女',
    value: '1'
  }
]

export const SEX_OBJ = listToObj(SEX_LIST)

export const ACCOUNT_STATUS_LIST = [
  {
    label: '正常',
    value: '0'
  },
  {
    label: '停用',
    value: '1'
  }
]

export const ACCOUNT_STATUS_OBJ = listToObj(ACCOUNT_STATUS_LIST)
