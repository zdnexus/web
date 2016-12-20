/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var User = require('./user');

function hacker(name, event) {
    // 模块继承
    User.apply(this, [name, event]);
    this.printHackerInfo = function (res) {
        res.write(this.name + this.event + '\n');
    }
}

module.exports = hacker;