/**  * Created by zdnexus on 17/5/7.  */ 'use strict';

// ES5规格
var arr = [1, 21, 33];
arr.map(function (item, index) {
    console.log(index + " " + item);
    return item + 1;
});
console.log(arr);// [13,21,33] (QQQ) 没有增加1 ,map函数怎么用？
// ES6规格
const arr2 = [1, 3, 7];
arr2.map((item, index)=> {
    console.log(index + " " + item);
    return item + 1;
});
console.log(arr2);// [1,3,7]


// ES5规格
var temp = [];
arr.forEach(function (item) {
    if (item === 1) {
        temp.push(item);
    }
});
console.log(temp);
// ES6规格
var temp2 = [];
arr2.forEach(item=> {
    if (item === 1) {
        temp2.push(item);
    }
});
console.log(temp2);


// ES5规格
var bob = {
    name: 'test',
    friends: ['aaa', 'bbb'],
    print: function () {
        var _this = this;
        this.friends.forEach(function (item) {
            console.log(_this.name + ' konows ' + item);
        });
    }
};
bob.print();
// ES6规格
var bob2 = {
    name: 'test',
    friends: ['ccc', 'ddd'],
    print: function () {
        this.friends.forEach(item=> {
            console.log(this.name + ' konows ' + item);// (QQQ) 这个this不是很懂,它拥有词法作用域的this值???
        });
    }
};
bob2.print();