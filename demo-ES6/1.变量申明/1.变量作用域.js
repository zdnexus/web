'use strict';

function func() {
    let isRight = true;
    let x = 1;
    var y = 2;

    // 块级作用域
    if (isRight) {
        let x = 3;
        var y = 4;
        console.log('函数内块级作用域:x=', x);// x = 3
        console.log('函数内块级作用域:y=', y);// y = 4
    }
    console.log(x);// 1
    console.log(y);// 3

    if (isRight) {
        // var x = 5;
        let y = 6;
        console.log(x);// 3
        console.log(y);// 4
    }
    console.log(x);// 3
    console.log(y);// 4

    // 函数作用域
    function f2() {
        var x1 = 4;
        var y1 = 5;
        let x2 = 6;
        var y2 = 7;
    }

    f2();
    console.log(x1);// 1 (x1并没有被函数里的x1代替)
    console.log(y1);// 3 (y1并没有被函数里的y1代替)
    // console.log(x2);// ERROR x2 is not defined
    // console.log(y2);// ERROR y2 is not defined


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

func();