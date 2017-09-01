/**
 * Created by Administrator on 2017/3/18 0018.
 */
'use strict';

// Promise 对象用于异步计算。一个 Promise 表示一个现在、将来或永不可能可用的值。
// new Promise(
//     /* executor */
//     function(resolve, reject){...}
// );

// executor
//      一个与参数 resolve 和 reject 一起传递的函数 。
//      执行器函数由 Promise 实现立即执行，传递 resolve 和 reject 函数. (在 Promise 构造函数之前调用执行器甚至返回创建的对象)

//      在 executor 内部，如果 resolve 被调用，代表该 Promise 被成功解析（resolve），
//      而当 reject 被调用时，代表该 Promise 的值不能用于后续处理了，也就是被拒绝（reject）了。
//      executor 主要用于初始化异步代码， 一旦异步代码调用完成，要么调用 resolve 方法来表示 Promise 被成功解析，
//      或是调用 reject 方法，表示初始化的异步代码调用失败，整个promise被拒绝。

//      如果在 executor 方法的执行过程中抛出了任何异常，那么 promise 立即被拒绝（即相当于reject方法被调用），executor 的返回值也就会被忽略。


// 示例
{
    let myFirstPromise = new Promise(function (resolve, reject) {
        // 当异步代码执行成功时，我们才会调用 resolve(...), 当异步代码失败时就会调用 reject(...)。
        // 在本例中，我们使用 setTimeout(...) 来模拟异步代码，实际编码时可能是 XHR 请求或是 HTML5 的一些 API 方法。
        setTimeout(function () {
            resolve("成功!"); // 代码正常执行！
        }, 2000);
    });

    myFirstPromise.then(function (successMessage) {
        // successMessage 的值是上面调用 resolve(...) 方法传入的值。
        // successMessage 参数不一定非要是字符串类型，这里只是举个例子
        console.log("Yay! " + successMessage);
    });
}

// 
let promiseCount = 0;

function testPromise() {
    let thisPromiseCount = ++promiseCount;

    let log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount + ') Started (<small>Sync code started</small>)<br/>');

    // 新建一个 Promise 对象
    let p1 = new Promise(
        // 执行器函数由 Promise 实现立即执行
        function (resolve, reject) {
            log.insertAdjacentHTML('beforeend', thisPromiseCount + ') Promise started (<small>Async code started</small>)<br/>');
            // 模拟异步代码
            window.setTimeout(
                function () {
                    // 填充（fulfilled））promise
                    resolve(thisPromiseCount);
                }, Math.random() * 2000 + 1000);
        }
    );

    // 通过调用 then 方法，我们定义了当 promise 被成功解析（resolved）/填充（fulfilled）时要执行的代码，
    // 而 catch() 方法则定义了当 promise 被拒绝（rejected） 时要执行的代码。
    p1.then(
        // 记录被填充的值
        function (val) {
            log.insertAdjacentHTML('beforeend', val + ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
            throw 'Oh，No...'
        })
        .catch(
            // 记录被拒绝的理由（异常信息）
            function (reason) {
                log.insertAdjacentHTML('beforeend', 'Handle rejected promise (' + reason + ') here.');
            });

    log.insertAdjacentHTML('beforeend', thisPromiseCount + ') Promise made (<small>Sync code terminated</small>)<br/>');
}