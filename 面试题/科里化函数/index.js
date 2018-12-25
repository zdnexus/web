/**
 * Created by zhongdong on 18/7/16.
 */
function sum() {
    var t = 0;

    for (let i = 0; i < arguments.length; i++) {
        t += arguments[i];
    }

    return t + sum;
}