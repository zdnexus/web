/**
 * Created by zdnexus on 2017/4/24 0024.
 */
/**  * Created by zdnexus on 17/5/7.  */ 'use strict';

// JavaScript语言的传统方法是通过构造函数，定义并生成新对象。下面是一个例子。
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
console.log(p.toString());

//定义类
class Point2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
var p2 = new Point2(1, 2);
console.log(p2.toString());

console.log(typeof Point2);// 'function'
console.log(Point2 === Point2.prototype.constructor);// true

// 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
console.log(Object.keys(Point2.prototype));// []
console.log(Object.getOwnPropertyNames(Point2.prototype));// [ 'constructor', 'toString' ]


// 继承
class Point3 extends Point2 {
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }

    toString3() {
        return '(' + this.x + ', ' + this.y + '，' + this.z + ')';
    }
}
var p3 = new Point3(1, 2, 3);
console.log(p3.toString());
console.log(p3.toString3());