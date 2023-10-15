/**
 * Created by zhongdong on 2023/10/14
 * Url :
 */
import {
  finishInspection
} from '../api/index'

export const VEHICLE_INFO = [
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

export const VEHICLE_PHOTO = [
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
    label: '车辆视频',
    value: 'video',
    type: 'upload-video'
  },
  {
    label: '车辆是否受损',
    value: 'isDemage',
    value2: 'demage',
    type: 'checkbox',
    options: [
      {
        text: '有损',
        value: 1
      },
      {
        text: '正常',
        value: 0
      }
    ]
  }
]

export const VEHICLE_FOOTER = [
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

export const PAGE = {
  inspection: [].concat(VEHICLE_INFO, VEHICLE_PHOTO, VEHICLE_FOOTER)
}