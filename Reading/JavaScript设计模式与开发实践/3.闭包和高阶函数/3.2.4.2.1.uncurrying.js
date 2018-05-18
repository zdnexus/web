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

var Push = Array.prototype.push.uncurrying();
var arr = [];
Push(arr, 1);
Push(arr, 2, 3);
console.log(arr);

(function () {
    Push(arguments, 4);
    console.log(Array.prototype.slice.call(arguments));
})(1, 2, 3);