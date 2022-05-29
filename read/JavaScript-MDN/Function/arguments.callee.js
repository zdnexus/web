/**
 * Created by zdnexus on 2017/3/14 0014.
 */
// 'use strict';

{
    function factorial(n) {
        return (n > 2) ? factorial(n - 1) + factorial(n - 2) : 1;
    }

    let res = [1, 2, 3, 4, 5].map(factorial);
    console.log(res);

    res = [1, 2, 3, 4, 5].map(function (n) {
        return (n > 2) ? arguments.callee(n - 1) + arguments.callee(n - 2) : 1;
    });
    console.log(res);
}

// 递归调用会获取到一个不同的 this 值
{
    function sillyFunction(recursed) {
        if (!recursed) {
            return arguments.callee(true);
        }
        if (this !== global) {
            console.log('This is: ', this);
        } else {
            console.log('This is the global');
        }
    }

    sillyFunction();
}

// 该函数可以像代码内部的任何其他函数一样被调用
// 它不会在外部作用域中创建一个变量 (除了 IE 8 及以下)
// 它具有比访问arguments对象更好的性能
{
    // let res = [1, 2, 3, 4, 5].map(function factorial(n) {
    //     return !(n > 1) ? 1 : factorial(n - 1) * n;
    // });
    // console.log(res);
}