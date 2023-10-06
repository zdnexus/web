/**
 * Created by zhongdong on 2023/9/27
 * Url :
 */
const LabelChangeValue = {
  // vehicleInfo
  '车架号': 'vin',
  '客户': 'clientName',
  '仓库名称': 'warehouseName',
  '是否有损': 'isDamage',
  '车辆类型': 'type',
  '车辆品牌': 'branding',
  '车辆型号': 'vehicleModel',
  '车辆颜色': 'vehicleColor',
  '钥匙数量': 'vehicleKey',
  '送车人': 'deliverName',
  '送车人电话': 'deliverMobile',
  // vehiclePhoto
  '左前': 'frontLeft',
  '左侧': 'vehicleLefttion',
  '右前': 'frontRight',
  '右侧': 'vehicleRighttion',
  '外后方': 'rear',
  '仪表盘': 'dashboard',
  '随车配件': 'accessories',
  '随车资料': 'boardData',
  '后备箱': 'trunk',
  '随车钥匙': 'vehicleKeys',
  '车辆视频': 'video',
  '受损照片': 'demage',
  // ncrInfo
  '是否在库':'warehouseName',
  '入库时间':'inboundTime',
  '出库时间':'outboundTime',
  '入库校验':'inboundCheck',
  '出库校验':'outboundCheck',
  '整备费用':'trimFree',
  '入库照片':'inboundPhoto',
  '整备照片':'trimUrl',
  '整备票据':'freeUrl',
}

export const vehicleInfo = [
  {
    label: '车架号',
    value: LabelChangeValue['车架号'],
    type: 'input'
  },
  {
    label: '客户',
    value: LabelChangeValue['客户'],
    type: 'input'
  },
  {
    label: '仓库名称',
    value: LabelChangeValue['仓库名称'],
    type: 'input'
  },
  {
    label: '是否有损',
    value: LabelChangeValue['是否有损'],
    type: 'input',
    key: 'DAMAGE_TYPE_LIST_OBJ'
  },
  {
    label: '车辆类型',
    value: LabelChangeValue['车辆类型'],
    type: 'input'
  },
  {
    label: '车辆品牌',
    value: LabelChangeValue['车辆品牌'],
    type: 'input'
  },
  {
    label: '车辆型号',
    value: LabelChangeValue['车辆型号'],
    type: 'input'
  },
  {
    label: '车辆颜色',
    value: LabelChangeValue['车辆颜色'],
    type: 'input'
  },
  {
    label: '钥匙数量',
    value: LabelChangeValue['钥匙数量'],
    type: 'input'
  },
  {
    label: '送车人',
    value: LabelChangeValue['送车人'],
    type: 'input'
  },
  {
    label: '送车人电话',
    value: LabelChangeValue['送车人电话'],
    type: 'input'
  },
]

export const vehiclePhoto = [
  {
    label: '左前',
    value: LabelChangeValue['左前'],
    type: 'image'
  },
  {
    label: '左侧',
    value: LabelChangeValue['左侧'],
    type: 'image'
  },
  {
    label: '右前',
    value: LabelChangeValue['右前'],
    type: 'image'
  },
  {
    label: '右侧',
    value: LabelChangeValue['右侧'],
    type: 'image'
  },
  {
    label: '外后方',
    value: LabelChangeValue['外后方'],
    type: 'image'
  },
  {
    label: '仪表盘',
    value: LabelChangeValue['仪表盘'],
    type: 'image'
  },
  {
    label: '随车配件',
    value: LabelChangeValue['随车配件'],
    type: 'image'
  },
  {
    label: '后备箱',
    value: LabelChangeValue['后备箱'],
    type: 'image'
  },
  {
    label: '随车钥匙',
    value: LabelChangeValue['随车钥匙'],
    type: 'image'
  },
  {
    label: '车辆视频',
    value: LabelChangeValue['车辆视频'],
    type: 'image'
  },
  {
    label: '受损照片',
    value: LabelChangeValue['受损照片'],
    type: 'image'
  }
]

export const ncrInfo = [
  {
    label: '车架号',
    value: LabelChangeValue['车架号'],
    type: 'input'
  },
  {
    label: '仓库名称',
    value: LabelChangeValue['仓库名称'],
    type: 'input'
  },
  {
    label: '是否在库',
    value: LabelChangeValue['仓库名称'],
    type: 'input'
  },
  {
    label: '入库时间',
    value: LabelChangeValue['入库时间'],
    type: 'input'
  },
  {
    label: '出库时间',
    value: LabelChangeValue['出库时间'],
    type: 'input'
  },
  {
    label: '入库校验',
    value: LabelChangeValue['入库校验'],
    type: 'input'
  },
  {
    label: '出库校验',
    value: LabelChangeValue['出库校验'],
    type: 'input'
  },
  {
    label: '整备费用',
    value: LabelChangeValue['仓库名称'],
    type: 'input'
  },
]

export const ncrPhoto = [
  {
    label: '入库照片',
    value: LabelChangeValue['入库照片'],
    type: 'image'
  },
  {
    label: '整备照片',
    value: LabelChangeValue['整备照片'],
    type: 'image'
  },
  {
    label: '整备票据',
    value: LabelChangeValue['整备票据'],
    type: 'image'
  }
]
