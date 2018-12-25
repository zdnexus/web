/**
 * Created by zdnexus on 17/9/8.
 */
'use strict';

// 挑战一
// 1.定义一个构造函数 Animal，它有一个 name 属性，以及一个 eat() 原型方法。
// 2.eat() 的方法体为：console.log(this.name + ' is eating something.')
// 3.new 一个 Animal 的实例 tiger，然后调用 eat() 方法。
// 4.用 __proto__ 模拟 new Animal() 的过程，然后调用 eat() 方法。
function Animal(name) {
    this.name = name;
}

Animal.prototype.eat = function () {
    console.log(this.name + ' is eating something.');
};

var tiger = new Animal('tiger');
tiger.eat();

// 空对象继承
var tiger = {};
tiger.__proto__ = Animal.prototype;
Animal.call(tiger, 'tiger');
tiger.eat();


// 挑战二
// 1.定义一个构造函数 Bird，它继承自 Animal，它有一个 name 属性，以及一个 fly() 原型方法。
// 2.fly() 的方法体为：console.log(this.name + ' want to fly higher.')
// 3.new 一个 Bird 的实例 pigeon，然后调用 eat() 和 fly() 方法。
// 4.用 __proto__ 模拟 new Bird() 的过程，然后用代码解释 pigeon2 为何能调用 eat() 方法。
function Bird(name) {
    this.name = name;
}

Bird.prototype = new Animal();
Bird.prototype.fly = function () {
    console.log(this.name + ' want to fly higher.');
};

var pigeon = new Bird('pigeon');
pigeon.eat();
pigeon.fly();

var pigeon = {};
pigeon.__proto__ = Bird.prototype;
Bird.call(pigeon, 'pigeon');
pigeon.eat();
pigeon.fly();


// 挑战三
// 1.定义一个构造函数 Swallow，它继承自 Bird，它有一个 name 属性，以及一个 nesting() 原型方法。
// 2.nesting() 的方法体为：console.log(this.name + ' is nesting now.');。
// 3.new 一个 Swallow 的实例 yanzi，然后调用 eat()、fly() 和 nesting() 方法。
// 4.用 __proto__ 模拟 new Swallow() 的过程，然后用代码解释 yanzi2 为何能调用 eat() 方法。
function Swallow(name) {
    this.name = name;
}

Swallow.prototype = new Bird();
Swallow.prototype.nesting = function () {
    console.log(this.name + ' is nesting now.');
};

var yanzi = new Swallow('yanzi');
yanzi.eat();
yanzi.fly();
yanzi.nesting();

var yanzi = {};
yanzi.__proto__ = Swallow.prototype;
Swallow.call(yanzi, 'yanzi');
yanzi.eat();
yanzi.fly();
yanzi.nesting();

// 继承判断
console.log(yanzi.nesting === Swallow.prototype.nesting);   // true
console.log(yanzi.nesting === yanzi.__proto__.nesting);     // true

console.log(yanzi.fly === Bird.prototype.fly);              // true
console.log(yanzi.fly === Swallow.prototype.__proto__.fly); // true
console.log(yanzi.fly === yanzi.__proto__.__proto__.fly);   // true

console.log(yanzi.eat === Animal.prototype.eat);                        // true
console.log(yanzi.eat === Bird.prototype.__proto__.eat);                // true
console.log(yanzi.eat === Swallow.prototype.__proto__.__proto__.eat);   // true
console.log(yanzi.eat === yanzi.__proto__.__proto__.__proto__.eat);     // true