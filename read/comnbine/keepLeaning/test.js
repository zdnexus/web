/**
 * Created by zdnexus on 17/5/24.
 */


// function f1() {
//
// }
// console.log(f1.name);

// var f2 = function () {
//
// };
// console.log(f2.name);

// var person = function () {
//     var name = 'true';
//     this.name = 'false';
//     return {
//         getName: function () {
//             return name;
//         },
//         setName: function (newName) {
//             name = newName;
//         }
//     }
// };
// console.log(person.name);


// var arr = [1, 1, 2, 2, 3,3,4,4,5,5,6];
// var newArr = [];
// var hash = [];
// for (var i = 0, length = arr.length; i < length; ++i) {
//     if (!hash[arr[i]]) {
//         newArr.push(arr[i]);
//         hash[arr[i]] = true;
//     }
// }
// console.log(newArr)


// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//
//     toString() {
//         return '(' + this.x + ', ' + this.y + ')';
//     }
// }
//
// var p = new Point(1,2);
// console.log(p.toString());


// 挑战一
// 1.定义一个构造函数 Animal，它有一个 name 属性，以及一个 eat() 原型方法。
// 2.eat() 的方法体为：console.log(this.name + ' is eating something.')。
// 3.new 一个 Animal 的实例 tiger，然后调用 eat() 方法。
// 4.用 __proto__ 模拟 new Animal() 的过程，然后调用 eat() 方法。
var Animal = function(name){
    // 待补充的代码
    this.name = name;
};
Animal.prototype.eat = function () {
    console.log(this.name + ' is eating something.');
};
var tiger = new Animal('tiger');
// 待补充的代码
tiger.eat();
var tiger2 = {};
// 待补充的代码
tiger2.__proto__ = Animal.prototype;
Animal.call(tiger2,'tiger2');
tiger2.eat();


// 挑战二
// 1.定义一个构造函数 Bird，它继承自 Animal，它有一个 name 属性，以及一个 fly() 原型方法。
// 2.fly() 的方法体为：console.log(this.name + ' want to fly higher.');。
// 3.new 一个 Bird 的实例 pigeon，然后调用 eat() 和 fly() 方法。
// 4.用 __proto__ 模拟 new Bird() 的过程，然后用代码解释 pigeon2 为何能调用 eat() 方法。
var Bird = function(name){
    // 待补充的代码
    this.name = name;
};
Bird.prototype = new Animal();
Bird.prototype.fly = function () {
    console.log(this.name + ' want to fly higher.');
};
var pigeon = new Bird('pigeon');
// 待补充的代码
pigeon.eat();
pigeon.fly();
var pigeon2 = {};
// 待补充的代码
pigeon2.__proto__= Bird.prototype;
Bird.call(pigeon2,'pigeon2');
pigeon2.eat();
pigeon2.fly();


// 挑战三
// 1.定义一个构造函数 Swallow，它继承自 Bird，它有一个 name 属性，以及一个 nesting() 原型方法。
// 2.nesting() 的方法体为：console.log(this.name + ' is nesting now.');。
// 3.new 一个 Swallow 的实例 yanzi，然后调用 eat()、fly() 和 nesting() 方法。
// 4.用 __proto__ 模拟 new Swallow() 的过程，然后用代码解释 yanzi2 为何能调用 eat() 方法。
var Swallow = function(name){
    // 待补充的代码
    this.name = name;
};
Swallow.prototype = new Bird();
Swallow.prototype.nesting = function () {
    console.log(this.name + ' is nesting now.');
};
var yanzi = new Swallow('yanzi');
// 待补充的代码
yanzi.eat();
yanzi.fly();
yanzi.nesting();
var yanzi2 = {};
// 待补充的代码
yanzi2.__proto__ = Swallow.prototype;
Swallow.call(yanzi2,'yanzi2');
yanzi2.eat();
yanzi2.fly();
yanzi2.nesting();