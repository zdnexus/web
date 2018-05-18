/**
 * Created by zdnexus on 2017/12/9 0009.
 */
'use strict';

var obj = {
    name: 'nexus'
};

var Func = function () {
    console.log(this.name);
};
Func.prototype.bind = function (context) {
    var self = this;
    return function () {
        return self.apply(context, arguments);
    };
};

Func = Func.bind(obj);
Func();

var Func2 = function () {
    console.log(this.name);
    console.log(arguments);
};
Func2.prototype.bind = function () {
    var self = this;
    var context = [].shift.call(arguments);
    var args = [].slice.call(arguments);
    return function () {
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    };
};
Func2 = Func2.bind(obj, 1, 2);
Func2(3);
Func2(3, 4);
Func2(3, 4, 5);




