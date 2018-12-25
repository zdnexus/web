/**
 * Created by zdnexus on 2017/12/31 0031.
 */
'use strict';

var myObject = (function () {
    // 私有变量
    var _name = 'sven';
    
    // 公开方法
    return {
        getName: function () {
            return _name;
        }
    }
})();

console.log(myObject.getName());// sven
console.log(myObject._name);// undefined