/**
 * Created by zdnexus on 17/9/8.
 */
'use strict';

// 前面例子中每添加一个属性和方法就要敲一遍 Person.prototype。为减少不必要的输入，也为了从视觉上更好地封装原型的功能，
// 更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象。

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.showMsg = function () {
        console.log('实例：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
}

// 我们将 Person.prototype 设置为等于一个以对象字面量形式创建的新对象。最终结果相同，但有一个例外：constructor 属性不再指向 Person 了。
// 前面曾经介绍过，每创建一个函数，就会同时创建它的 prototype 对象，这个对象也会自动获得 constructor 属性。
// 而我们在这里使用的语法，本质上完全重写了默认的 prototype 对象，
// 因此constructor 属性也就变成了新对象的 constructor 属性（指向Object 构造函数），不再指向 Person 函数。
Person.prototype = {
    name: 'Stone',
    age: 28,
    job: 'Software Engineer',
    showMsg: function () {
        console.log('原型：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
};
console.log(Person.prototype.constructor === Person); // false

var p1 = new Person();
p1.showMsg();   // 实例：我的名字叫 Stone，今年28岁，工作是 Software Engineer
delete p1.showMsg;
p1.showMsg();   // 原型：我的名字叫 Stone，今年28岁，工作是 Software Engineer

// instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
console.log(p1 instanceof Object);      // true
console.log(p1 instanceof Person);      // true
// constructor 属性不再指向 Person 了。前面曾经介绍过，每创建一个函数，就会同时创建它的 prototype 对象，
console.log(p1.constructor === Object); // true
console.log(p1.constructor === Person); // false

// constructor 属性指向 Person。
Person.prototype = {
    constructor: Person,
    name: 'Stone',
    age: 28,
    job: 'Software Engineer',
    showMsg: function () {
        console.log('原型：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
};
console.log(Person.prototype.constructor === Person); // true

var p2 = new Person();
console.log(p2 instanceof Object);      // true
console.log(p2 instanceof Person);      // true
console.log(p2.constructor === Object); // false
console.log(p2.constructor === Person); // true

// 重设构造函数，只适用于 ECMAScript 5 兼容的浏览器
Person.prototype = {
    name: 'Stone',
    age: 28,
    job: 'Software Engineer',
    showMsg: function () {
        console.log('原型：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
};
Object.defineProperty(Person.prototype, 'constructor', {
    enumerable: false,
    value: Person
});

var p3 = new Person();
console.log(p3 instanceof Object);      // true
console.log(p3 instanceof Person);      // true
console.log(p3.constructor === Object); // false
console.log(p3.constructor === Person); // true