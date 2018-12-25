/**
 * Created by zdnexus on 2018/1/14 0014.
 */
'use strict';

var cost = (function () {
    var args = [];

    return function () {
        if (arguments.length === 0) {
            var sum = 0;
            for (var i = 0, l = args.length; i < l; i++) {
                sum += args[i];
            }
            return sum;
        } else {
            Array.prototype.push.apply(args, arguments);
        }
    }
})();

cost(100);
cost(200);
cost(300, 400);
console.log(cost());