/**
 * Created by zdnexus on 2018/1/20 0020.
 */
'use strict';

var Singleton = function (name) {
    this.name = name;
    this.instance = null;
};
Singleton.prototype.getName = function () {
    return this.name;
};
Singleton.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
};

var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven1');

console.log(a.getName());
console.log(b.getName());
console.log(a === b);