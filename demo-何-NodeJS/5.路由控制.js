/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var http = require('http');
var url = require('url');
var router = require('./router');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 每次访问会默认查找favicon.ico，清除第二次访问
    if (request.url !== '/favicon.ico') {
        var pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, '');
        router[pathname](response);
        response.end('');
    }
}).listen(8000);

console.log('Server running at http://localhost:8000/');