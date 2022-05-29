/**
 * Created by zhongdong on 2022/5/28
 * Url :
 */

// 1.ES6没有变量提升，必须先定义类，再实例化对象。
// 2.类调用共有属性和方法，一定要加this。
// 3.类有一个constructor函数，接受传递的参数，同时返回给实体对象。
// 4.new生成实例，会自动调用constructor函数，不写也会自动生成constructor函数。
// 5.创建类不需要加括号，类里的构造函数不需要加function，用类生成实例要加new和括号。
class star {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  
  sing(songTitle) {
    console.log(this.name + '，' + this.age + '岁，' + songTitle)
  }
}

let ldh = new star('刘德华', 18)
ldh.sing('冰雨')

let zxy = new star('张学友', 20)
zxy.sing('李香兰')