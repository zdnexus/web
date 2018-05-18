/**
 * Created by zdnexus on 2018/1/14 0014.
 */
'use strict';

Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    }
};

var ary = ['push', 'shift', 'forEach'];
var array = {};
for (var i = 0, l = ary.length; i < l; i++) {
    var fn = ary[i];
    array[fn] = Array.prototype[fn].uncurrying();
}
var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};

array.push(obj, 4);
console.log(obj);

var first = array.shift(obj);
console.log(first);
console.log(obj);

array.forEach(obj, function (item, index) {
    console.log(index + ' ' + item);
});