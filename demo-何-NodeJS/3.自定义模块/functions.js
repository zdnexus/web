/**
 * Created by Administrator on 2016/12/18 0018.
 */
'use strict';

function function3(res) {
    console.log('function3开始运行');
    res.write('hello，我是function3');
}

function function4(res) {
    console.log('function4开始运行');
    res.write('hello，我是function4');
}

module.exports = {
    function3: function3,
    function4: function4
};