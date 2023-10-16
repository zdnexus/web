/**
 * Created by zhongdong on 2023/9/23
 * Url :
 */
import { listToObj } from '@/utils'

export const CHECK_STATUS_PASS = 'pass'

export const CHECK_STATUS_REJECT = 'reject'

export const CHECK_STATUS = [
  {
    label: '通过',
    value: CHECK_STATUS_PASS
  },
  {
    label: '驳回',
    value: CHECK_STATUS_REJECT
  }
]

export const CHECK_STATUS_OBJ = listToObj(CHECK_STATUS)
