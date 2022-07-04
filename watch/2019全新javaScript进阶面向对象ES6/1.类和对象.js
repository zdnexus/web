/**
 * Created by zhongdong on 2022/5/28
 * Url :
 */

// 1.类没有变量提升，先定义类，再实例化对象。
// 2.首字母大写，类是对象的模板，对象是类的实例。
// 3.调用属性和方法，一定要加this。
// 4.constructor函数接受传递的参数，同时返回给实体对象。
// 5.new生成实例，会自动调用constructor函数，不写也会自动生成constructor函数。
// 6.创建类不加括号，里面的构造函数不需要加关键字function，用类生成实例要加new和括号。
class Star {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  
  sing(song) {
    console.log(this.name + '，' + this.age + '，' + song)
  }
}

const ldh = new Star('刘德华', 18)
ldh.sing('冰雨')
console.log(ldh instanceof Star)

const zxy = new Star('张学友', 20)
zxy.sing('李香兰')
console.log(zxy instanceof Star)
