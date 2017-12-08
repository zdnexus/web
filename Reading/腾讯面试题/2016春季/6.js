/**
 * Created by zdnexus on 17/11/27.
 */
'use strict';

// 请问以前 JS 程序有什么问题？应该如何优化？
function setStyle(element) {
    element.style.fontWeight = 'bold';
    element.style.textDecoration = 'none';
    element.style.color = '#000000';
}

function setStyle(element) {
    if (!element.style) {
        return;
    }
    var eleStyle = element.style;
    eleStyle.fontWeight = 'bold';
    eleStyle.textDecoration = 'none';
    eleStyle.color = '#000000';
}