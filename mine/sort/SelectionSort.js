/**
 * Created by zdnexus on 2017/12/22 0022.
 */
'use strict';

var num = 5,
    arr = [],
    sortDiv = document.createElement('div'),
    sortDivItem = document.createElement('div'),
    keyVal = {};
sortDiv.id = 'sort';
sortDivItem.className = 'item';

for (var i = 0; i < num; i++) {
    var n = Math.floor(Math.random() * 100),
        sortDivItemClone = sortDivItem.cloneNode(false);
    arr.push(n);
    sortDivItemClone.style.transform = 'translate3d(' + (i * 10) + 'px,0,0)';
    sortDivItemClone.left = i * 10;
    sortDivItemClone.innerHTML = n;
    sortDiv.appendChild(sortDivItemClone);
    keyVal[i] = sortDivItemClone;
}
document.body.appendChild(sortDiv);

var t = 0;
var time = 1500;
for (var i = 0; i < num - 1; i++) {
    var min = i;
    var flag = false;
    var j = i + 1;
    for (; j < num; j++) {
        if (arr[j] < arr[min]) {
            min = j;
            flag = true;
        }
        (function (t, target_1, target_2, sortedNum) {
            var st1 = setTimeout(function () {
                clearTimeout(st1);
                var ele1 = keyVal[min];
                var ele2 = keyVal[i];
                ele1.style.transform = 'translate3d(' + ele1.left + 'px,500px,0)';
                ele2.style.transform = 'translate3d(' + ele2.left + 'px,500px,0)';

                var st2 = setTimeout(function () {
                    clearTimeout(st2);
                    var ele1_left = ele1.left;
                    var ele2_left = ele2.left;
                    ele1.style.transform = 'translate3d(' + (ele1_left + (i - min) * 62) + 'px,500px,0)';
                    ele2.style.transform = 'translate3d(' + (ele2_left - (i - min) * 62) + 'px,500px,0)';
                    var st3 = setTimeout(function () {
                        clearTimeout(st3);
                        ele1.style.transform = 'translate3d(' + (ele1_left + (i - min) * 62) + 'px,0,0)';
                        ele2.style.transform = 'translate3d(' + (ele2_left - (i - min) * 62) + 'px,0,0)';
                        ele1.left = ele1_left + (i - min) * 62;
                        ele2.left = ele2_left - (i - min) * 62;
                        keyVal[min] = ele2;
                        keyVal[i] = ele1;
                    }, time / 3);
                }, time / 3);
            }, t * time);
        })(t, min, j, i);
        t++;
    }
    if (flag) {
        var temp = arr[min];
        arr[min] = arr[i];
        arr[i] = temp;
    }
}