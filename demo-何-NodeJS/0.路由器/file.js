/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var fs = require('fs');//NodeJs的fs模块

function readFile(path, res) {
    fs.readFile(path, function (err, data) {
        if (err) {
            console.log(err);
            console.log('file异步方法执行错误');
        }
        else {
            res.write(data);//获取数据成功后直接用传递的参数写入
            res.end('');//res.end('')也要写在write的后面，放在函数外面会在write前面执行end造成无法写入的错误
            console.log('file异步方法执行成功');
        }
    });
    console.log('file异步方法执行完毕');
}


function writeFile(path, data, res) {
    fs.writeFile(path, data, function (err) {
        if (err) {
            console.log(err);
            console.log('file写入异步方法2执行错误');
        }
        else {
            console.log('file写入异步方法2执行成功');
            console.log(data);
        }
    });
    console.log('file写入异步方法2执行完毕');
}

module.exports = {
    readFile: readFile,
    writeFile: writeFile
};
