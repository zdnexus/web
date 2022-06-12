const o = {
  name: '刘德华'
}

function fn(a, b, c) {
  console.log(this.name)
  console.log(a + b + c)
}

// call，指定参数，改变this
fn.call(o, 1, 2, 3)

// apply，伪数组变成多参数，改变this
fn.apply(o, [1, 2, 3])
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(Math.max(arr))
console.log(Math.max(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))
console.log(Math.max.apply(null, arr))

// bind，指定参数，改变this，返回新函数
// 不想立即使用apply，先改变再使用
const f1 = fn.bind(o, 1, 2, 3)
f1()

const max_bind = Math.max.bind(null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
console.log(max_bind())


function fn2() {
  this.a = 1
  setTimeout(function () {
    this.a = 2
    console.log(this.a)
  }.bind(this), 2000)
}

const f2 = new fn2()
console.log(f2.a)