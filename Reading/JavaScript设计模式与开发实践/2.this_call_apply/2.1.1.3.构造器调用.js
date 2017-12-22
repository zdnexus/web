/**
 * Created by Administrator on 2017/12/17 0017.
 */
'use strict';

function MyObject() {
    this.id = 1;
}
var obj = new MyObject();
console.log(obj.id);// 1


function MyObject_2() {
    this.id = 1;
    return {
        id: 2
    }
}
obj = new MyObject_2();
console.log(obj.id);// 2


function MyObject_3() {
    this.id = 1;
    return 2;
}
obj = new MyObject_3();
console.log(obj.id);// 1