/**
 * Created by Administrator on 2017/3/18 0018.
 */
'use strict';

// catch() 方法返回一个 Promise，只处理拒绝的情况。它的行为与调用 Promise.prototype.then(undefined, onRejected) 相同。
// p.catch(onRejected);
// 拒绝
// p.catch(function(reason) {
// });

// 示例
// 使用链式语句的 catch方法
{
    let p1 = new Promise(function (resolve, reject) {
        resolve('P1 success');
    });

    p1.then(function (value) {
        console.log(value); // 'P1 success'
        throw 'oh, no!';
    }).catch(function (e) {
        console.log(e); // 'oh, no!'
    }).then(function () {
        console.log('after a catch the chain is restored');
    }, function () {
        console.log('Not fired due to the catch');
    });

    // The following behaves the same as above
    p1.then(function (value) {
        console.log(value); // 'P1 success!'
        return Promise.reject('oh, no!');
    }).catch(function (e) {
        console.log(e); // 'oh, no!'
    }).then(function () {
        console.log('after a catch the chain is restored');
    }, function () {
        console.log('Not fired due to the catch');
    });
}

// 捕获抛出的错误
// {
//     // Throwing an error will call the catch method most of the time
//     let p1 = new Promise(function (resolve, reject) {
//         throw 'Uh-oh!';
//     });
//
//     p1.catch(function (e) {
//         console.log(e); // 'Uh-oh!'
//     });
//
//     // Errors thrown inside asynchronous functions will act like uncaught errors
//     let p2 = new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             throw 'Uncaught Exception!';
//         }, 1000);
//     });
//
//     p2.catch(function (e) {
//         console.log(e); // This is never called
//     });
//
//     // Errors thrown after resolve is called will be silenced
//     let p3 = new Promise(function(resolve, reject) {
//         resolve();
//         throw 'Silenced Exception!';
//     });
//
//     p3.catch(function(e) {
//         console.log(e); // This is never called
//     });
//
//     // Right
//     let p4 = new Promise(function (resolve, reject) {
//         resolve('p4 success');
//         throw 'p4 throw Exception!';
//     });
//
//     p4.then(
//         function (e) {
//             console.log(e);
//             throw 'p4.then() throw Exception!';
//         })
//         .catch(
//             function (e) {
//                 console.log(e);
//             });
// }