/**
 * Created by zdnexus on 2017/3/13 0013.
 */
'use strict';

function isOdd(num) {
    return num % 2 == 1;
}

function isEven(num) {
    return num % 2 == 0;
}

function isSane(num) {
    return isEven(num) || isOdd(num);
}
{

    var values = [7, 4, '13', -9, Infinity];
    console.log(values.map(isSane));
}


//
{
    var a = 111111111111111110000;
    var b = 1111;
    console.log(a + b);
    console.log(a + b === a);
}
