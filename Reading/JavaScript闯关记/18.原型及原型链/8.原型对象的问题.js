/**
 * Created by aa on 17/9/8.
 */
'use strict';

// 原型模式也不是没有缺点。首先，它省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。
// 虽然这会在某种程度上带来一些不方便，但还不是原型的最大问题。原型模式的最大问题是由其共享的本性所导致的。
// 原型中所有属性是被很多实例共享的，这种共享对于函数非常合适。

function Person() {
}

Person.prototype = {
    constructor: Person,
    name: 'Stone',
    age: 28,
    job: 'Software Engineer',
    friends: ['ZhangSan', 'LiSi'],
    showMsg: function () {
        console.log('我的名字叫' + this.name + '，今年' + this.age + '岁，工作是' + this.job);
    }
};

var p1 = new Person();
var p2 = new Person();

p1.friends.push('WangWu');

console.log(p1.friends);   // ['ZhangSan','LiSi','WangWu']
console.log(p2.friends);   // ['ZhangSan','LiSi','WangWu']
// 由于 friends 数组存在于 Person.prototype 而非 person1 中，
// 所以刚刚提到的修改也会通过 person2.friends（与 person1.friends 指向同一个数组）反映出来。
// 共享数组
console.log(p1.friends === p2.friends);   // true