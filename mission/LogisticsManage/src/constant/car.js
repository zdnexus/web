/**
 * Created by zhongdong on 2023/8/27
 * Url :
 */

function listToObj(list) {
  const o = {}
  list.forEach(l => {
    o[l.value] = l.label
  })
  return o
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
