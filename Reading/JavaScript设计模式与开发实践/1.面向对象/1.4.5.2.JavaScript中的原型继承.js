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
    var obj = new Object(),
        Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
};

var a = objectFactory(Person, 'sven');
console.log(a.name);// sven
console.log(a.getName());// sven
console.log(Object.getPrototypeOf(a) === Person.prototype);// true