/**
 * Created by Administrator on 2016/12/31 0031.
 */
'use strict';

function Person() {
}

Person.prototype = {
    constructor: Person,
    name: 'A',
    age: '3',
    job: 'Baby',
    friends: ['ZhangSan', 'LiSi'],
    sayPerson: function () {
        console.log('原型：我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
};

var person1 = new Person();
var person2 = new Person();

person1.friends.push('WangWu');

console.log(person1.friends);//'ZhangSan,LiSi,WangWu'
console.log(person2.friends);//'ZhangSan,LiSi,WangWu'
console.log(person1.friends === person2.friends);  // true


