/**
 * Created by Administrator on 2016/4/6.
 */

var http = require("http");

function onRequest(request,response){
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("Hello World");
    response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server has started.");