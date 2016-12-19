/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

function function2(res) {
    console.log('function2开始运行');
    res.write('hello，我是function2.');
}

module.exports = function2;