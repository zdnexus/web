/**
 * Created by Administrator on 2017/4/18 0018.
 */
'use strict';

function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorldGenerator();
// 换言之，Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。
// 每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
// value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
console.log(hw);        // {}
console.log(hw.next()); // { value: 'hello', done: false }
console.log(hw.next()); // { value: 'world', done: false }
console.log(hw.next()); // { value: 'ending', done: true }
console.log(hw.next()); // { value: undefined, done: true }
console.log(hw.next()); // { value: undefined, done: true }

// yield
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
