/**
 * Created by zhongdong on 18/5/18.
 * https://juejin.im/post/585ca5bbb123db0065a41cad
 */
'use strict';

console.log(1);
setTimeout(function () {
    console.log(2);
}, 0);
console.log(3);
// 1 3 2


function fn() {
    setTimeout(function () {
        console.log('can you see me?');
    }, 1000);
    while (true) {
    }
}
// 因为，while这段代码没有执行完，所以插入在后面的代码便永远不会执行。
// 综上所述，其实JS终归是单线程产物。
// 无论如何“异步”都不可能突破单线程这个障碍。
// 所以许多的“异步调用”（包括Ajax）事实上也只是“伪异步”而已。
