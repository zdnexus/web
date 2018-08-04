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
];
var list_2 = [];
var one = list[0];
list_2.push(one);
console.log(list)
console.log(list_2)

one.a = 3;
