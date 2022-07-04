/**
 * Created by zhongdong on 2022/5/28
 * Url :
 */

class Father {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  
  sum() {
    console.log(this.x + this.y)
  }
  
  say() {
    console.log('我是父类')
  }
}

class Son extends Father {
  static mmd() {
    console.log('么么哒')
  }
  
  constructor(x, y) {
    // super函数调用父类的constructor函数，必须写在this之前。
    super(x, y)
    this.x = x
    this.y = y
    Son.mmd()
  }
  
  subtract() {
    console.log(this.x - this.y)
  }
  
  // 同函数名使用就近原则。
  say() {
    // super函数访问父类的普通函数。
    super.say()
    console.log('我是子类')
  }
}

Son.prototype.outputName = function (name) {
  console.log('子类的姓名是' + name)
}

const s = new Son(1, 2)
s.sum()
s.subtract()
s.say()
s.outputName('哈哈哈')
console.log(s instanceof Son)
