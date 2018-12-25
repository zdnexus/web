/**
 * Created by zhongdong on 18/5/22.
 */
'use strict';

console.log(['1', '2', '3'].map(parseInt));// [ 1, NaN, NaN ]

// MDN - Array.prototype.map
if (!Array.prototype.map) {
    Array.prototype.map = function (callback, thisArg) {

        // 调用宿主是 null 或者 undefined，则抛出 TypeError 异常
        if (this == null) {
            throw new TypeError('Array.prototype.map called on null or undefined');
        }

        // 如果 callback 不是函数,则抛出 TypeError 异常
        if (Object.prototype.toString.call(callback) !== '[object Function]') {
            throw new TypeError(callback + ' is not a function');
        }

        // 将 o 赋值为调用 map 方法的数组
        var o = Object(this);

        // 将 l 赋值为数组 o 的长度
        var l = o.length >>> 0;

        // 如果参数 thisArg 有值,则将 p 赋值为 thisArg ，否则T为 undefined
        var p;
        if (thisArg) {
            p = thisArg;
        }

        // 创建新数组 a，长度为原数组 o 长度 l
        var a = new Array(l);

        // 将 i 赋值为0，遍历开头
        var i = 0;

        // 当 i < l 时,执行循环
        while (i < l) {

            var kValue, mappedValue;

            // 遍历 o，i 为原数组索引
            // 那些从来没被赋过值或者使用 delete 删除的索引则不会被调用
            if (i in o) {

                // kValue 为索引 i 对应的值
                kValue = o[i];

                // 执行callback，this 指向 p，参数有三个，分别是 kValue:值，i:索引，o:原数组
                mappedValue = callback.call(p, kValue, i, o);

                // 返回值添加到新数组 A 中
                a[i] = mappedValue;
            }

            // k自增1
            i++;
        }

        // 返回新数组A
        return a;
    };
}