/**
 * Created by zdnexus on 2017/12/17 0017.
 */
'use strict';

var MyClass = function () {
    this.name = 'sven';
};
var obj = new MyClass();
console.log(obj.name);// sven

var MyClass_2 = function () {
    this.name = 'sven';
    return {
        name: 'anne'
    }
};
var obj2 = new MyClass_2();
console.log(obj2.name);// anne

var MyClass_3 = function () {
    this.name = 'sven';
    return 'anne';
};
var obj3 = new MyClass_3();
console.log(obj3.name);// sven