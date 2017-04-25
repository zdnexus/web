/**
 * Created by Administrator on 2017/4/24 0024.
 */
'use strict';

window.onload = function () {
    var messageBox = document.getElementById('messageBox');

    window.addEventListener('message', function (e) {
        // 考虑安全性，需要判断一下信息来源
        if (e.origin !== 'http://xxxx') return;
        messageBox.innerHTML = e.data;
    });
}