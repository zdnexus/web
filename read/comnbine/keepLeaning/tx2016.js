/**
 * Created by zdnexus on 17/5/26.
 */
// 'use strict';

// var a = 100;
// function fn() {
//     console.log(a);
//     var a = 200;
//     console.log(a);
// }
// console.log(a); // 100
// fn();           // undefined 200
// console.log(a); // 100
// var a;
// console.log(a); // 100
// var a = 300;
// console.log(a); // 300


// var obj1 = {
//     name: 'obj1',
//     fn: function () {
//         console.log(this.name);
//     }
// };
// var obj2 = {
//     name: 'obj2'
// };
// var obj3 = {
//     name: 'obj3'
// };
// var obj4 = {
//     name: 'obj4'
// };
// obj1.fn();          // obj1
// var newFn = obj1.fn;
// newFn();            // ''
// newFn.call(obj2);   // obj2
// obj3.fn = newFn;
// obj3.fn();          // obj3
// obj4.fn = obj1.fn;
// obj4.fn();          // obj4


// var arr = [
//     {
//         name: 'a',
//         age: 10,
//     },
//     {
//         name: 'b',
//         age: 1,
//     },
//     {
//         name: 'c',
//         age: 6,
//     },
//     {
//         name: 'd',
//         age: 2,
//     }
// ];
// Array.prototype.kobe = Array.prototype.kobe || () => {
//         this.sort(function (item1, item2) {
//             return (item1.age < item2.age) ? -1 : 1;
//         });
//     };
// arr.kobe();
// console.log(arr);

//
// var str = 'abc345efgabcab';
// // 去掉字符串中的a、b、c 字符，形成结果：'345efg'
// console.log(str.replace(/([a-c])/g, ''));
// // 将字符串中的数字用中括号括起来，形成结果：'abc3[5]efgabcab'
// console.log(str.replace(/(\d)/g, '[$1]'));
// // 将字符串中的每个数字的值分别乘以 2，形成结果：'abc6810efgabcab'
// console.log(str.replace(/(\d)/g, item=>item*2));

// function List() {
//     this.data = [];
//     for (var i in arguments) {
//         this.data.push(arguments[i]);
//     }
//     this.length = this.data.length;
// }
// List.prototype.add = function () {
//     for (var i in arguments) {
//         this.data.push(arguments[i]);
//     }
//     this.length = this.data.length;
// };
// var L = new List();
// console.log(L.length);
// L.add(1, 2, 3);
// console.log(L.length);
// L.add(4, 5, 6);
// console.log(L.length);

// function Count() {
//     var n = 0;
//     return function () {
//         return ++n;
//     }
// }
// var C = Count();
// console.log(C());
// console.log(C());
// console.log(C());

// function Parent() {
//     this.a = 1;
//     this.b = [1, 2, this.a];
//     this.c = {
//         demo: 5
//     };
//     this.show = function () {
//         console.log(this.a + ' ' + this.c.demo + ':' + this.b);
//     }
// }
// function Child() {
//     this.a = 2;
//     this.change = function () {
//         this.b.push(this.a);
//         this.a = this.b.length;
//         this.c.demo = this.a++;
//
//         console.log(this.a)
//         console.log(this.b)
//         console.log(this.c.demo)
//     }
// }
// Child.prototype = new Parent();
// var parent = new Parent();
// var child1 = new Child();
// var child2 = new Child();
// child1.a = 11;
// child2.a = 12;
// parent.show();      // 1 5:1,2,1
// child1.show();      // 11 5:1,2,1
// child2.show();      // 12 5:1,2,1
// child1.change();
// child2.change();
// parent.show();      // 1 5:1,2,1
// child1.show();      // 5 5:1,2,1,11,12
// child2.show();      // 6 5:1,2,1,11,,12


// var arr = [1, 21, 32, 41, 55, 63, 73, 87, 99, 100];
// binaryFind(arr, 12);
//
// function binaryFind(arr, searchVal) {
//     var searchStart = 0;
//     var searchEnd = arr.length;
//     var searchMid;
//
//     while ((searchMid = Math.floor((searchStart + searchEnd) / 2)) >= 0) {
//         if (searchStart > searchEnd) {
//             console.log('no searchFind');
//             break;
//         }
//         else {
//             if (arr[searchMid] < searchVal) {
//                 searchStart = searchMid + 1;
//             }
//             else if (arr[searchMid] > searchVal) {
//                 searchEnd = searchMid - 1;
//             }
//             else {
//                 console.log('searchFind:', searchMid);
//                 break;
//             }
//         }
//     }
// }

function _LazyMan(name) {
    this.tasks = [];
    var self = this;
    var fn = (function (name) {
        return function () {
            console.log('Hi! This is ' + name);
            self.next();
        };
    })(name);
    this.tasks.push(fn);
    // 在下一个事件循环启动任务
    setTimeout(function(){
        self.next();
    }, 0);
}
_LazyMan.prototype.next = function() {
    var fn = this.tasks.shift();
    fn && fn();
};
_LazyMan.prototype.sleep = function(time) {
    var self = this;
    var fn = (function(time){
        return function(){
            setTimeout(function(){
                console.log('Wake up after ' + time + 's!');
                self.next();
            }, time * 1000);
        };
    })(time);
    this.tasks.push(fn);
    return this;
};
_LazyMan.prototype.eat = function(name) {
    var self = this;
    var fn =(function(name){
        return function(){
            console.log('Eat ' + name + '~');
            self.next()
        }
    })(name);
    this.tasks.push(fn);
    return this; // 实现链式调用
};

function LazyMan(name) {
    return new _LazyMan(name);
}
LazyMan('Hank');
// LazyMan('Hank').sleep(1).eat('dinner');