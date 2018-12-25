/**
 * Created by zhongdong on 18/5/25.
 */
'use strict';

// 8
// var a = [0];
// if ([0]) {
//     console.log(a == true);
// } else {
//     console.log('wut');
// }
// 除了 [1] 为 true，其他都是 false。


// 9
// console.log(1 + - + + + - + 1);// 2


// 10
// 当函数参数涉及到 any rest parameters, any default parameters or any destructured parameters 的时候,
// 这个 arguments 就不在是一个 mapped arguments object 了.....
function sidEffecting(ary) {
    ary[0] = ary[2];
}
function bar(a, b, c = 3) {
    c = 10;
    console.log(a, b, c);
    console.log(arguments[0], arguments[1], arguments[2]);
    sidEffecting(arguments);
    console.log(a, b, c);
    console.log(arguments[0], arguments[1], arguments[2]);
    return a + b + c;
}
console.log(bar(1, 1, 1));// 12


// 11
// 因为javascript 在定义数组的时候允许最后一个元素后跟一个,, 所以这是个长度为三的稀疏数组
// console.log([, , ,].length);// 3