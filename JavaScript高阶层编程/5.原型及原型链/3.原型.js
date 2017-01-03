/**
 * Created by Administrator on 2016/12/28 0028.
 */
'use strict';

function Person() {
}
// 在默认情况下，所有原型对象都会自动获得一个 constructor（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针。
console.log(Person.prototype.constructor == Person);//true

Person.prototype.name = 'A';
Person.prototype.age = 28;
Person.prototype.job = 'Sale Engineer';
Person.prototype.sayPerson = function () {
    console.log('我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
};

var person1 = new Person('A', 28, 'Sale Engineer');
var person2 = new Person('B', 25, 'Software Engineer');
person1.sayPerson();//我的名字叫A，今年28岁，工作是Sale Engineer
person2.sayPerson();//我的名字叫B，今年25岁，工作是Software Engineer

// 问题：call和apply无法调用prototype函数。
// 在另一个对象的作用域中call调用：
var person3 = new Object();
Person.call(person3, 'C', 22, 'Student Engineer');
console.log(person3.name);//C
// person3.sayPerson(); //TypeError: person3.sayPerson is not a function

// 在另一个对象的作用域中apply调用：
var person4 = new Object();
Person.apply(person4, ['D', 3, 'Baby']);
// person4.sayPerson();//TypeError: person4.sayPerson is not a function

// 新对象具有相同的属性和方法，相同的内存地址，没有浪费内存空间。
console.log(person1.sayPerson == person2.sayPerson);//true
console.log(person1.sayPerson == person3.sayPerson);//false person3.sayPerson是undefined
console.log(person2.sayPerson == person3.sayPerson);//false

