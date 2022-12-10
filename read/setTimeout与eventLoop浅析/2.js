/**
 * Created by zhongdong on 18/5/18.
 */
'use strict';

function test2(value) {
    value = value || 'default';
    console.log(value);
}

// T2-1
setTimeout(test2, 1000, 2.1);
// (立即) 无输出
// (1s ->) 2.1


// T2-2
// setTimeout(test2(), 1000, 2.2);
// (立即) default
// (1s ->) 无输出


// T2-3
// setTimeout(test2(2.3), 1000, 2.31);
// (立即) 2.3
// (1s ->) 无输出