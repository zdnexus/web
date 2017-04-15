/**
 * Created by Administrator on 2017/3/13 0013.
 */
'use strict';

console.log(Array.isArray(Array.prototype));    // true

var aIpt = document.getElementsByTagName('input');
// Uncaught TypeError: aIpt.map is not a function
// aIpt.map((function () {
//     console.log('x');
// }));
console.log(aIpt.length);                       // 3
console.log(Array.isArray(aIpt));               // false
document.body.appendChild('<input/>');
console.log(aIpt.length);                       // 4