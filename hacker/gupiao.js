/**
 * Created by zdnexus on 18/1/25.
 */
'use strict';

function js(a, b, c, str) {
    let dis = b - a;


    console.log(str);
    console.log('本金:' + a * c);
    console.log('涨幅:' + (dis / a * 100).toFixed(3) + '%');
    console.log('目标:' + b * c);
    console.log('盈利:' + (dis * c).toFixed(2));
    console.log();
}

js(7.8, 8.5, 500, '东方航空');
js(10.5, 11.5, 500, '南方航空');
js(11, 13.2, 500, '中国国航');
js(28, 35, 300, '海螺水泥');