'use strict';

function A() {
    let isRight = true;
    let x = 1;//声明一个块作用域的局部变量,只作用于A()
    var y = 2;//声明一个变量
    console.log('let x=', x);// x = 1
    console.log('var y=', y);// y = 2
    // 块级作用域一
    if (isRight) {
        x = 3;
        y = 4;
        console.log('函数内的块级作用域一:x=', x);// x = 3
        console.log('函数内的块级作用域一:y=', y);// y = 4
    }
    console.log('函数内的作用域一:let x=', x);// 3
    console.log('函数内的作用域一:var y=', y);// 4
    // 块级作用域二
    if (isRight) {
        let x = 5;
        var y = 6;
        console.log('函数内的块级作用域二:let x=', x);// x = 5
        console.log('函数内的块级作用域二:var y=', y);// y = 6
    }
    console.log('函数内的作用域二:let x=', x);// 3
    console.log('函数内的作用域二:var y=', y);// 6
    // 块级作用域三
    if (isRight) {
        // var x = 7;//ERROR
        let y = 8;
        console.log('函数内的块级作用域三:var x=', x);// 3
        console.log('函数内的块级作用域三:let y=', y);// 8
    }
    console.log('函数内的作用域三:let x=', x);// 3
    console.log('函数内的作用域三:var y=', y);// 6

    // 函数作用域
    function f2() {
        let x = 1;
        var y = 2;
    }
    f2();
    console.log(x2);//1 (x1并没有被函数里的x1代替)
    console.log(y2);//3 (y1并没有被函数里的y1代替)
    // console.log(x2);//ERROR x2 is not defined
    // console.log(y2);//ERROR y2 is not defined


    // 循环作用域
    var arr = [];
    var i = 'hello world';
    for (var i = 0; i < 3; i++) {
        arr[i] = function () {
            return i;
        };
    }
    console.log(arr[0]());// 3
    console.log(arr[2]());// 3
    console.log(i);//3 (新申明的变量i=3把i='hello world'覆盖)
    // 因为该函数为闭包，具体修改如下：
    // var a = [];
    // for (var i = 0; i < 10; i++) {
    //     a[i] = (function (i) {
    //        return function () {
    //            return j;
    //        }
    //     })(i);
    // }
    // a[0](); // 3


    var arr2 = [];
    for (let i = 0; i < 3; ++i) {
        arr2[i] = function () {
            return i;
        };
    }
    console.log(arr2[0]());// 0
    console.log(arr2[2]());// 2
}

A();