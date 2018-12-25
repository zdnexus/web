/**  * Created by zdnexus on 17/5/7.  */ 'use strict';

var x = 1;
function f1() {
    console.log(x); // undefined
    var x = 2;
}
f1();

x = 2;
function f2() {
    console.log(x); // undefined
    {
        var x = 3;
        console.log(x); // 3
    }
    console.log(x); // 3
}
f2();

x = 4;
function f3() {
    console.log(x); // 4
    {
        let x = 6;
        console.log(x); // 6
    }
    console.log(x); // 4
}
f3();