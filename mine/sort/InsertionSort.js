/**
 * Created by zdnexus on 2017/12/22 0022.
 */
'use strict';

var num = 7,
    arr = [],
    sortDiv = document.createElement('div'),
    dom = document.createElement('div');

var keyVal = {};
for (var end = 0; end < num; end++) {
    var domClone = dom.cloneNode(false);
    domClone.style.transform = 'translate3d(' + (end * 10) + 'px,0,0)';
    domClone.left = end * 10;
    var n = Math.floor(Math.random() * 100);
    domClone.innerHTML = n;
    arr.push(n);
    sortDiv.appendChild(domClone);
    keyVal[end] = domClone;
}
sortDiv.id = 'sort';
document.body.appendChild(sortDiv);

var t = 0;
var time = 1500;
console.log(arr);
for (var i = 1; i < num; i++) {
    var temp = arr[i];
    var flag = false;
    var j = i - 1;
    for (; j >= 0; j--) {
        if (arr[j] > temp) {
            arr[j + 1] = arr[j];
            flag = true;
            (function (t, start, end) {
                var st1 = setTimeout(function () {
                    clearTimeout(st1);
                    var ele1 = keyVal[start];
                    var ele2 = keyVal[end];
                    ele1.style.transform = 'translate3d(' + ele1.left + 'px,500px,0)';
                    ele2.style.transform = 'translate3d(' + ele2.left + 'px,500px,0)';

                    var st2 = setTimeout(function () {
                        clearTimeout(st2);
                        var ele1_left = ele1.left;
                        var ele2_left = ele2.left;
                        ele1.style.transform = 'translate3d(' + (ele1_left + (end - start) * 62) + 'px,500px,0)';
                        ele2.style.transform = 'translate3d(' + (ele2_left - (end - start) * 62) + 'px,500px,0)';
                        var st3 = setTimeout(function () {
                            clearTimeout(st3);
                            ele1.style.transform = 'translate3d(' + (ele1_left + (end - start) * 62) + 'px,0,0)';
                            ele2.style.transform = 'translate3d(' + (ele2_left - (end - start) * 62) + 'px,0,0)';
                            ele1.left = ele1_left + (end - start) * 62;
                            ele2.left = ele2_left - (end - start) * 62;
                            keyVal[start] = ele2;
                            keyVal[end] = ele1;
                        }, time / 3);
                    }, time / 3);
                }, t * time);
            })(t, j, j + 1);
            t++;
        } else {
            break;
        }
    }

    if (flag) {
        arr[j + 1] = temp;
        // (function (t, start, end) {
        //     var st1 = setTimeout(function () {
        //         clearTimeout(st1);
        //         var ele1 = keyVal[start];
        //         var ele2 = keyVal[end];
        //         ele1.style.transform = 'translate3d(' + ele1.left + 'px,500px,0)';
        //         ele2.style.transform = 'translate3d(' + ele2.left + 'px,500px,0)';
        //
        //         var st2 = setTimeout(function () {
        //             clearTimeout(st2);
        //             var ele1_left = ele1.left;
        //             var ele2_left = ele2.left;
        //             ele1.style.transform = 'translate3d(' + (ele1_left + (end - start) * 62) + 'px,500px,0)';
        //             ele2.style.transform = 'translate3d(' + (ele2_left - (end - start) * 62) + 'px,500px,0)';
        //             var st3 = setTimeout(function () {
        //                 clearTimeout(st3);
        //                 ele1.style.transform = 'translate3d(' + (ele1_left + (end - start) * 62) + 'px,0,0)';
        //                 ele2.style.transform = 'translate3d(' + (ele2_left - (end - start) * 62) + 'px,0,0)';
        //                 ele1.left = ele1_left + (end - start) * 62;
        //                 ele2.left = ele2_left - (end - start) * 62;
        //                 keyVal[start] = ele2;
        //                 keyVal[end] = ele1;
        //             }, time / 3);
        //         }, time / 3);
        //     }, t * time);
        // })(t, j, val);
        // t++;
    }
}
console.log(arr);