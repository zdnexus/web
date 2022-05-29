/**
 * Created by zdnexus on 17/9/8.
 */
'use strict';

// 所有原生引用类型（Object、Array、String，等等）都在其构造函数的原型上定义了方法。
// 例如，在 Array.prototype 中可以找到 sort() 方法，而在 String.prototype 中可以找到 substring() 方法，
console.log(typeof Array.prototype.sort);       // function
console.log(typeof String.prototype.substring); // function

String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0;
};

var msg = 'Hello world!';
console.log(msg.startsWith('Hello'));   // true
console.log(msg.startsWith('world!'));  // false

// 通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。
// 可以像修改自定义对象的原型一样修改原生对象的原型，因此可以随时添加方法。

// 尽管可以这样做，但我们不推荐在产品化的程序中修改原生对象的原型。
// 如果因某个实现中缺少某个方法，就在原生对象的原型中添加这个方法，那么当在另一个支持该方法的实现中运行代码时，就可能会导致命名冲突。
// 而且，这样做也可能会意外地重写原生方法。