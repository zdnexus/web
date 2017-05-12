/**
 * Created by Administrator on 2017/5/8 0008.
 */
'use strict';

var Obj = function (msg) {
    this.msg = msg;
    this.shout = function () {
        console.log(this.msg);
    };
    //隔五秒钟后执行上面的shout方法
    this.waitAndShout = function () {
        var _self = this;
        setTimeout(function () {
            _self.shout();
        }, 5000)
    }
};

new Obj('hello world').waitAndShout();