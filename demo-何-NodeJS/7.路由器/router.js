/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';
var file = require('./file');

// 主页
function index(res) {
    console.log('调用了index函数');
    file.readFile('../HTML模板/zdnexus1.html', res);
}
// 登录页面
function login(res) {
    console.log('调用了login函数');
    file.readFile('../HTML模板/zdnexus2.html', res);
}
// 使用者页面
function user(res) {
    console.log('调用了user函数');
    file.readFile('../HTML模板/zdnexus3.html', res);
}
// 攻击者页面
function hacker(res) {
    console.log('调用了hacker函数');
    file.readFile('../HTML模板/zdnexus4.html', res);
}
// 错误页面页面
function error(res) {
    console.log('调用了error函数');
    file.readFile('../HTML模板/zdnexus5.html', res);
}

module.exports = {
    index: index,
    login: login,
    user: user,
    hacker: hacker,
    error: error
};