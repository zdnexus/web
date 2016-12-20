/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var http = require('http');//NodeJS的http模块
var url = require('url');//NodeJS的url模块
var router = require('./router');//路由列表

http.createServer(function (request, response) {
    // 每次访问会默认查找favicon.ico，清除第二次访问
    if (request.url !== '/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'text/plain'});

        response.end('');
    }
}).listen(8000);

console.log('Server running at http://localhost:8000/');