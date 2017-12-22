/**
 * Created by Administrator on 2017/12/17 0017.
 */
'use strict';

function A(name) {
    name && (this.name = name);
}

function B() {
    A.apply(this, arguments);
}
B.prototype.getName = function () {
    return this.name;
};

var b = new B('sven');
console.log(b.getName());


(function () {
    Array.prototype.push.call(arguments, 3);
    console.log(arguments);
})(1, 2);


var obj = {};
Array.prototype.push.call(obj, 'first');
console.log(obj);
console.log(obj.length);
console.log(obj[0]);


var num = 0;
Array.prototype.push.call(num, 'first');
console.log(num);
console.log(num.length);
console.log(num[0]);


var func = function () {
};
Array.prototype.push.call(func, 'first');
// console.log(func);
// console.log(func.length);
// console.log(func[0]);