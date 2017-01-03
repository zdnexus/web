/**
 * Created by Administrator on 2016/12/28 0028.
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
    this.sayPerson = function () {
        console.log('实例：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
}

// 我们创建的每个函数都有一个 prototype（原型）属性。使用原型的好处是可以让所有对象实例共享它所包含的属性和方法。
// 不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型中。
Person.prototype.name = 'A';
Person.prototype.age = '3';
Person.prototype.job = 'Baby';
Person.prototype.sayPerson = function () {
    console.log('原型：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
};

var person1 = new Person();
console.log(person1);//Person { sayPerson: [Function] }
console.log(person1.name);//A
console.log(person1.age);//3
console.log(person1.job);//Baby

person1.name = 'B';
// 当访问person1.name 时，需要读取它的值。因此就会在这个实例上搜索一个名为name的属性，这个属性确实存在，于是就返回它的值而不必再搜索原型了。
console.log(person1.name);//B，实例取值
delete person1.name;
console.log(person1.name);//A，原型取值
delete person1.name;
// 还是显示原型name的值。说明delete只能删掉实例的属性，不能删掉原型的属性，此次删除没有效果。
console.log(person1.name);//A，原型取值

person1.sayPerson();//实例：我的名字叫A，今年3岁，工作是Baby
delete person1.sayPerson;
person1.sayPerson();//原型：我的名字叫A，今年3岁，工作是Baby
delete person1.sayPerson;
// 还是显示原型sayPerson()输出的值。说明delete只能删掉实例的属性，不能删掉原型的属性，此次删除没有效果。
person1.sayPerson();//原型：我的名字叫A，今年3岁，工作是Baby

var person2 = new Person('C', '25', '');
console.log(person2);//Person { name: 'C', age: '25', sayPerson: [Function] }
console.log(person2.name);//C
console.log(person2.age);//25
// 当访问person2.job 时，需要读取job的值，会先在实例的属性读取job的值。构建函参中job是undefined，没有被赋值。
// 这个属性不存在，于是就返回原型job的值
console.log(person2.job);//Baby
person2.sayPerson();//实例：我的名字叫C，今年25岁，工作是Baby
person2.job = 'Psychic Engineer';
person2.sayPerson();//实例：我的名字叫C，今年25岁，工作是Psychic Engineer
delete person2.job;
person2.sayPerson();//实例：我的名字叫C，今年25岁，工作是Baby