/**
 * Created by Administrator on 2017/12/9 0009.
 */
'use strict';

Function.prototype.before = function (beforeFn) {
    var _self = this;

    return function () {
        beforeFn.apply(this, arguments);
        // _self.apply(null, arguments);
        // return _self.apply(this, arguments);
    };
};
Function.prototype.after = function (afterFn) {
    var _self = this;

    return function () {
        // var ret = _self.apply(this, arguments);
        afterFn.apply(this, arguments);
        // return ret;
    };
};

var arr = [1, 2, 3];
var func = function () {
    console.log(1);
};
var f = func.before(function () {
    console.log(arguments[0]);
}).afer();
f(arr);


// var f = func.before(function () {
//     console.log(1);
// }).after(function () {
//     console.log(3)
// });
//
// f();