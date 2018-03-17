/**
 * Created by zdnexus on 2017/12/22 0022.
 */
'use strict';

var num = 5,
    arr = [],
    sortDiv = document.createElement('div'),
    sortDivItem = document.createElement('div'),
    keyVal = {};
sortDiv.className = 'sort';
sortDivItem.className = 'item';

for (var i = 0; i < num; i++) {
    var n = Math.floor(Math.random() * 100),
        sortDivItemClone = sortDivItem.cloneNode(false),
        positionLeft = i * 10;
    arr.push(n);
    sortDivItemClone.style.transform = 'translate3d(' + positionLeft + 'px,0,0)';
    sortDivItemClone.innerHTML = n;
    sortDivItemClone.positionLeft = positionLeft;
    keyVal[i] = sortDivItemClone;
    sortDiv.appendChild(sortDivItemClone);
}
document.body.appendChild(sortDiv);

var allTime = 0;
var animationTime = 500;
for (var i = 0; i < num - 1; i++) {
    for (var j = 0; j < num - i - 1; j++) {
        var thisTime = (arr[j] > arr[j + 1]) ? animationTime * 3 : animationTime * 2;
        (function (target_1, target_2, sortedNum, thisTime, allTime) {
            var st1 = setTimeout(function () {
                console.log(thisTime);
                console.log(allTime);
                clearTimeout(st1);
                var ele1 = keyVal[target_1],
                    ele2 = keyVal[target_2];
                ele1.style.transform = 'translate3d(' + ele1.positionLeft + 'px,500px,0)';
                ele2.style.transform = 'translate3d(' + ele2.positionLeft + 'px,500px,0)';

                var st2 = setTimeout(function () {
                    console.log('thisTime', thisTime);
                    console.log('allTime', allTime);
                    clearTimeout(st2);
                    if (arr[target_1] > arr[target_2]) {
                        var dis = (target_2 - target_1) * 62;
                        ele1.positionLeft += dis;
                        ele2.positionLeft -= dis;
                        ele1.style.transform = 'translate3d(' + ele1.positionLeft + 'px,500px,0)';
                        ele2.style.transform = 'translate3d(' + ele2.positionLeft + 'px,500px,0)';

                        var st3 = setTimeout(function () {
                            console.log('thisTime', thisTime);
                            console.log('allTime', allTime);
                            clearTimeout(st3);
                            ele1.style.transform = 'translate3d(' + ele1.positionLeft + 'px,0,0)';
                            ele2.style.transform = 'translate3d(' + ele2.positionLeft + 'px,0,0)';
                            keyVal[target_1] = ele2;
                            keyVal[target_2] = ele1;
                            if (target_2 === num - 1 - sortedNum) {
                                ele1.className += ' sorted';
                                if (target_1 === 0) {
                                    ele2.className += ' sorted';
                                }
                            }
                            arr[target_1] = arr[target_1] ^ arr[target_2];
                            arr[target_2] = arr[target_1] ^ arr[target_2];
                            arr[target_1] = arr[target_1] ^ arr[target_2];
                        }, animationTime);
                    } else {
                        ele1.style.transform = 'translate3d(' + ele1.positionLeft + 'px,0,0)';
                        ele2.style.transform = 'translate3d(' + ele2.positionLeft + 'px,0,0)';
                        if (target_2 === num - 1 - sortedNum) {
                            ele2.className += ' sorted';
                            if (target_1 === 0) {
                                ele1.className += ' sorted';
                            }
                        }
                    }
                }, animationTime);
            }, allTime);
        })(j, j + 1, i, thisTime, allTime);
        allTime += thisTime;
    }
}