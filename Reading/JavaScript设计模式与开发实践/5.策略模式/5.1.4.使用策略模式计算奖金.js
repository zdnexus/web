/**
 * Created by zdnexus on 2018/1/20 0020.
 */
'use strict';

var strategies = {
    'S': function (salary) {
        return salary * 4;
    },
    'A': function (salary) {
        return salary * 3;
    },
    'B': function (salary) {
        return salary * 2;
    }
};

var calculateBonus = function (level, salary) {
    return strategies[level](salary);
};

console.log(calculateBonus('B', 20000));
console.log(calculateBonus('S', 6000));