/**
 * Created by Administrator on 2017/4/24 0024.
 */
'use strict';

var iframe = document.createElement('iframe');
var canGetData = false;
iframe.src = './data.html';
iframe.style.display = 'none';
document.body.appendChild(iframe);

//监听加载事件
iframe.onload = function() {
    if (!canGetData) {
        // 修改成同源
        iframe.src = './index.html';
        canGetData = true;
    } else {
        var data = iframe.contentWindow.name;
        console.log(data);
        // 获取数据后清除iframe，防止不断刷新
        iframe.contentWindow.document.write('');
        iframe.contentWindow.close();
        document.body.removeChild(iframe);
    }
};