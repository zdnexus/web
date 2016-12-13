'use strict';

// let声明的变量只在它所在的代码块有效。
// 在文件里的和块状里var声明的变量是全局
// console.log('文件作用域一:let a=', a);// ReferenceError: a is not defined
console.log('文件作用域一:var b=', b);// undefined 变量提升
// 块级作用域一
{
    let a = 1;
    var b = 2;
    console.log('块级作用域一:let a=', a);// a = 1
    console.log('块级作用域一:var b=', b);// b = 2
}
// console.log('文件作用域二:let a=', a);// ReferenceError: a is not defined
console.log('文件作用域二:var b=', b);// 2
let a = 1;//声明一个块作用域的局部变量,只作用于A()
console.log('let a=', a);// a = 1
console.log('var b=', b);// b = 2
// 块级作用域二
{
    a = 3;
    b = 4;
    console.log('块级作用域二:a=', a);// a = 3
    console.log('块级作用域二:b=', b);// b = 4
}
console.log('文件作用域三:let a=', a);// 3
console.log('文件作用域三:var b=', b);// 4
// 块级作用域三
{
    let a = 5;
    let b = 6;
    console.log('块级作用域三:let a=', a);// a = 5
    console.log('块级作用域三:let b=', b);// b = 6
}
console.log('文件作用域四:let a=', a);// 3
console.log('文件作用域四:var b=', b);// 4
// 块级作用域四
{
    // var a = 7;//ERROR
    var b = 8;
    console.log('块级作用域四:var a=', a);// 3
    console.log('块级作用域四:var b=', b);// 8
}
console.log('文件作用域五:let a=', a);// 3
console.log('文件作用域五:var b=', b);// 8

// 函数作用域一
function f1() {
    a = 9;
    b = 10;
    console.log('函数作用域一:a=', a);// 9
    console.log('函数作用域一:b=', b);// 10
}
f1();
console.log('文件作用域六:let a=', a);//9 (x并没有被函数里的x代替)
console.log('文件作用域六:var b=', b);//10 (y并没有被函数里的y代替)
// 函数作用域二
function f2() {
    let a = 11;
    let b = 12;
    console.log('函数作用域二:let a=', a);// 11
    console.log('函数作用域二:let b=', b);// 12
}
f2();
console.log('文件作用域七:let a=', a);//9 (x并没有被函数里的x代替)
console.log('文件作用域七:var b=', b);//10 (y并没有被函数里的y代替)
// 函数作用域三
function f3() {
    var a = 13;
    var b = 14;
    console.log('函数作用域三:var a=', a);// 13
    console.log('函数作用域三:var b=', b);// 14
}
f3();
console.log('文件作用域八:let a=', a);//9 (x并没有被函数里的x代替)
console.log('文件作用域八:var b=', b);//10 (y并没有被函数里的y代替)

// 循环函数作用域
// 闭包
var arr = [];
var i = 'hello world!';
for (var i = 0; i < 3; i++) {
    arr[i] = function () {
        return i;
    };
}
console.log('arr[0]:', arr[0]());// 3
console.log('arr[1]:', arr[1]());// 3
console.log('arr[2]:', arr[2]());// 3
console.log(i);//3 (新申明的变量i=3把i='hello world'覆盖)
// 闭包修改
var arr2 = [];
var i = 'hello world!';
for (var i = 0; i < 3; i++) {
    arr2[i] = (function (i) {
        return function () {
            return i;
        }
    })(i);
}
console.log('arr2[0]:', arr2[0]());// 3
console.log('arr2[1]:', arr2[1]());// 3
console.log('arr2[2]:', arr2[2]());// 3
console.log(i);//3 (新申明的变量i=3把i='hello world'覆盖)
// let不会存在闭包
var arr3 = [];
var i = 'hello world!';
for (let i = 0; i < 3; ++i) {
    arr3[i] = function () {
        return i;
    };
}
console.log('arr3[0]:', arr3[0]());// 0
console.log('arr3[1]:', arr3[1]());// 1
console.log('arr3[2]:', arr3[2]());// 2
console.log(i);//'hello world!' (新申明的变量i=3把i='hello world'覆盖)
