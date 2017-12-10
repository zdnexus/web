/**
 * Created by Administrator on 2017/12/9 0009.
 */
'use strict';

var obj = {
    name: 'zd'
};

var createPerson = function (age) {
    this.age = age;
    this.showName = function () {
        console.log(this.name);
    };
};
createPerson.prototype.showAge = function () {
    console.log(this.age);
};

createPerson.call(obj, 20);
obj.showName();

createPerson.apply(obj, [30]);
obj.showAge();


// var f1 = function () {
//     console.log(arguments);
// };
// f1.apply(null, [1,2,3]);
// f1([1, 2, 3])