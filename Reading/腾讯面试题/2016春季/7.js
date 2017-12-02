/**
 * Created by aa on 17/11/27.
 */
'use strict';

// 匹配一个全部是数字的字符串
var str = '1234';
var reg = /^\d+$/;
console.log(reg.test(str));

// 提取一个 url 所使用的协议类型如 http、ftp 和 host 名称
var str = 'http://yangbai.me';
console.log(str.match(/(([a-zA-Z]{3,5})\:\/\/)?(www\.)?([a-zA-Z\_\-]+)\.([a-zA-Z]+)$/));