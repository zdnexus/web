/**
 * Created by Administrator on 2017/12/17 0017.
 */
'use strict';

var obj = {
    id: 1,
    getId: function () {
        console.log(this);
        console.log(this === obj);
        console.log(this.id);
        console.log(this.getId);
    }
};

obj.getId();