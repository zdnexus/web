/**
 * Created by zdnexus on 17/9/8.
 */
'use strict';

// 每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。

// 利用原型让一个引用类型继承另一个引用类型的属性和方法。
function GrandFather() {
    this.value = 'GrandFather';
}
GrandFather.prototype.getValue = function () {
    return this.value;
};
var grandFather = new GrandFather();
console.log(GrandFather.prototype.constructor === GrandFather); // true
console.log(grandFather.__proto__ === GrandFather.prototype);   // true
console.log(grandFather.getValue());                            // GrandFather

// Father 继承 GrandFather。
function Father() {
    this.value2 = 'Father';
}
// 实现的本质是重写原型对象，Father.prototype 被重写，代之以一个新类型的实例。
Father.prototype = new GrandFather();
// 新添加原型函数
Father.prototype.getValue2 = function () {
    return this.value2;
};
var father = new Father();
console.log(father.getValue());     // GrandFather
console.log(father.getValue2());    // Father

// Son 继承 Father
function Son() {
    this.value3 = 'Son';
}
// 实现的本质是重写原型对象，Son.prototype 被重写，代之以一个新类型的实例。
Son.prototype = new Father();
// 新添加原型函数
Son.prototype.getValue3 = function () {
    return this.value3;
};
var son = new Son();
console.log(son.getValue());    // GrandFather
console.log(son.getValue2());   // Father
console.log(son.getValue3());   // Son