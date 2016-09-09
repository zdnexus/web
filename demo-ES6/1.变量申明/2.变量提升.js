'use strict';

console.log(x1); // undefined (var变量提升)
// console.log(y1); // 报错 (let不支持变量提升)
var x1 = 1;
let y1 = 2;


var x2 = 3;
function func2() {
    console.log(x2);//3 访问全局变量
}
func2();


var x3 = 3;
function func3() {
    console.log(x3);// undefined
    var x3 = 'a';// 变量提升
}
func3();


var x4 = 3;
function func4() {
    console.log(x4);// undefined
    if (false) {
        var x4 = "b";// 变量提升
    }
    console.log(x4);// undefined (QQQ)
}
func4();


var x5 = 3;
function func5() {
    console.log(x5);// 3 没有变量提升，访问的是全局变量
    if (false) {
        let x5 = "c";// 不支持变量提升
    }
}
func5();