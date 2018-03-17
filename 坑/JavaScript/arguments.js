/**
 * Created by zdnexus on 2017/4/4 0004.
 */
'use strict';

// function Person(name, age, job) {
//     console.log(name);
//     console.log(age);
//     console.log(job);
//     console.log(arguments);
//     console.log(typeof arguments);
//     for (let i in arguments) {
//         console.log(arguments[i]);
//     }
// }
// Person('钟东', '27', 'Software Engineer');

// let Person2 = (name, age, job)=> {
//     console.log(name);
//     console.log(age);
//     console.log(job);
//     console.log(arguments);
//     for (let i in arguments) {
//         console.log(arguments[i]);
//     }
// };
// Person2('钟东', '27', 'Software Engineer');

let Person3 = (...needles)=> {
    // console.log(name);
    // console.log(age);
    // console.log(job);
    for (let i in arguments) {
        console.log(arguments[i]);
    }
};
Person3('钟东', '27', 'Software Engineer');