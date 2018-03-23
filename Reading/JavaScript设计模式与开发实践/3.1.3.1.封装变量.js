/**
 * Created by zdnexus on 2017/12/10 0010.
 */
'use strict';

var mult = (function () {
    var cache = {};

    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        var sum = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {
            sum *= arguments[i];
        }
        return cache[args] = sum;
    }
})();

console.log(mult(1, 2, 3));

var mult2 = (function () {
    var cache = {};
    var calculate = function () {
        var sum = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {
            sum *= arguments[i];
        }
        return sum;
    };

    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = calculate.apply(null, arguments);
    }
})();

console.log(mult2(1, 2, 3));