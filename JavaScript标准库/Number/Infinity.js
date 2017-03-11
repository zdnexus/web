/**
 * Created by Administrator on 2017/3/4 0004.
 */
'use strict';

{
    console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1);

    var END = Math.pow(2, 53);
    var START = END - 100;
    var count = 0;

    for (var i = START; i <= END; i++) {
        count++;
    }
    console.log(count);
}