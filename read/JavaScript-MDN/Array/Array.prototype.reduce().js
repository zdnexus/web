/**
 * Created by zdnexus on 2017/3/4 0004.
 */
'use strict';

// reduce() 方法对累加器和数组的每个值(从左到右)应用一个函数，以将其减少为单个值。
// callback
// 执行数组中每个值的函数，包含四个参数。
//      accumulator
//          上一次调用回调返回的值，或者是提供的初始值（initialValue）。
//      currentValue
//          数组中正在处理的元素。
//      currentIndex
//          数据中正在处理的元素索引，如果提供了 initialValue ，从0开始；否则从1开始。
//      array
//          调用 reduce 的数组。
// initialValue
// 可选项，其值用于第一次调用 callback 的第一个参数。
// 返回值
// 函数累计处理的结果。

{
    // reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，
    // 接受四个参数：初始值 accumulator （或者上一次回调函数的返回值），当前元素值 currentValue ，当前索引 currentIndex ，调用 reduce 的数组。

    // 回调函数第一次执行时，accumulator 和 currentValue 的取值有两种情况：
    // reduce 提供 initialValue，acc 取值为 initialValue ，val 取数组中的第一个值。
    let numbers = [1, 5, 10, 15];
    let sum = numbers.reduce(function (acc, val, idx, arr) {
        console.log('acc:', acc, ' val:', val, ' idx:', idx, ' arr:', arr);
        console.log(this); // no strict -> Window
        return acc + val;
    }, 100);
    console.log(sum); // 131

    // reduce 不提供 initialValue ，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。
    // acc 取数组中的第一个值，val 取数组中的第二个值。
    sum = numbers.reduce(function (acc, val, idx, arr) {
        console.log('acc:', acc, ' val:', val, ' idx:', idx, ' arr:', arr);
        console.log(this); // no strict -> Window
        return acc + val;
    });
    console.log(sum); // 31
}

{
    let sum;
    // 如果数组为空并且没有提供 initialValue，会抛出 TypeError。
    // sum = [].reduce(function () {
    // });

    // 如果数组仅有一个元素（无论位置如何）并且没有提供 initialValue， callback不会被执行
    sum = [1].reduce(function (acc, val, idx, arr) {
        console.log('有一个元素的数组，没有initialValue，callback函数执行');
    });

    // 或者有提供 initialValue 但是数组为空，那么此唯一值将被返回并且 callback 不会被执行
    sum = [].reduce(function (acc, val, idx, arr) {
        console.log('没有元素的数组，有initialValue，callback函数执行');
    }, 100);
}

// 数组扁平化
{
    let list = [[0, 1], [2, 3], [4, 5]];
    let res = list.reduce(function (acc, val) {
        return acc.concat(val);
    });
    console.log(res); // [0, 1, 2, 3, 4, 5]

    let list2 = [0, [1, [2, [3, [4, [5]]]]]];
    const flatten = (numbers) => {
        return numbers.reduce(
            (acc, val) => {
                return acc.concat(Array.isArray(val) ? flatten(val) : val)
            }, []
        );
    };
    let res2 = flatten(list2);
    console.log(res2); // [0, 1, 2, 3, 4, 5]

    let list3 = [0, [1, 2], [3, [4, 5]]];
    let res3 = flatten(list3);
    console.log(res3); // [0, 1, 2, 3, 4, 5]

    // 数组扁平化相加
    const flattenAdd = (numbers)=> {
        return numbers.reduce(
            (acc, val)=> {
                return acc + (Array.isArray(val) ? flattenAdd(val) : val);
            }
        );
    };
    let red3_add = flattenAdd(list3);
    console.log(red3_add); // 15
}

// 计算数组中各个值出现次数
{
    let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
    const nameCount = (numbers)=> {
        return numbers.reduce(
            (acc, val)=> {
                if (val in acc) {
                    acc[val]++;
                }
                else {
                    acc[val] = 0;
                }
                return acc;
            }, {}
        );
    };
    console.log(nameCount(names)); // {Alice: 1, Bob: 0, Tiff: 0, Bruce: 0}

    // ES5 的 map 方法
    const nameCount2 = (numbers)=> {
        let obj = {};
        numbers.map(function (val) {
            if (val in this) {
                this[val]++;
            }
            else {
                this[val] = 0;
            }
        }, obj);
        return obj;
    };
    console.log(nameCount2(names)); // {Alice: 1, Bob: 0, Tiff: 0, Bruce: 0}

    // ES6 的 map 方法不行，因为 map 函数的 this 并没有指向第二个参数
    const nameCount3 = (numbers)=> {
        let obj = {};
        numbers.map(
            (val)=> {
                if (val in this) {
                    this[val]++;
                }
                else {
                    this[val] = 0;
                }
            }, obj
        );
        return obj;
    };
    console.log(nameCount3(names)); // {}
}

// 对象数组的连接要使用展开运算符和初始值
{
    let friends = [
        {name: 'Anna', books: ['Bible', 'Harry Potter'], age: 21},
        {name: 'Bob', books: ['War and peace', 'Romeo and Juliet'], age: 26},
        {name: 'Alice', books: ['The Lord of the Rings', 'The Shining'], age: 18}
    ];
    let allBooks = friends.reduce(
        (prev, curr)=>[...prev, ...curr.books]
        , ['Alphabet']
    );
    console.log(allBooks);
    // ['Alphabet', 'Bible', 'Harry Potter', 'War and peace','Romeo and Juliet', 'The Lord of the Rings', 'The Shining']

    allBooks = friends.reduce((prev, curr)=> {
            return prev.concat(curr.books);
        }, ['Alphabet']
    );
    console.log(allBooks);
    // ['Alphabet', 'Bible', 'Harry Potter', 'War and peace','Romeo and Juliet', 'The Lord of the Rings', 'The Shining']
}

// 兼容旧环境（Polyfill）
{
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function (callback /*, initialValue*/) {

            // 调用宿主是 null 或者 undefined，则抛出 TypeError 异常
            if (this == null) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }

            // 如果 callback 不是函数，则抛出 TypeError 异常
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            // 将 O 赋值为调用 map 方法的数组.
            var O = Object(this);

            // 将 len 赋值为数组 O 的长度.
            var len = O.length >>> 0;

            // 将 k 赋值为0，遍历开头
            var k = 0;

            // 遍历存储
            var value;

            //
            if (arguments.length == 2) {
                value = arguments[1];
            } else {
                while (k < len && !(k in O)) {
                    k++;
                }
                if (k >= len) {
                    throw new TypeError('Reduce of empty arr with no initial value');
                }
                value = O[k++];
            }

            for (; k < len; k++) {
                if (k in O) {
                    value = callback(value, O[k], k, O);
                }
            }

            return value;
        };
    }
}

// 示例
{
    console.log([3, 2, 1].reduce(Math.pow));    // 9
    // console.log([].reduce(Math.pow));        // TypeError: Reduce of empty arr with no initial value
}