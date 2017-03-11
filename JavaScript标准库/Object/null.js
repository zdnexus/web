/**
 * Created by Administrator on 2017/3/4 0004.
 */
'use strict';

// null 是一个字面量（而不是全局对象的一个属性，undefined 是）。在 APIs 中，null 常被放在期望一个对象，但是不引用任何对象的参数位置。

console.log(typeof null);           // object (因为一些以前的原因而不是'null')
console.log(typeof undefined);      // undefined
console.log(null == undefined);     // true
console.log(null === undefined);    // false
console.log(null == null);          // true
console.log(null === null);         // true
console.log(!null);                 // true
console.log(!!null);                // false
console.log(isNaN(1 + null));       // false
console.log(isNaN(1 + undefined));  // true
