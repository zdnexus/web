/**
 * Created by Administrator on 2017/12/10 0010.
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

var cache = 1;
console.log(mult(1, 2, 3));
console.log(mult(1, 2, 3));