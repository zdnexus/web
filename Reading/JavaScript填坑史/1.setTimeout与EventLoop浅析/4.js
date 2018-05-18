/**
 * Created by zhongdong on 18/5/18.
 */
'use strict';

// T4-1
// for (var i = 0; i < 5; i++) {
//     console.log(i);
// }
// (立即) 0 1 2 3 4


// T4-2
// for (var i = 0; i < 5; i++) {
//     setTimeout(function () {
//         console.log(i);
//     }, 1000 * i);
// }
// (0s ->) 5
// (1s ->) 5
// (2s ->) 5
// (3s ->) 5
// (4s ->) 5


// T4-3
// for (var i = 0; i < 5; i++) {
//     setTimeout(function (i) {
//         console.log(i);
//     }, 1000 * i);
// }
// (0s ->) undefined
// (1s ->) undefined
// (2s ->) undefined
// (3s ->) undefined
// (4s ->) undefined


// T4-4
// for (var i = 0; i < 5; i++) {
//     setTimeout(function (i) {
//         console.log(i);
//     }, 1000 * i, 0);
// }
// (0s ->) 0
// (1s ->) 0
// (2s ->) 0
// (3s ->) 0
// (4s ->) 0


// T4-5
// for (var i = 0; i < 5; i++) {
//     (function (i) {
//         setTimeout(function () {
//             console.log(i);
//         }, i * 1000);
//     })(i);
// }
// (0s ->) 0
// (1s ->) 1
// (2s ->) 2
// (3s ->) 3
// (4s ->) 4


// T4-6
// for (var i = 0; i < 5; i++) {
//     (function () {
//         setTimeout(function () {
//             console.log(i);
//         }, i * 1000);
//     })(i);
// }
// (0s ->) 5
// (1s ->) 5
// (2s ->) 5
// (3s ->) 5
// (4s ->) 5


// T4-7
// for (var i = 0; i < 5; i++) {
//     setTimeout((function (i) {
//         console.log(i);
//     })(i), i * 1000);
// }
// (立即) 0 1 2 3 4