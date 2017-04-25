/**
 * Created by Administrator on 2017/4/24 0024.
 */
'use strict';

console.log(document.domain)
document.domain += 'ky';
var iframe = document.createElement('iframe');
iframe.src = './data.html';
iframe.style.display = 'none';
document.body.appendChild(iframe);

iframe.onload = function () {
    var targetDocument = iframe.contentDocument || iframe.contentWindow.document;
    //可以操作targetDocument
    console.log(targetDocument);
};