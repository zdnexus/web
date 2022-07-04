/**
 * Created by zhongdong on 2022/7/3
 * Url :
 */

// Array.from：类数组转数据
const o = {
  '0': 1,
  '1': 2,
  '2': 3,
  'length': 3,
}
let o2 = Array.from(o, item => item * 2)
console.log(o2)

// Array.find
const arr = [{ id: 1 }, { id: 2 }, { id: 3 }]
let target = arr.find(item => item.id === 1)
console.log(target)
target = arr.find(item => item.id === 4)
console.log(target)

// Array.findIndex
let targetIndex = arr.findIndex(item => item.id === 1)
console.log(targetIndex)
targetIndex = arr.findIndex(item => item.id === 4)
console.log(targetIndex)

// Array.includes
console.log([1, 2, 3].includes(2))
console.log([1, 2, 3].includes(4))