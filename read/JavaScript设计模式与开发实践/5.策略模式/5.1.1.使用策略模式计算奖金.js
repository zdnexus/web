/**
 * Created by zdnexus on 2018/1/20 0020.
 */
'use strict';

var calculateBonus = function (performanceLevel, salary) {
    if (performanceLevel === 'S') {
        return salary * 4;
    } else if (performanceLevel === 'A') {
        return salary * 3;
    } else if (performanceLevel === 'B') {
        return salary * 2;
    }
};

console.log(calculateBonus('B', 20000));
console.log(calculateBonus('S', 6000));