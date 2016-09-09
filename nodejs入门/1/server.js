'use strict';

var http = require('http');

function start() {
    function onRequest(request, response) {
        console.log('Request received.');
        //（请注意，当我们在服务器访问网页时，我们的服务器可能会输出两次“Request received.”。
        // 那是因为大部分服务器都会在你访问 http://localhost:8888 /时尝试读取 http://localhost:8888/favicon.ico )
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('Hello World!');
        response.end();
    }

    http.createServer(onRequest).listen(8888);

    console.log('Server has started.');
}

exports.start = start;