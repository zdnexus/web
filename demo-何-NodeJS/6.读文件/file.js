/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var fs = require('fs');//NodeJs的fs模块

// 同步执行
function readFileSync(path) {
    var data = fs.readFileSync(path, 'utf-8');
    console.log('file同步方法执行完毕');
    return data;
}
// 异步方法1执行（程序有误，仅供显示JS异步）
function readFile1(path) {
    fs.readFile(path, function (err, data) {
        if (err) {
            console.log(err);
            console.log('file异步方法1执行错误');
        }
        else {
            console.log(data.toString());
            console.log('file异步方法1执行成功');
            return data;
        }
    });
    console.log('file异步方法1执行完毕');
}
// 异步方法2执行
function readFile2(path, res) {
    fs.readFile(path, function (err, data) {
        if (err) {
            console.log(err);
            console.log('file异步方法2执行错误');
        }
        else {
            res.write(data);//获取数据后用传递的参数写入
            res.end('');//end()必须紧跟写在write的后面，放在函数外面会让end()在write()前面造成无法写入。
            console.log('file异步方法2执行成功');
        }
    });
    console.log('file异步方法2执行完毕');
}


module.exports = {
    readFileSync: readFileSync,
    readFile1: readFile1,
    readFile2: readFile2
};
