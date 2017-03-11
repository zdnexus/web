/**
 * Created by Administrator on 2017/3/4 0004.
 */
'use strict';

// object instanceof constructor
// instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
// instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。

// 定义构造函数
function A() {
}
function B() {
}
var o = new A();
console.log(o instanceof A);                // true，因为 Object.getPrototypeOf(o) === A.prototype
console.log(o instanceof B);                // false，因为 B.prototype不在o的原型链上
console.log(o instanceof Object);           // true，因为Object.prototype.isPrototypeOf(o)返回true

console.log(A instanceof Object);           // true，
console.log(A.prototype instanceof Object); // true，
console.log(A.prototype instanceof A);      // false，

// A添加原型
A.prototype.f1 = function () {
    console.log('原型方法');
};
var o2 = new A();
console.log(o2 instanceof A);   // true
console.log(o instanceof A);    // true

// A重写原型
A.prototype = {
    f1: function () {
        console.log('原型方法');
    }
};
var o3 = new A();
console.log(o3 instanceof A);   // true
console.log(o2 instanceof A);   // false，A.prototype 指向了一个空对象，相当于重写了 prototype，这个空对象不在 o2 的原型链上.

// A重写原型
A.prototype = {
    constructor: A,
    f1: function () {
        console.log('原型方法');
    }
};
var o4 = new A();
console.log(o4 instanceof A);   // true
console.log(o3 instanceof A);   // false

// B继承A原型
B.prototype = new A();
var o5 = new B();
console.log(o5 instanceof B);   // true
console.log(o5 instanceof A);   // true

// 对象继承A原型
var o6 = {};
o6.__proto__ = A.prototype;
A.call(o6);
o6.f1();                        // '原型方法'
console.log(o6 instanceof A);   //

var o7 = new Object();
console.log(o7 instanceof Object);  // true

var o8 = {};
console.log(o8 instanceof Object);  // true

var o9 = null;
console.log(o9 instanceof Object);  // false
