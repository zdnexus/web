/**
 * Created by zdnexus on 2017/12/10 0010.
 */
'use strict';

var mult = (function () {
    var cache = {};

    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (cache[args]) {
            return cache[args];
        }

        var sum = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {
            sum *= arguments[i];
        }
        
        return cache[args] = sum;
    }
})();

console.log(mult(1, 2, 3));// 6 
console.log(mult(1, 2, 3));// 6