/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var fs = require('fs');//NodeJs的file模块

module.exports = {
    // 同步执行
    readFileSync: function (path) {
        var data = fs.readFileSync(path, 'utf-8');
        console.log('file同步方法执行完毕');
        return data;
    },
    // 异步方法1执行（仅供显示JS异步）
    readFile1: function (path) {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err);
                console.log('file异步方法1执行错误');
            }
            else {
                console.log(data.toString());
                console.log('file异步方法1执行成功');
            }
        });
        console.log('file异步方法1执行完毕');
    },
    // 异步方法2执行
    readFile2: function (path, res) {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err);
                console.log('file异步方法2执行错误');
            }
            else {
                res.write(data);//获取数据成功后直接用传递的参数写入
                res.end('');//res.end('')也要写在write的后面，放在函数外面会在write前面执行end造成无法写入的错误
                console.log('file异步方法2执行成功');
            }
        });
        console.log('file异步方法2执行完毕');
    }
};
