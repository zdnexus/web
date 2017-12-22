/**
 * Created by Administrator on 2017/12/17 0017.
 */
// 'use strict';

var obj = {
    id: 1,
    getId: function () {
        return this.id;
    }
};
window.id = 2;

var getId = obj.getId;
console.log(getId());