/**
 * Created by zdnexus on 2017/12/9 0009.
 */
'use strict';

function Person(name) {
    this.name = name
}
Person.prototype.getName = function () {
    return this.name;
};

var objectFactory = function () {
    // 从Object.prototype克隆一个空的对象
    var obj = new Object(),
    // 取得外部传入的构造器，此处是Person
        Constructor = [].shift.call(arguments);// Constructor = Array.prototype.shift.call(arguments);

    // 空对象指针指向构造器原型
    obj.__proto__ = Constructor.prototype;
    // 借用外部传入的构造器给obj设置属性
    var ret = Constructor.apply(obj, arguments);
    // 确保构造器总是会返回一个对象
    return typeof ret === 'object' ? ret : obj;
};

var a = objectFactory(Person, 'sven');
console.log(a.name);// sven
console.log(a.getName());// sven
console.log(Object.getPrototypeOf(a) === Person.prototype);// true