/**
 * Created by Administrator on 2017/1/15 0015.
 */
'use strict';

var str = 'abcdHello{name}hello{name}abcD{age}';
var reg = /hello/gi;

console.log(reg.test(str));
var rstr = str.replace(reg, '!');
console.log(rstr);

reg = /a.{1,}d/g;
console.log(reg.test(str));
rstr = str.replace(/a.{1,}d/g, ' nexus ');
console.log(rstr);

rstr = str.replace(/\{.{1,}\}/g, ' nexus ');
console.log(rstr);

rstr = str.replace(/\{name\}/g, ' nexus ');
console.log(rstr);

rstr = str.replace(/\{.*?\}/g, ' nexus ');
console.log(rstr);