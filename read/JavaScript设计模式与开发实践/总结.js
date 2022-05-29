/**
 * Created by zdnexus on 2018/1/13 0013.
 */
'use strict';

// 使用克隆的原型模式
// var o = {
//     id: 1
// };
// var o2 = Object.create(o);
// console.log(o);// { id: 1 }
// console.log(o2);// {}
// console.log(o2.__proto__);// { id: 1 }
// o2.__proto__.id = 2;
// console.log(o);// { id: 2 }
// console.log(o2.__proto__);// { id: 2 }


// JavaScript中的原型继承
// function Person(id) {
//     id && (this.id = id);
// }
// Person.id = 1;
// Person.prototype.getId = function () {
//     return this.id;
// };
// Person.prototype.id = 2;
//
// var p = new Person(3);
// p.id = 4;
// console.log(p.id);
// console.log(p.getId());


// 通过__proto__修改原型链方法
// function Person(id) {
//     this.id = id;
// }
// Person.prototype.getId = function () {
//     return this.id;
// };
// var p = new Person('aaa');
// console.log(p.id);
// console.log(p.getId());
// var o = {};
// o.__proto__ = Person.prototype;
// o.__proto__.getId = function () {
//     return 'abc';
// };
// var p2 = new Person('bbb');
// console.log(p2.id);
// console.log(p2.getId());


// call和apply
// var obj = {
//     id: 1
// };
// var Person = function (id) {
//     this.id = id;
//     this.showId = function () {
//         console.log('Person showId ' + this.id);
//     };
// };
// Person.prototype.showId = function () {
//     console.log('Person prototype showId' + this.id);
// };
// Person.prototype.showMsg = function () {
//     console.log('Person prototype showMsg');
// };
//
// Person.call(obj);
// obj.showId();
// obj.showMsg();
//
// Person.apply(obj);
// obj.showId();
// obj.showMsg();


// function call_apply(a, b, c) {
//     console.log(arguments);
//     console.log(a);
//     console.log(b);
//     console.log(c);
// }
// call_apply.call(null, 1, 2, 3);
// call_apply.apply(null, [1, 2, 3]);


// 命令模式
// 执行者
// var Div = {
//     element: document.getElementById('div1'),
//     changeBlue: function () {
//         this.element.style.backgroundColor = 'blue';
//     },
//     changeRed: function () {
//         this.element.style.backgroundColor = 'red';
//     },
//     changeFontSize50: function () {
//         this.element.style.fontSize = '50px';
//     }
// };
//
// // 分离
// var ChangeDivCommand = function (receiver) {
//     return {
//         commandOne: function () {
//             receiver.changeBlue();
//         },
//         commandTwo: function () {
//             receiver.changeRed();
//             receiver.changeFontSize50();
//         }
//     };
// };
//
// // 发起者
// var SetCommand = function (command) {
//     document.getElementById('btn1').onclick = function () {
//         command.commandOne();
//     };
//     document.getElementById('btn2').onclick = function () {
//         command.commandTwo();
//     };
// };
//
// SetCommand(ChangeDivCommand(Div));


var cost = (function () {
    var sum = 0;
    return function () {
        if (arguments.length > 0) {
            for (var i = 0, l = arguments.length; i < l; i++) {
                sum += arguments[i];
            }
        } else {
            return sum;
        }
    }
})();

cost(100);
cost(200);
cost(300, 400);
console.log(cost());


