/**
 * Created by zhongdong on 2022/6/18
 * Url :
 */

// 闭包（closure）：有权访问另一个函数作用域下变量的函数。
function fn() {
  let num = 10
  
  return function (a) {
    console.log(a + num)
  }
}

f = fn()
f(1)