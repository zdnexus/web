/**
 * Created by zdnexus on 2017/12/10 0010.
 */
'use strict';

var Type = {};
var TypeArr = ['Number', 'String', 'Array'];

for (var i = 0, l = TypeArr.length; i < l; i++) {
    (function (type) {
        Type['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        };
    })(TypeArr[i]);
}

console.log(Type.isNumber(123));
console.log(Type.isString('123'));
console.log(Type.isArray([1, 2, 3]));