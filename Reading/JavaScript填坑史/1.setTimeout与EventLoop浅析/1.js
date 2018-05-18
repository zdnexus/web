/**
 * Created by zhongdong on 18/5/18.
 *
 * url:http://www.cnblogs.com/muge10/p/7349704.html
 */
'use strict';

function test1() {
    console.log(1)
}


// T1-1
// setTimeout(test1, 1000);
// (立即) 无输出
// (1s ->) 1


// T1-2
// setTimeout(test1(), 1000);
// (立即) 1
// (1s ->) 无输出


// T1-3
// setTimeout(console.log(1), 1000);
// (立即) 1
// (1s ->) 无输出


// T1-4
// setTimeout(function () {
//     test1();
// }, 1000);
// (立即) 无输出
// (1s ->) 1