/**
 * Created by Administrator on 2016/12/24 0024.
 */
"use strict";

function X() {
    var arr = [];
    for (var i = 0; i < 3; ++i) {
        arr[i] = function () {
            console.log(i);
        };
    }
    return arr;
};

var a = X();

a[0]();
a[1]();
a[2]();
