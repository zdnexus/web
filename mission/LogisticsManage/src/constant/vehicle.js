/**
 * Created by zhongdong on 2023/8/27
 * Url :
 */

import { listToObj } from '@/utils'

export const TEXT_MAP = {
  create: '新增',
  update: '更新',
  view: '查看'
}

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

export const WAREHOUSE_TYPE_LIST = [
  {
    label: '是监管仓',
    value: '0'
  },
  {
    label: '是非监管仓',
    value: '1'
  }
]

export const WAREHOUSE_TYPE_LIST_OBJ = listToObj(WAREHOUSE_TYPE_LIST)

export const DAMAGE_TYPE_LIST = [
  {
    label: '有损',
    value: '0'
  },
  {
    label: '无损',
    value: '1'
  }
]

export const DAMAGE_TYPE_LIST_OBJ = listToObj(DAMAGE_TYPE_LIST)

export const VEHICLE_PHOTO_OBJ = {
  'frontLeft': '左前',
  'vehicleLefttion': '左侧',
  'vehicleRighttion': '右侧',
  'frontRight': '右前',
  'rear': '外后方',
  'dashboard': '仪表盘',
  'accessories': '随车配件',
  'boardData': '随车资料',
  'trunk': '后备箱',
  'vehicleKeys': '随车钥匙',
  'demage': '受损照片',
  'video': '车辆视频',
}
