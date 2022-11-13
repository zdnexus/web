function Star(name, age) {
  this.name = name
  this.age = age
}

// 构造函数的实例共享使用同一个属性，避免浪费空间
Star.prototype.name = '张学友'
Star.prototype.age = '19'
Star.prototype.sing = function (songTitle) {
  console.log(this.name + '，' + this.age + '岁，唱歌：' + songTitle)
}

console.log(Star.name)
console.log(Star.age)
console.log(Star.sing)

let ldh = new Star('刘德华', 18)
ldh.sing('冰雨')
console.log(ldh.name)
console.log(ldh.age)
console.log(ldh.sing)
console.log(ldh.sing === Star.prototype.sing)
console.log(ldh instanceof Star)
console.log(ldh.constructor === Star)

let zxy = new Star()
zxy.sing('李香兰')

Star.name = '黎明'
Star.prototype.age = '20'
let lm = new Star()
lm.sing('我爱黎明')

// 构造函数原型对象=对象原型__proto__
console.log(Star.prototype)
console.log(ldh.__proto__)
console.log(Star.prototype === ldh.__proto__)
console.log(Star.prototype.sing === ldh.__proto__.sing)

// 构造函数原型对象的指向属性constructor
console.log(Star.prototype.constructor === Star)
console.log(ldh.__proto__.constructor === Star)
console.log(Star.prototype.constructor === ldh.__proto__.constructor)

// 重写构造函数的原型对象，添加constructor属性指向原来的构造函数Star
Star.prototype = {
  constructor: Star,
  sing: function (songTitle) {
    console.log(this.name + '，' + this.age + '岁，唱歌：' + songTitle)
  }
}

// 构造函数原型对象也是对象，也有自己的__proto__，即最原生的Object.prototype，可以调用Object的方法。
console.log(Star.prototype.__proto__ === Object.prototype)
console.log(Star.prototype.__proto__.__proto__ === Object.prototype.__proto__)
console.log(Object.prototype.__proto__)

// 原型链
console.log(ldh.sex)

Star.prototype.sex = '男'
console.log(ldh.sex)

Object.prototype.sex = '女'
console.log(ldh.sex)

// 原型对象的拓展
Array.prototype.sum = function () {
  let sum = 0
  for (let i = 0; i < this.length; i++) {
    sum += this[i]
  }
  return sum
}
let arr = [1, 2, 3]
console.log(arr.sum())