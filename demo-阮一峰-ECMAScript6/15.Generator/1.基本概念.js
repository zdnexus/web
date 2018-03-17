/**
 * Created by zdnexus on 2017/4/18 0018.
 */
'use strict';

// 形式上，Generator 函数是一个普通函数，但是有两个特征。
// 一是，function关键字与函数名之间有一个星号；
// 二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hwg = helloWorldGenerator();
// 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象。
// 换言之，Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。
// 每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
// value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
console.log(hwg);        // {}
console.log(hwg.next()); // { value: 'hello', done: false }
console.log(hwg.next()); // { value: 'world', done: false }
console.log(hwg.next()); // { value: 'ending', done: true }
console.log(hwg.next()); // { value: undefined, done: true }

// yield
// 由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，
// 所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。
function* gen() {
    yield 123 + 456;
}
var g = gen();
console.log(g);         // {}
console.log(g.next());  // { value: 579, done: false }
console.log(g.next());  // { value: undefined, done: true }

// setTimeout
function* f() {
    console.log('f() 执行了！')
}
var generator = f();
setTimeout(function () {
    generator.next()
}, 2000);
