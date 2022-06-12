const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let new_arr = arr.map(item => {
  if (item >= 5) {
    item = 11
  }
  return item
})
console.log(arr)
console.log(new_arr)

// new_arr = arr.forEach(item => {
//   if (item >= 5) {
//     // 不会终止函数
//     console.log('终止')
//     return true
//   }
// })
// console.log(arr)
// console.log(new_arr)

// new_arr = arr.filter(item => {
//   if (item >= 5) {
//     // 不会终止函数
//     console.log('终止')
//     return true
//   }
// })
// console.log(arr)
// console.log(new_arr)

// new_arr = arr.every(item => {
//   if (item >= 5) {
//     // 不会终止函数
//     console.log('终止')
//     return true
//   }
// })
// console.log(arr)
// console.log(new_arr)

// new_arr = arr.some(item => {
//   if (item >= 5) {
//     // 会终止函数
//     console.log('终止')
//     return true
//   }
// })
// console.log(arr)
// console.log(new_arr)


// const arr2 = [{ a: 4 }, { a: 5 }, { a: 6 },]
// let new_arr2 = arr2.map(item => {
//   if (item.a >= 5) {
//     item.a = 11
//   }
//   return item
// })
// console.log(arr2)
// console.log(new_arr2)