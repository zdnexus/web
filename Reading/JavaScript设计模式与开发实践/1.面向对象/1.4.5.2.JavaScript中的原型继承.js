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

var objectFactory = function () {
    var obj = new Object(),
        Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;
};

var p = objectFactory(Person, 1);
console.log(p.id);