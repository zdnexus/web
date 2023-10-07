/**
 * Created by zhongdong on 2023/9/27
 * Url :
 */
import { listToObj } from '@/utils'

export const TREE_DATA_BIG_NODE = [
  {
    label: '接车验车',
    value: 'inspection'
  },
  {
    label: '非监管仓',
    value: 'ncr'
  },
  {
    label: '报关',
    value: 'declaration'
  },
  {
    label: '监管仓',
    value: 'bwh'
  },
  {
    label: '司机送车',
    value: 'edv'
  },
  {
    label: '出境',
    value: 'ed'
  },
  {
    label: '境外',
    value: 'oec'
  }
]

export const TREE_DATA_BIG_NODE_OBJ = listToObj(TREE_DATA_BIG_NODE)

const ChangeValue = {
  // INSPECTION
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
  '受损照片': 'demage',
  '车辆视频': 'video',
  // NCR
  '是否在库': 'warehouseName',
  '入库时间': 'inboundTime',
  '出库时间': 'outboundTime',
  '入库校验': 'inboundCheck',
  '出库校验': 'outboundCheck',
  '整备费用': 'trimFree',
  '入库照片': 'inboundPhoto',
  '整备照片': 'trimUrl',
  '整备票据': 'freeUrl',
  // DECLARATION
  '是否报关': 'isCustom',
  '放行状态': 'isGo',
  '报关资料': 'declareUrl',
  '预录单照片': 'recordUrl',
  '报关单资料': 'customUrl',
  // BWH
  '运通刷卡照片': 'card',
  '施封签字照片': 'sealUrl',
  // EDV
  '司机名称': 'name',
  '司机电话': 'mobile',
  '送车费用': 'driverFree',
  '车辆检查': 'vehicleStatus',
  '整备检查': 'trimCheck',
  '随车资料照片': 'information',
  '人车同框照片': 'driverUrl',
  // ED
  '车辆出境状态': 'outboundStatus',
  '是否出境': 'isAbroad',
  '出境时间': 'outboundTime',
  '车辆交接照片': 'handoverUrl',
  '返库类型': 'returnType',
  '出境失败现场照片': 'livePhotos',
  '车辆返库时的存放照片': 'returnPhoto',
  // OEC
  '目的地': 'arrivePlace',
  '是否到达': 'isArrive',
  '客户名称': 'serviceName'
}

export const INSPECTION = [
  {
    label: '车架号',
    value: ChangeValue['车架号'],
    type: 'input'
  },
  {
    label: '客户',
    value: ChangeValue['客户'],
    type: 'input'
  },
  {
    label: '仓库名称',
    value: ChangeValue['仓库名称'],
    type: 'input'
  },
  {
    label: '是否有损',
    value: ChangeValue['是否有损'],
    type: 'input',
    key: 'DAMAGE_TYPE_LIST_OBJ'
  },
  {
    label: '车辆类型',
    value: ChangeValue['车辆类型'],
    type: 'input'
  },
  {
    label: '车辆品牌',
    value: ChangeValue['车辆品牌'],
    type: 'input'
  },
  {
    label: '车辆型号',
    value: ChangeValue['车辆型号'],
    type: 'input'
  },
  {
    label: '车辆颜色',
    value: ChangeValue['车辆颜色'],
    type: 'input'
  },
  {
    label: '钥匙数量',
    value: ChangeValue['钥匙数量'],
    type: 'input'
  },
  {
    label: '送车人',
    value: ChangeValue['送车人'],
    type: 'input'
  },
  {
    label: '送车人电话',
    value: ChangeValue['送车人电话'],
    type: 'input'
  },
  {
    label: '左前',
    value: ChangeValue['左前'],
    type: 'image'
  },
  {
    label: '左侧',
    value: ChangeValue['左侧'],
    type: 'image'
  },
  {
    label: '右前',
    value: ChangeValue['右前'],
    type: 'image'
  },
  {
    label: '右侧',
    value: ChangeValue['右侧'],
    type: 'image'
  },
  {
    label: '外后方',
    value: ChangeValue['外后方'],
    type: 'image'
  },
  {
    label: '仪表盘',
    value: ChangeValue['仪表盘'],
    type: 'image'
  },
  {
    label: '随车配件',
    value: ChangeValue['随车配件'],
    type: 'image'
  },
  {
    label: '后备箱',
    value: ChangeValue['后备箱'],
    type: 'image'
  },
  {
    label: '随车钥匙',
    value: ChangeValue['随车钥匙'],
    type: 'image'
  },
  {
    label: '受损照片',
    value: ChangeValue['受损照片'],
    type: 'images'
  },
  {
    label: '车辆视频',
    value: ChangeValue['车辆视频'],
    type: 'video'
  }
]

export const NCR = [
  {
    label: '车架号',
    value: ChangeValue['车架号'],
    type: 'input'
  },
  {
    label: '仓库名称',
    value: ChangeValue['仓库名称'],
    type: 'input'
  },
  {
    label: '是否在库',
    value: ChangeValue['仓库名称'],
    type: 'input'
  },
  {
    label: '入库时间',
    value: ChangeValue['入库时间'],
    type: 'input'
  },
  {
    label: '出库时间',
    value: ChangeValue['出库时间'],
    type: 'input'
  },
  {
    label: '入库校验',
    value: ChangeValue['入库校验'],
    type: 'input'
  },
  {
    label: '出库校验',
    value: ChangeValue['出库校验'],
    type: 'input'
  },
  {
    label: '整备费用',
    value: ChangeValue['仓库名称'],
    type: 'input'
  },
  {
    label: '入库照片',
    value: ChangeValue['入库照片'],
    type: 'image'
  },
  {
    label: '整备照片',
    value: ChangeValue['整备照片'],
    type: 'images'
  },
  {
    label: '整备票据',
    value: ChangeValue['整备票据'],
    type: 'image'
  }
]

export const DECLARATION = [
  {
    label: '车架号',
    value: ChangeValue['车架号'],
    type: 'input'
  },
  {
    label: '是否报关',
    value: ChangeValue['是否报关'],
    type: 'input'
  },
  {
    label: '放行状态',
    value: ChangeValue['放行状态'],
    type: 'input'
  },
  {
    label: '报关资料',
    value: ChangeValue['报关资料'],
    type: 'images'
  },
  {
    label: '预录单照片',
    value: ChangeValue['预录单照片'],
    type: 'images'
  },
  {
    label: '报关单资料',
    value: ChangeValue['报关单资料'],
    type: 'images'
  }
]

export const BWH = [
  {
    label: '车架号',
    value: ChangeValue['车架号'],
    type: 'input'
  },
  {
    label: '仓库名称',
    value: ChangeValue['仓库名称'],
    type: 'input'
  },
  {
    label: '是否在库',
    value: ChangeValue['仓库名称'],
    type: 'input'
  },
  {
    label: '入库时间',
    value: ChangeValue['入库时间'],
    type: 'input'
  },
  {
    label: '出库时间',
    value: ChangeValue['出库时间'],
    type: 'input'
  },
  {
    label: '入库校验',
    value: ChangeValue['入库校验'],
    type: 'input'
  },
  {
    label: '出库校验',
    value: ChangeValue['出库校验'],
    type: 'input'
  },
  {
    label: '整备费用',
    value: ChangeValue['仓库名称'],
    type: 'input'
  },
  {
    label: '入库照片',
    value: ChangeValue['入库照片'],
    type: 'image'
  },
  {
    label: '整备照片',
    value: ChangeValue['整备照片'],
    type: 'images'
  },
  {
    label: '整备票据',
    value: ChangeValue['整备票据'],
    type: 'image'
  },
  {
    label: '运通刷卡照片',
    value: ChangeValue['运通刷卡照片'],
    type: 'images'
  },
  {
    label: '施封签字照片',
    value: ChangeValue['施封签字照片'],
    type: 'images'
  }
]

export const EDV = [
  {
    label: '车架号',
    value: ChangeValue['车架号'],
    type: 'input'
  },
  {
    label: '司机名称',
    value: ChangeValue['司机名称'],
    type: 'input'
  },
  {
    label: '司机电话',
    value: ChangeValue['司机电话'],
    type: 'input'
  },
  {
    label: '送车费用',
    value: ChangeValue['送车费用'],
    type: 'input'
  },
  {
    label: '车辆检查',
    value: ChangeValue['车辆检查'],
    type: 'input'
  },
  {
    label: '整备检查',
    value: ChangeValue['整备检查'],
    type: 'input'
  },
  {
    label: '随车资料照片',
    value: ChangeValue['随车资料照片'],
    type: 'image'
  },
  {
    label: '人车同框照片',
    value: ChangeValue['人车同框照片'],
    type: 'image'
  }
]

export const ED = [
  {
    label: '车架号',
    value: ChangeValue['车架号'],
    type: 'input'
  },
  {
    label: '司机名称',
    value: ChangeValue['司机名称'],
    type: 'input'
  },
  {
    label: '车辆出境状态',
    value: ChangeValue['车辆出境状态'],
    type: 'input'
  },
  {
    label: '是否出境',
    value: ChangeValue['是否出境'],
    type: 'input'
  },
  {
    label: '出境时间',
    value: ChangeValue['出境时间'],
    type: 'input'
  },
  {
    label: '车辆交接照片',
    value: ChangeValue['车辆交接照片'],
    type: 'images'
  },
  {
    label: '返库类型',
    value: ChangeValue['返库类型'],
    type: 'input'
  },
  // {
  //   label: '返库信息',
  //   value: ChangeValue['返库信息'],
  //   type: 'input'
  // },
  {
    label: '出境失败现场照片',
    value: ChangeValue['出境失败现场照片'],
    type: 'image'
  },
  {
    label: '车辆返库时的存放照片',
    value: ChangeValue['车辆返库时的存放照片'],
    type: 'image'
  },
]

export const OEC = [
  {
    label: '车架号',
    value: ChangeValue['车架号'],
    type: 'input'
  },
  {
    label: '目的地',
    value: ChangeValue['目的地'],
    type: 'input'
  },
  {
    label: '是否到达',
    value: ChangeValue['是否到达'],
    type: 'input'
  },
  {
    label: '客户',
    value: ChangeValue['客户'],
    type: 'input'
  }
]
