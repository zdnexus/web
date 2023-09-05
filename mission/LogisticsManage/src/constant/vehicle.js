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

export const TREE_DATA = [
  {
    label: '接车验车',
    id: 1,
    children: [
      {
        id: 2,
        label: '验车',
        value: 'inspection',
        options: 'fieldStaff'
      }
    ],
  },
  {
    label: '监管仓',
    children: [
      {
        id: 3,
        label: '入库核验',
        value: 'swInWarehouse',
        options: 'ncrWmanger'
      },
      {
        id: 4,
        label: '车辆入库',
        value: 'swStorage',
        options: 'fieldStaff'
      },
      {
        id: 30,
        label: '整备车辆',
        value: 'swTrim',
        options: 'fieldStaff'
      },
      {
        id: 6,
        label: '运通刷卡',
        value: 'card',
        options: 'fieldStaff'
      },
      {
        id: 7,
        label: '出库核验',
        value: 'swOutWarehouse',
        options: 'fieldStaff'
      },
      {
        id: 8,
        label: '出库确认',
        value: 'swOutConfirm',
        options: 'ncrWmanger'
      }
    ],
  },
  {
    label: '非监管仓',
    id: 9,
    children: [
      {
        id: 10,
        label: '入库核验',
        value: 'inWarehouse',
        options: 'ncrWmanger'
      },
      {
        id: 11,
        label: '车辆入库',
        value: 'storage',
        options: 'ncrWmanger'
      },
      {
        id: 12,
        label: '整备车辆',
        value: 'trim',
        options: 'bwhWmanger'
      },
      {
        id: 13,
        label: '出库核验',
        value: 'outWarehouse',
        options: 'ncrWmanger'
      },
      {
        id: 14,
        label: '出库确认',
        value: 'outConfirm',
        options: 'ncrWmanger'
      },
    ],
  },
  {
    label: '报关环节',
    id: 15,
    children: [
      {
        id: 16,
        label: '报关资料上传',
        value: 'declareUpld',
        options: 'basedStaff'
      },
      {
        id: 17,
        label: '报关资料审核',
        value: 'declareCheck',
        options: 'basedStaff'
      },
      {
        id: 18,
        label: '预录单上传',
        value: 'recordUpld',
        options: ''
      },
      {
        id: 19,
        label: '预录单审核',
        value: 'recordCheck',
        options: 'servicer'
      },
      {
        id: 20,
        label: '施封',
        value: 'seal',
        options: 'fieldStaff'
      },
      {
        id: 21,
        label: '报关',
        value: 'customCar',
        options: ''
      }
    ],
  },
  {
    label: '司机送车',
    id: 22,
    children: [
      {
        id: 23,
        label: '司机送车',
        value: 'drive',
        options: 'ncrWmanger'
      }
    ],
  },
  {
    label: '出境环节',
    id: 24,
    children: [
      {
        id: 25,
        label: '车辆出境',
        value: 'leaveCountry',
        options: 'ncrWmanger'
      },
      {
        id: 26,
        label: '车辆交接',
        value: 'handover',
        options: 'ncrWmanger'
      }
    ],
  },
  {
    label: '境外环节',
    id: 27,
    children: [
      {
        id: 28,
        label: '车辆到达',
        value: 'arrive',
        options: 'servicer'
      },
      {
        id: 29,
        label: '运踪更新',
        value: 'track',
        options: 'servicer'
      }
    ],
  },
]

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
