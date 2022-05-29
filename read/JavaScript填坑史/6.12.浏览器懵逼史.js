/**
 * Created by zhongdong on 18/5/25.
 */
'use strict';

// 6
// console.log(3.toSring);
// console.log(3..toSring);
// console.log(3...toSring);


// 12
// 这个题比较流氓.. 因为是浏览器相关, class是个保留字(现在是个关键字了)
// 所以答案不重要, 重要的是自己在取属性名称的时候尽量避免保留字. 如果使用的话请加引号 a['class']
var a = {
    class: 'Animal',
    name: 'Fido'
};
console.log(a.class);