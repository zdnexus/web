/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var http = require('http');
var User = require('./user');
var Hacker = require('./hacker');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 每次访问会默认查找favicon.ico，清除第二次访问
    if (request.url !== '/favicon.ico') {
        // node函参都是string
        let user = new User('钟XX', '正在浏览网址');
        user.printUserInfo(response);
        let hacker = new Hacker('洪XX', '正在攻击网址');
        hacker.printUserInfo(response);
        hacker.printHackerInfo(response);
        response.end('');
    }
}).listen(8000);

console.log('Server running at http://localhost:8000/');