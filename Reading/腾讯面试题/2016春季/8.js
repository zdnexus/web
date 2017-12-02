/**
 * Created by aa on 17/11/27.
 */
'use strict';

function A() {
    var count = 0;
    function B() {
        count++;
        return count;
    }
    return B;
}

var plus = A();
//A中的count会一直停留在内存中。。。
console.log(plus());// 1
console.log(plus()); // 2
console.log(plus()); // 3