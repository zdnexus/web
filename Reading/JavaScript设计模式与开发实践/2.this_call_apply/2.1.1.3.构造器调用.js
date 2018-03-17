/**
 * Created by zdnexus on 2017/12/17 0017.
 */
'use strict';

function MyClass() {
    this.name = 'sven';
}
var obj = new MyClass();
console.log(obj.name);// sven

function MyClass_2() {
    this.name = 'sven';
    return {
        name: 'anne'
    }
}
var obj2 = new MyClass_2();
console.log(obj2.name);// anne

function MyClass_3() {
    this.name = 'sven';
    return 'anne';
}
var obj3 = new MyClass_3();
console.log(obj3.name);// sven