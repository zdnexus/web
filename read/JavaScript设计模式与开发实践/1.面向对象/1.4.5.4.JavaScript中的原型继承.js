/**
 * Created by zdnexus on 2017/12/9 0009.
 */
'use strict';

var obj = {
    name: 'sven'
};
var A = function () {
};
A.prototype = obj;

var a = new A();
console.log(a.name);// sven
obj.name = 'nevermore';
console.log(a.name);// nevermore
a.name = 'sk';
console.log(obj.name);// nevermore

var B = function () {
};
// 第一种继承
B.prototype = new A();
// 第二种继承
// B.prototype = A.prototype;
// 第三种继承
// B.prototype.__proto__ = A.prototype;
// 第四种继承
// B.prototype.__proto__ = new A();

var b = new B();
console.log(b.name);// nevermore
obj.name = 'sk';
console.log(a.name);// sk
console.log(b.name);// sk

console.log(Object.getPrototypeOf(a) === A.prototype);
console.log(Object.getPrototypeOf(a) === B.prototype);
console.log(Object.getPrototypeOf(b) === A.prototype);
console.log(Object.getPrototypeOf(b) === B.prototype);