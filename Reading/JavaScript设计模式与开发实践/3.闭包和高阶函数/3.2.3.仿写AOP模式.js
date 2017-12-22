/**
 * Created by Administrator on 2017/12/9 0009.
 */
'use strict';

function Add() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    var n = new F1();
    // n.self = n;
    return n;
}

function F1() {
    console.log('F1');
    this.buildSelf();
}

F1.prototype.one = function (oneFn) {
    console.log('before');
    // var self = this;
    oneFn.apply(this, arguments);
    // return this.self;
    // return function F1() {
    //     console.log('return one')
    // beforeFn.apply(null, arguments);
    // self.apply(null, arguments);
    // return self.apply(null, arguments);
    // };
};
F1.prototype.two = function (twoFn) {
    console.log('after');
    // var self = this;
    // twoFn.apply(this.self, arguments);
    // return this.self;
    // return function () {
    //     console.log('return two')
    // var ret = self.apply(null, arguments);
    // afterFn.apply(null, arguments);
    //     // return ret;
    // };
};
F1.prototype.buildSelf = function (obj) {
    console.log('buildSelf');
    console.log(this.prototype);
    for (var i in this.prototype) {
        console.log(this.prototype[i])
    }
};


Add(1, 2, 3).one(function () {
    console.log(this + 1);
}).two(function () {
    console.log(this + 2);
});