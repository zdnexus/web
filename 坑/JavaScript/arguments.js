/**
 * Created by Administrator on 2017/4/4 0004.
 */
'use strict';

function Person(name, age, job) {
    console.log(name);
    console.log(age);
    console.log(job);
    console.log(arguments);
    for (let i in arguments) {
        console.log(arguments[i]);
    }
}

// Person('钟东', '27', 'Software Engineer');

var Person2 = (haystack, ...needles)=> {
    console.log(haystack)
    console.log(needles)

    for (let i in needles) {
        console.log(needles[i])
    }

    // console.log(name);
    // console.log(age);
    // console.log(job);
    console.log(arguments);
    // for (let i in arguments) {
    //     console.log(arguments[i]);
    // }
};

Person2('钟东', '27', 'Software Engineer');