/**
 * Created by zdnexus on 2017/12/16 0016.
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


// var OOO = {
//     id: 1
// };
// function Person() {
//     console.log('!!!')
//     console.log(arguments)
//     this.arr = [].slice.call(arguments);
//     console.log('my id is: ' + this.id);
//     console.log('my arr is: ' + this.arr);
// }
// Person.prototype.bind = function () {
//     var self = this;
//     var N = [].shift.call(arguments);
//     var args = [].slice.call(arguments);
//
//     console.log(self);
//     console.log(self.apply);
//     console.log('args',args);
//     return function () {
//         console.log([].concat.call(args, [].slice.call(arguments)));
//         console.log(self);
//         self.apply(N, [].concat.call(args, [].slice.call(arguments)));
//     }
// };
// var p = new Person();
// p = p.bind(OOO, 1, 2);
// // Person(3);
// // Person(3, 4);
// p(3, 4, 5);


// var mult = (function () {
//     var obj = {
//         func_1: {
//             cache: {},
//             func: function () {
//                 var sum = 1;
//                 for (var i = 0, l = arguments.length; i < l; i++) {
//                     sum += arguments[i];
//                 }
//                 return sum;
//             }
//         },
//         func_2: {
//             cache: {},
//             func: function () {
//                 var sum = 1;
//                 for (var i = 0, l = arguments.length; i < l; i++) {
//                     sum *= arguments[i];
//                 }
//                 return sum;
//             }
//         }
//     };
//
//     return function () {
//         var funcName = Array.prototype.shift.call(arguments);
//         var args = Array.prototype.join.call(arguments, ',');
//
//         if (args in obj[funcName].cache) {
//             return obj[funcName].cache[args];
//         }
//         return obj[funcName].func.apply(null, arguments);
//     };
// })();
//
// console.log(mult('func_1', 1, 2, 3));
// console.log(mult('func_1', 1, 2, 3));
// console.log(mult('func_2', 4, 5, 6));
// console.log(mult('func_2', 4, 5, 6));


// var a = function (fn) {
//     var args = [];
//     return function () {
//         if (arguments.length === 0) {
//             return fn.apply(null, args);
//         } else {
//             Array.prototype.push.apply(args, arguments);
//         }
//     };
// };
// var b = function () {
//     var sum = 0;
//     for (var i = 0; i < arguments.length; i++) {
//         sum += arguments[i];
//     }
//     return sum;
// };
// var c = a(b);
// c(1);
// c(2);
// c(3, 4);
// console.log(c());


Function.prototype.before = function (beforeFn) {
    var _self = this;
    return function () {
        beforeFn.apply(null, arguments);
        _self.apply(null, arguments);
        // return _self.apply(null, arguments);
    };
};
Function.prototype.after = function (afterFn) {
    var _self = this;
    return function () {
        var ret = _self.apply(null, arguments);
        afterFn.apply(null, arguments);
        return ret;
    };
};

var func = function () {
    console.log(2);
};
var f =
    func
        .before(function () {
            console.log(1);
        })
        // .after(function () {
        //     console.log(3)
        // });
// console.log(f);
f();