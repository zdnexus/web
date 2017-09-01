/**
 * Created by Administrator on 2017/3/13 0013.
 */
'use strict';

function sidEffecting(ary) {
    ary[0] = ary[2];
}
function bar(a, b, c) {
    c = 10;
    sidEffecting(arguments);

    return a + b + c;
}

console.log(bar(1, 2, 3));
