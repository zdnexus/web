/**
 * Created by zdnexus on 2017/12/17 0017.
 */
'use strict';

var obj1 = {
    name: 'sven',
    getName: function () {
        return this.name;
    }
};
var obj2 = {
    name: 'anne'
};

console.log(obj1.getName());// sven
console.log(obj1.getName.call(obj2));// anne
console.log(obj1.getName.apply(obj2));// anne