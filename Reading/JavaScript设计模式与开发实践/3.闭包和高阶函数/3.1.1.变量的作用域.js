/**
 * Created by zdnexus on 2018/1/14 0014.
 */
'use strict';

var a = 1;
var func1 = function () {
    var b = 2;
    var func2 = function () {
        var c = 3;
        console.log(a);
        console.log(b);
    };
    func2();
    // ReferenceError: c is not defined
    console.log(c);
};

func1();