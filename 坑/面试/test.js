/**
 * Created by Administrator on 2017/5/3 0003.
 */

var a = [1, 2, 3];
// var b = a;// 浅拷贝
// a[0] = 4;
// console.log(a);// [4,2,3]
// console.log(b);// [1,2,3]

// 1
// var c = [];
// for (var i = 0; i < a.length; ++i) {
//     c.push(a[i]);
// }
// a[0] = 4;
// console.log(a);
// console.log(c);

// 2
// c = a.slice(0);
// a[0] = 4;
// console.log(a)
// console.log(c)

//3
// var c = Object.assign('', a);
// a[0] = 4;
// console.log(a);
// console.log(c);

var a = String(123);
var b = new String(123);
console.log(a);
console.log(typeof a);
console.log(b);
console.log(typeof b);