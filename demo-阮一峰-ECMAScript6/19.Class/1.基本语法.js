/**
 * Created by Administrator on 2017/4/24 0024.
 */
'use strict';

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

// ES6的类，完全可以看作构造函数的另一种写法。
class Point3 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
var p3 = new Point3();
console.log(typeof Point3);// 'function'
console.log(Point3 === Point3.prototype.constructor);// true
console.log(p3.constructor === Point3.prototype.constructor);// true
console.log(p3.constructor === Point3);// true

// 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
console.log(Object.keys(Point3.prototype));// []
console.log(Object.getOwnPropertyNames(Point3.prototype));// [ 'constructor', 'toString' ]