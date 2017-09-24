/**
 * Created by Administrator on 2016/12/24 0024.
 */

function a() {
    console.log('a');
    return function () {
        console.log('b');
    }
}

a();//'a'
a()();//'a' 'b'
