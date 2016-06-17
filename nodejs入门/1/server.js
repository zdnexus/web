/**
 * Created by Administrator on 2016/4/5.
 */

var http = require("http");

http.createServer(function (request, response) {
    //response.writeHead(statusCode, [reasonPhrase], [headers])
    // statusCode   HTTP状态码，如200(请求成功），404（未找到）等。

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(8888);

console.log("Server has started.");
