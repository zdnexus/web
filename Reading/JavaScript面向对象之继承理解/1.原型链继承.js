/**
 * Created by aa on 17/8/31.
 */
'use strict';

// js以原型链作为实现继承的主要方法
// 基本思想是利用原型链让一个引用类型继承另一个引用类型的属性和方法
// 构造函数、原型、实例的关系
// 1.每个构造函数都有一个原型对象
// 2.原型对象都有一个指向构造函数的方法
// 3.实例都包含一个指向原型对象的一个指针

/**
 * 父类
 */
function Parent(name) {
    this.name = name;
    this.age = 10;
}
Parent.prototype.sayName = function () {
    console.log('parent name is ' + this.name + '!');
};
/**
 * 子类
 */
function Child(name) {
    this.name = name;
}
// 使用原型链继承Parent构造函数
Child.prototype = new Parent('father');
// constructor属性，指向当前的Child构造函数。
Child.prototype.constructor = Child;
Child.prototype.sayName = function () {
    console.log('child name is ' + this.name + '!');
};

// 调用父类
var parent = new Parent('father');
parent.sayName(); // parent name is father!
// 调用子类
var child = new Child('son');
child.sayName(); // child name is son!
child.age = 18;
console.log(child.age); // 18