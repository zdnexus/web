/**
 * Created by Administrator on 2017/3/4 0004.
 */
'use strict';

{
    var END = Math.pow(2, 53);
    var START = END - 100;
    var count = 0;

    for (var i = START; i <= END; i++) {
        count++;
    }
    console.log(count);
}