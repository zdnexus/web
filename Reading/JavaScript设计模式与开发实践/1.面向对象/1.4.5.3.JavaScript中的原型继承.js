/**
 * Created by Administrator on 2017/12/9 0009.
 */
'use strict';

var obj = {
    id: 1
};
var A = function () {
};
A.prototype = obj;
var a = new A();
console.log(a.id);// 1
obj.id = 2;
console.log(a.id);// 2


var B = function () {
};
B.prototype = new A();
// B.prototype = A.prototype;
var b = new B();
console.log(b.id);// 2
obj.id = 3;
console.log(b.id);// 3