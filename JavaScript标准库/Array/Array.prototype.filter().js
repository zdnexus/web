/**
 * Created by Administrator on 2017/3/4 0004.
 */
'use strict';

// let new_arrary = arr.filter(callback[, thisArg])
// callback
// 用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。
// 返回true表示保留该元素（通过测试），false则不保留。
// thisArg
// 可选。执行 callback 时的用于 this 的值。
// 返回值
// 一个新的通过测试的元素的集合的数组
{
    // filter 为数组中的每个元素调用一次 callback 函数，
    // 并利用所有使得 callback 返回 true 或 等价于 true 的值 的元素创建一个新数组。
    // callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。
    // 那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。

    // filter 不会改变原数组。

    let arr = [12, 5, undefined, 44];
    let filtered = arr.filter(
        (element, index, array)=> {
            console.log('element:', element);
            console.log('index:', index);
            console.log('array:', array);
            return element > 10 || element === undefined;
        }, arr
    );
    console.log(arr);
    console.log(filtered);


    // 如果为 filter 提供一个 thisArg 参数，则它会被作为 callback 被调用时的 this 值。
    // 否则，callback 的 this 值在非严格模式下将是全局对象，严格模式下为 undefined。
    // ES5 有 thisArg 值的时候 this 是thisArg，没有 thisArg 的是 window。
    filtered = arr.filter(function (element, index, array) {
            console.log(this);
            return element > 10 || element === undefined;
        }, arr
    );

    filtered = arr.filter(function (element, index, array) {
            console.log(this);
            return element > 10 || element === undefined;
        }
    );

    // ES6 的 this 是 window
    filtered = arr.filter(
        (element, index, array)=> {
            console.log(this);
            return element > 10 || element === undefined;
        }, arr
    );

    filtered = arr.filter(
        (element, index, array)=> {
            console.log(this);
            return element > 10 || element === undefined;
        }
    );
}

// filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。
// 在调用 filter 之后被添加到数组中的元素不会被 filter 遍历到。
// 如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

// 兼容旧环境（Polyfill）
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisArg */) {

        if (this === void 0 || this === null)
            throw new TypeError();

        if (typeof fun !== 'function')
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;

        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];

                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t))
                    res.push(val);
            }
        }

        return res;
    };
}

// 示例
{
    let arr = [0, 1, 2];
    arr[10] = 10;
    let res = arr.filter(function (x) {
        return x === undefined;
    });
    console.log(res);
}
