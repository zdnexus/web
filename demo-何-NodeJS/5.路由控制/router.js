/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

function user(res) {
    console.log('调用了user函数');
}

function hacker(res) {
    console.log('调用了hacker函数');
}

module.exports = {
    user: user,
    hacker: hacker
};