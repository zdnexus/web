/**
 * Created by zhongdong on 2022/7/3
 * Url :
 */

const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 = [...arr1, ...arr2]
console.log(arr1)
console.log(arr2)
console.log(arr3)

// 类数组转数据
const divs = document.getElementsByClassName('div')
const divs_arr = [...divs]