/**  * Created by zdnexus on 17/5/7.  */ 'use strict';

function bar(x = y, y = 2) {
    return [x, y];
}

// 因为参数x默认值等于另一个参数y，而此时y还没有声明，属于”死区“
// console.log(bar()); // ERROR

function bar2(x = 2, y = x) {
    return [x, y];
}
console.log(bar2()); // [2, 2] (x提前已申明)
