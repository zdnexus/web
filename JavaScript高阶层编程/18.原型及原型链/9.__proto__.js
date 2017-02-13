/**
 * Created by Administrator on 2016/12/31 0031.
 */
'use strict';

function Person(name) {
    this.name = name;
}
Person.prototype.sayPerson = function () {
    console.log('My name is ' + this.name);
};
// 为什么在构造函数的 prototype 中定义了属性和方法，它的实例中就能访问呢？
// 那是因为当调用构造函数创建一个新实例后，该实例的内部将包含一个指针__proto__，指向构造函数的原型。
var person1 = new Person('A');
person1.sayPerson(); // My name is A
console.log(person1.__proto__ === Person.prototype); // true

var person2 = {}; // person2 为新的空对象
person2.__proto__ = Person.prototype; // person2 的指针 __proto__ 指向构造函数 Person 的原型
person2.sayPerson(); // My name is undefined // person2 直接调用 Person 的 sayPerson 原型，但是 person2 没有 name 属性。
Person.call(person2, 'B'); // person2 添加自己的属性。
person2.sayPerson(); // My name is B
console.log(person2.__proto__ === Person.prototype); // true
// 简单来说，当我们访问一个对象的属性时，
// 如果这个属性不存在，那么就会去__proto__ 里找，这个 __proto__ 又会有自己的 __proto__，
// 于是就这样一直找下去，直到找到为止。在找不到的情况下，搜索过程总是要一环一环地前行到原型链末端才会停下来。