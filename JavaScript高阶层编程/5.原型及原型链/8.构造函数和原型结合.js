/**
 * Created by Administrator on 2016/12/31 0031.
 */
'use strict';

function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['ZhangSan', 'LiSi'];
}

Person.prototype = {
    constructor : Person,
    sayName : function(){
        console.log(this.name);
    }
};

var person1 = new Person('Stone', 28, 'Software Engineer');
var person2 = new Person('Sophie', 29, 'English Teacher');

person1.friends.push('WangWu');
console.log(person1.friends);    // 'ZhangSan,LiSi,WangWu'
console.log(person2.friends);    // 'ZhangSan,LiSi'
console.log(person1.friends === person2.friends);    // false
console.log(person1.sayName === person2.sayName);    // true

// 这种构造函数与原型混成的模式，是目前在 JavaScript 中使用最广泛、认同度最高的一种创建自定义类型的方法。
// 可以说，这是用来定义引用类型的一种默认模式。

