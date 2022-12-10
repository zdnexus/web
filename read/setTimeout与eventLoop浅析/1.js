/**
 * Created by zhongdong on 18/6/4.
 * http://www.cnblogs.com/muge10/p/7349704.html
 * 请在浏览器中运行setTimeout，node和browser的eventLoop机制不同，这里仅讨论browser
 */
'use strict';

function test1() {
    console.log(1);
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
// setTimeout(console.log(1.1), 1000);
// (立即) 1.1
// (1s ->) 无输出


// ADD
// T1-4
// setTimeout('console.log(1.2)', 1000);
// (立即) 无输出
// (1s ->) 1.2