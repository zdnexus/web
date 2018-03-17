/**
 * Created by zdnexus on 2018/1/14 0014.
 */
'use strict';

var Currying = function (fn) {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(null, args);
        } else {
            Array.prototype.push.apply(args, arguments);
        }
    }
};

var Count = (function () {
    var sum = 0;
    return function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
            sum += arguments[i];
        }
        return sum;
    };
})();

var Count_2 = function () {
    var sum = 0;
    for (var i = 0, l = arguments.length; i < l; i++) {
        sum += arguments[i];
    }
    return sum;
};

var Cost = Currying(Count);
Cost(100);
Cost(200);
Cost(300, 400);
console.log(Cost());

var Cost_2 = Currying(Count_2);
Cost_2(100);
Cost_2(200);
Cost_2(300, 400);
console.log(Cost_2());