/**
 * Created by Administrator on 2016/12/13 0013.
 */
'use strict';

var a = [1, 2, 3];
a.splice(1, 1, 1, 2, 3);
console.log(a);//1,1,2,3,3

//文件作用域
console.log('文件作用域');
console.log('x =', x);//undefined
console.log('this.x =', this.x);//undefined
var x = 2;
console.log('x =', x);//2
console.log('this.x =', this.x);//undefined
this.x = 3;
console.log('x =', x);//2
console.log('this.x =', this.x);//3
console.log('this =', this);//{x:3}
//块状作用域
{
    console.log('块状作用域');
    console.log('this =', this);//{x:3}
    console.log('x =', x);//2
    console.log('this.x =', this.x);//3
    var x = 2;
    console.log('x =', x);//2
    console.log('this.x =', this.x);//3
    this.x = 3;
    console.log('x =', x);//2
    console.log('this.x =', this.x);//3
}
//函数作用域
function main() {
    console.info('函数作用域');
    console.log('this =', this);//undefined
    console.log('x = ', x);//undefined
    console.log('this.x =', this.x);//this是new对象，这里没有，所以this是undefined，this.x会报错
    var x = 4;
    console.log('x = ', x);//4
    console.log('this.x =', this.x);//undefined
    this.x = 5;
    console.log('x = ', x);//4
    console.log('this.x = ', this.x);//5
}
main();
// new main();