/**
 * Created by zdnexus on 2017/12/9 0009.
 */
'use strict';

var Person = function (id) {
    this.id = id;
};
Person.prototype.getName = function () {
    return this.id;
};
Person.id = 'a';

var p = new Person('b');
p.id = 'c';

console.log(p.id);
