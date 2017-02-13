/**
 * Created by Administrator on 2016/12/31 0031.
 */
'use strict';

// 利用原型让一个引用类型继承另一个引用类型的属性和方法。
function GrandFather() {
    this.value1 = 'A';
}
GrandFather.prototype.getValue1 = function () {
    return this.value1;
};

// 构建函数 Father 继承 GrandFather
function Father() {
    this.value2 = 'B';
}
Father.prototype = {}; // Father重写原型对象
Father.prototype.__proto__ = GrandFather.prototype; // Father 原型对象指针指向 GrandFather.prototype，继承 GrandFather 的原型。
GrandFather.call(Father.prototype); // Father 继承 GrandFather的方法和属性。
// Father新增新的方法
Father.prototype.getValue2 = function () {
    return this.value2;
};

// 对象继承
var father = {};
father.__proto__ = Father.prototype;
Father.call(father);
father.getValue1(); // A
father.getValue2(); // B

// 构建函数 Son 继承 Father
function Son() {
    this.value3 = 'C';
}
Son.prototype = {};
Son.prototype.__proto__ = Father.prototype;
Father.call(Son.prototype);
Son.prototype.getValue3 = function () {
    return this.value3;
};

// 对象继承
var son = {};
son.__proto__ = Son.prototype;
Son.call(son); // 继承构造函数的方法和属性
console.log(son.getValue1()); // A
console.log(son.getValue2()); // B
console.log(son.getValue3()); // C
// 继承函数判断
console.log(son.getValue1 === son.__proto__.getValue1); // true
console.log(son.getValue1 === Son.prototype.getValue1); // true

console.log(son.getValue1 === son.__proto__.__proto__.getValue1); // true
console.log(son.getValue1 === Father.prototype.getValue1); // true

console.log(son.getValue1 === son.__proto__.__proto__.__proto__.getValue1); // true
console.log(son.getValue1 === GrandFather.prototype.getValue1); // true