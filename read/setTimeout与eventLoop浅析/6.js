/**
 * Created by zhongdong on 18/6/4.
 * https://www.cnblogs.com/xianyulaodi/p/6414805.html
 */
'use strict';


// 因为javascript是单线程的，所谓的单线程是指在JS引擎中负责解释和执行JavaScript代码的线程只有一个，可以叫它为主线程。
// 除了主线程，还存在其他的线程。例如：处理AJAX请求的线程、处理DOM事件的线程、定时器线程、读写文件的线程(例如在Node.js中)等等。

// 我们以setTimeout为例，当在代码中调用setTimeout()方法时，注册的延时方法会交由浏览器内核其他模块（以webkit为例，是webcore模块）处理，
// 当延时方法到达触发条件，即到达设置的延时时间时，这一延时方法被添加至任务队列里。
// 这一过程由浏览器内核其他模块处理，与执行引擎主线程独立，执行引擎在主线程方法执行完毕，到达空闲状态时，
// 会从任务队列中顺序获取任务来执行，这一过程是一个不断循环的过程，称为事件循环模型。


// Javascript执行引擎的主线程运行的时候，产生堆（heap）和栈（stack）。
// 程序中代码依次进入栈中等待执行，当调用setTimeout()方法时，浏览器内核相应模块开始延时方法的处理，
// 当延时方法到达触发条件时，方法被添加到用于回调的任务队列，
// 只有执行引擎栈中的代码执行完毕，主线程才会去读取任务队列，依次执行那些满足触发条件的回调函数。


// const times = 10000;// for阻塞耗时 < 200ms
// const times = 50000;// 200ms < for阻塞耗时 < 300ms:
// const times = 70000;// for阻塞耗时 > 300ms

console.log(1);

setTimeout(function () {
    console.log(2);
}, 300);

setTimeout(function () {
    console.log(3)
}, 400);

var start = new Date();
for (var i = 0; i < times; i++) {
    console.log(4);
}
var end = new Date();
console.log('阻塞耗时：' + Number(end - start) + '毫秒');

setTimeout(function () {
    console.log(5);
}, 100);

// for阻塞耗时 < 200ms
// 1
// 4 4 4 4 4```
// 5
// 2
// 3

// 200ms < for阻塞耗时 < 300ms:
// 1
// 4 4 4 4 4```
// 2
// 5
// 3

// for阻塞耗时 > 300ms
// 1
// 4 4 4 4 4```
// 2
// 3
// 5