/**
 * Created by zdnexus on 2017/5/3 0003.
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


//    var a = 6;
//    setTimeout(function () {
//        alert(a);
//        a = 666;
//    }, 1000);
//    a = 66;

function obj(name) {
    if (name) {
        this.name = name;
    }
    return this;
}
obj.prototype.name = "name2";
var a = obj("name1");
var b = new obj;
console.log(a.name);
console.log(b.name);


var data = {a: 1, b: 2, c: 3, d: 4};
Object.keys(data).filter(function (x) {
    return data[x] > 2;
});


function getNthFibonacci(count) {
    var a = 0;
    var b = 1;
    for (var i = 0; i < count; ++i) {
        var temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
getNthFibonacci(0);
getNthFibonacci(1);
getNthFibonacci(2);
getNthFibonacci(3);
getNthFibonacci(4);