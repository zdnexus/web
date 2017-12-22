/**
 * Created by aa on 17/12/20.
 */

// 'use strict';






// apply,call


// // 函数作用域


// 函数内部的作用域
function A() {
    var a = 1;

    function B() {
        var b = 2;
        console.log(a + b);
    }

    B();
    // console.log(a + b);
}

// A();

// var val = 10;
// console.log(val);
// console.log(this.val);


