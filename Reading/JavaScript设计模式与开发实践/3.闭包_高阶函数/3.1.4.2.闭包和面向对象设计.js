/**
 * Created by zdnexus on 2018/1/14 0014.
 */
'use strict';

// 面向对象写法
var extent = {
    value: 0,
    call: function () {
        this.value++;
        console.log(this.value);
    }
};

extent.call();
extent.call();
extent.call();