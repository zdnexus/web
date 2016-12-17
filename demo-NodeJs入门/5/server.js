/**
 * Created by Administrator on 2016/4/7.
 */

var http = require("http");
var url = require("url");

function start(router, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for" + pathname + " received.");

        response.writeHead(200, {"Content-Type": "text/plain"});

        var content = router(handle, pathname);
        response.write(content);
        response.end();
    }

    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.start = start;