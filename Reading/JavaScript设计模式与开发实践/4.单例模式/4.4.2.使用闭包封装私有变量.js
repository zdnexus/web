/**
 * Created by zdnexus on 2018/1/20 0020.
 */
'use strict';

var user = (function () {
    var _name = 'sven',
        _age = 29;

    return {
        getUserInfo: function () {
            return _name + '-' + _age;
        }
    }
})();

console.log(user.getUserInfo());