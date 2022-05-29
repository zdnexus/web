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
    console.log('我是爸爸')
  }
}

class Son extends Father {
  constructor(x, y) {
    // super函数调用父类的constructor函数，必须写在this之前。
    super(x, y)
    this.x = x
    this.y = y
    this.outputName()
  }
  
  subtract() {
    console.log(this.x - this.y)
  }
  
  // 同函数名使用就近原则。
  say() {
    // super函数访问父类的普通函数。
    super.say()
    console.log('我是儿子')
  }
  
  outputName() {
    console.log('我的姓名是哈哈哈')
  }
}

let s = new Son(1, 2)
s.sum()
s.subtract()
s.say()