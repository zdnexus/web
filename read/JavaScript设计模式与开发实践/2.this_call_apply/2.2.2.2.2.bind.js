/**
 * Created by zdnexus on 2017/12/9 0009.
 */
'use strict';

Function.prototype.bind = function () {
    var self = this,// 保存原函数
        context = [].shift.call(arguments),// 需要绑定的this上下文
        args = [].slice.call(arguments);// 剩余的参数转换为数组

    return function () {
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    }
};

var obj = {
    name: 'sven'
};
var func = function () {
    console.log(this.name);
    console.log(arguments);
}.bind(obj, 1, 2);

func(3);
func(3, 4);
func(3, 4, 5);