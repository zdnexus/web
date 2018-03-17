/**
 * Created by zdnexus on 2016/12/16 0016.
 */
'use strict';

let url = 'http://sjdkf-:3012023/jsljksdk?payState=123213&code=123&message=2的数据库及';

function cutObj(str) {
    let ob = {};
    let cutStr = str.substr(url.indexOf('?') + 1);

    if (cutStr) {
        let cutArr = cutStr.split('&');

        cutArr.map(function (item) {
            let index = item.indexOf('=');
            let key = item.substr(0, index);
            let value = item.substr(index + 1);
            ob[key] = value;
        });
    }
    return ob;
}

console.log(cutObj(url));