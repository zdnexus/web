/**
 * Created by zhongdong on 2022/7/3
 * Url :
 */
// 普通函数arguments写法
function sum1() {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
}

console.log(sum1(1, 2, 3))
console.log(sum1(1, 2, 3, 4, 5, 6))

// 箭头函数arguments写法
const sum2 = (...args) => {
  let sum = 0
  args.forEach(item => sum += item)
  return sum
}
console.log(sum2(1, 2, 3))
console.log(sum2(1, 2, 3, 4, 5, 6))
