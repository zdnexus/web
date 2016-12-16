/**
 * Created by Administrator on 2016/12/14 0014.
 */
'use strict';

var arr = [1, 2, 3];
let num1 = '0';
if (num1) {
    console.log(arr[num1]);//1
}
let num2 = '1';
if (--num2) {
    console.log(arr[num2]);
}
else {
    console.log(num2);//0
    console.log(typeof num2);//number
}
let num3 = '2';
console.log(num3 > 1);//true
console.log(num3 == 2);//true
console.log(num3 === 2);//false
console.log(num3 < -2);//false
let num4 = 0;
if (num4) {
    console.log(arr[num4]);
}
else{
    console.log(num4);//0
    console.log(typeof num4);//number
}

let x = 3;
let y = '5';
console.log(x + y);//35
console.log(typeof (x + y));//string
console.log(x - y);//-2
console.log(typeof (x - y));//number
console.log(x * y);//15
console.log(typeof (x * y));//number
console.log(x / y);//0.6
console.log(typeof (x / y));//number