/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var http = require('http');//NodeJS的http模块
var url = require('url');//NodeJS的url模块
var router = require('./router');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 每次访问会默认查找favicon.ico，清除第二次访问
    if (request.url !== '/favicon.ico') {
        var pathname = url.parse(request.url).pathname;//获取url参数
        pathname = pathname.replace(/\//, '');//url参数去掉'/'
        router[pathname](response);//执行参数相对应的函数
        response.end('');
    }
}).listen(8000);

console.log('Server running at http://localhost:8000/');