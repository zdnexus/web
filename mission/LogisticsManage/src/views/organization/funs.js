/**
 * Created by zhongdong on 2023/11/12
 * Url :
 */

const insertNode = (list, target, label, value) => {
  const parent = list.find((item) => item.value === target.parentId)
  if (parent) {
    if (!parent.children) parent.children = []
    parent.children.push({
      label: target[label],
      value: target[value],
      id: target[value]
    })
  } else {
    list.forEach((l) => l.children && insertNode(l.children, target, label, value))
  }
}

export const handleDeptList = (list, label = 'deptName', value = 'deptId') => {
  const arr = []
  list.forEach((item) => {
    if (item.parentId === 0) {
      arr.push({
        label: item[label],
        value: item[value],
        id: item[value]
      })
    } else {
      insertNode(arr, item, label, value)
    }
  })
  return arr
}

export const handleRoleList = (list) => {
  return list.map((item) => {
    item.value = item.label
    if (item.children) {
      item.children = handleRoleList(item.children)
    }
    return item
  })
}
