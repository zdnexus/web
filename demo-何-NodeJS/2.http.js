/**
 * Created by Administrator on 2016/12/12 0012.
 */
'use strict';

var http = require('http');

http.createServer(function (request, response) {
    // 每次访问会默认查找favicon.ico，清除第二次访问
    if (request.url !== '/favicon.ico') {
        console.log('访问');
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('Hello World!');
        response.end('到这里就结束了');
    }
}).listen(1991);

console.log('Server running at http://192.168.0.109:1991');