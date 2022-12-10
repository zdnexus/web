/**
 * Created by zdnexus on 17/5/7.
 */
'use strict';

// 块级作用域
// ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
// 在 JS 文件里和块状里用var声明的变量在全局有效

// 即脚本开始运行时，var变量已经存在了，但是没有值，所以会输出undefined。
// console.log('文件作用域：let a =', a);        // ReferenceError: a is not defined
console.log('文件作用域：var b =', b);        // undefined,变量提升
{
    let a = 1;
    var b = 2;
    console.log('块级作用域：let a =', a);    // 1
    console.log('块级作用域：var b =', b);    // 2
}
// console.log('文件作用域：let a =', a);        // ReferenceError: a is not defined
console.log('文件作用域：var b =', b);        // 2

// 循环函数作用域
let arr = [];
for (var i = 0; i < 3; i++) {
    arr[i] = function () {
        console.log(i);
        return i;
    };
}
console.log('arr[0]:', arr[0]());   // 3
console.log('arr[1]:', arr[1]());   // 3
console.log('arr[2]:', arr[2]());   // 3
console.log(i);                     // 3

// 修改
var arr2 = [];
for (var j = 0; j < 3; j++) {
    arr2[j] = (function (j) {
        return function () {
            return j;
        }
    })(j);
}
console.log('arr2[0]:', arr2[0]()); // 0
console.log('arr2[1]:', arr2[1]()); // 1
console.log('arr2[2]:', arr2[2]()); // 2
console.log(j);                     // 3

// 修改2
var arr3 = [];
for (var k = 0; k < 3; k++) {
    (function(k){
        arr3[k] = function () {
            return k;
        }
    })(k);
}
console.log('arr3[0]:', arr3[0]()); // 0
console.log('arr3[1]:', arr3[1]()); // 1
console.log('arr3[2]:', arr3[2]()); // 2
console.log(k);                     // 3

// 修改3
var arr4 = [];
let l = 'hello world';
for (let l = 0; l < 3; l++) {
    arr4[l] = function () {
        return l;
    };
}
console.log('arr4[0]:', arr4[0]()); // 0
console.log('arr4[1]:', arr4[1]()); // 1
console.log('arr4[2]:', arr4[2]()); // 2
console.log(l);                     // 'hello world!'

for (let m = 0; m < 3; m++) {
    let m = 'abc';
    console.log(m);
}
// abc
// abc
// abc