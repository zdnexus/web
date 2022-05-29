/**
 * Created by zdnexus on 17/8/31.
 */
'use strict';

// 在JavaScript里，函数即对象，程序可以随意操控它们。
// 比如，可以把函数赋值给变量，或者作为参数传递给其他函数，也可以给它们设置属性，甚至调用它们的方法。

// f1(0); // Error：调用出错，f1是在代码执行到那一行的时候才会有定义，f1变量提升后是undefined。
var f1 = function (index) {
    console.log(index + 1);
};
f1(1); // 2


// f2(0); // Error：调用出错，f2变量提升后是undefined。
var f2 = new Function('index', 'console.log(index + 2);');
f2(1); // 3


f3(0); // 3
function f3 (index) {
    console.log(index + 3);
}

f3(1); // 4
// 笔记：f3会在代码执行之前提前加载到作用域中。


// 函数即对象：在JavaScript里，函数即对象，程序可以随意操控它们。
// 1.把函数赋值给变量：
var f;
f = f1;
f(0); // 1
f = f2;
f(0); // 2
f = f3;
f(0); // 3


// 2.作为参数传递给其他函数：
function k (func) {
    func(4)
}

k(f3); // 7


// 3.给函数设置属性，甚至调用它们的方法。
function Person (name) {
    // 添加属性
    this.name = name;
    // 添加方法
    this.showName = function () {
        console.log('我的名字是' + this.name);
    };
}

var me = new Person('Stone');
console.log(me.name);   // Stone
me.showName();          // 我的名字是Stone