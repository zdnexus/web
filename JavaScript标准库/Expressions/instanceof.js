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
console.log(o instanceof B);                // false，因为 B.prototype 不在 o 的原型链上
console.log(o instanceof Object);           // true，因为 Object.prototype.isPrototypeOf(o) 返回 true

console.log(A instanceof Object);           // true，
console.log(A.prototype instanceof Object); // true，
console.log(A.prototype instanceof A);      // false，

// A 添加原型
A.prototype.f1 = function () {
    console.log('原型方法');
};
var o2 = new A();
console.log(o2 instanceof A);   // true
console.log(o instanceof A);    // true

// A 重写原型
A.prototype = {
    f1: function () {
        console.log('原型方法');
    }
};
var o3 = new A();
console.log(o3 instanceof A);   // true
console.log(o2 instanceof A);   // false，A.prototype 指向了一个空对象，相当于重写了 prototype，这个空对象不在 o2 的原型链上.

// A 重写原型
A.prototype = {
    constructor: A,
    f1: function () {
        console.log('原型方法');
    }
};
var o4 = new A();
console.log(o4 instanceof A);   // true
console.log(o3 instanceof A);   // false

// B 继承 A 原型
B.prototype = new A();
var o5 = new B();
console.log(o5 instanceof B);   // true
console.log(o5 instanceof A);   // true

// 对象继承 A 原型
var o6 = {};
o6.__proto__ = A.prototype;
A.call(o6);
o6.f1();                        // 对象调用 A 的原型
console.log(o6 instanceof A);   // true

var o7 = new Object();
console.log(typeof o7);             // 'object'
console.log(o7 instanceof Object);  // true

var o8 = {};
console.log(typeof o8);             // 'object'
console.log(o8 instanceof Object);  // true

var o9 = null;
console.log(typeof o9);             // 'object'
console.log(o9 instanceof Object);  // false

var o10;
console.log(typeof o10);            // 'object'
console.log(o10 instanceof Object); // false

var f = function () {

};
console.log(typeof f);              // 'function'
console.log(f instanceof Function); // true