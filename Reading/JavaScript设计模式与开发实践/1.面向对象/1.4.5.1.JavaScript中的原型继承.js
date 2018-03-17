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

var a = new Person('sven');
console.log(a.name);// sven
console.log(a.getName());// sven
console.log(Object.getPrototypeOf(a) === Person.prototype);// true