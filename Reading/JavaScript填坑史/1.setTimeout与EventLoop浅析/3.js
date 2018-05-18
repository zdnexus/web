/**
 * Created by zhongdong on 18/5/18.
 */
'use strict';

function test3(value) {
    value = value || 'default';
    console.log(value);

    return test3;
}


// T3-1
setTimeout(test3, 1000, 3.1);
// (立即) 无输出
// (1s ->) 3.1


// T3-2
// setTimeout(test3(), 1000, 3.2);
// (立即) default
// (1s ->) 3.2


// T3-3
// setTimeout(test3(3.3), 1000, 3.31);
// (立即) 3.3
// (1s ->) 3.31