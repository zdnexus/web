/**
 * Created by Administrator on 2016/12/31 0031.
 */
'use strict';

// 挑战一
// 1.定义一个构造函数 Animal，它有一个 name 属性，以及一个 eat() 原型方法。
// 2.eat() 的方法体为：console.log(this.name + ' is eating something.')。
// 3.new 一个 Animal 的实例 tiger，然后调用 eat() 方法。
// 4.用 __proto__ 模拟 new Animal() 的过程，然后调用 eat() 方法。
var Animal = function (name) {
    this.name = name;
};
Animal.prototype.eat = function () {
    console.log(this.name + ' is eating something');
};

var tiger = new Animal('tiger');
tiger.eat(); // tiger is eating something

var tiger2 = {};
tiger2.__proto__ = Animal.prototype;
Animal.call(tiger2, 'tiger2');
tiger2.eat(); // tiger2 is eating something


// 挑战二
// 1.定义一个构造函数 Bird，它继承自 Animal，它有一个 name 属性，以及一个 fly() 原型方法。
// 2.fly() 的方法体为：console.log(this.name + ' want to fly higher.');。
// 3.new 一个 Bird 的实例 pigeon，然后调用 eat() 和 fly() 方法。
// 4.用 __proto__ 模拟 new Bird() 的过程，然后用代码解释 pigeon2 为何能调用 eat() 方法。
var Bird = function (name) {
    this.name = name;
};
Bird.prototype = new Animal();
Bird.prototype.fly = function () {
    console.log(this.name + ' want to fly higher');
};

var pigeon = new Bird('pigeon');
pigeon.eat(); // pigeon is eating something
pigeon.fly(); // pigeon want to fly higher

var pigeon2 = {};
pigeon2.__proto__ = Bird.prototype;
Bird.call(pigeon2, 'pigeon2');
pigeon2.eat(); // pigeon2 is eating something
pigeon2.fly(); // pigeon2 want to fly higher


// 挑战三
// 1.定义一个构造函数 Swallow，它继承自 Bird，它有一个 name 属性，以及一个 nesting() 原型方法。
// 2.nesting() 的方法体为：console.log(this.name + ' is nesting now.');。
// 3.new 一个 Swallow 的实例 yanzi，然后调用 eat()、fly() 和 nesting() 方法。
// 4.用 __proto__ 模拟 new Swallow() 的过程，然后用代码解释 yanzi2 为何能调用 eat() 方法。
var Swallow = function (name) {
    this.name = name;
};
Swallow.prototype = {};
Swallow.prototype.__proto__ = Bird.prototype;
Bird.call(Swallow.prototype);
Swallow.prototype.nesting = function () {
    console.log(this.name + ' is nesting now');
};

var yanzi = new Swallow('yanzi');
yanzi.eat(); // yanzi is eating something
yanzi.fly(); // yanzi want to fly higher
yanzi.nesting(); // yanzi is nesting now

var yanzi2 = {};
yanzi2.__proto__ = Swallow.prototype;
Swallow.call(yanzi2, 'yanzi2');
yanzi2.eat(); // yanzi2 is eating something
yanzi2.fly(); // yanzi2 want to fly higher
yanzi2.nesting(); // yanzi2 is nesting now