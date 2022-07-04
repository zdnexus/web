/**
 * Created by zhongdong on 2022/6/27
 * Url :
 */
// 箭头函数不绑定this，this指向箭头函数定义的this
function fn() {
  console.log(this.name)
  return () => {
    console.log(this.name)
  }
}

var o = { name: 'kobe' }
var f = fn.call(o)
f()


var obj = {
  name: 'jordan',
  sayName1: function () {
    console.log(this.name)
  },
  sayName2: () => {
    console.log(this.name)
  }
}
obj.sayName1()
obj.sayName2()