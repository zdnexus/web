/**  * Created by zdnexus on 17/5/7.  */ 'use strict';

const MAX = 5;
if (true) {
    console.log(MAX);
    // const MAX = 5;// 报错
}

// 常量foo储存的是一个地址，这个地址指向一个对象。
// 不可变的只是这个地址，即不能把foo指向另一个地址，
// 但对象本身是可变的，所以依然可以为其添加新属性。
const foo = {};
foo.prop = 1;
console.log(foo.prop);// 1
const foo2 = {prop: 2};
foo2.prop = 3;
console.log(foo2.prop);// 3
// foo = [];// 报错 foo已经是一个对象，不能转换为数组

// 如果真的想将对象冻结，应该使用Object.freeze方法。
const foo3 = Object.freeze({});
// foo3.prop = 123;// 报错