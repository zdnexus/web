/**
 * Created by zdnexus on 2017/12/9 0009.
 */
'use strict';

Function.prototype.bind = function (context) {
    var self = this;// 保存原有函数
    return function () {
        return self.apply(context, arguments);// 返回改变新this的函数
    };
};

var obj = {
    name: 'sven'
};
var Person = function () {
    console.log(this.name);
    console.log(arguments[0]);
}.bind(obj);
Person(1);