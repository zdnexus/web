/**
 * Created by Administrator on 2017/4/7 0007.
 */

function Person(){}

var p = new Person();

Person.prototype.name = 'nexus';

Person.prototype = {
    // constructor: Person,
    name:'noa',
    sayHi : function () {
        console.log('hi');
    }
};

console.log(p.name);
// p.sayName();