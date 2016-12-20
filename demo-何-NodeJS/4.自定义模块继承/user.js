/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

function user(name, event) {
    this.name = name;
    this.event = event;
    this.printUserInfo = function (res) {
        res.write(this.name + this.event + '\n');
    }
}

module.exports = user;