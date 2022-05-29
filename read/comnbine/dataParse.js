/**
 * Created by zdnexus on 17/5/9.
 */
'use strict';

let str = '2017-05-09';
let str2 = '2017-05-09 00:00:00';
let str3 = '2017-05-09 08:00:00';
console.log(Date.parse(str));
console.log(Date.parse(str2));
console.log(Date.parse(str3));

str = '2017/05/09';
str2 = '2017/05/09 00:00:00';
str3 = '2017/05/09 08:00:00';
console.log(Date.parse(str));
console.log(Date.parse(str2));
console.log(Date.parse(str3));