/**
 * Created by zdnexus on 17/5/8.
 */
'use strict';

console.log(1);

setTimeout(()=>{
    console.log(2);
},0);

console.log(3);

setTimeout(()=>{
    console.log(4);
},0);

new Promise((resolve,reject)=>{
    console.log(5);
    setTimeout(()=>{
        console.log(6);
        resolve(7);
    });
    console.log(8);
}).then((val)=>{
    console.log(val);
});

console.log(9);

setTimeout(()=>{
    console.log(10);
},0);

// 1 3 5 8 9 2 4 6 7 10

console.log('setTimeout start');

setTimeout(() => {
    console.log('insert');
}, 100);

for (let i = 0; i < 10; ++i) {
    setTimeout(() => {
        console.log(i);
    }, i * 100);
}

console.log('setTimeout end');