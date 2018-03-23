/**
 * Created by zdnexus on 2018/1/14 0014.
 */
'use strict';

// 闭包普通写法
var extent = function () {
    var value = 0;
    return {
        call: function () {
            value++;
            console.log(value);
        }
    }
};

var et = extent();
et.call();
et.call();
et.call();
