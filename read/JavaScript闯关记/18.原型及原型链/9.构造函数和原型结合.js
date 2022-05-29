/**
 * Created by zdnexus on 17/9/8.
 */
'use strict';

// 构造函数用于定义实例属性，而原型用于定义方法和共享的属性。
// 结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存

// 构造函数添加实例属性
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["ZhangSan", "LiSi"];
}

// 原型用于定义方法和共享的属性
Person.prototype = {
    constructor: Person,
    showMsg: function () {
        console.log('我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
};

var p1 = new Person();
var p2 = new Person();

// 修改了 p1.friends（向其中添加一个新字符串），并不会影响到 p2.friends，因为它们分别引用了不同的数组。
p1.friends.push('WangWu');
console.log(p1.friends);                // ['ZhangSan','LiSi','WangWu']
console.log(p2.friends);                // ['ZhangSan','LiSi']
console.log(p1.friends === p2.friends); // false
console.log(p1.showMsg === p2.showMsg); // true

// 这种构造函数与原型混成的模式，是目前在 JavaScript 中使用最广泛、认同度最高的一种创建自定义类型的方法。
// 可以说，这是用来定义引用类型的一种默认模式。