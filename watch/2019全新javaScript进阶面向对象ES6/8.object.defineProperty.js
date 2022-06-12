let obj = {
  id: 1,
  name: '小米',
  price: 999,
}
console.log(obj.price)

obj.price = 1999
console.log(obj.price)

// 重写key值
Object.defineProperty(obj, 'price', {
  value: 2999
})
console.log(obj)

// key值，writable是否修改
Object.defineProperty(obj, 'price', {
  writable: false
})
obj.price = 3999
console.log(obj)

// key值，enumerable是否遍历
Object.defineProperty(obj, 'price', {
  enumerable: false
})
console.log(Object.keys(obj))
console.log(obj)


// key值，configurable是否删除
Object.defineProperty(obj, 'price', {
  configurable: false
})
delete obj.price
console.log(obj)

// key值，configurable是否删除
Object.defineProperty(obj, 'name', {
  configurable: false
})
delete obj.name
console.log(obj)

// key值，configurable是否删除
Object.defineProperty(obj, 'id', {
  configurable: true
})
delete obj.id
console.log(obj)
