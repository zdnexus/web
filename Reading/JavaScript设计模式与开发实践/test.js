/**
 * Created by Administrator on 2017/12/16 0016.
 */
'use strict';

// var currying = function (fn) {
//     var arr = [];
//
//     return function () {
//         if (arguments.length === 0) {
//             return fn.apply(null, arr);
//         }
//         else {
//             [].push.apply(arr, arguments);
//         }
//     };
// };
//
// // var cost = (function () {
// //     var sum = 0;
// //
// //     return function () {
// //         for (var i = 0, l = arguments.length; i < l; i++) {
// //             sum += arguments[i];
// //         }
// //         return sum;
// //     }
// // })();
// var cost = function () {
//     var sum = 0;
//     for (var i = 0, l = arguments.length; i < l; i++) {
//         sum += arguments[i];
//     }
//     return sum;
// };
//
// var f = currying(cost);
// f(100);
// f(200, 300);
// console.log(f());
// f(400);
// console.log(f());
//
// var f2 = currying(cost);
// f2(400);
// console.log(f2());
// f2(100, 500);
// console.log(f2());


var OOO = {
    id: 1
};
function Person() {
    console.log('!!!')
    console.log(arguments)
    this.arr = [].slice.call(arguments);
    console.log('my id is: ' + this.id);
    console.log('my arr is: ' + this.arr);
}
Person.prototype.bind = function () {
    var self = this;
    var N = [].shift.call(arguments);
    var args = [].slice.call(arguments);

    console.log(self);
    console.log(self.apply);
    console.log('args',args);
    return function () {
        console.log([].concat.call(args, [].slice.call(arguments)));
        console.log(self);
        self.apply(N, [].concat.call(args, [].slice.call(arguments)));
    }
};
var p = new Person();
p = p.bind(OOO, 1, 2);
// Person(3);
// Person(3, 4);
p(3, 4, 5);