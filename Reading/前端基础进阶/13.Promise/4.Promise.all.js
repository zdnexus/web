/**
 * Created by Administrator on 2017/4/4 0004.
 */
'use strict';

var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
var url2 = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-03-26/2017-06-10';

function getJSON(url) {
    return new Promise((resolve, reject)=> {
        let XHR = new XMLHttpRequest();

        XHR.open('GET', url, true);
        XHR.send();

        XHR.onreadystatechange = ()=> {
            if (XHR.readyState == 4) {
                if (XHR.status == 200) {
                    try {
                        resolve(XHR.response);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText));
                }
            }
        }
    });
}

function renderAll() {
    return Promise.all([getJSON(url), getJSON(url2)]);
}

renderAll().then((value)=> {
    // 建议大家在浏览器中看看这里的value值
    console.log(value);
});