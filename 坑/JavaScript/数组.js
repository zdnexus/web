/**
 * Created by zdnexus on 2016/12/14 0014.
 */
'use strict';

var arr = [1];
arr.push(2);
console.log(arr);//[1,2] 会改变数组本身
console.log(arr.concat([3, 4]));//[1,2,3,4],连接2个数组
console.log(arr);//[1,2] concat没有改变数组本身
arr.push([5, 6]);//增加一个数组
console.log(arr);//1,2,[5,6] push会改变数组本身

arr = [1, 2, 3];
for (let i in arr) {
    console.log(typeof i + ':' + i + ':' + arr[i]);//string
}
arr.map(function (item, index) {
    console.log(typeof index + ':' + index + ':' + item);//number
});

// let arr = [, ,];
// console.log(arr.length);

arr = [];
arr.map((item)=>{
    console.log(item.a);
});