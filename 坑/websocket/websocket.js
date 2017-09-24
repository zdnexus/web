/**
 * Created by Administrator on 2017/6/4 0004.
 */
'use strict';

var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) {
    console.log(this.readyState);
    console.log("Connection open ...");
    ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
    console.log(this.readyState);
    console.log( "Received Message: " + evt.data);
    ws.close();
};

ws.onclose = function(evt) {
    console.log(this.readyState);
    console.log("Connection closed.");
};