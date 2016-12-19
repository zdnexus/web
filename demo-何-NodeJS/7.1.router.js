/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';
var file = require('./7.2.file');

function index(res) {
    console.log('调用了index函数');
    file.readFile('./zdnexus1.html', res);
}

function login(res) {
    console.log('调用了login函数');
    file.readFile('./zdnexus2.html', res);
}

function user(res) {
    console.log('调用了user函数');
    file.readFile('./zdnexus3.html', res);
}

function hacker(res) {
    console.log('调用了hacker函数');
    file.readFile('./zdnexus4.html', res);
}

function error(res) {
    console.log('调用了error函数');
    file.readFile('./zdnexus5.html', res);
}

module.exports = {
    index: index,
    login: login,
    user: user,
    hacker: hacker,
    error: error
};