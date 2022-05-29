/**
 * Created by zhongdong on 18/6/27.
 */
'use strict';

function someLoop() {
    var tag = true;
    var temp = 0;

    setTimeout(function () {
        tag = !tag;
        console.log(tag)
    }, 1000);

    while (tag) {
        temp++;
    }
}
// someLoop();