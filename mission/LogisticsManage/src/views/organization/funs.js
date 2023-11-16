/**
 * Created by zhongdong on 2023/11/12
 * Url :
 */

const insertNode = (list, target) => {
  const parent = list.find((item) => item.value === target.parentId)
  if (parent) {
    if (!parent.children) parent.children = []
    parent.children.push({
      label: target.deptName,
      value: target.deptId
    })
  } else {
    list.forEach((l) => l.children && insertNode(l.children, target))
  }
}

export const handleList = (list) => {
  const arr = []
  list.forEach((item) => {
    if (item.parentId === 0) {
      arr.push({
        label: item.deptName,
        value: item.deptId
      })
    } else {
      insertNode(arr, item)
    }
  })
  return arr
}
