/**
 * Created by aa on 17/8/4.
 */
// 'use strict';

var name = 'The Window';
var object = {
    name: 'My Object',
    getNameFunc: function () {
        return this.name;
    }
};
console.log(object.getNameFunc());// My Object

var name = 'The Window';
var object = {
    name: 'My Object',
    getNameFunc: function () {
        return function () {
            return this.name;
        };
    }
};
console.log(object.getNameFunc()());// The Window


var name = 'The Window';
var object = {
    name: 'My Object',
    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        };
    }
};
console.log(object.getNameFunc()());// My Object


function fun(n, o) {
    console.log(o);
    return {
        fun: function (m) {
            return fun(m, n);
        }
    };
}
var a = fun(0);// undefined
a.fun(1);// 0
a.fun(2);// 0
a.fun(3);// 0

var b = fun(0).fun(1).fun(2).fun(3);// undefined 0 1 2

var c = fun(0).fun(1);// undefined 0
c.fun(2);// 1
c.fun(3);// 1
