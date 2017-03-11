/**
 * Created by Administrator on 2017/3/4 0004.
 */
'use strict';

// const new_array = arr.map(callback,[thisArg])
// callback
// 函数会被自动传入三个参数：数组元素，元素索引，原数组本身。
// 数组元素
// callback 的第一个参数，数组中正在处理的当前元素。
// 元素索引
// callback 的第二个参数，数组中正在处理的当前元素的索引。
// 原数组本身
// callback 的第三个参数，map 方法被调用的数组。
// thisArg
// 可选的。执行 callback 函数时 使用的this 值。
// 返回值
// 一个新数组，每个元素都是回调函数的结果。

{
    let numbers = [1, 5, 10, 15];

    numbers.map(function (val, index, array) {
        console.log('val:', val);
        console.log('index:', index);
        console.log('array:', array);
    });

    numbers.map(function (val, index, array) {
        // 如果 thisArg 参数有值，则每次 callback 函数被调用的时候，this 都会指向 thisArg 参数上的这个对象。
        console.log(this);  // [1, 5, 10, 15]
    }, numbers);

    numbers.map(function (val, index, array) {
        // 如果省略了 thisArg 参数,或者赋值为 null 或 undefined，则 this 指向全局对象 。
        console.log(this);  // no strict -> Window
    });
}

{
    // map 方法会给原数组中的每个元素都按顺序调用一次 callback 函数。
    // callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。
    let numbers = [1, 5, 10, 15];
    let roots = numbers.map(function (val) {
        return val * 2;
    });
    console.log(roots);//   [2, 10, 20, 30]
    console.log(numbers);// [1, 5, 10, 15]
}

{
    // map 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）。
    let numbers = [1, 5, 10, 15];
    numbers.map(function (val, index, array) {
    });
}

{
    // 使用 map 方法处理数组时，数组元素的范围是在 callback 方法第一次调用之前就已经确定了。
    // 在 map 方法执行的过程中：原数组中新增加的元素将不会被 callback 访问到；
    let numbers = [1, 5, 10, 15];
    let roots = numbers.map(function (val) {
        numbers.push(val * 2);
        return val * 2;
    });
    console.log(numbers);   // [1, 5, 10, 15, 2, 10, 20, 30]
    console.log(roots);     // [2, 10, 20, 30]
}

{
    // 若已经存在的元素被改变或删除了，则它们的传递到 callback 的值是 map 方法遍历到它们的那一时刻的值；而被删除的元素将不会被访问到。
    let numbers = [1, 5, 10, 15, 20];
    let roots = numbers.map(function (val) {
        numbers.pop();
        return val * 2;
    });
    console.log(numbers);   // [1, 5]
    console.log(roots);     // [2, 10, 20]
}

// 示例
// 下面的代码创建了一个新数组，值为原数组中对应数字的平方根。
{
    let numbers = [1, 4, 9];
    let roots = numbers.map(Math.sqrt);
    console.log(roots);     // [1, 2, 3]
    roots = numbers.map(function (val) {
        return Math.sqrt(val);
    });
    console.log(roots);     // [1, 2, 3]
    console.log(numbers);   // [1, 4, 9]
}

// 使用 map 重新格式化数组中的对象
// 以下代码将一个包含对象的数组用以创建一个包含新重新格式化对象的新数组。
{
    let kvArray = [{key: 1, value: 10}, {key: 2, value: 20}, {key: 3, value: 30}];
    let reformattedArray = kvArray.map(function (obj) {
        let rObj = {};
        rObj[obj.key] = obj.value;
        return rObj;
    });
    console.log(reformattedArray);  // [{1:10}, {2:20}, {3:30}],
    console.log(kvArray);           // [{key:1, value:10}, {key:2, value:20}, {key:3, value: 30}]
}

// 一般的 map 方法
// 下面的例子演示如何在一个 String  上使用 map 方法获取字符串中每个字符所对应的 ASCII 码组成的数组：
{
    let map = Array.prototype.map;
    let a = map.call('Hello World', function (val) {
        return val.charCodeAt(0);
    });
    console.log(a);// a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
}

// querySelectorAll 应用
{
    let elems = document.querySelectorAll('input[name="zd"]');
    let values = Array.prototype.map.call(elems, function (obj) {
        return obj.value;
    });
    console.log(values);// ['1','2','3']
}

// 反转字符串
{
    let str = 'Hello World';
    let res = Array.prototype.map.call(str, function (val) {
        return val;
    }).reverse().join('');
    console.log(res);
}

// 使用技巧案例
{
    let arr = ['1', '2', '3'];
    let res = arr.map(parseInt);
    console.log(res);

    res = arr.map(function (val) {
        return parseInt(val, 10)
    });
    console.log(res);
}

// 兼容旧环境（Polyfill）
if (!Array.prototype.map) {
    Array.prototype.map = function (callback, thisArg) {
        if (this == null) {
            throw new TypeError('Array.prototype.map called on null or undefined');
        }

        // 如果callback不是函数,则抛出TypeError异常.
        if (Object.prototype.toString.call(callback) != '[object Function]') {
            throw new TypeError(callback + ' is not a function');
        }

        // 将O赋值为调用map方法的数组.
        let O = Object(this);

        // 将len赋值为数组O的长度.
        let len = O.length >>> 0;

        let T, A, k;
        // 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
        if (thisArg) {
            T = thisArg;
        }

        // 创建新数组A,长度为原数组O长度len
        A = new Array(len);

        // 将k赋值为0
        k = 0;

        // 当 k < len 时,执行循环.
        while (k < len) {

            let kValue, mappedValue;

            // 遍历O,k为原数组索引
            if (k in O) {

                //kValue为索引k对应的值.
                kValue = O[k];

                // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
                mappedValue = callback.call(T, kValue, k, O);

                // 返回值添加到新数组A中.
                A[k] = mappedValue;
            }
            // k自增1
            k++;
        }

        // 返回新数组A
        return A;
    };
}
