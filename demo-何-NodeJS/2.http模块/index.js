/**
 * Created by Administrator on 2016/12/12 0012.
 */
'use strict';

var http = require('http');//NodeJS的http模块

http.createServer(function (request, response) {
    // 问题：'text/html:charset=utf-8'中文是乱码？
    // response.writeHead(200, {'Content-Type': 'text/html:charset=utf-8'});
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 每次访问会默认查找favicon.ico，清除第二次访问
    if (request.url !== '/favicon.ico') {
        console.log('访问');//打印日志
        response.write('Hello World!');//写入内容
        response.end('到这里就结束了');//结束，不写则没有http协议尾
    }
}).listen(8000);

console.log('Server running at http://localhost:8000/');