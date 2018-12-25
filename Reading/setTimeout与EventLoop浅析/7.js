/**
 * Created by zhongdong on 18/5/18.
 */
'use strict';

// 有一个事件循环，但是任务队列可以有多个。
// 整个script代码，放在了macrotask queue中，setTimeout也放入macrotask queue。
// 但是，promise.then放到了另一个任务队列microtask queue中。

// 这两个任务队列执行顺序如下，取1个macrotask queue中的task，执行之。
// 然后把所有microtask queue顺序执行完，再取macrotask queue中的下一个任务。

// 代码开始执行时，所有这些代码在macrotask queue中，取出来执行之。
// 后面遇到了setTimeout，又加入到macrotask queue中，然后，遇到了promise.then，放入到了另一个队列microtask queue。
// 等整个execution context stack执行完后，下一步该取的是microtask queue中的任务了。因此promise.then的回调比setTimeout先执行。

setTimeout(function () {
    console.log(1)
}, 0);
new Promise(function executor(resolve) {
    console.log(2);
    for (let i = 0; i < 10000; i++) {
        if (i === 9999) {
            resolve();
            console.log(i);
        }
    }
    console.log(3);
}).then(function () {
    console.log(4);
});
console.log(5);
// 2 3 5 4 1