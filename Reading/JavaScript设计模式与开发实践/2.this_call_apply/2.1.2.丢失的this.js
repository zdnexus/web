/**
 * Created by Administrator on 2017/12/17 0017.
 */
'use strict';

var div = document.getElementById('div1');
console.log(div);

// var getId = document.getElementById;
// div = getId('div1');
// console.log(div);

document.getElementById = (function (func) {
    return function () {
        return func.apply(document, arguments);
    }
})(document.getElementById);
var getId = document.getElementById;
div = getId('div1');
console.log(div);