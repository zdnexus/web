/**
 * Created by Administrator on 2017/12/9 0009.
 */
'use strict';

Function.prototype.before = function (beforeFn) {
    console.log('before')
    var self = this;
    return function () {
        console.log('return before')
        beforeFn.apply(null, arguments);
        self.apply(null, arguments);
        // return self.apply(null, arguments);
    };
};
Function.prototype.after = function (afterFn) {
    console.log('after')
    var self = this;
    return function () {
        console.log('return after')
        var ret = self.apply(null, arguments);
        afterFn.apply(null, arguments);
        // return ret;
    };
};

var func = function () {
    console.log(arguments[1]);
};
var f = func.before(function () {
    console.log(arguments[0]);
}).after(function () {
    console.log(arguments[2])
});
f(1, 2, 3);
