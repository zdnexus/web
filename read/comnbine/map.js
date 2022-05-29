/**
 * Created by zdnexus on 17/5/6.
 */
'use strict';

let arr = new Array(100000000);

console.time('for');
for (let i = 0; i < arr.length; i++) {
}
console.timeEnd('for');


console.time('for cache i++');
let length  = arr.length;
for (let i = 0; i < length; i++) {
}
console.timeEnd('for cache i++');

console.time('for cache ++i');
for (let i = 0; i < length; ++i) {
}
console.timeEnd('for cache ++i');

console.time('map');
arr.map(()=>{});
console.timeEnd('map');

console.time('forEach');
arr.forEach(()=>{});
console.timeEnd('forEach');