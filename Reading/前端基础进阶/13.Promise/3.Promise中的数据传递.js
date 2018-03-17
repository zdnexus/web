/**
 * Created by zdnexus on 2017/4/4 0004.
 */
'use strict';

let fn = function (num) {
    return new Promise(function (resolve, reject) {
        if (typeof num == 'number') {
            resolve(num);
        } else {
            reject('TypeError');
        }
    })
};

fn(2).then(function (num) {
    console.log('first: ' + num);
    return num + 1;
}).then(function (num) {
    console.log('second: ' + num);
    return num + 1;
}).then(function (num) {
    console.log('third: ' + num);
    return num + 1;
});

// 重新封装
let url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
// 封装一个get请求的方法
function getJSON(url) {
    return new Promise(function(resolve, reject) {
        let XHR = new XMLHttpRequest();
        XHR.open('GET', url, true);
        XHR.send();

        XHR.onreadystatechange = function() {
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
    })
}

getJSON(url).then(resp => console.log(resp));