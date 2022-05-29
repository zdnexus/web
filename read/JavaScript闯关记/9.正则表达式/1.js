// 推荐写法
// var expression = / pattern / flags ;

// 不推荐写法
// var expression = new RegExp(pattern, flags);


// 匹配字符串中所有"at"的实例
var pattern1 = /at/g;
console.log('atasAtat'.replace(pattern1, '*'));

// 匹配第一个"bat"或"cat"，不区分大小写
var pattern2 = /[bc]at/i;
console.log('bbatcatBaTcAt'.replace(pattern2, '*'));

// 匹配所有以"at"结尾的3个字符的组合，不区分大小写
var pattern3 = /.at/gi;
console.log('bbatcatBaTcAt'.replace(pattern3, '*'));

// 匹配第一个" [bc]at"，不区分大小写
var pattern4 = /\[bc\]at/i;
console.log('b[bc]atBaTcAt'.replace(pattern4, '*'));

// 匹配所有".at"，不区分大小写
var pattern5 = /\.at/gi;
console.log('b[bc].atBaTc.At'.replace(pattern5, '*'));