/**
 * Created by Administrator on 2016/12/28 0028.
 */
'use strict';

// 凡是使用 function 关键字或 Function 构造函数创建的对象都是函数对象。而且，只有函数对象才拥有 prototype （原型）属性。
// 三种定义函数的不同：
// f1(0);//这样调用就会出错，f1变量提升后是 undefined。
var f1 = function (index) {
    console.log(index + 1);
};
f1(0);//1

// f2(0);//这样调用就会出错，f2变量提升后是 undefined。
var f2 = new Function('index', 'console.log(index + 2)');
f2(0);//2

f3(0);//3
function f3(index) {
    console.log(index + 3);
}
f3(0);//3
// f1是在代码执行到那一行的时候才会有定义，f3会在代码执行之前提前加载到作用域中。

// 函数即对象：在 JavaScript 里，函数即对象，程序可以随意操控它们。
// 1.把函数赋值给变量：
var f;
f = f1;
f(0);//1
f = f2;
f(0);//2
f = f3;
f(0);//3
// 2.作为参数传递给其他函数：
function f4(f) {
    f(0)
}
f4(f3);//3
// 3.给函数设置属性和方法：
function f5(name) {
    this.name = name;//属性
    this.showName = function () {
        console.log('我的名字是' + this.name);
    };//方法
}
var me = new f5('A');
console.log(me.name);//A
// 4.调用它们的方法：
me.showName();//我的名字是A