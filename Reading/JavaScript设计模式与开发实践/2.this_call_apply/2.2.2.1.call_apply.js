/**
 * Created by Administrator on 2017/12/9 0009.
 */
'use strict';

var obj = {
    id: 1
};

function Person(id) {
    id && (this.id = id);
    this.showId = function () {
        console.log(this.id);
    };
}
Person.prototype.showId = function () {
    console.log('prototype showId' + this.id);
};
Person.prototype.showMsg = function () {
    console.log('prototype showMsg');
};

Person.call(obj, 20);
obj.showId();
// obj.showMsg();

Person.apply(obj, [30]);
obj.showId();
// obj.showMsg();


function f1(a, b, c) {
    console.log(arguments);
    console.log(a);
    console.log(b);
    console.log(c);
}

// console.log(f1.call(null, [1, 2, 3]));
// console.log(f1.call(null, 1, 2, 3));
// console.log(f1.apply(null, [1, 2, 3]));
// console.log(f1.apply(null, 1, 2, 3));