/**
 * Created by zhongdong on 2023/10/14
 * Url :
 */
import {
  finishInspection,
  updateInWarehouse,
  rejectStorage,
  storagePhoto,
  creditCard,
  outWarehouse,
  rejectOutWarehouse,
  outConfirm,
  trim,
  sealUpld,
  outbound,
  handover,
  trackRecord,
  abroad,
  recordUpld,
  checkInWareHouseReq,
  checkOutWareHouseReq,
} from '../api/index'

// 接车验车
export const INSPECTION = 'inspection'
// 监管仓-入库核验
export const INWAREHOUSE = 'inWarehouse'
// 非监管仓-入库核验
export const SWINWAREHOUSE = 'swInWarehouse'
// 监管仓-车辆入库
export const STORAGE = 'storage'
// 非监管仓-车辆入库
export const SWSTORAGE = 'swStorage'
// 车辆刷卡
export const CARD = 'card'
// 监管仓-出库校验
export const OUTWAREHOUSE = 'outWarehouse'
// 非监管仓-出库校验
export const SWOUTWAREHOUSE = 'swOutWarehouse'
// 监管仓-出库确认
export const OUTCONFIRM = 'outConfirm'
// 非监管仓-出库确认
export const SWOUTCONFIRM = 'swOutConfirm'
// 监管仓-整备车辆
export const TRIM = 'trim'
// 非监管仓-整备车辆
export const SWTRIM = 'swTrim'

export const SEAL = 'seal'

export const DRIVE = 'drive'
//
export const LEAVECOUNTRY = 'leaveCountry'
// 车辆交建
export const HANDOVER = 'handover'
// 运踪更新
export const TRACK = 'track'
// 确认到达
export const ARRIVE = 'arrive'
//
export const RECORDCHECK = 'recordCheck'

export const DEALINWAREHOUSE = 'dealInWarehouse'

export const DEALSWINWAREHOUSE = 'dealSwInWarehouse'

export const DEALOUTWAREHOUSE = 'dealOutWarehouse'

export const DEALSWOUTWAREHOUSE = 'dealSwOutWarehouse'


const VEHICLE_INFO = [
  {
    label: '车架号',
    value: 'vin',
    type: 'input'
  },
  {
    label: '车辆类型',
    value: 'type',
    type: 'input'
  },
  {
    label: '车辆品牌',
    value: 'branding',
    type: 'input'
  },
  {
    label: '车辆型号',
    value: 'vehicleModel',
    type: 'input'
  }
]

const VEHICLE_PHOTO = [
  {
    label: '车辆左前',
    value: 'frontLeft',
    type: 'upload-image'
  },
  {
    label: '车辆左侧',
    value: 'vehicleLefttion',
    type: 'upload-image'
  },
  {
    label: '车辆右前',
    value: 'frontRight',
    type: 'upload-image'
  },
  {
    label: '车辆右侧',
    value: 'vehicleRighttion',
    type: 'upload-image'
  },
  {
    label: '车辆外后方',
    value: 'rear',
    type: 'upload-image'
  },
  {
    label: '车辆仪表盘',
    value: 'dashboard',
    type: 'upload-image'
  },
  {
    label: '车辆后备箱',
    value: 'trunk',
    type: 'upload-image'
  },
  {
    label: '车辆钥匙',
    value: 'vehicleKeys',
    type: 'upload-image'
  },
  {
    label: '随车配件',
    value: 'accessories',
    type: 'upload-image'
  },
  {
    label: '随车资料',
    value: 'boardData',
    type: 'upload-image'
  },
  {
    label: '是否受损',
    value: 'isDamage',
    type: 'checkbox',
    options: [
      {
        text: '有损',
        value: '0'
      },
      {
        text: '正常',
        value: '1'
      }
    ]
  },
  {
    label: '受损图片',
    value: 'damage',
    type: 'upload-image',
    limit: 10,
    visible: 'isDamage',
    visibleValue: '0',
  },
  {
    label: '车辆视频',
    value: 'video',
    type: 'upload-video'
  }
]

const INSPECTION_FOOTER = [
  {
    label: '备注信息',
    value: 'remark',
    type: 'input'
  },
  {
    label: '验车费用',
    value: 'inspectionFee',
    type: 'input'
  },
  {
    label: '验车票据',
    value: 'inspectionBvoucher',
    type: 'upload-image'
  },
  {
    type: 'buttons',
    array: [
      {
        label: '保存',
        func: finishInspection
      },
      {
        label: '提交',
        func: finishInspection
      }
    ]
  }
]

const INWAREHOUSE_FOOTER = [
  {
    type: 'buttons',
    array: [
      {
        label: '拒绝入库',
        func: rejectStorage
      },
      {
        label: '确认入库',
        func: updateInWarehouse
      }
    ]
  }
]

const STORAGE_FOOTER = [
  {
    label: '入库照片',
    value: 'inboundPhoto',
    type: 'upload-image'
  },
  {
    type: 'buttons',
    array: [
      {
        label: '入库照片确认',
        func: storagePhoto
      }
    ]
  }
]

const CARD_FOOTER = [
  {
    label: '刷卡照片',
    value: 'card',
    type: 'upload-image'
  },
  {
    type: 'buttons',
    array: [
      {
        label: '入库照片确认',
        func: creditCard
      }
    ]
  }
]

const OUTWAREHOUSE_FOOTER = [
  {
    label: '入库照片',
    value: 'inboundPhoto',
    type: 'upload-image'
  },
  {
    type: 'buttons',
    array: [
      {
        label: '出库审核异常',
        func: rejectOutWarehouse
      },
      {
        label: '出库审核无异常',
        func: outWarehouse
      }
    ]
  }
]

const OUTCONFIRM_FOOTER = [
  {
    label: '入库照片',
    value: 'inboundPhoto',
    type: 'upload-image'
  },
  {
    type: 'buttons',
    array: [
      {
        label: '出库确认',
        func: outConfirm
      }
    ]
  }
]

const TRIM_FOOTER = [
  {
    label: '整备费用',
    value: 'trimFree',
    type: 'input'
  },
  {
    label: '油电整备图',
    value: 'trimUrl',
    type: 'upload-image',
    limit: 2
  },
  {
    label: '票据照片',
    value: 'freeUrl',
    type: 'upload-image'
  },
  {
    type: 'buttons',
    array: [
      {
        label: '整备完成',
        func: trim
      }
    ]
  }
]

const SEAL_FOOTER = [
  {
    label: '施封单',
    value: 'sealUrl',
    type: 'upload-image'
  },
  {
    type: 'buttons',
    array: [
      {
        label: '提交',
        func: sealUpld
      }
    ]
  }
]

const DRIVE_FOOTER = [
  {
    label: '随车照片资料',
    value: 'information',
    type: 'upload-image'
  },
  {
    label: '人车同框照片',
    value: 'driverUrl',
    type: 'upload-image'
  },
  {
    label: '油电整备图',
    value: 'trimUrl',
    type: 'upload-image'
  },
  {
    label: '车辆状态核验',
    value: 'vehicleStatus',
    type: 'checkbox',
    options: [
      {
        text: '通过',
        value: 'pass'
      },
      {
        text: '驳回',
        value: 'reject'
      }
    ]
  },
  {
    label: '车辆整备核验',
    value: 'trimCheck',
    type: 'checkbox',
    options: [
      {
        text: '通过',
        value: 'pass'
      },
      {
        text: '驳回',
        value: 'reject'
      }
    ]
  },
  {
    type: 'buttons',
    array: [
      {
        label: '拒绝出车',
        func: rejectOutWarehouse
      },
      {
        label: '出车确认',
        func: outWarehouse
      }
    ]
  }
]

const LEAVECOUNTRY_FOOTER = [
  {
    label: '车辆是否出境',
    value: 'isAbroad',
    type: 'checkbox',
    options: [
      {
        text: '返库确认',
        value: '1'
      },
      {
        text: '出境确认',
        value: '0'
      }
    ]
  },
  {
    label: '现场照片',
    value: 'livePhotos',
    type: 'upload-image',
    visible: 'isAbroad',
    visibleValue: '1',
  },
  {
    label: '出境失败原因',
    value: 'reason',
    type: 'input',
    visible: 'isAbroad',
    visibleValue: '1',
  },
  {
    label: '选择返库类型',
    value: 'returnType',
    type: 'checkbox',
    visible: 'isAbroad',
    visibleValue: '1',
    options: [
      {
        text: '已交资料',
        value: '已交资料'
      },
      {
        text: '未交资料已登记',
        value: '未交资料已登记'
      },
      {
        text: '未交资料未登记',
        value: '未交资料未登记'
      }
    ]
  },
  {
    label: '库房停放照片',
    value: 'returnPhoto',
    type: 'upload-image',
    visible: 'isAbroad',
    visibleValue: '1',
  },
  {
    type: 'buttons',
    array: [
      {
        label: '提交',
        func: outbound
      }
    ]
  }
]

const HANDOVER_FOOTER = [
  {
    label: '交接单与人车同框照片',
    value: 'handoverUrl',
    type: 'upload-image',
    limit: 2
  },
  {
    type: 'buttons',
    array: [
      {
        label: '提交',
        func: handover
      }
    ]
  }
]

const TRACK_FOOTER = [
  {
    label: '运踪更新列表',
    value: 'vehicleTrackRecordList',
    type: 'table',
  },
  {
    type: 'buttons',
    array: [
      {
        label: '更新运踪',
        func: trackRecord
      }
    ]
  }
]

const ARRIVE_FOOTER = [
  {
    label: '车辆目的地',
    value: 'arrivePlace',
    type: 'input'
  },
  {
    type: 'buttons',
    array: [
      {
        label: '确认到达',
        func: abroad
      }
    ]
  }
]

const RECORDCHECK_FOOTER = [
  {
    label: '报关资料',
    value: 'declareUrl',
    type: 'upload-image',
    limit: 10
  },
  {
    label: '审核',
    value: 'recordCheck',
    type: 'checkbox',
    options: [
      {
        text: '通过',
        value: 'pass'
      },
      {
        text: '驳回',
        value: 'reject'
      }
    ]
  },
  {
    label: '备注',
    value: 'remark',
    type: 'input',
    visible: 'recordCheck',
    visibleValue: 'reject',
  },
  {
    type: 'buttons',
    array: [
      {
        label: '提交',
        func: recordUpld
      }
    ]
  }
]

const DEALINWAREHOUSE_FOOTER = [
  {
    label: '验车费用',
    value: 'inspectionFee',
    type: 'input'
  },
  {
    label: '验车票据',
    value: 'inspectionBvoucher',
    type: 'upload-image'
  },
  {
    label: '拒绝入库备注信息',
    value: 'rejectRemark',
    type: 'input',
  },
  {
    label: '批准入库备注信息',
    value: 'reviewRemark',
    type: 'input',
  },
  {
    type: 'buttons',
    array: [
      {
        label: '允许入库',
        func: checkInWareHouseReq
      }
    ]
  }
]

const DEALOUTWAREHOUSE_FOOTER = [
  {
    label: '验车费用',
    value: 'inspectionFee',
    type: 'input'
  },
  {
    label: '验车票据',
    value: 'inspectionBvoucher',
    type: 'upload-image'
  },
  {
    label: '拒绝入库备注信息',
    value: 'rejectRemark',
    type: 'input',
  },
  {
    label: '批准入库备注信息',
    value: 'reviewRemark',
    type: 'input',
  },
  {
    type: 'buttons',
    array: [
      {
        label: '允许出库',
        func: checkOutWareHouseReq
      }
    ]
  }
]

export const PAGE = {
  [INSPECTION]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, INSPECTION_FOOTER),
  [INWAREHOUSE]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, INWAREHOUSE_FOOTER),
  [SWINWAREHOUSE]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, INWAREHOUSE_FOOTER),
  [STORAGE]: [].concat(VEHICLE_INFO, STORAGE_FOOTER),
  [SWSTORAGE]: [].concat(VEHICLE_INFO, STORAGE_FOOTER),
  [CARD]: [].concat(VEHICLE_INFO, CARD_FOOTER),
  [OUTWAREHOUSE]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, OUTWAREHOUSE_FOOTER),
  [SWOUTWAREHOUSE]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, OUTWAREHOUSE_FOOTER),
  [OUTCONFIRM]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, OUTCONFIRM_FOOTER),
  [SWOUTCONFIRM]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, OUTCONFIRM_FOOTER),
  [TRIM]: [].concat(VEHICLE_INFO, TRIM_FOOTER),
  [SWTRIM]: [].concat(VEHICLE_INFO, TRIM_FOOTER),
  [SEAL]: [].concat(VEHICLE_INFO, SEAL_FOOTER),
  [DRIVE]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, DRIVE_FOOTER),
  [LEAVECOUNTRY]: [].concat(VEHICLE_INFO, LEAVECOUNTRY_FOOTER),
  [HANDOVER]: [].concat(VEHICLE_INFO, HANDOVER_FOOTER),
  [TRACK]: [].concat(VEHICLE_INFO, TRACK_FOOTER),
  [ARRIVE]: [].concat(VEHICLE_INFO, ARRIVE_FOOTER),
  [RECORDCHECK]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, RECORDCHECK_FOOTER),
  [DEALINWAREHOUSE]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, DEALINWAREHOUSE_FOOTER),
  [DEALSWINWAREHOUSE]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, DEALINWAREHOUSE_FOOTER),
  [DEALOUTWAREHOUSE]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, DEALOUTWAREHOUSE_FOOTER),
  [DEALSWOUTWAREHOUSE]: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, DEALOUTWAREHOUSE_FOOTER),
}