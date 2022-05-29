/**
 * Created by zdnexus on 17/5/11.
 */
'use strict';

let strict2 = require('./strict2');
strict2.a();

function f1() {
    console.log(this);
}
f1();