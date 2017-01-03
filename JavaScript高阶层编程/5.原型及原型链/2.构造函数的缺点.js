/**
 * Created by Administrator on 2016/12/28 0028.
 */
'use strict';

// 构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。
// 这个做法借鉴自其他面向对象语言，主要是为了区别于 JavaScript 中的其他函数；
// 因为构造函数本身也是函数，只不过可以用来创建对象而已。
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayPerson = function () {
        console.log('我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    };
    // 与声明函数在逻辑上是等价的：
    // this.sayPerson = new Function("'我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job");
}

// 要创建 Person 的新实例，必须使用 new 操作符。
// 1.创建一个新对象；
// 2.将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
// 3.执行构造函数中的代码（为这个新对象添加属性）；
// 4.返回新对象。
// 任何函数，只要通过new 操作符来调用，那它就可以作为构造函数；
var person1 = new Person('A', 28, 'Sale Engineer');
var person2 = new Person('B', 25, 'Software Engineer');
person1.sayPerson();//我的名字叫A，今年28岁，工作是Sale Engineer
person2.sayPerson();//我的名字叫B，今年25岁，工作是Software Engineer

// 如果不通过new 操作符来调用，那它跟普通函数也不会有什么两样：
// Person('A', 28, 'Sale Engineer');//TypeError: Cannot set property 'name' of undefined

// 在另一个对象的作用域中call调用：
var person3 = new Object();
Person.call(person3, 'C', 22, 'Student');
person3.sayPerson();//我的名字叫C，今年22岁，工作是Student

// 在另一个对象的作用域中apply调用：
var person4 = new Object();
Person.apply(person4, ['D', 3, 'Baby']);
person4.sayPerson();//我的名字叫D，今年3岁，工作是Baby

// 构造函数的问题
// 构造函数模式虽然好用，但也并非没有缺点。
// 使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。
// 每个 Person 实例都包含一个不同的 Function 实例（sayPerson() 方法）。
// 虽然创建 Function 新实例的机制仍然是相同的，但是不同实例上的同名函数是不相等的，在不同的内存地址，浪费内存空间。
console.log(person1.sayPerson == person2.sayPerson);//false
console.log(person1.sayPerson == person3.sayPerson);//false
console.log(person2.sayPerson == person3.sayPerson);//false