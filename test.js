/**
 * Created by zdnexus on 2017/4/7 0007.
 */
//
// function Person() {
// }
//
// var p = new Person();
//
// Person.prototype.name = 'nexus';
//
// Person.prototype = {
//     // constructor: Person,
//     name: 'noa',
//     sayHi: function () {
//         console.log('hi');
//     }
// };
//
// console.log(p.name);
// // p.sayName();


var list = [
    {
        a: 1
    },
    {
        b: 1
    }
]
var p = new Person();

// Person.prototype.name = 'nexus';

Person.prototype = {
    constructor: Person,
    name: 'noa',
    sayHi: function () {
        console.log('hi');
    }
}

var list_2 = [];
var one = list[0];
list_2.push(one);
console.log(list)
console.log(list_2)

one.a = 3;
console.log(p.name);
// p.sayName();


let a = 1;

let b = function (a) {
    console.log(arguments);
    switch (a) {
        case 1:
        {
            return 10;
        }
        case 2:
        {
            return 20;
        }
    }
};
let c = (...a) => {
    console.log(a);
    switch (a) {
        case 1:
        {
            return 10;
        }
        case 2:
        {
            return 20;
        }
    }
};
console.log(b(a));
console.log(c(a));


var s = '#/orderDetail/orderNo=20180111018569481';
s = s.substr(s.lastIndexOf('/') + 1);
console.log(s);

function parseQueryString(url) {
    var iterms = url.split("&");
    var arr, Json = {};
    for (var i = 0; i < iterms.length; i++) {
        arr = iterms[i].split("=");
        Json[arr[0]] = arr[1];
    }
    return Json;
}

var o = parseQueryString(s);
console.log(o.orderNo);