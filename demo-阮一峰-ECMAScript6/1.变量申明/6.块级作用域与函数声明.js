'use strict';

// ES5严格模式
// 'use strict';
// if (true) {
//     function f() {}
// }
// 报错

// ES6引入了块级作用域，明确允许在块级作用域之中声明函数。
// ES6严格模式
// 'use strict';
// if (true) {
//     function f() {}
// }
// 不报错


// 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
function f() {
    console.log('I am outside!');
}
(function () {
    if (false) {
        // 重复声明一次函数f ES5为var变量提升,ES6为let块级域有效
        // function f() {
        //     console.log('I am inside!');
        // }
        // 上面代码在ES5中运行，会得到“I am inside!”，因为在if内声明的函数f会被提升到函数头部
        // ES6的运行结果就完全不一样了，会得到“I am outside!”。因为块级作用域内声明的函数类似于let，对作用域之外没有影响，
    }

    f();
}());