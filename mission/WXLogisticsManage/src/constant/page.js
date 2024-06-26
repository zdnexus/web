/**
 * Created by zhongdong on 2023/10/14
 * Url :
 */
import {
  getVehicleInfo,
  finishInspection,
  updateInWarehouse,
  rejectStorage,
  inWarehouseInfo,
  storagePhoto,
  cardInfo,
  creditCard,
  outWarehouse,
  rejectOutWarehouse,
  outConfirm,
  trimInfo,
  trim,
  sealInfo,
  sealUpld,
  driveInfo,
  outboundInfo,
  outbound,
  handoverInfo,
  handover,
  trackRecordInfo,
  trackRecord,
  arriveInfo,
  abroad,
  checkRecordInfo,
  recordUpld,
  dealInWarehouseInfo,
  checkInWareHouseReq,
  dealOutWarehouseInfo,
  checkOutWareHouseReq,
  rejectDriveInfo,
  checkRejectDriveInfo,
  rejectDrive,
  drive,
  addOtherFee
} from '@/api/index'

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

export const DEALDRIVE = 'dealDrive'


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
    type: 'upload-image',
    limit: 10
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

const OTHER_EXPENSES = [
  {
    label: '其他费用录入列表',
    value: 'otherFeeList',
    type: 'table',
  },
  {
    label: '名称',
    value: 'name',
    type: 'input',
  },
  {
    label: '金额',
    value: 'free',
    type: 'input',
  },
  {
    label: '票据',
    value: 'photoUrl',
    type: 'upload-image',
  },
  {
    label: '成本/应收',
    value: 'freeType',
    type: 'checkbox',
    options: [
      {
        text: '成本',
        value: 'cost'
      },
      {
        text: '应收',
        value: 'income'
      }
    ]
  },
  {
    type: 'buttons',
    array: [
      {
        label: '费用确认',
        func: addOtherFee
      }
    ]
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
  ...OTHER_EXPENSES,
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
  ...OTHER_EXPENSES,
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
  ...OTHER_EXPENSES,
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
  ...OTHER_EXPENSES,
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
  ...OTHER_EXPENSES,
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
  ...OTHER_EXPENSES,
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
  ...OTHER_EXPENSES,
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
  ...OTHER_EXPENSES,
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

export const DRIVE_FOOTER = [
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
  ...OTHER_EXPENSES,
  {
    type: 'buttons',
    array: [
      {
        label: '拒绝出车',
        func: rejectDrive
      },
      {
        label: '出车确认',
        func: drive
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
  ...OTHER_EXPENSES,
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
  ...OTHER_EXPENSES,
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
  ...OTHER_EXPENSES,
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
  ...OTHER_EXPENSES,
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

export const RECORDCHECK_FOOTER = [
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
  ...OTHER_EXPENSES,
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

export const DEALINWAREHOUSE_FOOTER = [
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
  ...OTHER_EXPENSES,
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
  ...OTHER_EXPENSES,
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

export const DEALDRIVE_FOOTER = [
  {
    label: '车辆检查核验',
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
    label: '随车资料',
    value: 'boardData',
    type: 'upload-image',
    limit: 10
  },
  {
    label: '人车同框照片',
    value: 'driverUrl',
    type: 'upload-image'
  },
  {
    label: '油电整备图',
    value: 'trimUrl',
    type: 'upload-image',
    limit: 2
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
    label: '送车费',
    value: 'driverFree',
    type: 'input',
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
  ...OTHER_EXPENSES,
  {
    type: 'buttons',
    array: [
      {
        label: '允许出车',
        func: checkRejectDriveInfo
      }
    ]
  }
]

export const PAGE = {
  [INSPECTION]: [{ 'API': getVehicleInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, INSPECTION_FOOTER),
  [INWAREHOUSE]: [{ 'API': getVehicleInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, INWAREHOUSE_FOOTER),
  [SWINWAREHOUSE]: [{ 'API': getVehicleInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, INWAREHOUSE_FOOTER),
  [STORAGE]: [{ 'API': inWarehouseInfo }].concat(VEHICLE_INFO, STORAGE_FOOTER),
  [SWSTORAGE]: [{ 'API': inWarehouseInfo }].concat(VEHICLE_INFO, STORAGE_FOOTER),
  [CARD]: [{ 'API': cardInfo }].concat(VEHICLE_INFO, CARD_FOOTER),
  [OUTWAREHOUSE]: [{ 'API': getVehicleInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, OUTWAREHOUSE_FOOTER),
  [SWOUTWAREHOUSE]: [{ 'API': getVehicleInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, OUTWAREHOUSE_FOOTER),
  [OUTCONFIRM]: [{ 'API': getVehicleInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, OUTCONFIRM_FOOTER),
  [SWOUTCONFIRM]: [{ 'API': getVehicleInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, OUTCONFIRM_FOOTER),
  [TRIM]: [{ 'API': trimInfo }].concat(VEHICLE_INFO, TRIM_FOOTER),
  [SWTRIM]: [{ 'API': trimInfo }].concat(VEHICLE_INFO, TRIM_FOOTER),
  [SEAL]: [{ 'API': sealInfo }].concat(VEHICLE_INFO, SEAL_FOOTER),
  [DRIVE]: [{ 'API': driveInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, DRIVE_FOOTER),
  [LEAVECOUNTRY]: [{ 'API': outboundInfo }].concat(VEHICLE_INFO, LEAVECOUNTRY_FOOTER),
  [HANDOVER]: [{ 'API': handoverInfo }].concat(VEHICLE_INFO, HANDOVER_FOOTER),
  [TRACK]: [{ 'API': trackRecordInfo }].concat(VEHICLE_INFO, TRACK_FOOTER),
  [ARRIVE]: [{ 'API': arriveInfo }].concat(VEHICLE_INFO, ARRIVE_FOOTER),
  [RECORDCHECK]: [{ 'API': checkRecordInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, RECORDCHECK_FOOTER),
  [DEALINWAREHOUSE]: [{ 'API': dealInWarehouseInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, DEALINWAREHOUSE_FOOTER),
  [DEALSWINWAREHOUSE]: [{ 'API': dealInWarehouseInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, DEALINWAREHOUSE_FOOTER),
  [DEALOUTWAREHOUSE]: [{ 'API': dealOutWarehouseInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, DEALOUTWAREHOUSE_FOOTER),
  [DEALSWOUTWAREHOUSE]: [{ 'API': dealOutWarehouseInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, DEALOUTWAREHOUSE_FOOTER),
  [DEALDRIVE]: [{ 'API': rejectDriveInfo }].concat(VEHICLE_INFO, VEHICLE_PHOTO, DEALDRIVE_FOOTER),
}