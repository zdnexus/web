/**
 * Created by Administrator on 2017/12/9 0009.
 */
'use strict';

var obj = {
    id: 1
};

function Person() {
    console.log(this.id);
    console.log(arguments);
}
Person.prototype.bind = function (context) {
    var self = this;
    return function () {
        // Q:
        return self.apply(context, arguments);
        // return self.call(context, arguments);
    };
};

var p = Person.bind(obj);
p(1, 2, 3);


function Person_2() {
    console.log(this.id);
    console.log(arguments);
}
Person_2.prototype.bind = function () {
    var self = this;
    var context = [].shift.call(arguments);
    var args = [].slice.call(arguments);
    return function () {
        // Q:
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
        // return self.call(context, [].concat.call(args, [].slice.call(arguments)));
    };
};
var p2 = Person_2.bind(obj, 1, 2);
p2(3);
p2(3, 4);
p2(3, 4, 5);