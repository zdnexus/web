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
        // var data1 = file.readFileSync('../HTML模板/zdnexus1.html');
        // response.write(data1);
        // response.end('');

        // 异步方法1执行（程序有误，异步展示）
        // var data2 = file.readFile1('../HTML模板/zdnexus1.html');
        // if (data2) {
        //     response.write(data2);
        // }
        // else {
        //     console.log('没有获取到数据:', data2);//undefined 还没有获取到读取的数据就执行了下一步
        // }
        // response.end('');

        // 异步调用函数执行
        file.readFile2('../HTML模板/zdnexus1.html', response);

        console.log('主程序执行完毕');
    }
}).listen(8000);

console.log('Server running at http://localhost:8000/');