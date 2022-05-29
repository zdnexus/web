/**
 * Created by zdnexus on 2016/12/24 0024.
 */

var a;
console.log(typeof a);//undefined

var s = '1s';
console.log(s + 1);//'1s1'
console.log(++s);//NaN
console.log(s++);//NaN

console.log(!!'false');//true

console.log(!!false);//false

console.log(!!undefined);//false

console.log(!!0);//false

console.log(typeof Infinity);//number

console.log(10 % '0');//NaN

console.log(undefined == null);//true

console.log(undefined === null);//false

console.log(false == '');//true

console.log(false === '');//false

console.log(typeof '2E+2');

var b = 3e+3;
console.log(b++);//3000

var v = v || 10;
console.log(v);//10
var v = 100 || 10;
console.log(v);//100
var v = 0 || 10;
console.log(v);//10
var v = null || 10;
console.log(v);//10
