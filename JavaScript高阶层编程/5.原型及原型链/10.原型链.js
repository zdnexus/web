/**
 * Created by Administrator on 2016/12/31 0031.
 */
'use strict';

// 利用原型让一个引用类型继承另一个引用类型的属性和方法。
function GrandFather() {
    this.value1 = 'A';
}
GrandFather.prototype.getValue = function () {
    return this.value1;
};

function Father() {
    this.value2 = 'B';
}
// Father 继承 GrandFather。
Father.prototype = new GrandFather(); // 实现的本质是重写原型对象，Father.prototype 被重写，代之以一个新类型的实例。
Father.prototype.getValue2 = function () {
    return this.value2;
};

var father = new Father();
console.log(father.getValue()); // A
console.log(father.getValue2()); // B

function Son() {
    this.value3 = 'C';
}
// Son 继承 Father。
Son.prototype = new Father(); // 实现的本质是重写原型对象，Son.prototype 被重写，代之以一个新类型的实例。
Son.prototype.getValue3 = function () {
    return this.value3;
};

var son = new Son();
console.log(son.getValue()); // A
console.log(son.getValue2()); // B
console.log(son.getValue3()); // C
console.log(son.value1); // A
delete son.value1;
console.log(son.value1); // A