/**
 * Created by zdnexus on 17/9/8.
 */
'use strict';

// 利用原型让一个引用类型继承另一个引用类型的属性和方法。

// 构建函数 GrandFather
function GrandFather() {
    this.value = 'GrandFather';
}
GrandFather.prototype.getValue = function () {
    return this.value;
};
// 对象继承 GrandFather
var grandFather = {};
grandFather.__proto__ = GrandFather.prototype;
GrandFather.call(grandFather);
console.log(grandFather.getValue()); // GrandFather

// 构建函数 Father 继承 GrandFather
function Father() {
    this.value2 = 'Father';
}
// 函数 Father 继承 GrandFather
Father.prototype = {};
// Father 原型对象指针指向 GrandFather.prototype，拥有 GrandFather 的原型对象
Father.prototype.__proto__ = GrandFather.prototype;
// Father 原型对象继承 GrandFather 作用域的方法和属性。
GrandFather.call(Father.prototype);
// Father 添加新的原型方法
Father.prototype.getValue2 = function () {
    return this.value2;
};
// 对象继承 Father
var father = {};
father.__proto__ = Father.prototype;
Father.call(father);
console.log(father.getValue());     // GrandFather
console.log(father.getValue2());    // Father

// 函数 Son 继承 Father
function Son() {
    this.value3 = 'Son';
}
// 对象继承 Son
Son.prototype = {};
// Son 原型对象指针指向 Father.prototype，拥有 Father 的原型对象
Son.prototype.__proto__ = Father.prototype;
// Son 原型对象继承 Father 作用域的方法和属性。
Father.call(Son.prototype);
// Son 添加新的原型方法
Son.prototype.getValue3 = function () {
    return this.value3;
};
// 对象继承 Son
var son = {};
son.__proto__ = Son.prototype;
Son.call(son); // 继承构造函数的方法和属性
console.log(son.getValue());    // GrandFather
console.log(son.getValue2());   // Father
console.log(son.getValue3());   // Son

// 继承判断
console.log(son.getValue3 === Son.prototype.getValue3); // true
console.log(son.getValue3 === son.__proto__.getValue3); // true

console.log(son.getValue2 === Father.prototype.getValue2);          // true
console.log(son.getValue2 === Son.prototype.__proto__.getValue2);   // true
console.log(son.getValue2 === son.__proto__.__proto__.getValue2);   // true

console.log(son.getValue === GrandFather.prototype.getValue);               // true
console.log(son.getValue === Father.prototype.__proto__.getValue);          // true
console.log(son.getValue === Son.prototype.__proto__.__proto__.getValue);   // true
console.log(son.getValue === son.__proto__.__proto__.__proto__.getValue);   // true