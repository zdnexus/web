'use strict';

console.log(a); // undefined (var变量提升)
// console.log(b); // ReferenceError: a is not defined (let不支持变量提升)
var a = 1;
let b = 2;
console.log(a); // 1
console.log(b); // 2

var a = 3;
function f1() {
    console.log(a);//3 访问全局变量
}
f1();

var a = 4;
function f2() {
    console.log(a);// undefined
    var a = 5;// 变量提升
}
f2();


var x4 = 3;
function func4() {
    console.log(x4);// undefined
    if (false) {
        var x4 = 'b';// 变量提升
    }
    console.log(x4);// undefined (QQQ)
}
func4();


var x5 = 3;
function func5() {
    console.log(x5);// 3 没有变量提升，访问的是全局变量
    if (false) {
        let x5 = 'c';// 不支持变量提升
    }
}
func5();