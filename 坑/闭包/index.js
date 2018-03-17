/**
 * Created by zdnexus on 2017/4/24 0024.
 */
'use strict';

// for (var i = 0; i < 5; ++i) {
//     console.log('before setTimeout:', i);
//     setTimeout(()=> {
//         console.log('setTimeout', i);
//     }, 500);
//     console.log('after setTimeout:', i);
// }


// for (var i = 0; i < 5; ++i) {
//     console.log('before setTimeout:', i);
//     (function (i) {
//         setTimeout(()=> {
//             console.log('setTimeout', i);
//         }, 500);
//     })(i);
//     console.log('after setTimeout:', i);
// }


for (var i = 0; i < 5; ++i) {
    console.log('before setTimeout:', i);
    setTimeout((function (i) {
        console.log('setTimeout', i);
    })(i), 500);
    console.log('after setTimeout:', i);
}