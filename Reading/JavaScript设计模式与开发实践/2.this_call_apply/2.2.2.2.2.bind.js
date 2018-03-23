/**
 * Created by zdnexus on 2017/12/9 0009.
 */
'use strict';

Function.prototype.bind = function () {
    var self = this;
    var context = [].shift.call(arguments);
    var args = [].slice.call(arguments);
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