/**
 * Created by aa on 17/7/20.
 */
'use strict';

// alert执行的时候，html内容是一片空白的，即<p>RequireJS</p>并未被显示，当点击确定后，才出现，这就是JS阻塞浏览器渲染导致的结果。
(function () {
    function fun1() {
        alert('it works');
    }

    fun1();

    setTimeout(() => {
        alert('I\"m func.');
    });
})();