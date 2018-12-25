/**
 * Created by zdnexus on 2017/12/9 0009.
 */
'use strict';

Function.prototype.before = function (beforeFn) {
    var _self = this;
    return function () {
        beforeFn.apply(null, arguments);
        return _self.apply(null, arguments);
    };
};
Function.prototype.after = function (afterFn) {
    var _self = this;
    return function () {
        var ret = _self.apply(null, arguments);
        afterFn.apply(null, arguments);
        return ret;
    };
};

var func = function () {
    console.log(2);
};
var f = func.before(function () {
    console.log(1);
}).after(function () {
    console.log(3)
});

f();