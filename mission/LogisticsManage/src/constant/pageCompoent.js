/**
 * Created by zhongdong on 2023/9/27
 * Url :
 */
const LabelChangeValue = {
  // vehicleInfo
  '车架号': 'vin',
  '客户': 'clientName',
  '存放仓库': 'warehouseName',
  '是否有损': 'isDamage',
  '车辆类型': 'type',
  '车辆品牌': 'brand',
  '车辆型号': 'model',
  '车辆颜色': 'color',
  '钥匙数量': 'nums',
  '送人车': 'name',
  '送人电话': 'phone',
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
  '受损照片': 'demage'
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
    label: '存放仓库',
    value: LabelChangeValue['存放仓库'],
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
    label: '送人车',
    value: LabelChangeValue['送人车'],
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
