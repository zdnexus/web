/**
 * Created by zdnexus on 17/8/31.
 */
// 'use strict';

// 函数还有一种用法，就是把它作为构造函数使用。像 Object 和 Array 这样的原生构造函数，在运行时会自动出现在执行环境中。
// 此外，也可以创建自定义的构造函数，从而自定义对象类型的属性和方法。

// 构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。
// 这个做法借鉴自其他面向对象语言，主要是为了区别于 JavaScript 中的其他函数；
// 因为构造函数本身也是函数，只不过可以用来创建对象而已。

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.showMsg = function () {
        console.log('我的名字叫' + this.name + '，今年' + this.age + '岁，职业是' + this.job);
    };
    // 与声明函数在逻辑上是等价的：
    // this.showMsg = new Function('console.log("我的名字叫" + this.name + "，今年" + this.age + "岁，职业是" + this.job)');
}

// 要创建 Person 的新实例，必须使用 new 操作符。
// 1.创建一个新对象；
// 2.将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
// 3.执行构造函数中的代码（为这个新对象添加属性）；
// 4.返回新对象。

// 任何函数，只要通过 new 操作符来调用，那它就可以作为构造函数；
var p1 = new Person('Stone', 28, 'Software Engineer');
p1.showMsg(); // 我的名字叫 Stone，今年28岁，职业是 Software Engineer

// 如果不通过 new 操作符来调用，那它跟普通函数也不会有什么两样：（注意 strict 严格模式）
Person('Sophie', 29, 'English Teacher');  // 添加到 window
showMsg();          // 我的名字叫Sophie，今年29岁，职业是English Teacher
window.showMsg();   // 我的名字叫Sophie，今年29岁，职业是English Teacher

// 在另一个对象的作用域中call调用：
var p2 = new Object();
Person.call(p2, 'Tommy', 17, 'Student');
console.log(p2.name);  // Tommy
console.log(p2.age);   // 17
console.log(p2.job);   // Student
p2.showMsg();          // 我的名字叫 Tommy，今年17岁，职业是 Student

// 在另一个对象的作用域中apply调用：
var p3 = new Object();
Person.apply(p3, ['Kobe', 13, 'Basketball player']);
console.log(p3.name);  // Kobe
console.log(p3.age);   // 13
console.log(p3.job);   // Basketball player
p3.showMsg();          // 我的名字叫 Kobe，今年13岁，职业是 Basketball player

// 构造函数的不足：
// 构造函数模式虽然好用，但也并非没有缺点。
// 使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。
// 每个 Person 实例都包含一个不同的 Function 实例（showMsg() 方法）。
// 以这种方式创建函数，虽然创建 Function 新实例的机制仍然是相同的，但是不同实例上的同名函数是不相等的，在不同的内存地址，浪费内存空间。
console.log(p1.showMsg == p2.showMsg == p3.showMsg);    // false
// 函数也是对象，比较对象的就是比较内存地址
// number 和 string 不是对象，只比较内容