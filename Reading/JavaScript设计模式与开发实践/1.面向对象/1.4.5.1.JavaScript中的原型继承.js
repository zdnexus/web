/**
 * Created by Administrator on 2017/12/9 0009.
 */
'use strict';

function Person(id) {
    id && (this.id = id);
}
Person.prototype.getId = function () {
    return this.id;
};
Person.prototype.id = 1;
Person.id = 2;

var p = new Person(3);
p.id = 4;
console.log(p.id);