/**
 * Created by zdnexus on 2017/12/17 0017.
 */
'use strict';

var obj = {
    a: 1,
    getA: function () {
        console.log(this === obj);
        console.log(this.a);
        console.log(this.getA);
    }
};

obj.getA();