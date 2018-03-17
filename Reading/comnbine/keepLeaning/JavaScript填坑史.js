/**
 * Created by zdnexus on 17/5/10.
 */
// 'use strict';

// console.log(1);
// setTimeout(function(){
//     console.log(2);
// },0);
// console.log(3);
// 1 3 2


// var name = 'The Window';
// var object = {
//     name: 'My Object',
//     getNameFunc: function () {
//         return function () {
//             return this.name;
//         };
//     }
// };
// console.log(object.getNameFunc()());// The Window


// var name = 'The Window';
// var object = {
//     name : 'My Object',
//     getNameFunc : function(){
//         var that = this;
//         return function(){
//             return that.name;
//         };
//     }
// };　　
// console.log(object.getNameFunc()());// My Object


// var f1 = function () {
//     console.log(typeof f1);// 'function'
// };
// f1();
// var obj = {
//     f2: function () {
//         console.log(typeof f2);// undefined
//     }
// };
// obj.f2();


// function fun(n, o) {
//     console.log(o);
//     return {
//         fun: function (m) {
//             return fun(m, n);
//         }
//     };
// }
// var a = fun(0);// undefined
// a.fun(1);// 0
// a.fun(2);// 0
// a.fun(3);// 0
// var b = fun(0).fun(1).fun(2).fun(3);// undefined 0 1 2
// var c = fun(0).fun(1);// undefined 0
// c.fun(2);// 1
// c.fun(3);// 1


// console.log(['1', '2', '3'].map(parseInt));// [ 1, NaN, NaN ]


// console.log([1 < 2 < 3, 3 < 2 < 1]);// [ true, true ]


// console.log(3.toString());
// console.log(3..toString());
// console.log(3...toString());


// var name = 'World!';
// (function () {
//     if (typeof name === 'undefined') {
//         var name = 'Jack';
//         console.log('Goodbye ' + name);
//     } else {
//         console.log('Hello ' + name);
//     }
// })();


// if ([0]) {
//     console.log('[0] is true');
// }
// else {
//     console.log('[0] is error');
// }
// if ([0] == true) {
//     console.log('[0] is true');
// }
// else {
//     console.log('[0] is error');
// }


// function sidEffecting(ary) {
//     ary[0] = ary[2];
// }
// function bar(a,b,c) {
//     c = 10;
//     sidEffecting(arguments);
//     return a + b + c;
// }
// console.log(bar(1,1,1));
// function bar2(a,b,c=3) {
//     c = 10;
//     sidEffecting(arguments);
//     return a + b + c;
// }
// console.log(bar2(1,1,1));


// var arr = [, , ,];
// console.log(arr.join(','));


// var obj2 = {
//     class: 'Animal',
//     name: 'Fido'
// };
// console.log(obj2.class);
// console.log(obj2['class']);


// function Foo() {
//     getName = function () {
//         console.log(1);
//     };
//     return this;
// }
// Foo.getName = function () {
//     console.log(2);
// };
// Foo.prototype.getName = function () {
//     console.log(3);
// };
// var getName = function () {
//     console.log(4);
// };
// function getName() {
//     console.log(5);
// }
// //请写出以下输出结果：
// Foo.getName();// 2
// getName();// 4
// Foo().getName();// 1
// getName();// 1
// new Foo.getName();// 2
// new Foo().getName();// 3
// new new Foo().getName();// 3


// for(var i = 0; i < 5; i++) {
//     console.log(i);
// }

// for(var i = 0; i < 5; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, 1000 * i);
// }

// for(var i = 0; i < 5; i++) {
//     (function(i) {
//         setTimeout(function() {
//             console.log(i);
//         }, i * 1000);
//     })(i);
// }

// for(var i = 0; i < 5; i++) {
//     (function() {
//         setTimeout(function() {
//             console.log(i);
//         }, i * 1000);
//     })(i);
// }

// for(var i = 0; i < 5; i++) {
//     setTimeout((function(i) {
//         console.log(i);
//     })(i), i * 1000);
// }

// setTimeout(function() {
//     console.log(1)
// }, 0);
// new Promise(function executor(resolve) {
//     console.log(2);
//     for( var i=0 ; i<10000 ; i++ ) {
//         i == 9999 && resolve();
//     }
//     console.log(3);
// }).then(function() {
//     console.log(4);
// });
// console.log(5);

// 当我们没有重新定义toString与valueOf时，函数的隐式转换会调用默认的toString方法，它会将函数的定义内容作为字符串返回。
// 而当我们主动定义了toString/vauleOf方法时，那么隐式转换的返回结果则由我们自己控制了。其中valueOf会比toString后执行
// function fn() {
//     return 20;
// }
// console.log(fn + 10); // function fn() {return 20;}10
//
// function fn() {
//     return 20;
// }
// fn.toString = function () {
//     return 10;
// };
// console.log(+ fn);      // 10
// console.log(10 + fn);   // 10
// console.log(fn + 10);   // 20
//
// function fn() {
//     return 20;
// }
// fn.toString = function() {
//     return 10;
// };
// fn.valueOf = function() {
//     return 5;
// };
// console.log(+ fn);      // 5
// console.log(fn + 10);   // 15

// 函数防抖和函数节流(ES6)
// 函数节  流
// const throttle = (fun, delay) => {
//     var last = null;
//     return () => {
//         const now = + new Date();
//         if (now - last > delay) {
//             fun();
//             last = now;
//         }
//     }
// };
// 实例
// const throttleExample  = throttle(() => console.log(1), 1000);
// 调用
// throttleExample();
// throttleExample();
// throttleExample();
// 函数防抖
// const debouce = (fun, delay) => {
//     var timer = null;
//     return () => {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             fun();
//         }, delay);
//     }
// };
// 实例
// const debouceExample = debouce(() => console.log(2), 1000);
// 调用
// debouceExample();
// debouceExample();
// debouceExample();