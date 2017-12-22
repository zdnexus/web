/**
 * Created by Administrator on 2017/12/17 0017.
 */
'use strict';

Object.create = Object.create || function (obj) {
        var F = function () {
        };
        F.prototype = obj;
        return new F();
    };

var o = {id: 1};
var co = Object.create(o);
console.log(o);// { id: 1 }
console.log(co);// {}
console.log(co.__proto__);// { id: 1 }
co.__proto__.id = 2;
console.log(o);// { id: 2 }
console.log(co.__proto__);// { id: 2 }