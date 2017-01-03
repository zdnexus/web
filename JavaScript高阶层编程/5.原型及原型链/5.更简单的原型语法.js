/**
 * Created by Administrator on 2016/12/28 0028.
 */
'use strict';

function Person(name, age, job) {
    if (name) {
        this.name = name;
    }
    if (age) {
        this.age = age;
    }
    if (job) {
        this.job = job;
    }
    this.sayPerson = function () {
        console.log('实例：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
}

console.log(Person.prototype.constructor);//[Function: Person]

Person.prototype = {
    name: 'A',
    age: '3',
    job: 'Baby',
    sayPerson: function () {
        console.log('原型：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
};
// constructor 属性不再指向 Person 了。
// 前面曾经介绍过，每创建一个函数，就会同时创建它的 prototype 对象，这个对象也会自动获得 constructor 属性。
// 而我们在这里使用的语法，本质上完全重写了默认的 prototype 对象，
// 因此constructor 属性也就变成了新对象的 constructor 属性（指向Object 构造函数），不再指向 Person 函数。
console.log(Person.prototype.constructor);//[Function: Object]

var person1 = new Person();
person1.sayPerson();//实例：我的名字叫A，今年3岁，工作是Baby
delete person1.sayPerson;
person1.sayPerson();//原型：我的名字叫A，今年3岁，工作是Baby
delete person1.sayPerson;
person1.sayPerson();//原型：我的名字叫A，今年3岁，工作是Baby

// instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
console.log(person1 instanceof Object);//true
console.log(person1 instanceof Person);//true

// constructor 属性不再指向 Person 了。前面曾经介绍过，每创建一个函数，就会同时创建它的 prototype 对象，
console.log(person1.constructor === Object);//true
console.log(person1.constructor === Person);//false

Person.prototype = {
    constructor: Person,
    name: 'A',
    age: '3',
    job: 'Baby',
    sayPerson: function () {
        console.log('原型：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
};
var person2 = new Person();
console.log(person2.constructor === Object);//false
console.log(person2.constructor === Person);//true

Person.prototype = {
    name: 'A',
    age: '3',
    job: 'Baby',
    sayPerson: function () {
        console.log('原型：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
};
// 重设构造函数，只适用于 ECMAScript 5 兼容的浏览器
Object.defineProperty(Person.prototype, 'constructor', {
    enumerable: false,
    value: Person
});
var person3 = new Person();
console.log(person3.constructor === Object);//false
console.log(person3.constructor === Person);//true