function Father(name, age) {
  this.name = name
  this.age = age
}

Father.prototype.makeMoney = function () {
  console.log('月薪+3000块')
}

function Son(name, age) {
  Father.call(this, name, age)
}

// ERROR：在Son.prototype添加方法，会导致Father.prototype也被添加
// Son.prototype = Father.prototype
// Son.prototype.costMoney = function () {
//   console.log('月薪-1000块')
// }
// console.log(Father.prototype)
// console.log(Son.prototype)

// FIXED：
Son.prototype = new Father()
Son.prototype.constructor = Son
Son.prototype.costMoney = function () {
  console.log('月薪-1000块')
}
console.log(Father.prototype)
console.log(Son.prototype)


const james = new Son('james', 18)
james.makeMoney()
james.costMoney()