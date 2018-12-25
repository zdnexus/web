/**
 * Created by zdnexus on 2017/1/17 0017.
 */
'use strict';

var str = '012345';
console.log(str.replace(/[0-3]/, 'X'));//X12345

console.log(str.replace(/[0-3]/g, 'X'));//XXXX45

console.log(str.replace(/^[0-3]/g, 'X'));//X12345

console.log(str.replace(/^[0-3][0-3]/, 'X'));//X2345

console.log(str.replace(/^[0-3][0-3][0-3]/, 'X'));//X345

console.log(str.replace(/^[0-3][0-3][0-3][0-3]/, 'X'));//X45

console.log(str.replace(/^[0-3][0-3][0-3][0-3][0-3]/, 'X'));//012345

console.log(str.replace(/[0-3]*/g, 'X'));//XX4X5X

console.log(str.replace(/[4-5]$/g, 'X'));//01234X

console.log(str.replace(/[4-5][4-5]$/g, 'X'));//0123X

console.log(str.replace(/[4-5][4-5][4-5]$/g, 'X'));//012345

console.log(str.replace(/^[0-3]\[4-5]$/ig, 'X'));

str = '[{"a":1,"b":2}]';
console.log(str);
str = str.replace(/\[/, '').replace(/]/, '');
console.log(str);
var str_jso = (JSON.parse(str));
console.log(str_jso);

var jso = {
    a: 1,
    b: 2
};
console.log(jso);
var jso_str = JSON.stringify(jso);
console.log(jso_str);

console.log(str === jso_str);

