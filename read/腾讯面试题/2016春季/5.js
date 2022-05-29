/**
 * Created by zdnexus on 17/11/27.
 */
'use strict';

// 请写一段 JS 程序类，定义一个列表类List，
// 该类包含两个成员：属性 length（表示列表中的元素个数）
// 和方法 add （像列表中添加元素），其中要求构造函数和 add 方法的参数为动态参数。

function List() {
    this['_data'] = [];
    for (var ele in arguments) {
        this._data.push(arguments[ele]);
    }
    this.length = this._data.length;
}

List.prototype = {
    construct: List,
    add: function () {
        for (var ele in arguments) {
            this._data.push(arguments[ele]);
        }
        this.length = this._data.length;
    }
};

var l = new List(1);
l.add(2);
l.add(3,4);
console.log(l['_data']);