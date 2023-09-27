/**
 * Created by zhongdong on 2023/9/24
 * Url :
 */

export const DECLARE_UPLOAD = 'declareUpld'

export const DECLARE_CHECK = 'declareCheck'

export const RECORD_UPLOAD = 'recordUpld'

export const RECORD_CHECK = 'recordCheck'

export const CUSTOM_CAR = 'customCar'

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
        options: 'fieldStaff'
      },
      {
        id: 12,
        label: '整备车辆',
        value: 'trim',
        options: 'ncrWmanger'
      },
      {
        id: 13,
        label: '出库核验',
        value: 'outWarehouse',
        options: 'fieldStaff'
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
    label: '监管仓',
    children: [
      {
        id: 3,
        label: '入库核验',
        value: 'swInWarehouse',
        options: 'bwhWmanger'
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
        options: 'bwhWmanger'
      }
    ],
  },
  {
    label: '报关环节',
    id: 15,
    children: [
      {
        id: 16,
        label: '报关资料上传',
        value: DECLARE_UPLOAD,
        options: 'basedStaff'
      },
      {
        id: 17,
        label: '报关资料审核',
        value: DECLARE_CHECK,
        options: 'basedStaff'
      },
      {
        id: 18,
        label: '预录单上传',
        value: RECORD_UPLOAD,
        options: ''
      },
      {
        id: 19,
        label: '预录单审核',
        value: RECORD_CHECK,
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
        value: CUSTOM_CAR,
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
        options: 'driver'
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
        options: 'driver'
      },
      {
        id: 26,
        label: '车辆交接',
        value: 'handover',
        options: 'driver'
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

export const VEHICLE_INFO = ({ label = '接车环节', disabled = false }) => ({
  label,
  disabled,
  children: [
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
})

export const VEHICLE_PHOTO = ({ label = '车辆图片', disabled = false }) => ({
  label,
  disabled,
  children: [
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
})

export const VEHICLE_OTHER1 = () => ({
  children: [
    {
      label: '备注信息',
      value: 'remark',
      type: 'input'
    },
    {
      label: '验车费用',
      value: 'remark',
      type: 'input'
    },
    {
      label: '验车票据',
      value: 'remark',
      type: 'upload-image'
    },
    {
      label: '保存',
      value: 'remark',
      type: 'buttons',
      options: [
        {
          label: '保存',
        },
        {
          label: '提交',
        }
      ]
    }
  ]
})

export const PAGE = {
  inspection: [
    'VEHICLE_INFO',
    'VEHICLE_PHOTO',
    'VEHICLE_OTHER1'
  ]
}
