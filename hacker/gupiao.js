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

js(31, 36, 1600, '海螺水泥');