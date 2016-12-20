/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var fs = require('fs');//NodeJs的fs模块

// 同步执行
function writeFileSync(path, data) {
    fs.writeFileSync(path, data);
    console.log('file写入同步方法执行完毕');
}
// 异步方法1执行（程序有误，仅供显示JS异步）
function writeFile1(path, data) {
    fs.writeFile(path, data, function (err) {
        if (err) {
            console.log(err);
            console.log('file写入异步方法1执行错误');
            return false;
        }
        else {
            console.log(data.toString());
            console.log('file写入异步方法1执行成功');
            return true;
        }
    });
    console.log('file写入异步方法1执行完毕');
}
// 异步方法2执行
function writeFile2(path, data, res) {
    fs.writeFile(path, data, function (err) {
        if (err) {
            console.log(err);
            console.log('file写入异步方法2执行错误');
        }
        else {
            console.log('file写入异步方法2执行成功');
            res.write(data);
            res.end('');
        }
    });
    console.log('file写入异步方法2执行完毕');
}


module.exports = {
    writeFileSync: writeFileSync,
    writeFile1: writeFile1,
    writeFile2: writeFile2
};
