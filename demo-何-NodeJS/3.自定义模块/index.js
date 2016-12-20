/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var http = require('http');//NodeJS的http模块
var function2 = require('./function2');
var functions = require('./functions');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 每次访问会默认查找favicon.ico，清除第二次访问
    if (request.url !== '/favicon.ico') {
        function1(response);
        function2(response);
        functions.function3(response);
        functions['function4'](response);
        response.end('');
    }
}).listen(8000);

function function1(res) {
    console.log('function1开始运行');
    res.write('hello，我是function1');
}

console.log('Server running at http://localhost:8000/');