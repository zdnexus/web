/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var fs = require('fs');//NodeJs的file模块

module.exports = {
    readFile: function (path, res) {
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
};
