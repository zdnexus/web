/**
 * Created by zdnexus on 17/9/8.
 */
'use strict';

// 由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来，即使是先创建了实例后修改原型也照样如此。

function Person() {
}
var p1 = new Person();
Person.prototype.showStr = function () {
    console.log('Hello World!');
};

// 当我们调用 p1.sayHi() 时，首先会在实例中搜索名为 sayHi 的属性，在没找到的情况下，会继续搜索原型。
// 因为实例与原型之间的连接只不过是一个指针，而非一个副本，因此就可以在原型中找到新的 sayHi 属性并返回保存在那里的函数。
// 即使 person 实例是在添加新方法之前创建的，但它仍然可以访问这个新方法。其原因可以归结为实例与原型之间的松散连接关系。
p1.showStr(); // Hello World!

function Person2() {
}
var p2 = new Person2();
// 调用构造函数时会为实例添加一个指向最初原型的 [[Prototype]] 指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。
Person2.prototype = {
    constructor: Person2,
    showStr: function () {
        console.log('Hello World!');
    }
};
// p2.showStr();  // Uncaught TypeError: p2.showStr is not a function

var p3 = new Person2();
p3.showStr();  // Hello World!