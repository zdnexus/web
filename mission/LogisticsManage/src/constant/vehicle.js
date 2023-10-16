/**
 * Created by zhongdong on 2023/8/27
 * Url :
 */

import { listToObj } from '@/utils'

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
  'video': '车辆视频',
  'demage': '受损照片'
}

export const VEHICLE_INFO_OBJ = {
  'vin': '车架号',
  'clientName': '客户',
  'warehouseName': '存放仓库',
  'isDamage': '是否有损',
  'type': '类型',
  'branding': '品牌',
  'vehicleModel': '型号',
  'vehicleColor': '颜色',
  'vehicleKey': '钥匙数量',
  'deliverName': '送车人',
  'deliverMobile': '送车人电话'
}

export const ORDER_EXAMINE_STATUS_AUDIT = '0'

export const ORDER_EXAMINE_STATUS_AUDITING = '1'

export const ORDER_EXAMINE_STATUS_PASSED = '2'

export const ORDER_EXAMINE_STATUS_REJECTED = '3'

export const ORDER_EXAMINE_STATUS = [
  {
    label: '待审核',
    value: ORDER_EXAMINE_STATUS_AUDIT
  },
  {
    label: '审核中',
    value: ORDER_EXAMINE_STATUS_AUDITING
  },
  {
    label: '已通过',
    value: ORDER_EXAMINE_STATUS_PASSED
  },
  {
    label: '被驳回',
    value: ORDER_EXAMINE_STATUS_REJECTED
  }
]

export const ORDER_EXAMINE_STATUS_OBJ = listToObj(ORDER_EXAMINE_STATUS)

export const NODE_LIST = [
  {
    label: '无这个环节',
    value: '0'
  },
  {
    label: '未开始',
    value: '1'
  },
  {
    label: '进行中',
    value: '2'
  },
  {
    label: '已完成',
    value: '3'
  }
]

export const NODE_LIST_OBJ = listToObj(NODE_LIST)

export const ORDER_STATUS = [
  {
    label: '未完成',
    value: '0'
  },
  {
    label: '已完成',
    value: '1'
  }
]

export const ORDER_STATUS_OBJ = listToObj(ORDER_STATUS)

export const FREE_STATUS = [
  {
    label: '成本',
    value: 'cost'
  },
  {
    label: '应收',
    value: 'income'
  }
]

export const FREE_STATUS_OBJ = listToObj(FREE_STATUS)

export const TASK_STATUS = [
  {
    label: '未完成',
    value: '0'
  },
  {
    label: '已完成',
    value: '1'
  }
]

export const TASK_STATUS_OBJ = listToObj(TASK_STATUS)
