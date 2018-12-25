/**  * Created by zdnexus on 17/5/7.  */ 'use strict';

var a = 1;
{
    console.log(a); // 1
    a = 'good';
    console.log(a); // 'good'
    var a;
    console.log(a); // 'good' (QQQ)
    var a = 'bad';
    console.log(a); // 'bad'
}

let b = 2;
{
    console.log(b); // 2
    // 块级作用域内let又声明了一个局部变量b，导致后者绑定这个块级作用域，所以在let声明变量前，对b赋值会报错
    // let b;   // ERROR
}

var c = 3;
{
    console.log(c); // 3
    // 块级作用域内let又声明了一个局部变量c，导致后者绑定这个块级作用域，所以在let声明变量前，对c赋值会报错
    // let c;       // ERROR
}

let d = 4;
{
    console.log(d); // 4
    // var d;       // ERROR (QQQ)
}

// NOTE
{
    var e = 5;
    var e;
    console.log(e); // 5
}

{
    var f = 6;
    // SyntaxError: Identifier 'f' has already been declared
    // let f = 7;
}

{
    let g = 8;
    // SyntaxError: Identifier 'f' has already been declared
    // let g = 8;
}

{
    console.log(typeof h);  // undefined
    // ReferenceError: i is not defined
    // console.log(typeof i);
    // let i;
}