/**
 * Created by Administrator on 2016/12/24 0024.
 */


// console.log(a);//ReferenceError: a is not defined

var b;
console.log(b);//undefined
console.log(typeof b);//undefined
// console.log(b.x);//TypeError: Cannot read property 'x' of undefined


var c = undefined;
console.log(c);//undefined
console.log(typeof c);//undefined
// console.log(c.x);//TypeError: Cannot read property 'x' of undefined

var d = null;
console.log(d);//null
console.log(typeof d);//object
// console.log(d.x);//TypeError: Cannot read property 'x' of undefined

var e = {};
console.log(e);//{}
console.log(typeof e);//object
console.log(e.x);//undefined 不存在的变量