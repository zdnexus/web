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


// var list = [
//   {
//     a: 1
//   },
//   {
//     b: 1
//   }
// ]
// var p = new Person();
//
// // Person.prototype.name = 'nexus';
//
// Person.prototype = {
//   constructor: Person,
//   name: 'noa',
//   sayHi: function () {
//     console.log('hi');
//   }
// }
//
// var list_2 = [];
// var one = list[0];
// list_2.push(one);
// console.log(list)
// console.log(list_2)
//
// one.a = 3;
// console.log(p.name);
// // p.sayName();
//
//
// let a = 1;
//
// let b = function (a) {
//   console.log(arguments);
//   switch (a) {
//     case 1: {
//       return 10;
//     }
//     case 2: {
//       return 20;
//     }
//   }
// };
// let c = (...a) => {
//   console.log(a);
//   switch (a) {
//     case 1: {
//       return 10;
//     }
//     case 2: {
//       return 20;
//     }
//   }
// };
// console.log(b(a));
// console.log(c(a));

const L1 = [1, 2]
console.log(L1.includes(1))
console.log(L1.includes(2))

const L2 = [{ a: 1 }, { b: 2 }]
console.log(L2.includes({ a: 1 }))
console.log(L2.includes({ b: 2 }))
console.log(L2.filter(item => item.a === 1))

const a = 1
if (a === 1) {
  console.log('ok')
} else if (a >= 0) {
  console.log('okkk')
}
