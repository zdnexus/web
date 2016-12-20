/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

var http = require('http');//NodeJS的http模块
var url = require('url');//NodeJS的url模块
// 路由器配置
var router = require('./router');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 每次访问会默认查找favicon.ico，清除第二次访问
    if (request.url !== '/favicon.ico') {
        var pathname = url.parse(request.url).pathname.replace(/\//, '');//获取url参数
        var inTheRouter = false;
        // 在路由列表中搜索参数名
        for (let i in router) {
            if (i === pathname) {
                inTheRouter = true;
                break;
            }
        }
        // 空字符串重定向为index
        if (pathname) {
            if (inTheRouter) {
                router[pathname](response);
            }
            // 没有匹配的跳转至404
            else {
                router['error'](response);
            }
        }
        else {
            router['index'](response);
        }
        console.log('主程序执行完毕');
    }
}).listen(8000);

console.log('Server running at http://localhost:8000/');