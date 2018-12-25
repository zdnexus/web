/**
 * Created by zhongdong on 18/6/12.
 */


// 替换第一个
// var str = '啊啊啊';
// var reg = /^./;
// var s = str.replace(reg, '*');
// console.log(s)

// 替换身份证，除了开头3个和末尾3个
var str = '420582199102040013';
var reg = /^[0-9]{1,3}[0-9]{1,3}$/;
// var reg = /^[0-9]{3}/;
var s = str.replace(reg, '***');
// var reg = /[0-9]{3}$/;
// var s = str.replace(reg, '***');
console.log(s);