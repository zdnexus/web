/**
 * Created by Administrator on 2017/3/4 0004.
 */
'use strict';

// reduce() 方法对累加器和数组的每个值 (从左到右)应用一个函数，以将其减少为单个值。
// callback
// 执行数组中每个值的函数，包含四个参数
// accumulator
// 上一次调用回调返回的值，或者是提供的初始值（initialValue）
// currentValue
// 数组中正在处理的元素
// currentIndex
// 数据中正在处理的元素索引，如果提供了 initialValue ，从0开始；否则从1开始
// array
// 调用 reduce 的数组
// initialValue
// 可选项，其值用于第一次调用 callback 的第一个参数。
// 返回值
// 函数累计处理的结果

{
    let arr = [1, 5, 10, 15];
    // reduce 提供 initialValue ，从索引0开始。
    // 调用 reduce 时提供initialValue，accumulator 取值为 initialValue ，currentValue 取数组中的第一个值；
    let sum = arr.reduce(function (accumulator, currentValue, currentIndex, array) {
        console.log('accumulator:', accumulator);
        console.log('currentValue:', currentValue);
        console.log('currentIndex:', currentIndex);
        console.log('array:', array);
        console.log(this); // no strict -> Window
        return accumulator + currentValue;
    }, 100);
    console.log(sum); // 131

    // reduce 没有提供 initialValue，会从索引1的地方开始执行 callback 方法，跳过第一个索引。
    // accumulator 取数组中的第一个值，currentValue 取数组中的第二个值。
    sum = arr.reduce(function (accumulator, currentValue, currentIndex, array) {
        console.log('accumulator:', accumulator);
        console.log('currentValue:', currentValue);
        console.log('currentIndex:', currentIndex);
        console.log('array:', array);
        console.log(this); // no strict -> Window
        return accumulator + currentValue;
    });
    console.log(sum); // 31

    // 如果数组为空并且没有提供initialValue， 会抛出TypeError 。
    // sum = [].reduce(function () {
    // });

    // 如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， callback不会被执行。
    sum = [1].reduce(function (accumulator, currentValue, currentIndex, array) {
        console.log('有一个元素的数组，没有initialValue，执行了');
    });

    // 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。
    sum = [].reduce(function (accumulator, currentValue, currentIndex, array) {
        console.log('没有元素的数组，有initialValue，执行了');
    }, 100);
}

// 数组扁平化
{
    let list1 = [[0, 1], [2, 3], [4, 5]];
    let res1 = list1.reduce(function (acc, val) {
        return acc.concat(val);
    });
    console.log(res1);

    let list2 = [0, [1, [2, [3, [4, [5, [6]]]]]]];
    const flatten = (arr) => {
        return arr.reduce(
            (acc, val) => {
                return acc.concat(Array.isArray(val) ? flatten(val) : val)
            }, []
        );
    };
    let res2 = flatten(list2);
    console.log(res2);

    let list3 = [0, [1, 2], [3, [4, 5]]];
    let res3 = flatten(list3);
    console.log(res3);

    // 数组扁平化相加
    const flattenAdd = (arr)=> {
        return arr.reduce(
            (acc, val)=> {
                return acc + (Array.isArray(val) ? flattenAdd(val) : val);
            }
        );
    };
    let red3_add = flattenAdd(list3);
    console.log(red3_add);
}

// 计算数组中各个值出现次数
{
    let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
    const nameCount = (arr)=> {
        return arr.reduce(
            (accumulator, currentValue)=> {
                if (currentValue in accumulator) {
                    accumulator[currentValue]++;
                }
                else {
                    accumulator[currentValue] = 0;
                }
                return accumulator;
            }, {}
        );
    };
    let nC = nameCount(names);
    console.log(nC);
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
    // allbooks = ['Alphabet', 'Bible', 'Harry Potter', 'War and peace','Romeo and Juliet', 'The Lord of the Rings', 'The Shining']
    allBooks = friends.reduce(function (prev, curr) {
            return prev.concat(curr.books);
        }, ['Alphabet']
    );
    console.log(allBooks);
}

// 兼容旧环境（Polyfill）
{
    // Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function (callback /*, initialValue*/) {

            // 调用宿主是null或者undefined,则抛出TypeError异常.
            if (this === null) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }

            // 如果callback不是函数,则抛出TypeError异常.
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            // 将O赋值为调用map方法的数组.
            var O = Object(this);

            // 将len赋值为数组O的长度.
            var len = O.length >>> 0;

            // 遍历开头
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
                    throw new TypeError('Reduce of empty array with no initial value');
                }
                value = O[k++];
            }
            for (; k < len; k++) {
                if (k in O) {
                    value = callback(value, O[k], k, O);
                }
            }

            //
            return value;
        };
    }
}

// 示例
{
    console.log([3, 2, 1].reduce(Math.pow));    // 9
    // console.log([].reduce(Math.pow));        // TypeError: Reduce of empty array with no initial value
}