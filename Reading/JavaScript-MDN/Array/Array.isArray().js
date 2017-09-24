/**
 * Created by Administrator on 2017/3/13 0013.
 */
'use strict';

console.log(Array.isArray(Array.prototype));// true

var body = document.getElementsByTagName('body');
console.log(body.length);// 1
console.log(Array.isArray(body));// false
console.log(typeof body);                       // object
console.log(typeof body[0]);                    // object
console.log(body instanceof Object);            // true
console.log(body[0] instanceof HTMLElement);    // true
console.log(body[0] instanceof Object);    // true