/**
 * Created by zdnexus on 17/11/27.
 */
'use strict';

var obj1 = {
    name: 'obj1',
    fn: function () {
        console.log(this.name);
    }
};
var obj2 = {name: 'obj2'};
var obj3 = {name: 'obj3'};

obj1.fn();// obj1
var newFn = obj1.fn;
newFn();// ''
newFn.call(obj2);// obj2
obj3.fn = newFn;
obj3.fn();// obj3