/**
 * Created by Administrator on 2017/1/11 0011.
 */
'use strict';
function swap(x, y) {
    x ^= y;
    y ^= x;
    x ^= y;
}

var a = 1, b = 2;

console.log(a + " " + b);
swap(a, b);
console.log(a + " " + b);