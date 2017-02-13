/**
 * Created by Administrator on 2016/12/31 0031.
 */
'use strict';

console.log(typeof Array.prototype.sort);// 'function'
console.log(typeof String.prototype.substring);// 'function'

String.prototype.startsWith = function (text) {
    return this.indexOf(text) === 0;
};

var msg = 'Hello world!';
console.log(msg.startsWith('Hello'));   // true

// 如果因某个实现中缺少某个方法，就在原生对象的原型中添加这个方法，
// 那么当在另一个支持该方法的实现中运行代码时，就可能会导致命名冲突。
// 而且，这样做也可能会意外地重写原生方法。