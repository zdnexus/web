/**
 * Created by Administrator on 2017/4/23 0023.
 */
'use strict';

function $(str) {
    return new New$(str);
}

function New$(str, context) {
    if (!str) {
        return;
    }

    var arr = str.split(' ');// 分裂数组
    var firstLetter = arr[0][0];// 首字母
    var dom;// 收集DOM
    var domContext = (context) ? context : document;
    var obj = {};

    if (firstLetter === '#') {
        dom = arr[0].substr(1);
        obj[0] = domContext.getElementById(dom);
    }
    else if (firstLetter === '.') {
        dom = arr[0].substr(1);
        for (var i = 0, length = domContext.getElementsByClassName(dom).length; i < length; i++) {
            obj[i] = domContext.getElementsByClassName(dom)[i];
        }
    }
    else {
        dom = arr[0].substr(1);
        for (var i = 0, length = domContext.getElementsByClassName(dom).length; i < length; i++) {
            obj[i] = domContext.getElementsByClassName(dom)[i];
        }
    }
    obj[context] = domContext;
    this.obj = obj;
}

New$.prototype.css = function (style, count) {
    if (this[dom] && this[dom].length > 0) {
        for (var i = 0; i < this[dom].length; i++) {
            this[dom][i].style[style] = count;
        }
    }
    else {
        this[dom].style[style] = count;
    }
};

if (window.$) {
    window.Jquery = $;
}
else {
    window.Jquery = window.$ = $;
}