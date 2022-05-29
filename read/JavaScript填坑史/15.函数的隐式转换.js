/**
 * Created by zhongdong on 18/5/25.
 */
'use strict';

// function fn() {
//     return 20;
// }
// console.log(fn + 10);// function fn() {return 20;}10


// function fn() {
//     return 20;
// }
// fn.toString = function () {
//     return 10;
// };
// console.log(fn + 10);// 20


function fn() {
    return 20;
}
fn.toString = function () {
    return 10;
};
fn.valueOf = function () {
    return 5;
};
console.log(fn + 10);// 15
alert(fn);// 10


// 二者并存的情况下，在数值运算中，优先调用了valueOf，字符串运算中，优先调用了toString。