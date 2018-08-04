/**
 * Created by zdnexus on 2018/1/14 0014.
 */
'use strict';

var arr = [1, 4, 3];

arr.sort(function (a, b) {
    return a - b;
});
console.log(arr);

arr.sort(function (a, b) {
    return b - a;
});
console.log(arr);