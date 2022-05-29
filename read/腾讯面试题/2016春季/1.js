/**
 * Created by zdnexus on 17/11/27.
 */
'use strict';

var a = 100;
function fn() {
    console.log(a);
    var a = 200;
    console.log(a);
}
fn();// undefined 200
console.log(a);// 100
var a;
console.log(a);// 100
var a = 300;
console.log(a);// 300