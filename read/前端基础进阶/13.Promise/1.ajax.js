/**
 * Created by zdnexus on 2017/4/4 0004.
 */
'use strict';

// 简单的ajax原生实现
let url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
let XHR = new XMLHttpRequest();

XHR.open('GET', url, true);

XHR.send();

XHR.onreadystatechange = function() {
    console.log(XHR);
    if (XHR.readyState == 4 && XHR.status == 200) {
        console.log(XHR.response);
    }
};