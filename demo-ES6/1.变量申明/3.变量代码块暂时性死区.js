'use strict';

var tmp = 1;
if (true) {
    console.log(tmp);// 1
    tmp = 'a';
    console.log(tmp);// a
    var tmp;
    console.log(tmp);// a (QQQ)
    var tmp = 'aa';
    console.log(tmp);// aa
}


let tmp2 = 2;
if (true) {
    console.log(tmp2);// 2
    tmp2 = 'b';
    console.log(tmp2);// b
    // let tmp2;// ERROR (块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错)
    // console.log(tmp2);
}


var tmp3 = 3;
if (true) {
    console.log(tmp3);// 3
    tmp3 = 'c';
    console.log(tmp3);// c
    // let tmp3;// ERROR (块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错)
    // console.log(tmp3);
}


let tmp4 = 4;
if (true) {
    console.log(tmp4);// 4
    tmp4 = 'd';
    console.log(tmp4);// d
    // var tmp4;// ERROR (QQQ)
    // console.log(tmp4);
}