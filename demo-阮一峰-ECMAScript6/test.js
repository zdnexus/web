'use strict';

class Person {
    // 构造函数，实例化的时候将会被调用，如果不指定，那么会有一个不带参数的默认构造函数.
    constructor(name) {
        this.name = name;
    }

    // printout 是原型对象上的方法(函数)
    personPrintOut() {
        console.log('name:' + this.name);
    }
}
// console.log(Animal('A',50));//ERROR Class constructor Animal cannot be invoked without 'new'
var A = new Person('A');
A.personPrintOut();

// 继承
class People extends Person {
    constructor(name, age) { //构造函数
        super(name);    //调用父类构造函数
        this.age = age;
    }

    peoplePrintOut() {
        console.log('name:' + this.name + ',age:' + this.age);
    }
}
var B = new People('B', 20);
B.peoplePrintOut();

//继承
class human extends People {
    constructor(height) { //构造函数
        super(height);    //调用父类构造函数
        this.height = height;
    }

    humanPrintOut() {
        console.log('name:' + this.name + ',age:' + this.age + ',height:' + this.height);
    }
}
var C = new human('c', 20, 200);
C.humanPrintOut();

//继承
class X extends People {
    constructor(...args) { //构造函数
        super(...args);    //调用父类构造函数
    }

    humanPrintOut() {
        console.log('name:' + this.name + ',age:' + this.age + ',height:' + this.height + ',x: ' + x);
    }
}
var D = new X('c', 20, 200, 400);
D.humanPrintOut();