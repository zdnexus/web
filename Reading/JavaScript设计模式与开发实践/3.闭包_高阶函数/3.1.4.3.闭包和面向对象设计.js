/**
 * Created by zdnexus on 2018/1/14 0014.
 */
'use strict';

// 闭包函数写法
var Extent = function () {
    this.value = 0;
};
Extent.prototype.call = function () {
    this.value++;
    console.log(this.value);
};
var et = new Extent();

et.call();
et.call();
et.call();
