/**
 * Created by aa on 17/9/8.
 */
'use strict';

function Person(name) {
    if (name) {
        this.name = name;
    }
}
Person.prototype.sayName = function () {
    console.log('My name is ' + this.name);
};
var p1 = new Person('nexus');
p1.sayName(); // My name is nexus
// 为什么在构造函数的 prototype 中定义了属性和方法，它的实例中就能访问呢？
// 那是因为当调用构造函数创建一个新实例后，该实例的内部将包含一个指针 __proto__，指向构造函数的原型。
console.log(p1.__proto__ === Person.prototype); // true

// 先创建了一个空对象 p2，然后把 p2.__proto__ 指向了 Person 的原型对象，便继承了 Person 原型对象中的所有属性和方法，
// 最后又以 p2 为作用域执行了 Person 函数，p2 便就拥有了 Person 的所有属性和方法。(继承)
// 这个过程和 var p2 = new Person(); 完全一样。
var p2 = {}; // p2 为空对象
p2.__proto__ = Person.prototype; // p2 的指针 __proto__ 指向构造函数 Person 的原型
p2.sayName(); // My name is undefined
Person.call(p2, 'nexus'); // 改变 p2 的属性。
p2.sayName(); // My name is nexus
console.log(p2.__proto__ === Person.prototype); // true

// 简单来说，当我们访问一个对象的属性时，
// 如果这个属性不存在，那么就会去__proto__ 里找，这个 __proto__ 又会有自己的 __proto__，
// 于是就这样一直找下去，直到找到为止。在找不到的情况下，搜索过程总是要一环一环地前行到原型链末端才会停下来。