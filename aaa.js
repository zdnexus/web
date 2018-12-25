function Person() {
}

Person.prototype.name = "Stone";
Person.prototype.age = 28;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
    console.log(this.name);
};
console.log(Person.name)
console.log(Person.age)
console.log(Person.job)
console.log(Person.sayName)
var p = new Person();
console.log(p.name)
console.log(p.age)
console.log(p.job)
console.log(p.sayName())

// Person.name = 'kys';
// Person.age = 21;
// Person.job = 'doctor';
// Person.sayName = function () {
//     console.log(this.name);
// }
// console.log(p.name)
// console.log(p.age)
// console.log(p.job)
//
// var p = new Person();
// console.log(p.name)
// console.log(p.age)
// console.log(p.job)
// p.sayName();
// console.log(Person.name)
// console.log(Person.age)
// console.log(Person.job)
// Person.sayName();