/**
 * Created by zdnexus on 2017/12/17 0017.
 */
'use strict';

var A = function (name) {
    this.name = name;
};

var B = function () {
    A.apply(this, arguments);
};
B.prototype.getName = function () {
    return this.name;
};

var b = new B('sven');
console.log(b.getName());// sven


(function () {
    console.log(arguments);// { '0': 1, '1': 2 }
    Array.prototype.push.call(arguments, 3);
    console.log(arguments);// { '0': 1, '1': 2, '2': 3 }
})(1, 2);


var obj = {};
Array.prototype.push.call(obj, 'first');
console.log(obj);// { '0': 'first', length: 1 }


var num = 0;
Array.prototype.push.call(num, 'first');
console.log(num);// 0
console.log(num.length);// undefined
console.log(num[0]);// undefined


// TypeError:
var func = function () {
};
Array.prototype.push.call(func, 'first');
console.log(func);