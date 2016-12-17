/**
 * Created by Administrator on 2016/12/17 0017.
 */
'use strict';

// 问题：Date.parse解析后的兼容问题
// chrome解析的是2016-11-17，Safari解析的是2016/11/17无法解析2016-11-17，而且'-'时间不够准确差8个小时。
// 解决：'-'全部转换为'/'
console.log(Date.parse('2017/01/01 00:00:00'));
console.log(Date.parse('2017/01/01'));
console.log(Date.parse('2017/1/1 00:00:00'));
console.log(Date.parse('2017/1/1'));
console.log(Date.parse('2017/1/1 0:0:0'));
console.log('');
console.log(Date.parse('2017/09/01 07:04:08'));
console.log(Date.parse('2017/9/1 7:4:8'));
console.log('');
console.log(Date.parse('2017-01-01 00:00:00'));
console.log(Date.parse('2017-01-01'));//多了8个小时？？？
console.log(Date.parse('2017-1-1 00:00:00'));
console.log(Date.parse('2017-1-1'));
// 问题：toLocaleString存在bug问题，00:00：00到00:59:59都显示早上12:00:00至12:59:59
let time = Date.parse('2017-1-1 00:43:00');
var newDate = new Date();
newDate.setTime(time);
console.log(newDate.toLocaleString());
