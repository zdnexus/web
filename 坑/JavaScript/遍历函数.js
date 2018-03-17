/**
 * Created by zdnexus on 2016/12/16 0016.
 */
'use strict';

var arr = [10, 20, 30];
for (let i = 0, length = arr.length; i < length; ++i) {
    console.log(typeof i + ' arr[' + i + ']:' + arr[i]);//number
}
// console.log(i);//ReferenceError: i is not defined
// console.log(length);//ReferenceError: length is not defined

// 问题：map和forEach为什么不能使用break，for可以用break。
for (let i in arr) {
    console.log(typeof i + ' arr[' + i + ']:' + arr[i]);//string
    if (i == 3) {
        break;
    }
}
arr.map((item, index)=> {
    console.log(typeof index + ' arr[' + index + ']:' + item);//number
    // if (index == 3) {
    //     break;
    // }
});

arr.forEach((item, index)=> {
    console.log(typeof index + ' arr[' + index + ']:' + item);//number
    // if (index == 3) {
    //     break;
    // }
});