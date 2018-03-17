/**
 * Created by zdnexus on 17/6/16.
 */
'use strict';

// function extend() {
//     if (arguments.length === 0) {
//         return;
//     }
//
//     let obj = arguments[0];
//     for (let i = 1; i < arguments.length; ++i) {
//         for (let key in arguments[i]) {
//             obj[key] = arguments[i][key];
//         }
//     }
// }

let extend = (_first, ..._others) => {
    if (!_first) {
        return;
    }

    let obj = _first;
    for (let i = 0; i < _others.length; ++i) {
        for (let key in _others[i]) {
            obj[key] = _others[i][key];
        }
    }
};

let obj = {};
let obj2 = {
    a: 1
};
let obj3 = {
    b: 2
};
let obj4 = {
    b: 3,
    c: 4,
};
extend(obj, obj2, obj3, obj4);
console.log(obj);
console.log(obj2);
console.log(obj3);
console.log(obj4);

extend(obj2, obj3, obj4);
console.log(obj2);
console.log(obj3);
console.log(obj4);