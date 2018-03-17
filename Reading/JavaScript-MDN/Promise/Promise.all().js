/**
 * Created by zdnexus on 2017/3/18 0018.
 */
'use strict';

// Promise.all(iterable);
// Promise.all(iterable) 方法指当所有在可迭代参数中的 promises 已完成，或者第一个传递的 promise（指 reject）失败时，返回 promise。

{
    let p1 = Promise.resolve(3);
    let p2 = 1337;
    let p3 = new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, "foo");
    });

    Promise.all([p1, p2, p3]).then(values => {
        console.log(values); // [3, 1337, "foo"] 
    });
}