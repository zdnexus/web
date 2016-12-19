/**
 * Created by Administrator on 2016/12/13 0013.
 */
'use strict';

//文件作用域
console.warn('文件作用域');
// 问题：this为什么是{}
console.log('this =', this);//{}
console.log('x =', x);//undefined
console.log('this.x =', this.x);//undefined
var x = 1;
console.log('x =', x);//1
console.log('this.x =', this.x);//undefined
this.x = 2;
console.log('this =', this);//{x:2}
console.log('x =', x);//1
console.log('this.x =', this.x);//2
// console.log('this ==== window', this === window);//ReferenceError: window is not defined
//块状作用域
{
    console.warn('块状作用域');
    console.log('this =', this);//{x:2}
    console.log('x =', x);//1
    console.log('this.x =', this.x);//2
    var x = 3;
    console.log('x =', x);//3
    console.log('this.x =', this.x);//2
    this.x = 4;
    console.log('x =', x);//3
    console.log('this.x =', this.x);//4
}
//函数作用域
function main1() {
    console.warn('main1函数作用域');
    console.log('this =', this);//undefined
    console.log('x = ', x);//undefined
    // console.log('this.x =', this.x);//TypeError: Cannot read property 'x' of undefined
    var x = 5;
    console.log('x = ', x);//5
    // console.log('this.x =', this.x);//TypeError: Cannot read property 'x' of undefined
    // 问题：为什么不能设置this.x=6
    // this.x = 6;//TypeError: Cannot set property 'x' of undefined
    console.log('x = ', x);//5
    // console.log('this.x = ', this.x);//TypeError: Cannot read property 'x' of undefined
}
function main2() {
    console.warn('main2函数作用域');
    // 问题：为什么main2后面还有一个{}
    console.log('this =', this);//main2 {}
    console.log('x =', x);//undefined
    console.log('this.x =', this.x);//undefined
    var x = 7;
    console.log('x = ', x);//7
    console.log('this.x =', this.x);//undefined
    this.x = 8;
    console.log('x = ', x);//7
    console.log('this.x = ', this.x);//8
}
main1();
new main2();