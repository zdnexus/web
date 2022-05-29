/**
 * Created by zdnexus on 2016/12/24 0024.
 */

var arr = [1, 2, 3, 4, 5];

function X(arr) {
    var i = 0;
    return function () {
        console.log(arr[i++]);
    }
}

var arrNext = X(arr);


arrNext();
arrNext();
arrNext();
arrNext();
arrNext();