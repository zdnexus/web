/**
 * Created by Administrator on 2016/4/26.
 */

'use strict';

var fs = require('fs');

var fcopy = function () {
    console.log(Date.now());
    var source = fs.readFileSync('1.txt', {encoding: 'utf-8'});
    console.log(Date.now());
    fs.writeFileSync('files/copy1.txt', source);
    console.log(Date.now());
};

//·Ç×èÈû
var scopy = function () {
    var rs = fs.createReadStream('360.exe'),
        ws = fs.createWriteStream('files/360.exe'),
        counter = 0;

    console.log(1);

    rs.on('data', function (chunk) {
        console.log(counter++);
        ws.write(chunk);
    });

    rs.on('end', function () {
        ws.end();
        console.log('done!');
    });

    console.log(2);
};

scopy();