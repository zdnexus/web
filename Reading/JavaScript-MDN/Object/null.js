/**
 * Created by Administrator on 2017/3/4 0004.
 */
'use strict';

// null 是一个字面量（而不是全局对象的一个属性，undefined 是）。在 APIs 中，null 常被放在期望一个对象，但是不引用任何对象的参数位置。

console.log(typeof null);           // 'object' (因为一些以前的原因而不是'null')
console.log(typeof undefined);      // 'undefined'
console.log(null == undefined);     // true
console.log(null === undefined);    // false
console.log(null == null);          // true
console.log(null === null);         // true
console.log(!null);                 // true
console.log(!!null);                // false
console.log(null == true);          // false
console.log(null == false);         // false
console.log(!!null == false);       // true
console.log(isNaN(1 + null));       // false
console.log(isNaN(1 + undefined));  // true

// 应用
{
    let a = null;
    if (a) {
        console.log('A');
        if (a == true) {
            console.log('B');
        }
        else if (a == false) {
            console.log('C');
        }
    }
    else {
        console.log('D');
        if (a == true) {
            console.log('E');
        }
        else if (a == false) {
            console.log('F');
        }
    }
}