/**
 * Created by aa on 17/9/6.
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
    this.showMsg = function () {
        console.log('实例：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
}
Person.prototype.name = 'Stone';
Person.prototype.age = 28;
Person.prototype.job = 'Software Engineer';
Person.prototype.showMsg = function () {
    console.log('原型：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
};

// 在默认情况下，所有原型对象都会自动获得一个 constructor（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针。
console.log(Person.prototype.constructor == Person);    // true

var p1 = new Person();
console.log(p1.name);  // Stone
console.log(p1.age);   // 28
console.log(p1.job);   // Software Engineer
p1.showMsg();          // 原型：我的名字叫 Stone，今年28岁，工作是 Software Engineer

p1.name = 'Sophie';
// 当访问 person1.name 时，需要读取它的值。因此就会在这个实例上搜索一个名为 name 的属性，这个属性确实存在，于是就返回它的值而不必再搜索原型了。
console.log(p1.name);  // Sophie（来自实例）
// 把它删除以后，就恢复了对原型中 name 属性的连接。因此，接下来再调用 person1.name 时，返回的就是原型中 name 属性的值了。
delete p1.name;
console.log(p1.name);  // Stone（来自原型）
//  delete 只能删掉实例的属性，不能删掉原型的属性
delete p1.name;
console.log(p1.name);  // Stone（来自原型）

p1.showMsg();    // 实例：我的名字叫 Stone，今年28岁，工作是 Software Engineer
delete p1.showMsg;
p1.showMsg();    // 原型：我的名字叫 Stone，今年28岁，工作是 Software Engineer
delete p1.showMsg;
p1.showMsg();    // 原型：我的名字叫 Stone，今年28岁，工作是 Software Engineer