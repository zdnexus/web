/**
 * Created by zdnexus on 2017/12/30 0030.
 */
'use strict';

// var a = 1;
function f1() {
    console.log(a);
}

function f2() {
    var a = 2;
    f1();
    a = 3;
    var f3 = function () {
        console.log(a);
    };
    f3();
}
f2();