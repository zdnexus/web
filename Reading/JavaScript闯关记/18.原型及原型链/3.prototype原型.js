/**
 * Created by zdnexus on 17/9/1.
 */
'use strict';

// 我们创建的每个函数都有一个 prototype（原型）属性。使用原型的好处是可以让所有新对象实例共享它所包含的属性和方法。
// 换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型中。

function Person() {
}
Person.prototype.name = 'Stone';
Person.prototype.age = 28;
Person.prototype.job = 'Software Engineer';
Person.prototype.showMsg = function () {
    console.log('我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
};

var p1 = new Person();
var p2 = new Person();
p1.showMsg();    // 我的名字叫Stone，今年28岁，工作是Software Engineer
p2.showMsg();    // 我的名字叫Stone，今年28岁，工作是Software Engineer
console.log(p1.showMsg == p2.showMsg);

// 问题：call和apply无法调用 prototype 属性和方法。
// 在另一个对象的作用域中call调用：
var p3 = new Object();
Person.call(p3);
console.log(p3.name); // undefined
console.log(p3.showMsg); // undefined

// 在另一个对象的作用域中apply调用：
var p4 = new Object();
Person.apply(p4);
console.log(p4.name); // undefined
console.log(p4.showMsg); // undefined

console.log(p3.showMsg == p4.showMsg); // true -> undefined === undefined