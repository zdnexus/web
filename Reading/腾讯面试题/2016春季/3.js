/**
 * Created by zdnexus on 17/11/27.
 */
'use strict';

// 一个数组 arr 中存放有多个人员的信息，
// 每个人员的信息由年龄 age 和姓名 name 组成，如{age: 2, name: 'xx'}。请写一段 JS 程序，对这个数组按年龄从小到大进行排序。


var arr = [
    {
        name: 'a',
        age: 3
    },
    {
        name: 'b',
        age: 2
    },
    {
        name: 'c',
        age: 1
    }
];

function parSort(arr) {
    return arr.sort(function (item1, item2) {
        return item1.age - item2.age;
    });
}

parSort(arr);

console.log(arr);