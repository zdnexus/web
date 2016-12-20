/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var http = require('http');//NodeJS的http模块
var file = require('./file');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 每次访问会默认查找favicon.ico，清除第二次访问
    if (request.url !== '/favicon.ico') {
        // 同步执行
        // file.writeFileSync('./text.txt', '黑人问号？？？');
        // response.end('');

        // 异步方法1执行（程序有误，仅供显示JS异步）
        // let writeBool = file.writeFile1('./text.txt', '黑人问号。。。');
        // if (writeBool) {
        //     console.log(writeBool, '写入文件成功');
        // }
        // else {
        //     console.log(writeBool, '写入文件失败');//undefined 还没有写入数据就返回，但是一定会成功写入，在后面弹出
        // }
        // response.end('');//因为是往文件写内容而不是往res写内容，end()结束对写入文件没有影响

        // 异步调用函数执行
        file.writeFile2('./text.txt', '黑人问号！！！', response);

        console.log('主程序执行完毕');
    }
}).listen(8000);

console.log('Server running at http://localhost:8000/');