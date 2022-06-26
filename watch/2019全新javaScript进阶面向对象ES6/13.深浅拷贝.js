/**
 * Created by zhongdong on 2022/6/18
 * Url :
 */

var arr = [1, 2, 3, 4, 5]
console.log(typeof arr)// object
console.log(arr instanceof Array)// true
console.log(arr instanceof Object)// true
console.log(arr.constructor === Array)// true
console.log(arr.constructor === Object)// false

var obj = { id: 1 }
console.log(typeof obj)// object
console.log(obj instanceof Array)// false
console.log(obj instanceof Object)// true
console.log(obj.constructor === Array)// false
console.log(obj.constructor === Object)// true

console.log(Array instanceof Object)// true
console.log(Object instanceof Array)// false

var o1 = {
  id: 1,
  name: 'o1',
  arr: [10],
  obj: { id: 20 }
}

function shallowCopy(obj) {
  var o = {}
  for (var key in obj) {
    o[key] = obj[key]
  }
  return o
}

var o2 = shallowCopy(o1)
o2.id = 2
o2.name = 'o2'
o2.arr[0] = 100

var o3 = Object.assign({}, o1)
o3.id = 3
o3.name = 'o3'
o3.obj.id = 200

console.log(o1)
console.log(o2)
console.log(o3)


function deepCopy(obj) {
  var o = obj.constructor === Object ? {} : []
  for (var key in obj) {
    if (obj[key] instanceof Object) {
      o[key] = deepCopy(obj[key])
    } else {
      o[key] = obj[key]
    }
  }
  return o
}

var od1 = {
  id: 1,
  name: 'od1',
  arr: [1000],
  obj: { id: 2000 }
}

var od2 = deepCopy(od1)
od2.id = 2
od2.name = 'od2'
od2.arr[0] = 10000
od2.obj.id = 20000

console.log(od1)
console.log(od2)