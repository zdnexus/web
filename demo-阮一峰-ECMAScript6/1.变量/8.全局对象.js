'use strict';

window.a = 1;
console.log(a);// 1

a = 2;
console.log(window.a);// 2

let b = 1;
console.log(window.b);// undefined