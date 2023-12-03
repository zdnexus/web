/**
 * Created by zhongdong on 2023/9/17
 * Url :
 */

import { listToObj } from '@/utils'

export const SERVE_TYPE_LIST = [
  {
    label: '接车验车',
    value: 'inspection'
  },
  {
    label: '仓储',
    value: 'storage'
  },
  {
    label: '报关',
    value: 'declare'
  },
  {
    label: '仓储+报关',
    value: 'stode'
  },
  {
    label: '到哈方监管仓',
    value: 'domestic'
  },
  {
    label: '到哈方监管仓+境外目的地',
    value: 'abroad'
  }
]

export const SERVE_TYPE_LIST_OBJ = listToObj(SERVE_TYPE_LIST)
