/**
 * Created by Administrator on 2017/3/18 0018.
 */
'use strict';

// Promise.resolve(value);
// Promise.resolve(promise);
// Promise.resolve(thenable);

// value
//      用来解析待返回 promise 对象的参数。既可以是一个 promise 对象，也可以是一个 thenable。

// 静态方法 Promise.resolve 返回一个 promise 对象，这个 promise 对象是被解析后（resolved）的。

// Promise.resolve(value) 方法返回一个以给定值解析后的 Promise 对象。
// 但如果这个值是个 thenable（即带有then方法），返回的 promise 会“跟随”这个 thenable 的对象，
// 采用它的最终状态（指resolved/rejected/pending/settled）；否则以该值为成功状态返回 promise 对象。

{
    Promise.resolve('Success')
        .then(function (value) {
                console.log(value); // 'Success'
            }, function (value) {
                // 不会被调用
            }
        );
}