/**
 * Created by zdnexus on 17/7/20.
 */
'use strict';

define(['func'], () => {
    function plusOne(num) {
        return num + 1;
    }

    function subOne(num) {
        return num - 1;
    }

    return {
        plusOne,
        subOne
    };
});