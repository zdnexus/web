'use strict';

class Animal {
    // 构造方法，实例化的时候将会被调用，如果不指定，那么会有一个不带参数的默认构造函数.
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    // toString 是原型对象上的属性
    toString() {
        console.log('name:' + this.name + ',color:' + this.color);
    }
}

var animal = new Animal('dog', 'white');
console.log(animal);// Animal { name: 'dog', color: 'white' }
animal.toString();// name:dog,color:white

console.log(animal.hasOwnProperty('name')); //true
console.log(animal.hasOwnProperty('toString')); // false
console.log(animal.__proto__.hasOwnProperty('toString')); // true

class Cat extends Animal {
    constructor(action) {
        // 子类必须要在constructor中指定super 方法，否则在新建实例的时候会报错.
        // 如果没有置顶consructor,默认带super方法的constructor将会被添加、
        super('cat', 'white');
        this.action = action;
    }

    toString() {
        console.log(super.toString());
    }
}

var cat = new Cat('catch');
console.log(cat);// Cat { name: 'cat', color: 'white', action: 'catch' }
cat.toString();// name:cat,color:white

// 实例cat 是 Cat 和 Animal 的实例，和Es5完全一致。
console.log(cat instanceof Cat); // true
console.log(cat instanceof Animal); // true
console.log(Cat.__proto__ === Animal); // true (子类的 __proto__ 属性，表示构造函数的继承，总是指向父类。)
console.log(Cat.prototype.__proto__ === Animal.prototype); // true (子类的 prototype 的 __proto__ 属性表示方法的继承，总是指向父类的 prototype 属性。)

