/**
 * Created by aa on 17/11/27.
 */
'use strict';

// 请写一段 JS 程序提取 URL 中的各个参数（参数名和参数个数不确定），
// 将其按 key-value 形式返回到一个 json 结构中，如{a:'1',b:'2',c:'',d:'xxx',e:undefined}。

function parseUrl(url) {
    url = url.toString();
    var ret = {};
    var urlArr = url.split('?');

    if (urlArr.length < 2) {
        return ret;
    }

    var paramsArr = urlArr[1].split('&');

    for (var i = 0, l = paramsArr.length; i < l; i++) {
        var arr = paramsArr[i].split('=');
        ret[arr[0]] = arr.length > 1 ? arr[1] : undefined;
    }

    return ret;
}

var url = 'http://vip.qq.com/a.php?a=1&b&c=2';
var res = parseUrl(url);
console.log(res);